### Test Case ID

TC_CHECKOUT_008

### Test Case Title

Cart is cleared on both client and server after successful order placement

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- A successful order has been placed (TC_CHECKOUT_007 has been executed)
- The success screen (Step 4) is currently displayed

### Test Steps

1. Click the "Continue Shopping" button on the success screen to dismiss the modal.
2. Click the cart icon in the navbar to go to the cart page.
3. Check the cart item list, the cart totals section, and the "Proceed to Checkout" button state.

### Expected Result

1. Before clicking "Continue Shopping", the cart counter badge in the navbar shows 0 (or is not visible). Clicking the button navigates to the home page (`/`).
2. The cart page (`/cart`) is accessible.
3. The cart item list is empty. The cart totals section shows Sub Total: LKR 0, Shipping: Free, Total: LKR 0. The "Proceed to Checkout" button is disabled (greyed out / has `[disabled]` attribute).

### Notes and Assumptions

- Tags: Regression
- This test verifies state consistency: the cart is cleared both visually (client) and persistently (server) after an order is placed.
- The test depends on TC_CHECKOUT_007 having placed a successful order.

### Defect Opportunity

- The cart counter badge may still show the pre-order count if the client-side state is not reset after order placement.
- Items may reappear in the cart on page refresh if the server-side cart was not cleared.
- The "Proceed to Checkout" button may remain enabled on an empty cart (regression from NEG-003).
