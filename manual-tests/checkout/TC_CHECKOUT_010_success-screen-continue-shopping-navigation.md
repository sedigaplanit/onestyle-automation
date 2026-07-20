### Test Case ID

TC_CHECKOUT_010

### Test Case Title

Continue Shopping button on success screen navigates to home page

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

1. Confirm the success screen is displayed with the "Continue Shopping" button visible.
2. Click the "Continue Shopping" button.
3. Observe the page URL after clicking.
4. Observe the page content.

### Expected Result

1. The success screen displays the "Continue Shopping" button.
2. Clicking "Continue Shopping" closes the modal and navigates to the home page.
3. The URL changes to `/` (the home page / landing page).
4. The home page loads and displays the store product listing.

### Notes and Assumptions

- Tags: Regression
- The "Continue Shopping" button navigates immediately, before the 6-second auto-redirect.
- The modal should close and the home page should be displayed cleanly with no residual modal overlay.

### Defect Opportunity

- The button may navigate to the wrong URL (e.g., `/cart` or `/orders`).
- The modal may not close before navigation, leaving a ghost overlay on the home page.
- The home page product listing may not load correctly if cart state is still being cleared in the background.
