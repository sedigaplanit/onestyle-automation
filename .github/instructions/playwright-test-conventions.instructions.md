---
description: 'Use when writing Playwright spec files or page object classes for this project. Covers spec rules, page object patterns, timeout strategy, chain-breaking rules, circular import handling, and interaction patterns for any web app.'
applyTo: "tests/**/*.spec.ts, pages/**/*.ts"
---

# Playwright Test Conventions

## Spec File Pattern

```typescript
import { test, expect } from '../fixtures'
import SomePage from '@pages/feature/SomePage'

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

## Polling Assertions — `expect.poll()` Rule

Use `expect.poll()` when asserting UI state that loads **asynchronously after a page navigation or API-triggered update**. This covers cases where the React app fetches data from the server after mounting and the DOM may not reflect the final state immediately.

| Scenario | Rule |
| --- | --- |
| Asserting a value that appears synchronously (element already stable) | Plain `expect(await page.someAssertion()).toBe(...)` |
| Asserting a value that loads asynchronously (API fetch happens after page mount) | `expect.poll()` with `timeout` and `message` |

```typescript
// ✅ CORRECT — polling for async state after API-triggered update
await expect
  .poll(async () => await wishlistPage.isWishlistEmpty(), {
    timeout: 5_000,
    intervals: [500],
    message: 'Waiting for wishlist to reflect seeded item',
  })
  .toBe(false)

// ✅ CORRECT — polling after navigation where cart data loads from API
await expect
  .poll(async () => await cartPage.getCartItemCount(), {
    timeout: 5_000,
    intervals: [500],
    message: 'Waiting for cart count to reflect seeded item',
  })
  .toBeGreaterThan(0)

// ❌ WRONG — plain expect on async-loaded state (may read before data arrives)
expect(await wishlistPage.isWishlistEmpty()).toBe(false)
```

**When NOT to use `expect.poll()`:**
- Element visibility/presence — use `waitFor({ state: 'visible' })` in the page object instead.
- Transitions triggered by a user action the test just performed — the action already waits; plain `expect` is fine.
- Any value that is guaranteed stable by the time `init()` returns.

**`expect.poll()` parameters:**
- `timeout` — maximum wait in milliseconds. Match or align with the section's `test.slow()` multiplier.
- `intervals` — polling frequency in ms. `[500]` (every 500 ms) is the default for this project.
- `message` — required; explains what state is being awaited. Always include.

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
- Imports in spec files: use `@pages/{feature-folder}/{PageName}` alias — same as within `pages/`.
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

---

## Interaction Patterns — Domain-Agnostic Reference

Use these patterns in page object methods for interactions not covered by the basic `click()` / `fill()` idioms.

### Keyboard Navigation

```typescript
// Press a single key
await this.page.keyboard.press('Escape')
await this.page.keyboard.press('Tab')
await this.page.keyboard.press('ArrowDown')

// Key combination
await this.page.keyboard.press('Control+A')

// Tab into a field and type without click
await this.page.getByLabel('Search').focus()
await this.page.keyboard.type('query text')
```

### Hover (tooltips, hover menus)

```typescript
// Hover to reveal a tooltip or dropdown
await this.page.getByRole('button', { name: 'More options' }).hover()
// Then interact with the revealed element
await this.page.getByRole('menuitem', { name: 'Delete' }).click()
```

Page object method pattern — hover is an intermediate step, not a final state:

```typescript
public async clickDeleteViaHoverMenu(): Promise<this> {
  await this.page.getByRole('button', { name: 'More options' }).hover()
  await this.page.getByRole('menuitem', { name: 'Delete' }).click()
  return this
}
```

### Double-click

```typescript
// Double-click to enter inline edit mode
await this.page.getByText('Item label').dblclick()
```

### Scroll to Element

```typescript
// Scroll until an element is in the viewport before interacting
await this.page.getByRole('button', { name: 'Load More' }).scrollIntoViewIfNeeded()
await this.page.getByRole('button', { name: 'Load More' }).click()
```

### Drag and Drop

```typescript
// Playwright built-in drag-and-drop (works for HTML5 native drag)
await this.page.getByText('Draggable item').dragTo(this.page.getByText('Drop zone'))

// Manual drag for custom JS drag libraries (react-dnd, Sortable, etc.)
const source = this.page.getByTestId('card-1')
const target = this.page.getByTestId('card-3')
await source.hover()
await this.page.mouse.down()
const targetBox = await target.boundingBox()
if (targetBox) {
  await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 })
}
await this.page.mouse.up()
```

### File Upload

```typescript
// Standard <input type="file"> — set files directly (no OS dialog)
await this.page.getByLabel('Upload file').setInputFiles('path/to/file.pdf')

// Multiple files
await this.page.getByLabel('Upload files').setInputFiles(['file1.pdf', 'file2.jpg'])

// Clear a file input
await this.page.getByLabel('Upload file').setInputFiles([])
```

### Select / Dropdown

```typescript
// Native <select> element
await this.page.getByLabel('Country').selectOption('United Kingdom')
await this.page.getByLabel('Country').selectOption({ value: 'GB' })

// Custom dropdown (click-to-open pattern)
await this.page.getByRole('combobox', { name: 'Category' }).click()
await this.page.getByRole('option', { name: 'Electronics' }).click()

// Multi-select
await this.page.getByLabel('Tags').selectOption(['tag-1', 'tag-2'])
```

### Browser Dialogs (alert / confirm / prompt)

```typescript
// Handle a window.alert() or window.confirm() — register BEFORE the action that triggers it
this.page.once('dialog', (dialog) => dialog.accept())
await this.page.getByRole('button', { name: 'Delete account' }).click()

// Dismiss (Cancel) a confirm dialog
this.page.once('dialog', (dialog) => dialog.dismiss())
await this.page.getByRole('button', { name: 'Delete account' }).click()

// Accept a prompt with a value
this.page.once('dialog', (dialog) => dialog.accept('My input'))
await this.page.getByRole('button', { name: 'Rename' }).click()
```

### Multi-tab / New Window

```typescript
// Wait for a new page/tab to open and return a page object for it
public async clickOpenInNewTab(): Promise<OtherPage> {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.page.getByRole('link', { name: 'Open in new tab' }).click(),
  ])
  await newPage.waitForLoadState()
  return new OtherPage(newPage).init()
}
```

### Accessibility Assertions

```typescript
// Assert element is visible and focusable
await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible()
await expect(this.page.getByRole('button', { name: 'Submit' })).toBeEnabled()

// Assert ARIA attributes
await expect(this.page.getByRole('checkbox', { name: 'Remember me' })).toBeChecked()
await expect(this.page.getByRole('alert')).toHaveText('Error: field required')

// Assert focus is on a specific element after keyboard navigation
await this.page.keyboard.press('Tab')
await expect(this.page.getByRole('button', { name: 'Next' })).toBeFocused()
```

### Visual / CSS State Verification

```typescript
// Assert a CSS class is applied (for active state, selected state, error state)
await expect(this.page.getByRole('tab', { name: 'Reviews' })).toHaveClass(/active/)

// Assert an attribute value
await expect(this.page.getByRole('button', { name: 'Proceed' })).toHaveAttribute('disabled')
await expect(this.page.getByRole('img', { name: 'Product thumbnail' })).toHaveAttribute('src', /product_\d+/)
```
