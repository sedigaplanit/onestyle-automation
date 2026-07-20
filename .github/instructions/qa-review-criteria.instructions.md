---
description: "Use when reviewing generated test artifacts. Defines pass/fail criteria for TC file reviews and Playwright code reviews. Referenced by the qa-reviewer agent."
---

# QA Review Criteria

## Mode Detection

Determine the review mode from the attached file:

| Attached file | Review mode |
|---|---|
| Filename matches `TC_*.md` or path starts with `manual-tests/` | **TC Review** |
| Extension is `.spec.ts` or file is in `pages/` | **Code Review** |

---

## TC Review Mode

Run all checks against the attached TC file. For traceability checks, the user story must also be attached — if it is not, mark traceability checks as ⚠️ (cannot verify).

### Completeness — all sections must be present and non-empty

- [ ] `### Test Case ID` — format `TC_{PREFIX}_{NNN}`
- [ ] `### Test Case Title` — short, descriptive, no placeholder text
- [ ] `### Feature Area` — matches a known feature domain
- [ ] `### Priority` — one of: High / Medium / Low
- [ ] `### Preconditions` — includes `Navigate to $BASE_URL`; at least one concrete state condition
- [ ] `### Test Steps` — numbered; uses exact UI labels, button text, field names
- [ ] `### Expected Result` — numbered; one result per step plus an overall summary statement
- [ ] `### Notes and Assumptions` — includes `Tags: Regression`
- [ ] `### Defect Opportunity` — non-empty; identifies at least one failure point

### Credential Hygiene

- [ ] No literal URL values — must use `$BASE_URL`
- [ ] No literal email or password values — must use `$USER_NAME` / `$PASSWORD`

### AC Traceability (requires user story)

- [ ] Every test step can be traced back to at least one acceptance criterion in the user story
- [ ] No scenario invented beyond what the acceptance criteria explicitly state

### Regression Suitability

- [ ] Expected Result is specific and verifiable — not vague ("page looks correct", "it works")
- [ ] Steps are deterministic — same steps always produce the same outcome
- [ ] No dependency on manually pre-configured data or timing

### File Naming

- [ ] Correct subfolder: `manual-tests/{feature-folder}/`
- [ ] Filename pattern: `TC_{PREFIX}_{NNN}_{short-description}.md` (lowercase kebab-case description)

---

## Code Review Mode

Run all checks against the attached `.spec.ts` and/or `pages/*.ts` files.

### Spec File Rules

- [ ] All tests wrapped in `test.describe`
- [ ] Imports `{ test, expect }` from `'../fixtures'` — never from `@playwright/test`
- [ ] No locators (`page.getByRole`, `page.locator`, etc.) used directly in the spec file
- [ ] No hardcoded credential values — `process.env.VARIABLE_NAME` only
- [ ] Every `test.slow()` call has an explanatory comment on the line above or same line
- [ ] Auth-required tests do not add `test.use(storageState)` at describe level

### Page Object Rules

- [ ] Class extends `BasePage` and implements `async init(): Promise<this>`
- [ ] `init()` waits for a reliable landmark element before returning
- [ ] Same-page action methods return `Promise<this>`
- [ ] Navigation methods return `Promise<NewPage>` and call `new NewPage(this.page).init()`
- [ ] No `expect()` calls inside any page object method — raw values returned only
- [ ] All imports within `pages/` use the `@pages/` alias — no relative paths
- [ ] Circular imports use `import type` at top + dynamic `import()` inside method — no static circular imports
- [ ] Dynamic imports use the `@pages/` alias — never a relative path

### Locator Priority

- [ ] `getByRole` used as the first choice before fallbacks
- [ ] Fallback order respected: `getByLabel` → `getByPlaceholder` → `getByText` → `locator('css')`
- [ ] CSS attribute selectors used only when semantic locators are not viable
- [ ] No positional selectors (`:nth-child`, index-based) as primary strategy
- [ ] When two elements share a name or label, `{ exact: true }` is used

### TypeScript / Lint

- [ ] No TypeScript errors in `read/problems` for the reviewed file
- [ ] No ESLint errors in `read/problems` for the reviewed file

---

## Report Format

Produce one report per reviewed file using this exact structure:

```
{filename} — {TC Review | Code Review}
─────────────────────────────────────────
✅ {criterion label}
⚠️  {criterion label} — {specific detail}
❌ {criterion label} — {specific detail with section/line reference}

Summary: {N} issue(s) — {X} failure(s), {Y} warning(s)
Recommended action: {Fix and re-review | No action needed — all checks passed}
```

Every ⚠️ and ❌ entry must include a specific detail: which section or line, and a one-sentence explanation of what is wrong or missing.
