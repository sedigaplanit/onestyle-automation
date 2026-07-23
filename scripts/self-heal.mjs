#!/usr/bin/env node
/**
 * self-heal.mjs - Playwright failures -> single consolidated GitHub Issue -> Copilot coding agent
 *
 * Usage:
 *   node scripts/self-heal.mjs --results <path-to-results.json> [--dry-run]
 *
 * Environment:
 *   GITHUB_TOKEN       - required; GitHub Issues REST API auth.
 *   GITHUB_REPOSITORY  - required; e.g. "sedigaplanit/onestyle-automation".
 *   GITHUB_RUN_ID      - optional; appended to issue title for idempotency (default: "local").
 *   ASSIGN_COPILOT     - optional; "true" to assign @copilot after creation (main branch only).
 *   COPILOT_ASSIGNEE   - optional; bot login to assign (default: "copilot").
 *
 * Creates ONE issue per run containing ALL failures.
 * Re-running the same run ID is idempotent (duplicate issue is skipped).
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'

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
  console.error('[self-heal] GITHUB_TOKEN is required.')
  process.exit(1)
}

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY
if (!GITHUB_REPOSITORY) {
  console.error('[self-heal] GITHUB_REPOSITORY is required.')
  process.exit(1)
}

const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID ?? 'local'
const ASSIGN_COPILOT = process.env.ASSIGN_COPILOT === 'true'
const COPILOT_ASSIGNEE = process.env.COPILOT_ASSIGNEE ?? 'copilot'
const REPO_ROOT = process.cwd()
const DRY_RUN = args['dry-run'] === true
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPOSITORY}`
const MAX_BODY_CHARS = 60_000 // GitHub issue limit is 65 536; leave headroom

const ANSI_RE = /\x1B\[[0-9;]*m/g
const strip = (s) => (s ?? '').replace(ANSI_RE, '').trim()

// ── Parse results.json ──────────────────────────────────────────────────────
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

console.log(
  `[self-heal] Found ${failures.length} unique failure(s). Building consolidated issue...\n`
)

// ── Source helpers ──────────────────────────────────────────────────────────
function readSource(relPath) {
  if (!relPath) return null
  const abs = path.resolve(REPO_ROOT, relPath)
  return existsSync(abs) ? readFileSync(abs, 'utf-8') : null
}

function extractPageObjectPaths(specSource) {
  const paths = []
  const re = /from\s+['"]@pages\/([^'"]+)['"]/g
  let m
  while ((m = re.exec(specSource)) !== null) paths.push(`pages/${m[1]}.ts`)
  return paths
}

// ── Build consolidated issue body ───────────────────────────────────────────

/** Returns a markdown list of existing bug report filenames + their first heading line. */
function buildExistingBugReportsList() {
  const dir = path.join(REPO_ROOT, 'bug-reports')
  if (!existsSync(dir)) return '_No existing bug reports found._\n'

  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
  if (files.length === 0) return '_No existing bug reports found._\n'

  const lines = files.map((f) => {
    try {
      const firstLine = readFileSync(path.join(dir, f), 'utf-8')
        .split('\n')[0]
        .replace(/^#+\s*/, '')
      return `- \`${f}\` — ${firstLine}`
    } catch {
      return `- \`${f}\``
    }
  })
  return lines.join('\n') + '\n'
}

function buildConsolidatedBody(failures) {
  const sections = []

  sections.push(
    `## Self-Heal Report — Run #${GITHUB_RUN_ID}\n`,
    `**${failures.length} failure(s) detected.** ` +
      `Copilot: please address each failure below in a **single PR**.\n`,
    `---\n`
  )

  for (let i = 0; i < failures.length; i++) {
    const f = failures[i]
    const specSource = readSource(f.specFile) ?? '(source not found)'
    const poPaths = extractPageObjectPaths(specSource)

    let section = `## Failure ${i + 1} of ${failures.length} — \`${f.testTitle}\`\n\n`
    section += `**File:** \`tests/${f.specFile}\` | **Status:** \`${f.status}\`\n\n`
    section += `### Error\n\`\`\`\n${f.error}\n\`\`\`\n\n`
    section += `### Stack Trace\n\`\`\`\n${f.stack.slice(0, 800)}\n\`\`\`\n\n`
    section += `### Spec Source\n\`\`\`typescript\n${specSource.slice(0, 2500)}\n\`\`\`\n\n`

    for (const p of poPaths) {
      const src = readSource(p)
      if (src)
        section += `### Page Object: ${p}\n\`\`\`typescript\n${src.slice(0, 1500)}\n\`\`\`\n\n`
    }

    section += `---\n`
    sections.push(section)
  }

  sections.push(
    `## Instructions for Copilot\n\n` +
      `For **each** failure listed above, choose the correct action:\n\n` +
      `**Option A — Fix the test code** (broken locator, wrong assertion, timing, import error):\n` +
      `- Fix the spec file and/or page object(s) shown above\n` +
      `- Do NOT modify \`pages/BasePage.ts\` or \`tests/fixtures.ts\`\n` +
      `- Locator priority: \`getByRole\` > \`getByLabel\` > \`getByPlaceholder\` > \`getByText\` > \`locator('css')\`\n` +
      `- Tests import \`{ test, expect }\` from \`'../fixtures'\` — never from \`@playwright/test\`\n` +
      `- Page objects extend \`BasePage\` and implement \`async init(): Promise<this>\`\n\n` +
      `**Option B — Create a bug report** (assertion is correct, app behaviour is wrong):\n` +
      `- Create \`bug-reports/BUG_{DOMAIN}_{NNN}_{slug}.md\` following existing files in that folder\n` +
      `- Severity: Critical / High / Medium / Low\n\n` +
      `Open a **single PR** that fixes all test-code issues and/or creates all bug reports.\n`
  )

  // Enforce body size limit
  let body = sections.join('\n')
  if (body.length > MAX_BODY_CHARS) {
    body =
      body.slice(0, MAX_BODY_CHARS) +
      '\n\n_[body truncated — see full test results in the CI run artifacts]_\n'
  }
  return body
}

// ── GitHub API helpers ──────────────────────────────────────────────────────
async function githubFetch(urlPath, options = {}) {
  const url = `${GITHUB_API}${urlPath}`
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  const body = await res.json()
  if (!res.ok) throw new Error(`GitHub API ${res.status} on ${urlPath}: ${JSON.stringify(body)}`)
  return body
}

async function findExistingIssue(title) {
  const issues = await githubFetch('/issues?state=open&labels=self-heal&per_page=100')
  return issues.find((i) => i.title === title) ?? null
}

// ── Main ────────────────────────────────────────────────────────────────────
const issueTitle = `fix(self-heal): ${failures.length} failure(s) detected — run #${GITHUB_RUN_ID}`
const issueBody = buildConsolidatedBody(failures)

console.log(`Issue title: "${issueTitle}"`)
console.log(`Body size:   ${issueBody.length} chars\n`)

if (DRY_RUN) {
  console.log('[dry-run] Would create issue with the body shown above.')
  console.log(`[dry-run] ASSIGN_COPILOT = ${ASSIGN_COPILOT}`)
  writeFileSync(
    'self-heal-summary.json',
    JSON.stringify({ dryRun: true, issueTitle, failures }, null, 2)
  )
  process.exit(0)
}

let createdIssue = null
try {
  const existing = await findExistingIssue(issueTitle)
  if (existing) {
    console.log(`Issue already exists: #${existing.number} — skipping creation`)
    createdIssue = existing
  } else {
    createdIssue = await githubFetch('/issues', {
      method: 'POST',
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ['self-heal', 'automated'],
      }),
    })
    console.log(`Created issue #${createdIssue.number}: ${createdIssue.html_url}`)
  }
} catch (err) {
  console.error(`[ERROR] Could not create issue: ${err.message}`)
  writeFileSync('self-heal-summary.json', JSON.stringify({ error: err.message, failures }, null, 2))
  process.exit(1)
}

// Assign to Copilot only when running on the main branch
if (ASSIGN_COPILOT) {
  try {
    await githubFetch(`/issues/${createdIssue.number}/assignees`, {
      method: 'POST',
      body: JSON.stringify({ assignees: [COPILOT_ASSIGNEE] }),
    })
    console.log(
      `Assigned issue to @${COPILOT_ASSIGNEE} (main branch — Copilot coding agent will pick this up)`
    )
  } catch {
    console.log(
      `Note: could not auto-assign @${COPILOT_ASSIGNEE} via API — assign manually in GitHub UI`
    )
  }
} else {
  console.log(
    `Running on a feature branch — skipping Copilot assignment. Assign manually via the GitHub UI when ready.`
  )
}

writeFileSync(
  'self-heal-summary.json',
  JSON.stringify(
    {
      issueNumber: createdIssue.number,
      issueUrl: createdIssue.html_url,
      issueTitle,
      assignedCopilot: ASSIGN_COPILOT,
      failures,
    },
    null,
    2
  )
)

console.log('\n[self-heal] Done.')
