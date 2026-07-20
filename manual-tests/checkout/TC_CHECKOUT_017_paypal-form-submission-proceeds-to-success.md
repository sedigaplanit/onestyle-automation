### Test Case ID

TC_CHECKOUT_017

### Test Case Title

PayPal delivery form submission proceeds to processing and success screen

### Feature Area

Checkout

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 2 with PayPal selected (TC_CHECKOUT_003 has been executed)

### Test Steps

1. Confirm the checkout modal is on Step 2 with heading "🅿️ PayPal" and delivery address fields visible.
2. Fill in the Street Address field with: "No. 45, Main Street"
3. Fill in the City field with: "Colombo"
4. Fill in the Phone field with: "+94 77 000 0000"
5. Click the "Proceed to PayPal" button.
6. Immediately observe the modal for a processing screen (Step 3).
7. Wait approximately 2 seconds for processing to complete.
8. Observe the modal content after processing completes (Step 4 — Success).
9. Observe the order number and toast notification.

### Expected Result

1. Step 2 PayPal form is visible with the three delivery fields.
2. Street Address accepts the entered value.
3. City accepts the entered value.
4. Phone accepts the entered value.
5. Clicking "Proceed to PayPal" transitions the modal to a processing screen (Step 3).
6. The processing screen displays a loading spinner, "Processing your payment...", and "Please do not close this window".
7. After approximately 2 seconds the modal auto-advances to the success screen (Step 4).
8. The success screen displays:
   - Heading: "Order Placed Successfully!"
   - A unique order number in format `ORD-XXXXXX`
   - Message: "Thank you for shopping with OneStyle!"
   - "View My Orders" and "Continue Shopping" buttons
9. A toast notification confirms "Order ORD-XXXXXX placed successfully!"

### Notes and Assumptions

- Tags: Regression
- **Known limitation (AC6):** The PayPal redirect is simulated in the current implementation — clicking "Proceed to PayPal" does not connect to a real PayPal gateway. The app proceeds directly to the processing and success screens. This is a documented defect.
- This TC verifies that the simulated PayPal flow reaches Step 4; it does not verify real PayPal integration.
- The processing screen (Step 3) lasts approximately 2 seconds — observe immediately after clicking.

### Defect Opportunity

- **Known defect (AC6):** The app does not redirect to a real PayPal gateway; the redirect is simulated. This should be raised as a defect if real PayPal integration is required.
- The "Proceed to PayPal" button may behave differently from "Confirm Order" (COD) if the simulated PayPal flow has a separate code path with a bug.
- Validation errors for empty delivery fields should appear if the form is submitted without data — these are shared with the card form but should be verified for the PayPal flow independently.
