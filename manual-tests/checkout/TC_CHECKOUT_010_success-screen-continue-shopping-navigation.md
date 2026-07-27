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
- The success screen (Step 4) is currently displayed with the "Continue Shopping" button visible

### Test Steps

1. Click the "Continue Shopping" button on the success screen.
2. Check the resulting page URL and content.

### Expected Result

1. Clicking "Continue Shopping" closes the modal and navigates to the home page.
2. The URL changes to `/` (the home page / landing page). The home page loads and displays the store product listing.

### Notes and Assumptions

- Tags: Regression
- The "Continue Shopping" button navigates immediately, before the 6-second auto-redirect.
- The modal should close and the home page should be displayed cleanly with no residual modal overlay.

### Defect Opportunity

- The button may navigate to the wrong URL (e.g., `/cart` or `/orders`).
- The modal may not close before navigation, leaving a ghost overlay on the home page.
- The home page product listing may not load correctly if cart state is still being cleared in the background.
