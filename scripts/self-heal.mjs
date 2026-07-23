#!/usr/bin/env node
/**
 * self-heal.mjs - Playwright failure to GitHub Issue to Copilot coding agent
 *
 * Usage:
 *   node scripts/self-heal.mjs --results <path-to-results.json> [--dry-run]
 *
 * Environment:
 *   GITHUB_TOKEN       - required; calls the GitHub Issues REST API.
 *   GITHUB_REPOSITORY  - required; e.g. "sedigaplanit/onestyle-automation".
 *   COPILOT_ASSIGNEE   - optional; Copilot bot login (default: "copilot").
 *
 * For each unique failure, this script:
 *   1. Reads the failing spec source + imported page-object source.
 *   2. Generates a detailed GitHub Issue body.
 *   3. Checks whether an open issue with the same title exists (idempotent).
 *   4. Creates a new issue assigned to the Copilot coding agent (unless --dry-run).
 *
 * The Copilot coding agent picks up the issue, analyses the full codebase,
 * and opens a PR with a fix or bug report - no Models API calls needed.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
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
  console.error('[self-heal] GITHUB_REPOSITORY is required (e.g. "owner/repo").')
  process.exit(1)
}

const COPILOT_ASSIGNEE = process.env.COPILOT_ASSIGNEE ?? 'copilot'
const REPO_ROOT = process.cwd()
const DRY_RUN = args['dry-run'] === true
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPOSITORY}`

const ANSI_RE = /\x1B\[[0-9;]*m/g
const strip = (s) => (s ?? '').replace(ANSI_RE, '').trim()

function collectFailures(suites, inheritedFile = null) {
  const failures = []
  for (const suite of suites ?? []) {
    const currentFile = suite.file ?? inheritedFile
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const failedResult = (test.results ?? []).find(
          (r) => r.status === 'failed' || r.status === 'timedOut',
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

console.log(`[self-heal] Found ${failures.length} unique failure(s). Generating issues...\n`)

function readSource(relPath) {
  if (!relPath) return null
  const abs = path.resolve(REPO_ROOT, relPath)
  return existsSync(abs) ? readFileSync(abs, 'utf-8') : null
}

function extractPageObjectPaths(specSource) {
  const paths = []
  const re = /from\s+['"]@pages\/([^'"]+)['"]/g
  let m
  while ((m = re.exec(specSource)) !== null) {
    paths.push(`pages/${m[1]}.ts`)
  }
  return paths
}

function buildIssueBody(failure) {
  const specSource = readSource(failure.specFile) ?? '(source not found)'
  const poPaths = extractPageObjectPaths(specSource)
  const poSections = poPaths
    .map((p) => {
      const src = readSource(p)
      return src ? `### ${p}\n\`\`\`typescript\n${src}\n\`\`\`` : null
    })
    .filter(Boolean)
    .join('\n\n')

  return `## Failing Test

**Spec file:** \`tests/${failure.specFile}\`
**Test:** \`${failure.fullTitle}\`
**Status:** \`${failure.status}\`

---

## Error

\`\`\`
${failure.error}
\`\`\`

## Stack Trace

\`\`\`
${failure.stack.slice(0, 1500)}
\`\`\`

---

## Failing Spec Source

\`\`\`typescript
${specSource.slice(0, 4000)}
\`\`\`

${poSections ? `## Relevant Page Objects\n\n${poSections.slice(0, 4000)}` : ''}

---

## Task for Copilot

Analyse the failure above and choose **one** of these actions:

**Option A - Test code fix** (broken locator, wrong assertion, timing issue, or import error):
- Fix \`tests/${failure.specFile}\` and/or the relevant page object(s).
- Do NOT modify \`pages/BasePage.ts\` or \`tests/fixtures.ts\`.
- Locator priority: \`getByRole\` > \`getByLabel\` > \`getByPlaceholder\` > \`getByText\` > \`locator('css')\`.
- Tests import \`{ test, expect }\` from \`'../fixtures'\` - never from \`@playwright/test\`.
- Page objects extend \`BasePage\` and implement \`async init(): Promise<this>\`.

**Option B - Bug report** (test assertion is correct but app behaviour is wrong):
- Create \`bug-reports/BUG_{DOMAIN}_{NNN}_{slug}.md\` following the format of existing files there.
- Severity: Critical / High / Medium / Low.

Open a PR with your changes and request review.
`
}

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

async function createIssue(title, body) {
  return githubFetch('/issues', {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      labels: ['self-heal', 'automated'],
      assignees: [COPILOT_ASSIGNEE],
    }),
  })
}

const summary = []

for (const failure of failures) {
  const issueTitle = `fix(self-heal): ${failure.testTitle}`
  const issueBody = buildIssueBody(failure)

  console.log(`Processing: ${failure.fullTitle}`)

  if (DRY_RUN) {
    console.log(`  [dry-run] would create issue: "${issueTitle}"`)
    summary.push({ ...failure, action: 'dry-run', issueTitle })
    console.log()
    continue
  }

  try {
    const existing = await findExistingIssue(issueTitle)
    if (existing) {
      console.log(`  Issue already open: #${existing.number} - skipping`)
      summary.push({ ...failure, action: 'skipped', issueNumber: existing.number, issueTitle })
    } else {
      const issue = await createIssue(issueTitle, issueBody)
      console.log(`  Created issue #${issue.number}: ${issue.html_url}`)
      summary.push({
        ...failure,
        action: 'created',
        issueNumber: issue.number,
        issueUrl: issue.html_url,
        issueTitle,
      })
    }
  } catch (err) {
    console.error(`  [ERROR] ${err.message}`)
    summary.push({ ...failure, action: 'error', error: err.message, issueTitle })
  }

  console.log()
}

writeFileSync('self-heal-summary.json', JSON.stringify(summary, null, 2))

const created = summary.filter((s) => s.action === 'created').length
const skipped = summary.filter((s) => s.action === 'skipped').length
const errors  = summary.filter((s) => s.action === 'error').length

console.log('-'.repeat(60))
console.log(`[self-heal] Done - ${created} issue(s) created, ${skipped} skipped, ${errors} error(s)`)
console.log('[self-heal] Summary written to self-heal-summary.json')
