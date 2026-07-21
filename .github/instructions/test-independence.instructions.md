---
description: 'Use when writing or refactoring Playwright tests to be independent and parallel-safe. Covers test isolation rules, shared-state anti-patterns, API seeding, per-test teardown, and worker safety.'
applyTo: "tests/**/*.spec.ts"
---

# Test Independence Rules

Every test must be fully self-contained and produce the same result regardless of execution order, number of workers, or which other tests are running concurrently.

---

## Core Principle

> A test that relies on state set by another test, or that modifies shared state without restoring it, is not independent.

---

## Rule 1 — Each test owns its setup and teardown

Every test that needs a particular state must create that state itself (in `beforeEach` or at the top of the test body) and clean it up afterwards.

```typescript
// ✅ CORRECT — test seeds its own state
test.beforeEach(async ({ apiContext }) => {
  const cart = new CartDataProvider(apiContext.cart)
  await cart.clearCart()
  await cart.seedCart({ [PRODUCT_ID]: 1 })
})

// ❌ WRONG — test relies on a previous test having seeded the cart
test('checkout modal opens', async ({ open }) => {
  // assumes a previous test left items in the cart
  const modal = await open(CartPage).then((_) => _.clickProceedToCheckout())
})
```

---

## Rule 2 — Always clear before seeding

Before seeding any shared resource (cart, wishlist, orders), always clear it first. This removes state from any previously interrupted run and makes setup deterministic.

```typescript
// ✅ CORRECT — clear first, then seed
await cart.clearCart()
await cart.seedCart({ [PRODUCT_ID]: 1 })

// ❌ WRONG — seeding on top of unknown existing state
await cart.seedCart({ [PRODUCT_ID]: 1 })
```

---

## Rule 3 — Restore state after mutation

If a test changes shared state (places an order, empties the cart, modifies the wishlist), ensure the state is restored via `afterEach` so subsequent tests start clean.

```typescript
test.afterEach(async ({ apiContext }) => {
  const cart = new CartDataProvider(apiContext.cart)
  const wishlist = new WishlistDataProvider(apiContext.wishlist)
  await Promise.all([cart.clearCart(), wishlist.clearWishlist()])
})
```

For order-placement tests the order cannot be deleted, but the cart state it consumed must still be restored:

```typescript
test.afterEach(async ({ apiContext }) => {
  await new CartDataProvider(apiContext.cart).clearCart()
})
```

---

## Rule 4 — Never share mutable state between tests via module-level variables

Module-level variables are shared across tests **in the same worker**. Only use them for read-only constants.

```typescript
// ✅ CORRECT — read-only constant
const SEED_PRODUCT_ID = 1

// ❌ WRONG — mutable state shared across tests
let seededOrderId: string

test('places order', async ({ open }) => {
  seededOrderId = await placeOrder()  // sets for next test — fragile
})

test('cancels order', async ({ open }) => {
  await cancelOrder(seededOrderId)    // depends on previous test
})
```

---

## Rule 5 — Do not rely on test execution order

Playwright does **not** guarantee test execution order across workers. Write tests so they pass whether run first, last, or in isolation.

```typescript
// ✅ CORRECT — test is self-sufficient regardless of order
test('wishlist shows added item', async ({ apiContext, open }) => {
  await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  await new WishlistDataProvider(apiContext.wishlist).ensureInWishlist(PRODUCT_ID)
  const page = await open(WishlistPage)
  expect(await page.isWishlistEmpty()).toBe(false)
})
```

---

## Rule 6 — Scope `beforeEach` / `afterEach` to their describe block

Hooks outside a `describe` block run for **all** tests in the file, including tests that don't need that state. Scope all hooks to the narrowest applicable `describe`.

```typescript
// ✅ CORRECT — hook scoped to the describe that needs it
test.describe('Checkout Tests', { tag: ['@ui', '@checkout'] }, () => {
  test.beforeEach(async ({ apiContext }) => {
    await new CartDataProvider(apiContext.cart).clearCart()
    await new CartDataProvider(apiContext.cart).seedCart({ [PRODUCT_ID]: 1 })
  })

  test('...', async ({ open }) => { ... })
})

test.describe('Wishlist Tests', { tag: ['@ui', '@wishlist'] }, () => {
  // separate beforeEach — does not interfere with checkout
  test.beforeEach(async ({ apiContext }) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  })

  test('...', async ({ open }) => { ... })
})
```

---

## Rule 7 — Unauthenticated tests must be in a separate describe block

Tests that intentionally run without authentication use `test.use({ storageState: { cookies: [], origins: [] } })`. This must be applied at `describe` level and never mixed with authenticated tests.

```typescript
// ✅ CORRECT — isolated in its own describe
test.describe('Checkout Tests — Unauthenticated', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('unauthenticated user sees sign-in prompt', async ({ open }) => { ... })
})
```

---

## Rule 8 — API tests must not depend on UI test state

API tests (`tests/api/`) and UI tests (`tests/checkout/`, `tests/cart/`, etc.) run in the same worker and share the same user account. An API test must set up its own prerequisites via data providers and must not assume a previous UI test left items in the cart or wishlist.

```typescript
// ✅ CORRECT — API test seeds its own data
test.beforeEach(async ({ apiContext }) => {
  const product = await new ProductDataProvider(apiContext.products).getFirstProduct()
  productId = product.id
  await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
})
```

---

## Worker Safety Summary

| Situation | Rule |
|---|---|
| Tests share the same user account | Default config (`workers: undefined`) runs parallel files; each file must use `test.describe.configure({ mode: 'serial' })` for state-mutating tests |
| Zero cross-file interference needed | Run with `--workers=1` (e.g. `npx playwright test --workers=1`) |
| Multiple workers needed | Each worker must have its own isolated user account via `storageState` per project/worker |
| Test mutates cart / wishlist | Add `afterEach` to restore clean state |
| Test places an order | Clear cart in `afterEach`; orders cannot be rolled back |
| Read-only assertions only | Safe to run in parallel; no teardown needed |

The `playwright.config.ts` leaves `workers` at the Playwright default (half the CPU core count). All state-mutating spec files use `test.describe.configure({ mode: 'serial' })` so tests within each file run sequentially. To guarantee zero cross-file interference with a single user account, use `--workers=1` — do not remove the `mode: 'serial'` constraint.
