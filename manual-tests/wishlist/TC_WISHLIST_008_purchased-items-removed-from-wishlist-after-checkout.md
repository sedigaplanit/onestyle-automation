### Test Case ID

TC_WISHLIST_008

### Test Case Title

Purchased items are automatically removed from wishlist after successful checkout

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- The wishlist contains 0 items (empty state confirmed before test begins)
- Add **only** product ID 1 to the wishlist by clicking the ♡ heart on its product card; confirm the wishlist count badge shows "♡ 1"
- Add product ID 1 to the cart from its product detail page (navigate to `/product/1`, select a size, click "Add to Cart")
- The wishlist contains exactly 1 item (product ID 1); the cart contains product ID 1
- Navigate to the Cart page (`/cart`) and verify the cart is not empty

### Test Steps

1. On the Cart page, click "Proceed to Checkout" to open the checkout modal (Step 1)
2. Select "Cash on Delivery" as the payment method
3. Click "Continue" to proceed to Step 2
4. Click "Pay" (or the equivalent confirm button) to place the order
5. Wait for the checkout success screen to appear
6. Navigate to the Wishlist page (`$BASE_URL/wishlist`) by clicking the ♡ navbar link

### Expected Result

1. The checkout modal opens at Step 1 with payment options displayed
2. "Cash on Delivery" is selected
3. The checkout modal advances to Step 2 showing the Cash on Delivery confirmation
4. The order is submitted; the checkout success screen appears confirming the order was placed
5. The Wishlist page at `/wishlist` is displayed (URL changes to `/wishlist`)
6. Product ID 1 (which was purchased) is no longer displayed in the wishlist
7. The empty state heading "Your wishlist is empty" is visible
8. The empty state message "Save items you love by clicking the heart on any product." is visible
9. The wishlist count badge in the navbar shows 0 (the ♡ link displays without a count badge)

### Notes and Assumptions

- Tags: Regression
- This test exercises the cross-feature interaction between checkout and wishlist (AC9)
- Reference: TC_CHECKOUT_007 for the full Cash on Delivery checkout flow steps
- Known issue: BUG_CHECKOUT_003 documents that the wishlist page does not re-fetch from the API on navigation. If the purchased item is still visible on the wishlist page, this may indicate the UI is rendering stale in-memory state. Report as a regression of BUG_CHECKOUT_003 if observed

### Defect Opportunity

- The purchased item remains in the wishlist after a successful checkout (BUG_CHECKOUT_003 regression)
- The wishlist page shows the empty state but the navbar count badge still shows the old count
- Non-purchased wishlist items are incorrectly removed along with the purchased item
- The wishlist page does not load at all after checkout (navigation broken)
