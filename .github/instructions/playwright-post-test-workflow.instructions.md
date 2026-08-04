---
description: 'Use when running or debugging Playwright tests after generating or updating automation code. Covers the run command, fix loop, and bug reporting.'
---

# Post-Test Workflow

After every new or updated test is written, run it immediately.

## Step 1 — Run the Test

Start with the specific test that was just changed or is being debugged.

```
npx playwright test tests/{feature-folder}/{SpecFile}.spec.ts --reporter=list --bail=1 --grep "exact test title"
```

If the test title is not yet known, run the whole spec file once:

```
npx playwright test tests/{feature-folder}/{SpecFile}.spec.ts --reporter=list --bail=1
```

`--bail=1` stops the run after the first failure, keeping turnaround time short.

## Step 2 — On Pass

Report success and stop.

## Step 3 — On Failure: Fix Loop (max 3 attempts)

Re-run **only the failing test** using `--grep`. Never re-run the full spec file or the entire suite during a fix loop — already-passing tests must not be executed again during a fix loop.

```
npx playwright test tests/{feature-folder}/{SpecFile}.spec.ts --reporter=list --bail=1 --grep "exact failing test title"
```

Use the exact test title string from the failure output, quoted precisely.

**Classify the failure:**

- **Automation issue** (wrong locator, timing, assertion logic): fix the page object or spec. If the locator changed in the live app, apply the **Locator Update Rule** from the Playwright MCP Protocol — update the page object AND the `.playwright-mcp/` reference file.
- **Application bug** (app does not behave as the manual test describes): do not weaken assertions. Skip directly to Step 4.

## Step 4 — After 3 Failed Attempts or Confirmed App Bug

1. Create `bug-reports/` at the workspace root if it does not exist.
2. Before creating a new report, scan existing files in `bug-reports/` — if the same root cause is already documented, reference the existing report instead of creating a duplicate.
3. Create `bug-reports/BUG_{FEATURE}_{NNN}_{short-description}.md` with:
   - **Title**
   - **Severity** — choose one (see definitions below)
   - **Steps to Reproduce** — numbered, exact
   - **Expected Result**
   - **Actual Result**
   - **Affected Test** — spec file and test title
   - **Fix Attempts Summary** — what was tried and why it didn't work
4. Replace `test(...)` with `test.skip(...)` in the spec file and add a comment:

```typescript
// BUG: see bug-reports/BUG_FEATURE_NNN_short-description.md
test.skip('...original title...', async ({ open }) => { ... })
```

---

## Bug Severity Definitions

| Severity | Definition | Examples |
|---|---|---|
| **Critical** | Blocks a core user journey or causes data loss / security exposure | Login returns 500, payment charges without placing order, auth bypass, data corruption |
| **High** | A primary feature does not work as specified; no workaround exists | Order history doesn't load, checkout modal doesn't open, cart doesn't clear after order |
| **Medium** | A feature works but with wrong behaviour or missing UX element; workaround exists | Wishlist badge count is stale, sort order incorrect, empty state missing a button |
| **Low** | Minor cosmetic or wording issue; no functional impact | Label capitalisation wrong, icon missing, tooltip text incorrect |
