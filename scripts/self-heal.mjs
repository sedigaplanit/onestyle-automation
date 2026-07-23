#!/usr/bin/env node
/**
 * self-heal.mjs — AI-powered Playwright test failure diagnostic script.
 *
 * Usage:
 *   node scripts/self-heal.mjs --results <path-to-results.json> [--dry-run]
 *
 * Environment:
 *   GITHUB_TOKEN — required; used to call the GitHub Models API (GPT-4o).
 *
 * Outputs (unless --dry-run):
 *   • Applies unified diffs to spec/page files for high-confidence "fix_test" verdicts.
 *   • Writes proposed-fixes/<slug>.patch for medium/low-confidence patches (human review).
 *   • Writes bug-reports/BUG_*.md for "create_bug_report" verdicts.
 *   • Always writes self-heal-summary.json for PR body generation.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { parseArgs } from 'node:util'

// ── CLI args ──────────────────────────────────────────────────────────────────
const { values: args } = parseArgs({
  options: {
    results: { type: 'string', short: 'r' },
    'dry-run': { type: 'boolean', default: false },
  },
  strict: false,
})

const resultsPath = args.results
if (!resultsPath || !existsSync(resultsPath)) {
  console.error(`[self-heal] results file not found: ${resultsPath ?? '(not provided)'}`)
  process.exit(1)
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
if (!GITHUB_TOKEN) {
  console.error('[self-heal] GITHUB_TOKEN env var is required for GitHub Models API.')
  process.exit(1)
}

const MODELS_API_URL = 'https://models.inference.ai.azure.com/chat/completions'
// GitHub Enterprise uses bare model names (e.g. 'gpt-4o') — no 'openai/' prefix.
// Override with the SELF_HEAL_MODEL env var if your Enterprise catalog uses a different name.
const MODEL = process.env.SELF_HEAL_MODEL ?? 'gpt-4o'
const REPO_ROOT = process.cwd()
const DRY_RUN = args['dry-run'] === true

// Directories that self-heal is allowed to patch.
const PATCHABLE_DIRS = ['tests/', 'pages/']
// Directories that are always off-limits regardless of AI output.
const EXCLUDED_FILES = ['tests/fixtures.ts', 'pages/BasePage.ts']

// ── Parse results.json ────────────────────────────────────────────────────────
const ANSI_RE = /\x1B\[[0-9;]*m/g
const strip = (s) => (s || '').replace(ANSI_RE, '').trim()

/**
 * Recursively walks a Playwright JSON reporter suite tree and collects failed specs.
 * The `file` property is only present on top-level (file) suites; it is passed down
 * to nested describe-block suites and specs.
 */
function collectFailures(suites, inheritedFile = null) {
  const failures = []
  for (const suite of suites ?? []) {
    const currentFile = suite.file ?? inheritedFile
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const failedResult = (test.results ?? []).find(
          (r) => r.status === 'failed' || r.status === 'timedOut'
        )
        if (failedResult) {
          failures.push({
            specFile: currentFile,
            testTitle: spec.title,
            fullTitle: `${suite.title} > ${spec.title}`,
            status: failedResult.status,
            error: strip(failedResult.errors?.[0]?.message),
            stack: strip(failedResult.errors?.[0]?.stack),
          })
        }
      }
    }
    failures.push(...collectFailures(suite.suites, currentFile))
  }
  return failures
}

const results = JSON.parse(readFileSync(resultsPath, 'utf-8'))
const rawFailures = collectFailures(results.suites)

// Deduplicate: same specFile + testTitle seen from multiple result files
const seen = new Set()
const failures = rawFailures.filter(({ specFile, testTitle }) => {
  const key = `${specFile}||${testTitle}`
  if (seen.has(key)) return false
  seen.add(key)
  return true
})

if (failures.length === 0) {
  console.log('[self-heal] No failures detected. Nothing to do.')
  writeFileSync('self-heal-summary.json', JSON.stringify([], null, 2))
  process.exit(0)
}

console.log(`[self-heal] Found ${failures.length} unique failure(s). Starting diagnosis...\n`)

// ── Source-reading helpers ────────────────────────────────────────────────────
function readSource(relPath) {
  if (!relPath) return null
  const abs = path.resolve(REPO_ROOT, relPath)
  return existsSync(abs) ? readFileSync(abs, 'utf-8') : null
}

