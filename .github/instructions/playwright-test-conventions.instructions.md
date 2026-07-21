---
description: 'Use when writing Playwright spec files or page object classes for this project. Covers spec rules, page object patterns, timeout strategy, chain-breaking rules, and circular import handling.'
applyTo: "tests/**/*.spec.ts, pages/**/*.ts"
---

# Playwright Test Conventions

## Spec File Pattern

```typescript
import { test, expect } from '../fixtures'
import SomePage from '../../pages/feature/SomePage'

test.describe('<Feature> Tests', () => {
  test('<Exact TC title from manual test>', async ({ open }) => {
    const resultPage = await open(SomePage)
      .then((_) => _.someAction())
      .then((_) => _.navigateToNextPage())
    expect(await resultPage.someAssertion()).toBe(expectedValue)
  })
})
```

### Spec Rules

- Always wrap tests in `test.describe`.
- Import `{ test, expect }` from `'../fixtures'` — never from `@playwright/test`.
- Start every chain with the `open` fixture: `async ({ open }) => {}`. `open(PageClass)` ≡ `new PageClass(page).init()`.
- When `page.url()` assertions are needed: `async ({ open, page }) => {}`.
- Chain calls with `.then((_) => _.method())`. `await` only the final resolved value.
- Place `expect` after the chain — never inside it.
- **Never use locators directly in spec files.** All `page.getByRole(...)`, `page.locator(...)`, etc. belong inside page object methods.
- Auth required tests: do **not** add `test.use(...)` — auth is global via `playwright.config.ts`.
- Auth not required (login, sign-up): add `test.use({ storageState: { cookies: [], origins: [] } })` at `describe` level.
- Always use `process.env.VARIABLE_NAME` for credentials — never hardcode values.

---

## Timeout Strategy — STRICTLY ENFORCED

The global config sets: `timeout: 30_000` (test), `actionTimeout: 10_000` (per action), `navigationTimeout: 30_000` (navigation).

| Scenario                                                      | Rule                                                      |
| ------------------------------------------------------------- | --------------------------------------------------------- |
| Normal test on any environment                                | No timeout override — config defaults apply               |
| Test on remote/slow deployment (e.g. GitHub Pages cold start) | Add `test.slow()` inside the `test()` body with a comment |
| Never use `test.setTimeout()`                                 | Use `test.slow()` instead — it triples the config default |

```typescript
// ✅ CORRECT — self-documenting slow override
test('...', async ({ open }) => {
  // test.slow(): app is hosted on a remote server with cold-start latency; can exceed the 30s default
  test.slow()
  ...
})

// ❌ WRONG — magic number, not self-documenting
test.describe('...', () => {
  test.setTimeout(60000)
})
```

**Page object `waitFor` timeout rule:**

- `waitFor({ state: 'visible' })` — no explicit timeout; inherits `actionTimeout` (10s) → fails fast automatically.
- Only add an explicit `timeout` override when an element is known to render slowly. Always add a comment explaining why.

```typescript
// ✅ CORRECT — inherits actionTimeout, fails fast
await this.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })

// ✅ CORRECT — explicit override with justification
await this.page.getByRole('img').waitFor({ state: 'visible', timeout: 20_000 })
// ↑ This element loads asynchronously from a remote source; can exceed the 10s actionTimeout

// ❌ WRONG — arbitrary timeout with no comment
await this.page.getByRole('heading').waitFor({ state: 'visible', timeout: 15000 })
```

---

## When to Break the `.then()` Chain

Break the chain and hold a page reference whenever:

- The test must assert a **before state**, act, then assert an **after state** on the same page.
- A value must be **captured before an action** to compare in a later assertion.
- Multiple independent assertions on the same page are needed between actions.

```typescript
// ✅ Break chain — capture initial value before action
const listPage = await open(HomePage).then((_) => _.clickViewAll())
const initialCount = await listPage.getItemCount()
await listPage.clickAddItem().then((_) => _.confirmDialog())
expect(await listPage.getItemCount()).toBe(initialCount + 1)

// ✅ Keep chain — no intermediate assertion needed
const detailPage = await open(HomePage)
  .then((_) => _.fillSearchQuery('keyword'))
  .then((_) => _.clickSearch())
  .then((_) => _.clickFirstResult())
expect(await detailPage.getTitle()).toBeTruthy()
```

**Same-page actions within a broken chain:**

- **Sequential `await`** — when an assertion must happen between two actions.
- **`.then()` mini-chain** — when two or more same-page actions have no assertion between them.

```typescript
// ✅ Sequential await — assertion between actions
await formPage.clickIncrement()
expect(await formPage.getCounterValue()).toBe('2')
await formPage.fillNotes('optional text')

// ✅ .then() mini-chain — no assertion between actions
await formPage.selectOption('value').then((_) => _.clickSubmit())
```

---

## Page Object Pattern

