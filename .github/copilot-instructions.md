# GitHub Copilot Instructions — AI RnD Automation Suite

## Purpose

Generate Playwright test scripts from manual test steps. When given manual steps, convert them into
spec files and page object methods following the conventions in this project exactly.

---

## Project Structure

```
pages/        # Page Object classes (one file per page/section)
tests/        # Spec files (one file per feature area)
```

---

## Test Script Format

Use the cart test as the canonical reference for all new tests:

```typescript
import { test, expect } from '@playwright/test'
import SomePage from '../pages/SomePage'

test.describe('<Feature> Tests', () => {
  test('<Description of what is being verified>', async ({ page }) => {
    const resultPage = await new SomePage(page)
      .init()
      .then((_) => _.someAction())
      .then((_) => _.anotherAction('value'))
      .then((_) => _.navigateToNextPage())
    expect(await resultPage.someAssertion()).toBe(expectedValue)
  })
})
```

### Rules

- Always use `test.describe` to group related tests.
- Chain page object calls with `.then((_) => _.method())` — never `await` individual steps inline.
- `await` only the final resolved value of the full chain.
- Place the `expect` assertion(s) after the chain, never inside it.
- Import page objects using relative paths (`../pages/PageName`).
- For tests that require authentication, do **not** add `test.use(...)` — auth storage state is applied
  globally via `playwright.config.ts`. For tests that must run **without** auth (e.g. login tests),
  add `test.use({ storageState: { cookies: [], origins: [] } })` at the top of the describe block.
- Use `process.env.VARIABLE_NAME` for any credentials or environment-specific values; never hardcode them.

---

## Page Object Conventions

### Class structure

```typescript
import BasePage from '@pages/BasePage'
import NextPage from '@pages/NextPage'

export default class SomePage extends BasePage {
  // Always implement init() — wait for a reliable element that confirms the page is loaded
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { name: 'Page Title' })
      .waitFor({ state: 'visible', timeout: 5000 })
    return this
  }

  // Action that stays on the same page — return Promise<this> for chaining
  public async fillField(value: string): Promise<this> {
    await this.page.getByLabel('Field Label').fill(value)
    return this
  }

  // Navigation action — return Promise<NextPage>
  public async clickContinue(): Promise<NextPage> {
    await this.page.getByRole('button', { name: 'Continue' }).click()
    return new NextPage(this.page).init()
  }

  // Assertion helper — return the value, never call expect() inside a page object
  public async isConfirmationVisible(): Promise<boolean> {
    return this.page.getByRole('alert').isVisible()
  }
}
```

### Rules

- Every class must extend `BasePage` and implement `async init(): Promise<this>`.
- Methods that stay on the same page return `Promise<this>`.
- Methods that navigate to a new page return `Promise<NewPage>` and call `new NewPage(this.page).init()`.
- Assertion helper methods return the raw value (`boolean`, `string`, `number`); never call `expect()`
  inside a page object.
- Use `@pages/PageName` path alias for imports **within** the `pages/` folder.

### Circular Import Rule — CRITICAL

Page objects frequently navigate back to pages that also import them, creating circular static imports.
This causes Playwright's module loader to provide a partially-initialised class, so methods added later
in the file are silently missing at runtime (e.g. `TypeError: _.someMethod is not a function`).

**Rule**: If page A navigates to page B, and page B also navigates back to page A, use a
**dynamic import inside the method body** for the return type instead of a static import at the top of
the file. Use `import type` at the top for the TypeScript return-type annotation only.

```typescript
// ✅ CORRECT — dynamic import breaks the circular static chain
import type LandingPage from '@pages/LandingPage' // type only — erased at runtime

export default class LoginPage extends BasePage {
  public async clickLogin(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Login' }).last().click()
    const { default: LandingPageClass } = await import('@pages/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}

// ❌ WRONG — static import creates circular dependency; navigateToX methods will be missing at runtime
import LandingPage from '@pages/LandingPage'

export default class LoginPage extends BasePage {
  public async clickLogin(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Login' }).last().click()
    return new LandingPage(this.page).init() // LandingPage may be partially initialised
  }
}
```

**When to apply this rule**: whenever two page objects navigate to each other (A→B and B→A). Always use
`import type` + dynamic `import('@pages/...')` for the page that would close the cycle.

**Dynamic import path**: always use the `@pages/` alias (e.g. `import('@pages/LandingPage')`), never
a relative path (e.g. `import('./LandingPage')`). Mixing alias and relative paths for the same file
creates two separate module instances in Playwright's loader.

---

## Locator Priority

Use locators in this order of preference:

1. `getByRole(role, { name })` — preferred for buttons, links, headings, inputs with accessible names
2. `getByLabel(labelText)` — preferred for form fields associated with a `<label>`
3. `getByPlaceholder(text)` — for inputs with placeholder text but no label
4. `getByText(text)` — for non-interactive text content
5. `locator('css')` / `locator('xpath')` — only when semantic locators are not viable
6. `locator('[data-testid="..."]`)` — acceptable if test IDs are already present in the app

Never use positional CSS selectors (`:nth-child`, index-based) as the primary locator strategy.

---

## Converting Manual Test Steps → Code

When manual steps are provided, map each step to a page object method call in the chain:

| Manual step                        | Code pattern                                         |
| ---------------------------------- | ---------------------------------------------------- |
| Navigate to / open the app         | `new LandingPage(page).init()`                       |
| Click a navigation link            | `.navigateToSection()` on current page               |
| Select / click a specific item     | `.selectItemByName('Name')`                          |
| Fill in a field                    | `.fillFieldName('value')`                            |
| Click a button                     | `.clickButtonName()`                                 |
| Assert something is visible / true | `expect(await page.isSomethingVisible()).toBe(true)` |

Group related manual steps into a single page object method when they logically belong together
(e.g. filling a form is one method, not one method per field, unless the test needs to assert
after each field).

---

## Adding New Page Objects

1. Create `pages/NewPage.ts` extending `BasePage`.
2. Implement `init()` with a `waitFor` on a reliable landmark element.
3. Add methods following the conventions above.
4. Export as `export default class NewPage`.
5. Import in the spec using `import NewPage from '../pages/NewPage'`.

Do **not** modify `BasePage.ts` unless adding shared utility methods that every page will use.

# Note: While returning LandingPage from pageClasses, don't include .init() in the return statement. The init() method should be called in the test spec after the page object is returned.
