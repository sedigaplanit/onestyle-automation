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

1. Observe the cart counter badge in the navigation bar while the success screen is visible.
2. Click the "Continue Shopping" button to dismiss the modal and navigate to the home page.
3. Navigate to the cart page (`/cart`).
4. Observe the cart item list.
5. Observe the cart totals section.
6. Observe the state of the "Proceed to Checkout" button.

### Expected Result

1. The cart counter badge in the navigation bar shows 0 (or is not visible) while on the success screen.
2. Clicking "Continue Shopping" navigates to the home page (`/`).
3. The cart page (`/cart`) is accessible.
4. The cart item list is empty — no product rows are displayed.
5. The cart totals section shows:
   - Sub Total: LKR 0
   - Shipping: Free
   - Total: LKR 0
6. The "Proceed to Checkout" button is disabled (greyed out / has `[disabled]` attribute).

### Notes and Assumptions

- Tags: Regression
- This test verifies state consistency: the cart is cleared both visually (client) and persistently (server) after an order is placed.
- The test depends on TC_CHECKOUT_007 having placed a successful order.

### Defect Opportunity

- The cart counter badge may still show the pre-order count if the client-side state is not reset after order placement.
- Items may reappear in the cart on page refresh if the server-side cart was not cleared.
- The "Proceed to Checkout" button may remain enabled on an empty cart (regression from NEG-003).
