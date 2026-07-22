# BUG_CHECKOUT_003 — Wishlist page does not re-fetch data from API on navigation

**Severity:** High
**Date:** 2026-07-21
**Affected Test:** `tests/checkout/CheckoutTests.spec.ts` — "Wishlisted item is removed from wishlist after it is purchased"
**Related:** BUG-002 (same root cause; cart was fixed, wishlist was not)

---

## Steps to Reproduce

1. Authenticate as `test@test.com`.
2. Call `POST /api/wishlist/1` — add product ID 1 to wishlist.
3. Verify via `GET /api/wishlist` → response includes `product_id: 1` ✓
4. Navigate the browser to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/wishlist`.

## Expected Result

The wishlist page shows 1 item (product ID 1). The "My Wishlist" heading (h1) is visible. The "Your wishlist is empty" heading (h2) is NOT visible.

## Actual Result

The wishlist page shows "Your wishlist is empty" immediately. The React app never issues a `GET /api/wishlist` network request on navigation. The page renders stale in-memory/context state (empty), ignoring the server state.

## Technical Evidence

A Playwright `waitForResponse` listener was attached **before** `page.goto('/wishlist')`:

```typescript
const wishlistResponseP = this.page
  .waitForResponse(
    (res) =>
      res.url().includes('/api/wishlist') &&
      res.request().method() === 'GET' &&
      res.status() === 200,
    { timeout: 10_000 }
  )
  .catch(() => null) // non-fatal

await this.page.goto(BASE_URL + '/wishlist')
await wishlistResponseP // resolves via .catch(null) after 10 s — NO request was made
```

The response promise resolved through `.catch(null)` (timeout), confirming the React app made **no `GET /api/wishlist` call** during the 10-second window after navigation.

## Root Cause

The wishlist page component initialises its data from React context set at app startup (`App.tsx` or equivalent). When the user navigates to `/wishlist`, the component does not issue a fresh `GET /api/wishlist` fetch. Any server-side changes made after the initial app load (e.g. via the API) are invisible to the UI until the full app is reloaded.

## Fix (Frontend)

Apply the same fix as BUG-002 (cart). In the Wishlist route component, trigger a re-fetch from the API on every mount:

```typescript
// In the Wishlist page component
useEffect(() => {
  fetchWishlistFromApi().then(setWishlistItems)
}, []) // runs on every mount — not just initial app load
```

If wishlist state lives in a top-level React context, move the fetch into the Wishlist route component's `useEffect`, or add a route-change listener that invalidates the wishlist cache whenever `/wishlist` is activated.

## Fix Attempts (Automation — exhausted)

| Attempt | Strategy                                                             | Outcome                                                                      |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1       | `waitForLoadState('networkidle')` after `Promise.race` heading wait  | Wishlist still empty — `networkidle` settled before the (non-existent) fetch |
| 2       | `waitForLoadState('networkidle')` before `Promise.race` heading wait | Same result                                                                  |
| 3       | `page.waitForResponse(/api/wishlist)` attached before `goto`         | Timed out after 10 s — confirmed NO request was made                         |

No automation-side fix is possible; the application must issue the API call on route mount.
