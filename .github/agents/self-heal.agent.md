---
name: self-heal
description: "Use when: a Playwright test failure needs triage; you want to create a GitHub Issue for Copilot to fix a failing test locally; analysing test-results/merged-results.json after a local run; previewing what self-heal would do before pushing to CI."
tools: [read, write, run_in_terminal, vscode/askQuestions, github]
---

# Self-Heal Agent

> **What this agent does:** Reads Playwright JSON test results (locally or from CI), identifies unique failures, builds a single consolidated GitHub Issue with full spec/page-object context, and creates it in the repository. On `main` branch the issue is assigned to the Copilot coding agent; on feature branches it is left unassigned for manual review.

---

## Prerequisites

Before running, confirm:
1. `GITHUB_TOKEN` is available — either as an env var or via `gh auth token`.
2. The test results file exists (default: `test-results/merged-results.json`).
3. The labels `self-heal` and `automated` exist in the repo (Issues → Labels).

---

## Steps

### Step 1 — Locate test results

Ask the user which results file to use:
- If they have already run tests locally: use `test-results/merged-results.json` or `test-results/results.json`.
- If not, ask whether to run the tests first:
  ```
  npx playwright test --project=chromium --grep @smoke --workers=1 2>&1 | tee /dev/stderr; true
  ```
  Then merge any multiple result files:
  ```
  node -e "
    const {readdirSync,readFileSync,writeFileSync,mkdirSync} = require('fs');
    const dir='test-results'; mkdirSync(dir,{recursive:true});
    const files=readdirSync(dir).filter(f=>f.startsWith('results')&&f.endsWith('.json')&&f!=='merged-results.json');
    const all=[]; for(const f of files){try{all.push(...JSON.parse(readFileSync(dir+'/'+f)).suites??[])}catch{}}
    writeFileSync(dir+'/merged-results.json',JSON.stringify({suites:all},null,2));
    console.log('Merged',files.length,'files');
  "
  ```

### Step 2 — Preview (dry-run)

Run the script in dry-run mode to show what issue would be created:

```bash
GITHUB_TOKEN=$(gh auth token) \
GITHUB_REPOSITORY=$(gh repo view --json nameWithOwner -q .nameWithOwner) \
GITHUB_RUN_ID=local \
node scripts/self-heal.mjs --results test-results/merged-results.json --dry-run
```

Show the user the issue title and failure count. Ask:
> "Found N failure(s). Create a GitHub Issue and assign to @copilot? (y/n)"

### Step 3 — Create the issue

If the user confirms, run without `--dry-run`. Determine `ASSIGN_COPILOT`:
- If the user is on `main` or wants Copilot to auto-fix → `ASSIGN_COPILOT=true`
- Otherwise → `ASSIGN_COPILOT=false` (user will assign manually)

```bash
GITHUB_TOKEN=$(gh auth token) \
GITHUB_REPOSITORY=$(gh repo view --json nameWithOwner -q .nameWithOwner) \
GITHUB_RUN_ID=local-$(date +%Y%m%d%H%M%S) \
ASSIGN_COPILOT=false \
node scripts/self-heal.mjs --results test-results/merged-results.json
```

### Step 4 — Report result

Read `self-heal-summary.json` and report:
- Issue number and URL
- Whether Copilot was assigned
- If not assigned: remind the user to open the issue and click **"Assign to Copilot"**

---

## Notes

- The script is idempotent: re-running with the same `GITHUB_RUN_ID` skips duplicate issue creation.
- The consolidated issue body includes spec source, page-object source, error messages, and stack traces for every failing test — Copilot has full context to fix or write a bug report.
- Issues are labelled `self-heal` and `automated` for easy filtering.
- The CI pipeline (`e2e.yml`) runs this automatically after every failing test suite on `main`.
