### Test Case ID

TC_CHECKOUT_016

### Test Case Title

Header close button (✕) on Step 1 closes modal after returning from Step 2

### Feature Area

Checkout

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 1 (TC_CHECKOUT_001 has been executed)
- Note the current cart item count

### Test Steps

1. Click the "Continue →" button to advance to Step 2.
2. Click the "← Back" button at the bottom of Step 2 to return to Step 1.
3. Click the "✕" close button in the modal header.
4. Check the modal state, page URL, and cart contents.

### Expected Result

1. The modal advances to Step 2 (any payment method form is visible).
2. The modal returns to Step 1 — the heading reads "Checkout" and payment method options are visible.
3. Clicking "✕" closes the modal immediately. No order is placed.
4. The modal overlay is no longer visible. The URL remains `/cart`. The cart still contains the same items and quantities as before checkout was opened.

### Notes and Assumptions

- Tags: Regression
- AC12 states "the back button on Step 1 header (←) also behaves as close/back." Live app inspection (2026-07-20) confirms Step 1 uses a "✕" button (class: `checkout-close`) for this function rather than a "←". This test covers the AC12 secondary scenario using the confirmed "✕" locator.
- This scenario is distinct from TC_CHECKOUT_013, which opens Step 1 fresh without having navigated to Step 2 first.

### Defect Opportunity

- The "✕" button may become unresponsive or hidden after returning from Step 2 to Step 1 if modal state is not properly reset.
- The modal may show Step 2 content instead of Step 1 content after the "← Back" action if state management has a bug.
- Closing via "✕" after returning from Step 2 may leave residual form data in memory that surfaces if the modal is re-opened.
