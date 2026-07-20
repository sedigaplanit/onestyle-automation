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
- Checkout modal has been opened (Step 1), a payment method selected, and "Continue →" clicked (Step 2 is visible)

### Test Steps

1. Confirm the checkout modal is on Step 2 (any payment method form is visible).
2. Click the "← Back" button to return to Step 1.
3. Confirm the modal has returned to Step 1 — the heading reads "Checkout" and payment method options are visible.
4. Click the "✕" button in the modal header.
5. Observe the modal state after clicking.
6. Observe the page URL.
7. Observe the cart contents.

### Expected Result

1. Step 2 is visible with the "← Back" button accessible.
2. Clicking "← Back" returns the modal to Step 1 (Payment Method Selection).
3. Step 1 displays the "Checkout" heading, three payment method cards, and the "✕" close button.
4. Clicking "✕" on Step 1 closes the modal immediately.
5. The modal overlay is no longer visible.
6. The URL remains `/cart` — no navigation occurred.
7. The cart still contains the same items and quantities as before checkout was opened.

### Notes and Assumptions

- Tags: Regression
- AC12 states "the back button on Step 1 header (←) also behaves as close/back." Live app inspection (2026-07-20) confirms Step 1 uses a "✕" button (class: `checkout-close`) for this function rather than a "←". This test covers the AC12 secondary scenario using the confirmed "✕" locator.
- This scenario is distinct from TC_CHECKOUT_013, which opens Step 1 fresh without having navigated to Step 2 first.

### Defect Opportunity

- The "✕" button may become unresponsive or hidden after returning from Step 2 to Step 1 if modal state is not properly reset.
- The modal may show Step 2 content instead of Step 1 content after the "← Back" action if state management has a bug.
- Closing via "✕" after returning from Step 2 may leave residual form data in memory that surfaces if the modal is re-opened.
