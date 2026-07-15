# TC_WISH_009 — Wishlist Items Cleared After Successful Purchase

## Test Case ID

TC_WISH_009

## Test Case Title

Purchased items are automatically removed from the wishlist after checkout completes

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- User is logged in with valid credentials (`$USER_NAME` / `$PASSWORD` — values from `.env`)
- At least two products are in the wishlist — call them Product A and Product B
- Product A has also been added to the cart
- The checkout flow is accessible (Proceed to Checkout button is enabled)

## Test Steps

1. Navigate to `$BASE_URL/login`. Enter `$USER_NAME` in the Email field and `$PASSWORD` in the Password field, then click **Login**.
2. Add Product A to the wishlist (heart icon — note the product name).
3. Add Product B to the wishlist (heart icon — note the product name).
4. Navigate to Product A's product detail page and click "Add to Cart".
5. Navigate to the Cart page (`/cart`) and confirm Product A is in the cart.
6. Click "Proceed to Checkout".
7. Complete the checkout process for Product A (follow all steps presented by the UI until an order confirmation or success state is shown).
8. After a successful purchase confirmation, navigate to `/wishlist`.
9. Observe which products are shown on the Wishlist page.

## Expected Result

1. Login succeeds; authenticated navbar (Profile / My Orders / Logout) is visible.
2. Product A heart icon becomes filled; badge shows 1.
3. Product B heart icon becomes filled; badge shows 2.
4. Product A is added to the cart; cart badge increments.
5. Cart page shows Product A with correct details.
6. Proceed to Checkout button is clicked; checkout flow begins.
7. Checkout completes successfully; an order confirmation or success message is displayed.
8. Wishlist page (`/wishlist`) loads.
9. **Product A is no longer listed** in the wishlist (it was purchased). Product B **remains** in the wishlist, unaffected.

## Notes and Assumptions

- **This test case is marked as UNVERIFIED** — the checkout destination, payment form, and order completion flow have not been confirmed in the live application. Steps 6–7 may not be completable if the checkout flow is incomplete.
- If checkout is incomplete or inaccessible, this test cannot be fully executed and the result for step 9 cannot be validated.
- Record all UI encountered during checkout steps, including any error messages or dead ends.

## Defect Opportunity

- Checkout flow may not exist or may be non-functional (unverified workflow).
- Purchased items may remain in the wishlist after a successful purchase.
- All wishlist items (not just purchased ones) may be cleared after checkout.
- The wishlist may not be updated until the page is manually refreshed.
