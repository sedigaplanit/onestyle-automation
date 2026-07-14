# GitHub Copilot Instructions — AI RnD Automation Suite

## Project Structure

```
pages/        # Page Object classes — one file per page/section
tests/        # Spec files — one file per feature area
tests/fixtures.ts  # Custom Playwright fixture — exports test, expect, and the open factory
manual-tests/ # Markdown files describing manual test steps
```

## Naming Conventions

- **Page objects**: PascalCase, suffix `Page` (e.g. `CartPage.ts`, `LandingPage.ts`)
- **Spec files**: PascalCase, suffix `Tests.spec.ts` (e.g. `CartTests.spec.ts`)
- **Page object methods**: camelCase, verb-first (e.g. `clickCheckout()`, `fillEmail()`, `isConfirmationVisible()`)
- **Path alias**: use `@pages/PageName` for imports **within** the `pages/` folder; use relative `../../pages/PageName` in spec files (two levels up from `tests/{feature-folder}/`); import `{ test, expect }` from `'../fixtures'` — never from `@playwright/test` directly

## Key Rules

- Every page object class must extend `BasePage` and implement `async init(): Promise<this>`.
- Do **not** modify `BasePage.ts` unless adding a shared utility every page needs.
- Use `process.env.VARIABLE_NAME` for credentials; never hardcode them.
- Never call `expect()` inside a page object — return raw values only.
- Always import `{ test, expect }` from `'../fixtures'`, not from `@playwright/test`. The `open` fixture (`async ({ open }) => {}`) is the standard way to start a chain: `open(LandingPage)` is equivalent to `new LandingPage(page).init()`.
- Auth storage state is applied globally via `playwright.config.ts`; do not add `test.use(storageState)` unless the test must run **without** auth.
- For circular page-object imports (A→B and B→A), use `import type` at the top and a dynamic `import('@pages/...')` inside the method body. Never use relative paths for dynamic imports.

## Locator Priority

1. `getByRole(role, { name })`
2. `getByLabel(labelText)`
3. `getByPlaceholder(text)`
4. `getByText(text)`
5. `locator('css')` / `locator('xpath')` — only when semantic locators are not viable
6. `locator('[data-testid="..."]')` — acceptable if test IDs are already present

Never use positional CSS selectors (`:nth-child`, index-based) as the primary strategy.