/**
 * Extracts page-object file paths from @pages/* import lines in a spec file.
 * e.g. `from '@pages/checkout/CheckoutPage'` → `pages/checkout/CheckoutPage.ts`
 */
function extractPageObjectPaths(specSource) {
  const paths = []
  const re = /from\s+['"]@pages\/([^'"]+)['"]/g
  let m
  while ((m = re.exec(specSource)) !== null) {
    paths.push(`pages/${m[1]}.ts`)
  }
  return paths
}

// ── Heuristics ────────────────────────────────────────────────────────────────
/**
 * Returns a hint for the AI based on the error message pattern.
 * The AI can override this hint; it is provided as context only.
 */
function hintClassify(error) {
  if (/locator|getBy|element|selector|strict mode violation|resolve/i.test(error)) {
    return 'fix_test'
  }
  if (/TypeError|ReferenceError|Cannot find module|SyntaxError/i.test(error)) {
    return 'fix_test'
  }
  if (
    /Expected.*received|toHave|toBe|toEqual|toContain/i.test(error) &&
    !/locator|element/i.test(error)
  ) {
    return 'create_bug_report'
  }
  if (/Timeout|exceeded/i.test(error)) return 'ambiguous'
  return 'ambiguous'
}

// ── AI system prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `\
You are a senior QA automation engineer reviewing Playwright test failures for a TypeScript e-commerce app.

## Project conventions
- Page objects extend BasePage and implement \`async init(): Promise<this>\`.
- Tests import \`{ test, expect }\` from \`'../fixtures'\` — never from \`@playwright/test\`.
- The \`open\` fixture is used to instantiate pages: \`open(PageClass)\` ≡ \`new PageClass(page).init()\`.
- Locator priority: getByRole > getByLabel > getByPlaceholder > getByText > locator('css').
- Never call \`expect()\` inside page objects — return raw values only.
- Page objects live in \`pages/{feature-folder}/{PageName}.ts\`.
- Spec files live in \`tests/{feature-folder}/{Feature}Tests.spec.ts\`.
- Do NOT modify \`pages/BasePage.ts\` or \`tests/fixtures.ts\`.

## Your task
Classify the failure and produce a fix or a bug report.

## Response format
Return ONLY valid JSON matching this exact schema (no markdown fences):
{
  "verdict": "fix_test" | "create_bug_report" | "no_action",
  "confidence": "high" | "medium" | "low",
  "reasoning": "<one sentence>",
  "patch": {
    "file": "<repo-relative path>",
    "unified_diff": "<valid unified diff — a/ and b/ prefixes required>"
  },
  "bugReport": {
    "filename": "BUG_{DOMAIN}_{NNN}_{slug}",
    "severity": "Critical" | "High" | "Medium" | "Low",
    "content": "<full markdown content — see format below>"
  }
}

"patch" is present only when verdict === "fix_test".
"bugReport" is present only when verdict === "create_bug_report".

## Bug report markdown format
# BUG_{DOMAIN}_{NNN} — {short title}

**Severity:** {severity}
**Date:** ${new Date().toISOString().slice(0, 10)}
**Affected Test:** \`{specFile}\` — "{testTitle}"

---

## Steps to Reproduce
...

## Expected Result
...

## Actual Result
...

## Technical Evidence
...

## Root Cause
...

## Fix (Frontend / Backend)
...
`

