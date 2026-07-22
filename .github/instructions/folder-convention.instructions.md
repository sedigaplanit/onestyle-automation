---
description: 'Canonical folder layout and test-tagging rules for all generated Playwright specs and page objects. Used by the Playwright Test Generator when deciding where to place new files and what tags to apply.'
applyTo: "tests/**/*.spec.ts, pages/**/*.ts"
---

# Folder Convention

Place all generated files in the folder that matches the feature area:

| Feature Area        | tests folder            | pages folder            |
| ------------------- | ----------------------- | ----------------------- |
| Landing / Home      | tests/landing/          | pages/landing/          |
| Login               | tests/login/            | pages/login/            |
| Sign Up             | tests/sign-up/          | pages/sign-up/          |
| Product Browsing    | tests/product-browsing/ | pages/product-browsing/ |
| Cart Management     | tests/cart/             | pages/cart/             |
| Checkout            | tests/checkout/         | pages/checkout/         |
| Wishlist            | tests/wishlist/         | pages/wishlist/         |
| Orders              | tests/orders/           | pages/orders/           |
| API Tests           | tests/api/              | _(no pages layer)_      |
| Navigation          | tests/navigation/       | pages/navigation/       |
| End-to-End Journeys | tests/e2e/              | pages/e2e/              |

---

## Test Tagging

All generated tests must carry tags for selective test runs. Apply type/domain tags at **describe** level; `@smoke` at **test** level only.

| Tag        | Scope                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `@api`     | All API test specs (`tests/api/`)                                                                 |
| `@ui`      | All UI/browser test specs                                                                         |
| `@smoke`   | Critical happy-path tests only                                                                    |
| `@system`  | System / health-check API tests                                                                   |
| _{domain}_ | Domain tag matching the feature area (`@checkout`, `@cart`, `@wishlist`, `@orders`, `@products`, `@auth`, `@reviews`, `@events`) |

```typescript
// UI spec
test.describe('{Feature} Tests', { tag: ['@ui', '@{domain}'] }, () => {
  test('happy-path scenario', { tag: '@smoke' }, async ({ open }) => { ... })
  test('edge-case scenario', async ({ open }) => { ... })
})

// API spec
test.describe('{Feature} API', { tag: ['@api', '@{domain}'] }, () => {
  test('GET endpoint returns 200', { tag: '@smoke' }, async ({ apiContext }) => { ... })
  test('returns 401 without token', async ({ request }) => { ... })
})
```

Run a subset: `npx playwright test --grep @smoke`
