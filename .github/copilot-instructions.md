# GitHub Copilot Instructions — AI RnD Automation Suite

## Project Structure

```
pages/          # Page Object classes — one file per page/section
tests/          # Spec files — one file per feature area
tests/fixtures.ts       # Custom Playwright fixture — exports test, expect, open, and apiContext
tests/api/      # API test specs — one file per API domain
api/            # API layer — clients, base class, schema types, fetch helpers
  types/
    capital.schema.ts   # Auto-generated from swagger.json — NEVER edit manually
  BaseApiClient.ts      # Base class — authorise(token), makeRequest()
  fetch-helpers.ts      # HTTP mechanics with retry logic
  {domain}/
    XxxApiClient.ts     # One client class per domain (Cart, Products, Orders, etc.)
  index.ts              # Barrel export for all clients and ApiPaths
dataprovider/   # State-setup helpers for tests — pure functions, one file per domain
  CartDataProvider.ts
  ProductDataProvider.ts
  WishlistDataProvider.ts
  OrdersDataProvider.ts
manual-tests/   # Markdown files describing manual test steps
scripts/
  generate-schemas.mjs  # Generates api/types/capital.schema.ts from swagger.json
swagger.json    # OpenAPI spec — source of truth for schema generation
```

Run `npm run generate:schemas` whenever `swagger.json` changes to regenerate `capital.schema.ts`.

## Naming Conventions

- **Page objects**: PascalCase, suffix `Page` (e.g. `CartPage.ts`, `LandingPage.ts`)
- **API clients**: PascalCase, suffix `ApiClient` (e.g. `CartApiClient.ts`)
- **Data providers**: PascalCase, suffix `DataProvider` (e.g. `CartDataProvider.ts`) — pure functions, no class
- **Spec files**: PascalCase, suffix `Tests.spec.ts` (e.g. `CartTests.spec.ts`, `CartApiTests.spec.ts`)
- **Page object methods**: camelCase, verb-first (e.g. `clickCheckout()`, `fillEmail()`, `isConfirmationVisible()`)
- **Path aliases**:
  - `@pages/{feature-folder}/{PageName}` — page object imports
  - `@api/{domain}/{FileName}` — API client imports
  - `@dataprovider/{FileName}` — data provider imports
  - Import `{ test, expect }` from `'../fixtures'` — never from `@playwright/test` directly

## Key Rules

- Every page object class must extend `BasePage` and implement `async init(): Promise<this>`.
- Do **not** modify `BasePage.ts` unless adding a shared utility every page needs.
- Use `process.env.VARIABLE_NAME` for credentials; never hardcode them.
- Never call `expect()` inside a page object — return raw values only.
- Always import `{ test, expect }` from `'../fixtures'`, not from `@playwright/test`. The `open` fixture (`async ({ open }) => {}`) is the standard way to start a chain: `open(LandingPage)` is equivalent to `new LandingPage(page).init()`.
- Auth storage state is applied globally via `playwright.config.ts`; do not add `test.use(storageState)` unless the test must run **without** auth.
- For circular page-object imports (A→B and B→A), use `import type` at the top and a dynamic `import('@pages/...')` inside the method body. Never use relative paths for dynamic imports.
- **API clients** (`XxxApiClient.ts`) are for making HTTP calls and returning typed responses — never call `expect()` inside them.
- **Data providers** (`dataprovider/XxxDataProvider.ts`) are pure state-setup helpers — they call API clients and do not return responses for assertion. Import them with `@dataprovider/XxxDataProvider`.
- Use `apiContext` fixture for all API calls in tests. It is pre-authenticated (JWT token acquired once per worker).
- **Before creating a new bug report** in `bug-reports/`, always read the existing files in that folder first. If the same root cause is already documented, do NOT create a duplicate — reference the existing report instead.

## UI Reference — `.playwright-mcp/`

`.playwright-mcp/` is the **single source of truth for the live app's UI structure**. Before fixing any locator or UI-related failure:

1. Read `.playwright-mcp/README.md` — key locators, critical gotchas, app identity.
2. Read the relevant page file in `.playwright-mcp/pages/` (e.g. `06-checkout-modal.json` for checkout issues).
3. Read `.playwright-mcp/app-map.json` if the fix involves navigation or routing.
4. If a locator in the page object doesn't match what `.playwright-mcp/pages/` says — **update the page object to match the reference**, not the other way around.
5. If you find the `.playwright-mcp/` reference is stale (element no longer exists in the live app):
   - Use the Playwright MCP browser tools (`browser_navigate`, `browser_snapshot`) to open the live app at `BASE_URL`, navigate to the affected page, and capture the current element structure.
   - **Update the `.playwright-mcp/pages/` file** with the new locators.
   - Then update the page object to match.
   - Include both the `.playwright-mcp/` update and the page object fix in your PR.
6. If `.playwright-mcp/pages/` has no file for the failing page, use `browser_navigate` + `browser_snapshot` to capture it and create the file before fixing the test.

## Test Tagging

All tests must carry tags for selective test runs:

| Tag                                                                                       | Scope                                                     |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `@api`                                                                                    | All API test specs (`tests/api/`)                         |
| `@ui`                                                                                     | All UI/browser test specs                                 |
| `@smoke`                                                                                  | Critical happy-path tests (subset for fast CI validation) |
| `@system`                                                                                 | System / health-check API tests                           |
| `@checkout`, `@cart`, `@auth`, `@products`, `@orders`, `@wishlist`, `@reviews`, `@events` | Domain-specific tags                                      |

Apply at **describe** level for domain/type tags, and at **test** level for `@smoke`:

```typescript
test.describe('Cart API', { tag: ['@api', '@cart'] }, () => {
  test('saves items successfully', { tag: '@smoke' }, async ({ apiContext }) => { ... })
  test('returns 401 without token', async ({ request }) => { ... })
})
```

Run a subset: `npx playwright test --grep @smoke`

## Locator Priority

1. `getByRole(role, { name })`
2. `getByLabel(labelText)`
3. `getByPlaceholder(text)`
4. `getByText(text)`
5. `locator('css')` / `locator('xpath')` — only when semantic locators are not viable
6. `locator('[data-testid="..."]')` — acceptable if test IDs are already present

Never use positional CSS selectors (`:nth-child`, index-based) as the primary strategy.