// ── AI call ───────────────────────────────────────────────────────────────────
async function diagnose(failure) {
  const specSource = readSource(failure.specFile) ?? '(source not found)'
  const poPaths = extractPageObjectPaths(specSource)
  const pageObjectSources = {}
  for (const p of poPaths) {
    const src = readSource(p)
    if (src) pageObjectSources[p] = src
  }

  const userMessage = JSON.stringify(
    {
      testTitle: failure.testTitle,
      fullTitle: failure.fullTitle,
      specFile: failure.specFile,
      errorMessage: failure.error,
      stackTrace: failure.stack,
      heuristic: hintClassify(failure.error),
      specSource,
      pageObjectSources,
    },
    null,
    2
  )

  const response = await fetch(MODELS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub Models API responded ${response.status}: ${body}`)
  }

  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
}

// ── Patch validation ──────────────────────────────────────────────────────────
function isPatchTargetAllowed(file) {
  if (!file) return false
  if (EXCLUDED_FILES.includes(file)) return false
  return PATCHABLE_DIRS.some((dir) => file.startsWith(dir))
}

function applyPatch(unifiedDiff) {
  const tmpFile = path.join(REPO_ROOT, `.self-heal-patch-${Date.now()}.patch`)
  writeFileSync(tmpFile, unifiedDiff)
  try {
    execSync(`git apply --check "${tmpFile}"`, { stdio: 'pipe', cwd: REPO_ROOT })
    execSync(`git apply "${tmpFile}"`, { stdio: 'pipe', cwd: REPO_ROOT })
    return true
  } catch {
    return false
  } finally {
    try {
      unlinkSync(tmpFile)
    } catch {
      /* ignore */
    }
  }
}

// ── Main loop ─────────────────────────────────────────────────────────────────
const summary = []

for (const failure of failures) {
  console.log(`Diagnosing: ${failure.fullTitle}`)
  console.log(`  file  : ${failure.specFile}`)
  console.log(`  error : ${failure.error.slice(0, 120)}`)

  let diagnosis
  try {
    diagnosis = await diagnose(failure)
  } catch (err) {
    console.error(`  [ERROR] ${err.message}\n`)
    summary.push({ ...failure, verdict: 'error', reasoning: err.message })
    continue
  }

  const { verdict, confidence, reasoning, patch, bugReport } = diagnosis
  console.log(`  verdict: ${verdict} (${confidence}) — ${reasoning}`)

  summary.push({ ...failure, verdict, confidence, reasoning })

  if (DRY_RUN) {
    console.log('  [dry-run] skipping file writes\n')
    continue
  }

  // ── Apply fix ───────────────────────────────────────────────────────────
  if (verdict === 'fix_test' && patch?.unified_diff) {
    if (!isPatchTargetAllowed(patch.file)) {
      console.log(`  Patch target ${patch.file} is not in the allowed list — skipping.`)
    } else if (confidence === 'high') {
      const applied = applyPatch(patch.unified_diff)
      if (applied) {
        console.log(`  Applied patch to ${patch.file}`)
      } else {
        // Patch didn't apply cleanly — park it for human review
        mkdirSync(path.join(REPO_ROOT, 'proposed-fixes'), { recursive: true })
        const slug = failure.testTitle
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/gi, '')
          .toLowerCase()
        const dest = path.join(REPO_ROOT, 'proposed-fixes', `${slug}.patch`)
        writeFileSync(dest, patch.unified_diff)
        console.log(`  Patch did not apply cleanly — saved to proposed-fixes/${slug}.patch`)
      }
    } else {
      // Medium / low confidence — always park for human review
      mkdirSync(path.join(REPO_ROOT, 'proposed-fixes'), { recursive: true })
      const slug = failure.testTitle
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/gi, '')
        .toLowerCase()
      const dest = path.join(REPO_ROOT, 'proposed-fixes', `${slug}.patch`)
      writeFileSync(dest, patch.unified_diff)
      console.log(
        `  ${confidence} confidence — saved to proposed-fixes/${slug}.patch for human review`
      )
    }
  }

  // ── Create bug report ───────────────────────────────────────────────────
  if (verdict === 'create_bug_report' && bugReport?.content) {
    const filename = bugReport.filename.endsWith('.md')
      ? bugReport.filename
      : `${bugReport.filename}.md`
    const dest = path.join(REPO_ROOT, 'bug-reports', filename)
    if (!existsSync(dest)) {
      writeFileSync(dest, bugReport.content)
      console.log(`  Created bug report: bug-reports/${filename}`)
    } else {
      console.log(`  Bug report already exists: ${filename} — skipping`)
    }
  }

  console.log()
}

// ── Write summary ─────────────────────────────────────────────────────────────
writeFileSync(path.join(REPO_ROOT, 'self-heal-summary.json'), JSON.stringify(summary, null, 2))

const patches = summary.filter((s) => s.verdict === 'fix_test').length
const bugs = summary.filter((s) => s.verdict === 'create_bug_report').length
const errors = summary.filter((s) => s.verdict === 'error').length

console.log('─'.repeat(60))
console.log(`[self-heal] Done — ${patches} patch(es), ${bugs} bug report(s), ${errors} error(s)`)
console.log('[self-heal] Summary written to self-heal-summary.json')
