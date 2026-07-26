---
description: 'Canonical folder layout and test-tagging rules for all generated Playwright specs and page objects. Used by the Playwright Test Generator when deciding where to place new files and what tags to apply.'
applyTo: "tests/**/*.spec.ts, pages/**/*.ts"
---

# Folder Convention

## Folder Naming Pattern

Folder names are derived from the feature area name — always lowercase kebab-case. This rule applies when adapting this template to any domain or app:

```
Feature area name        → tests folder             → pages folder
───────────────────────────────────────────────────────────────────
Product Browsing         → tests/product-browsing/  → pages/product-browsing/
User Profile             → tests/user-profile/       → pages/user-profile/
Payment Gateway          → tests/payment-gateway/    → pages/payment-gateway/
Dashboard Analytics      → tests/dashboard-analytics/ → pages/dashboard-analytics/
```

**Rule:** Take the feature area name, lowercase it, replace spaces with hyphens. If two feature areas would map to the same folder, append a distinguishing word.

## Current App Feature Map

The following folders exist for this project. When adapting this template for a new app, replace this table with the new app's feature areas:

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

## Reserved Folders (always present, any app)

| Folder | Purpose |
|---|---|
| `tests/api/` | API-only specs — no pages layer |
| `tests/e2e/` | End-to-end journeys spanning multiple features |
| `tests/navigation/` | Cross-feature navigation and routing |

---

## Test Tagging

All generated tests must carry tags for selective test runs. Apply type/domain tags at **describe** level; `@smoke` at **test** level only.

### Fixed tags (always the same, any app)

| Tag | Scope |
|---|---|
| `@api` | All API test specs (`tests/api/`) |
| `@ui` | All UI/browser test specs |
| `@smoke` | Critical happy-path tests only — subset for fast CI validation |
| `@system` | System / health-check API tests |

### Domain tags (derive from feature area for your app)

Domain tags match the feature folder name. For this project:

`@checkout`, `@cart`, `@wishlist`, `@orders`, `@products`, `@auth`, `@reviews`, `@events`

**When adding a new feature area:** the domain tag is the lowercase, hyphen-free version of the folder name:
- `tests/user-profile/` → tag `@user-profile` (or `@profile` if shorter is unambiguous)
- `tests/payment-gateway/` → tag `@payment-gateway`

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
