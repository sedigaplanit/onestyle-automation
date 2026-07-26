### Test Case ID

TC_CHECKOUT_011

### Test Case Title

Success screen auto-redirects to home page after 6 seconds

### Feature Area

Checkout

### Priority

Low

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- A successful order has been placed (TC_CHECKOUT_007 has been executed)
- The success screen (Step 4) is currently displayed
- Do NOT click any buttons on the success screen

### Test Steps

1. Do not click any buttons — wait passively for approximately 6 seconds.
2. After the redirect fires, check the resulting page URL and content.

### Expected Result

1. The message "This page will redirect in a few seconds..." is visible on the success screen before the redirect.
2. After approximately 6 seconds of inactivity, the modal automatically closes and the user is redirected to the home page. The URL changes to `/`. The home page loads successfully with no residual modal overlay.

### Notes and Assumptions

- Tags: Regression
- The auto-redirect timer is approximately 6 seconds from order success. The tester should not interact with the page during this period.
- This test is timing-sensitive — it should not be retried immediately if it fails without verifying that 6 full seconds elapsed.

### Defect Opportunity

- The auto-redirect may not fire if a JavaScript error occurred during order placement.
- The redirect may navigate to a page other than `/` (e.g., `/cart` or `/orders`).
- The auto-redirect timer may start before the success screen is fully rendered, causing a redirect before the tester can observe the success screen.
