### Test Case ID

TC_CHECKOUT_007

### Test Case Title

Successful COD order placement shows processing screen then order success screen

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 2 with Cash on Delivery selected (TC_CHECKOUT_004 has been executed)

### Test Steps

1. Fill in the Street Address field with: "No. 45, Main Street"
2. Fill in the City field with: "Colombo"
3. Fill in the Phone field with: "+94 77 000 0000"
4. Click the "Confirm Order" button.
5. Immediately observe the modal for a processing screen (Step 3).
6. Wait approximately 2 seconds for processing to complete.
7. Observe the modal content after processing completes (Step 4).
8. Observe the heading, order number, messages, and available buttons.
9. Observe any toast notification that appears.

### Expected Result

1. All three delivery fields accept the entered values.
2. Clicking "Confirm Order" immediately transitions the modal to a processing screen.
3. The processing screen (Step 3) displays:
   - A loading spinner
   - The message "Processing your payment..."
   - The message "Please do not close this window"
4. After approximately 2 seconds, the modal automatically transitions to Step 4 (Success).
5. The success screen (Step 4) displays all of the following:
   - A "✓" checkmark icon
   - Heading: "Order Placed Successfully!"
   - Label: "ORDER NUMBER"
   - A unique order number in the format `ORD-XXXXXX` (6 digits, e.g., "ORD-748343")
   - Message: "Thank you for shopping with OneStyle!"
   - Message: "This page will redirect in a few seconds..."
6. Two action buttons are visible:
   - "View My Orders"
   - "Continue Shopping"
7. A toast notification appears with the text: "Order ORD-XXXXXX placed successfully!" (where XXXXXX matches the displayed order number).

### Notes and Assumptions

- Tags: Regression
- The processing step (Step 3) lasts approximately 2 seconds — the tester should observe it immediately after clicking "Confirm Order".
- The order number is dynamically generated and will differ on each execution.
- COD is used in this test because it is the simplest flow (no card or redirect simulation required).

### Defect Opportunity

- The processing screen may be displayed so briefly that it is not visible before the success screen appears.
- The order number on the toast notification may not match the order number displayed on the success screen.
- The "Please do not close this window" message may be absent from the processing screen.
