### Test Case ID

TC_CHECKOUT_013

### Test Case Title

Close (✕) button closes checkout modal without placing an order

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 1 with the "✕" close button visible in the modal header (TC_CHECKOUT_001 has been executed)
- Note the number of items and cart total before proceeding

### Test Steps

1. Click the "✕" close button in the modal header.
2. Check the modal state and page URL.
3. Check the cart contents on the cart page.

### Expected Result

1. Clicking "✕" closes the modal immediately. No order is placed. The URL remains `/cart`.
2. The cart still contains the same items and quantities as before the checkout was opened.
3. The "Proceed to Checkout" button is still visible and enabled on the cart page.

### Notes and Assumptions

- Tags: Regression
- The "✕" button is the header close button, distinct from the "Cancel" button tested in TC_CHECKOUT_012.
- Both ✕ and Cancel should produce identical outcomes — closing without placing an order.

### Defect Opportunity

- The "✕" button may be hidden or not focusable if the modal is partially off-screen.
- Clicking "✕" may navigate away from `/cart` instead of just closing the modal overlay.
- Cart contents may be altered as a side effect of opening and closing the modal.
