# .playwright-mcp — Live App Reference

Captured via Playwright MCP browser exploration on **2026-07-16**.
This directory is the single source of truth for the live app's structure, selectors, routes, and states.
**Future agents should consume this reference without re-exploring the app.**

---

## App Identity

| Property      | Value                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| App Name      | OneStyle                                                                       |
| Base URL      | `https://sedigaplanit.github.io/AI-R-D---Github-copilot`                       |
| Page Title    | `E-Commerce App`                                                               |
| Currency      | LKR (Sri Lankan Rupee)                                                         |
| Auth Strategy | Storage state saved to `.auth/user.json` via `tests/auth.setup.ts`             |
| Credentials   | `process.env.USER_NAME` = `test@test.com`, `process.env.PASSWORD` = `Test@123` |

---

## Directory Structure

```
.playwright-mcp/
  README.md                       ← this file (index + overview)
  app-map.md / app-map.json       ← all routes, page transitions, auth state
  pages/
    01-landing.md / .json         ← Landing / Home page
    02-login.md / .json           ← Login page (form, error states)
    03-category.md / .json        ← Category pages (Women/Men/Kids — same structure)
    04-product.md / .json         ← Product detail page
    05-cart.md / .json            ← Cart page (with items, empty, guest)
    06-checkout-modal.md / .json  ← Checkout modal (Step 1 + Step 2 all 3 payment methods)
    07-profile.json               ← Profile page (edit name, gender, phone, address)
    08-orders.json                ← My Orders / Order History page
    09-wishlist.json              ← Wishlist page (empty state captured)
  flows/
    auth.json                     ← Login + logout flows
    shopping-e2e.json             ← Browse → product → cart → checkout
    negative-edge.json            ← Error states and edge cases
  snapshots/
    01-landing.png                ← Landing, unauthenticated, full page
    01-landing-authenticated.png  ← Landing, authenticated, viewport
    02-login.png                  ← Login form, empty
    02-login-error.png            ← Login form with "Invalid email or password."
    02-login-filled.png           ← Login form with credentials filled
    03-category-womens.png        ← Women's category page
    04-product-no-size.png        ← Product page, no size selected
    04-product-size-selected.png  ← Product page, size M selected
    04-product-no-size-error.png  ← Product page, "Select Size — required" error
    04-product-in-cart.png        ← Product page, item in cart (shows ✓ In Cart button)
    05-cart-with-items.png        ← Cart with 2 items
    05-cart-empty.png             ← Empty cart (Checkout button disabled)
    06-checkout-modal-step1.png       ← Checkout modal Step 1 (payment selection)
    06-checkout-modal-step2-card.png  ← Checkout modal Step 2: Credit/Debit Card
    06-checkout-modal-step2-card-fullpage.png ← Step 2 card form (full page)
    06-checkout-modal-step2-paypal.png ← Checkout modal Step 2: PayPal
    06-checkout-modal-step2-cod.png   ← Checkout modal Step 2: Cash on Delivery
    07-guest-cart.png             ← Cart, unauthenticated (Sign Up / Login prompt)
    08-profile.png                ← Profile / My Account page
    09-orders.png                 ← My Orders / Order History page
    10-wishlist-empty.png         ← Wishlist page (empty state)
```

---

## Quick Reference: Key Locators

| Element             | Locator                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Cart ready marker   | `getByRole('heading', { level: 1, name: 'Cart Totals' })`                                                    |
| Checkout modal open | `getByRole('heading', { level: 2, name: 'Checkout' })`                                                       |
| Auth success marker | `getByRole('button', { name: 'My Orders' })`                                                                 |
| Login error message | `getByText('Invalid email or password.')`                                                                    |
| Size required error | `getByRole('heading', { name: 'Select Size — required' })`                                                   |
| In Cart button      | `getByRole('button', { name: /In Cart.*View Cart/ })`                                                        |
| Checkout disabled   | `getByRole('button', { name: 'Proceed to Checkout' })[disabled]`                                             |
| Guest prompt        | `getByText('Sign in to proceed with checkout')`                                                              |
| Cart count          | CSS `.nav-cart-count` — **only rendered when count > 0**; use `locator.count()` check before `textContent()` |

---

## Critical Gotchas

1. **Size options on product page are `<div>` (generic), not `<button>`** — use `getByText('M', { exact: true })`, NOT `getByRole('button', { name: 'M' })` (which works on category pages but NOT product pages).

2. **Decrement button differs per context**:
   - Product page: `getByRole('button', { name: '−' })` (Unicode minus U+2212)
   - Cart page: `getByRole('button', { name: '-' })` (ASCII hyphen)

3. **Checkout modal URL stays `/cart`** — no route change when modal opens/closes.

4. **Checkout modal Step 2 may be below viewport** — may need scroll before clicking Back/Pay buttons.

5. **Price format**: `LKR 50` in cart headers; `LKR 50.00` (2 decimal places) in checkout modal.

6. **Auth redirect**: `/login` redirects to `/` if already authenticated. Direct navigation to `/login` after login goes to home.

7. **Guest cart is always empty** — cart data is not persisted for unauthenticated users; logging out clears cart counter to 0.

8. **Render.com backend cold-start**: product data is fetched from `onestyle-backend.onrender.com` (Render.com free tier). On a cold start, the API can take up to 30s to respond. The product detail section (size options, quantity control, `span.qty-value`) only renders **after** the API responds — waiting for the product `h1` heading alone is NOT a reliable page-ready signal. Use `span.qty-value` as the `init()` load landmark in `ProductPage` with `timeout: 30_000`.

---

## Known Bug

**BUG_CART_001**: Same product with different sizes may not appear as separate cart entries.
See: `bug-reports/BUG_CART_001_same-product-different-sizes-not-separate-cart-entries.md`
