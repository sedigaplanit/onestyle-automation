### Test Case ID

TC_CHECKOUT_012

### Test Case Title

Cancel button closes checkout modal without placing an order

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 1 (TC_CHECKOUT_001 has been executed)
- Note the number of items and cart total before proceeding

### Test Steps

1. Confirm the checkout modal is open on Step 1 with the "Cancel" button visible.
2. Click the "Cancel" button.
3. Observe the modal state after clicking.
4. Observe the page URL.
5. Navigate to the cart page (`/cart`) and observe the cart contents.

### Expected Result

1. The "Cancel" button is visible at the bottom of Step 1 alongside "Continue →".
2. Clicking "Cancel" closes the modal immediately.
3. No order is placed.
4. The URL remains `/cart` — no navigation occurred.
5. The cart still contains the same items and quantities as before the checkout was opened.
6. The "Proceed to Checkout" button is still visible and enabled on the cart page.

### Notes and Assumptions

- Tags: Regression
- Cancelling from Step 1 must not modify the cart state in any way.
- The "Cancel" button is distinct from the "✕" close button (tested in TC_CHECKOUT_013).

### Defect Opportunity

- Clicking "Cancel" may accidentally submit a partial order if a race condition exists.
- The modal may not close cleanly, leaving a residual overlay.
- Cart contents may be altered (items removed or quantities changed) as a side effect of opening and cancelling checkout.
