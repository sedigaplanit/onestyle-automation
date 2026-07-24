# BUG_CHECKOUT_004 — Wishlist is not cleared after a successful purchase

**Severity:** High
**Date:** 2026-07-24
**Affected Test:** `tests/checkout/CheckoutTests.spec.ts` — "Wishlisted item is removed from wishlist after it is purchased"
**Related:** BUG_CHECKOUT_003 (wishlist UI does not re-fetch from API on navigation)

---

## Steps to Reproduce

1. Authenticate as `test@test.com`.
2. Call `POST /api/wishlist/{productId}` — add a product to the wishlist.
3. Verify via `GET /api/wishlist` → response includes the product ✓
4. Add the same product to cart via `POST /api/cart/{productId}`.
5. Navigate to `/cart` and complete a Cash on Delivery checkout (fill delivery details, click "Confirm Order").
6. Wait for the success screen and order confirmation.
7. Call `GET /api/wishlist` — observe the response.

## Expected Result

After a successful purchase, products that were wishlisted and included in the order are removed from the wishlist. `GET /api/wishlist` returns an empty array (or a list that excludes the purchased product).

This behaviour is documented in the API schema:

```
DELETE /api/wishlist  — "Clear the entire wishlist (e.g. after checkout)"
```

## Actual Result

`GET /api/wishlist` still returns the purchased product after checkout. The wishlist is never cleared. A 30-second polling loop in the automated test confirms the count stays at 1 throughout.

```
Error: Waiting for server wishlist to be emptied after purchase
expect(received).toBe(expected) // Object.is equality
Expected: 0
Received: 1
Timeout 30000ms exceeded while waiting on the predicate
```

## Root Cause

Neither the backend checkout handler nor the frontend post-order flow calls `DELETE /api/wishlist` after a successful order is placed. The `DELETE /api/wishlist` endpoint exists in the API and is documented for exactly this use case, but it is never invoked during checkout.

## Fix (Backend / Frontend)

**Option A — Backend:** In the order creation handler, after persisting the order, call the wishlist clear logic (or issue `DELETE /api/wishlist` for the authenticated user) to remove all purchased items.

**Option B — Frontend:** After receiving a successful order response (success screen rendered), issue `DELETE /api/wishlist` via the API client before dismissing the checkout modal.

The `DELETE /api/wishlist` endpoint is already available:

```typescript
// WishlistApiClient
public async clearWishlist(): Promise<FetchResponse<{ message: string }>> {
  return this.makeRequest<{ message: string }, never>(ApiPaths.ClearWishlist, {
    method: 'DELETE',
  })
}
```

## Fix Attempts (Automation — exhausted)

| Attempt | Strategy                                                                      | Outcome                                                                        |
| ------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1       | Poll `GET /api/wishlist` for up to 30 s after purchase (current test)        | Times out — wishlist count stays at 1 indefinitely                             |

No automation-side fix is possible; the application must call `DELETE /api/wishlist` during or after checkout.
