---
description: 'Use when running or debugging Playwright tests after generating or updating automation code. Covers the run command, fix loop, and bug reporting.'
---

# Post-Test Workflow

After every new or updated test is written, run it immediately.

## Step 1 — Run the Test

```
npx playwright test tests/{feature-folder}/{SpecFile}.spec.ts --reporter=list --bail=1
```

`--bail=1` stops the run after the first failure, keeping turnaround time short.

## Step 2 — On Pass

Report success and stop.

## Step 3 — On Failure: Fix Loop (max 3 attempts)

Re-run **only the failing test** using `--grep`. Never re-run the full spec file — already-passing tests must not be executed again during a fix loop.

```
npx playwright test tests/{feature-folder}/{SpecFile}.spec.ts --reporter=list --bail=1 --grep "exact failing test title"
```

Use the exact test title string from the failure output, quoted precisely.

**Classify the failure:**

- **Automation issue** (wrong locator, timing, assertion logic): fix the page object or spec. If the locator changed in the live app, apply the **Locator Update Rule** from the Playwright MCP Protocol — update the page object AND the `.playwright-mcp/` reference file.
- **Application bug** (app does not behave as the manual test describes): do not weaken assertions. Skip directly to Step 4.

## Step 4 — After 3 Failed Attempts or Confirmed App Bug

1. Create `bug-reports/` at the workspace root if it does not exist.
2. Create `bug-reports/BUG_{FEATURE}_{NNN}_{short-description}.md` with:
   - Title
   - Steps to Reproduce
   - Expected Result
   - Actual Result
   - Affected Test
   - Severity
   - Fix Attempts Summary
3. Replace `test(...)` with `test.skip(...)` in the spec file and add a comment:

```typescript
// BUG: see bug-reports/BUG_FEATURE_NNN_short-description.md
test.skip('...original title...', async ({ open }) => { ... })
```