```typescript
import BasePage from '@pages/BasePage'
import NextPage from '@pages/feature/NextPage'

export default class SomePage extends BasePage {
  public async init(): Promise<this> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page.getByRole('heading', { name: 'Page Heading' }).waitFor({ state: 'visible' })
    return this
  }

  // Same-page action — returns this
  public async fillField(value: string): Promise<this> {
    await this.page.getByLabel('Field Label').fill(value)
    return this
  }

  // Navigation action — returns the next page
  public async clickContinue(): Promise<NextPage> {
    await this.page.getByRole('button', { name: 'Continue' }).click()
    return new NextPage(this.page).init()
  }

  // Assertion helper — raw value only, never expect()
  public async isConfirmationVisible(): Promise<boolean> {
    return this.page.getByRole('alert').isVisible()
  }
}
```

### Page Object Rules

- Every class extends `BasePage` and implements `async init(): Promise<this>`.
- `init()` must wait for a reliable landmark (heading, unique element) to confirm the page is loaded.
- Same-page methods return `Promise<this>`.
- Navigation methods return `Promise<NewPage>` and call `new NewPage(this.page).init()`.
- Assertion helpers return raw values (`boolean`, `string`, `number`) — never call `expect()`.
- Imports within `pages/`: use `@pages/{feature-folder}/{PageName}` alias.
- Imports in spec files: use `../../pages/{feature-folder}/{PageName}` (two levels up from `tests/{feature}/`).
- `BasePage` is always imported as `@pages/BasePage`.
- Do **not** modify `BasePage.ts` unless adding a utility needed by every single page.

### `page.goto()` Rule — STRICTLY ENFORCED

`page.goto()` is permitted in **one place only**: the application entry-point page (e.g. `HomePage.init()`).
All other navigation must happen through UI interactions (clicking links, buttons, icons).

```typescript
// ✅ CORRECT — navigate via UI
public async clickSettings(): Promise<SettingsPage> {
  await this.page.getByRole('link', { name: 'Settings' }).click()
  return new SettingsPage(this.page).init()
}

// ❌ WRONG — goto() outside the entry-point page
public async navigateToSettings(): Promise<SettingsPage> {
  await this.page.goto('/settings')
  return new SettingsPage(this.page).init()
}
```

> **Why:** `page.goto()` with a `/` path ignores the `baseURL` subpath, producing 404s when the app is deployed under a subpath (e.g. GitHub Pages, sub-directory deployments). UI navigation avoids this and mirrors real user behaviour.

### Disambiguation Rule

When two elements share the same label, placeholder, or role name, always use `{ exact: true }`:

```typescript
// ✅ CORRECT
await this.page.getByPlaceholder('Password', { exact: true }).fill(value)
await this.page.getByPlaceholder('Confirm Password', { exact: true }).fill(value)

// ❌ WRONG — 'Password' matches both fields
await this.page.getByPlaceholder('Password').fill(value)
```

### Reusability Rule

When the same method (same locator logic, same return type) is needed by two or more page objects sharing a parent, add it to the parent. Never duplicate across sibling classes.

### Circular Import Rule — CRITICAL

When page A navigates to page B and page B also navigates to page A, use `import type` at the top and a dynamic `import()` inside the method body:

```typescript
// ✅ CORRECT
import type LandingPage from '@pages/landing/LandingPage'

export default class LoginPage extends BasePage {
  public async clickLogin(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Login' }).last().click()
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}

// ❌ WRONG — static circular import causes runtime errors
import LandingPage from '@pages/landing/LandingPage'
```

Always use the `@pages/` alias in dynamic imports — never relative paths. Mixing both creates two separate module instances.

---

## Character Rule — STRICTLY ENFORCED

**Emojis and special Unicode symbols are strictly prohibited** in all spec files and page object files — including test titles, method names, comments, and locator strings.

| Prohibited | Use instead |
| --- | --- |
| Emoji in locator strings (`💳`, `🅿️`, `💵`, etc.) | `getByText` substring match or `filter({ hasText })` — emoji labels in the app UI are matched via substring |
| Unicode symbols as `getByRole` name (`✕`, `←`) | CSS class selectors (`.checkout-close`, `.checkout-cancel-btn`) |
| Emoji or symbols in test titles | Plain English only |
| Emoji or symbols in comments | Plain English only |

```typescript
// ✅ CORRECT — substring match eliminates emoji from code
await this.page.getByText('Credit / Debit Card').click()
await this.page.locator('.checkout-close').click()
expect(await modal.isCardStep2Visible()).toBe(true)

// ❌ WRONG — emoji / symbol in code
await this.page.getByText('💳Credit / Debit Card').click()
await this.page.getByRole('button', { name: '✕' }).click()
```

> **Why:** Emoji and Unicode symbols in source code cause encoding inconsistencies across editors, OS clipboard tools, and CI log renderers. They make grep/search unreliable and break automated linting pipelines that enforce ASCII-safe identifiers.
