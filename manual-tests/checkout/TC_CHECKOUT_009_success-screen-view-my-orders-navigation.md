### Test Case ID

TC_CHECKOUT_009

### Test Case Title

View My Orders button on success screen navigates to Order History page

### Feature Area

Checkout

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- A successful order has been placed (TC_CHECKOUT_007 has been executed)
- The success screen (Step 4) is currently displayed

### Test Steps

1. Confirm the success screen is displayed with the "View My Orders" button visible.
2. Click the "View My Orders" button.
3. Observe the page URL after clicking.
4. Observe the page content.

### Expected Result

1. The success screen displays the "View My Orders" button.
2. Clicking "View My Orders" navigates to the Order History page.
3. The URL changes to `/orders`.
4. The Order History page loads and displays order history content (including the recently placed order).

### Notes and Assumptions

- Tags: Regression
- The "View My Orders" button navigates immediately, before the 6-second auto-redirect.
- The recently placed order (from TC_CHECKOUT_007) should appear in the order list.

### Defect Opportunity

- The button may navigate to the wrong URL (e.g., `/profile` instead of `/orders`).
- The order just placed may not immediately appear in the order history if the server has not yet processed it.
- The button may trigger the auto-redirect timer before navigation completes.
