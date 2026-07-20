### Test Case ID

TC_CHECKOUT_002

### Test Case Title

Credit / Debit Card Step 2 displays delivery address and card detail fields

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 1 (TC_CHECKOUT_001 has been executed)
- "💳 Credit / Debit Card" is selected (default)

### Test Steps

1. Confirm "💳 Credit / Debit Card" is the currently selected payment method on Step 1.
2. Click the "Continue →" button.
3. Observe the Step 2 modal header.
4. Observe the Delivery Address section of the form.
5. Observe the Card Details section of the form.
6. Observe the submit button label at the bottom of the form.
7. Observe the back navigation options.

### Expected Result

1. The "💳 Credit / Debit Card" option appears selected.
2. The modal advances to Step 2 without page navigation (URL remains `/cart`).
3. The modal heading reads "💳 Credit / Debit Card".
4. An amount display is visible formatted as "Amount to pay: **LKR X.XX**".
5. The Delivery Address section contains exactly three fields:
   - Street Address (placeholder: "No. 12, Main Street")
   - City (placeholder: "Colombo")
   - Phone (placeholder: "+94 77 000 0000")
6. The Card Details section contains exactly four fields:
   - Cardholder Name (placeholder: "John Doe")
   - Card Number (placeholder: "1234 5678 9012 3456")
   - Expiry Date (placeholder: "MM/YY")
   - CVV (placeholder: "123")
7. The submit button label reads "Pay LKR [amount]" (e.g., "Pay LKR 50.00").
8. A "← Back" button is visible at the bottom and a "←" button is visible in the modal header.

### Notes and Assumptions

- Tags: Regression
- The step must not navigate away from `/cart`.
- Card number field auto-formats in groups of 4; Expiry Date auto-formats as MM/YY — manual tester should verify formatting while typing.

### Defect Opportunity

- Card Details section may be below the visible viewport — tester should scroll to verify all fields are present.
- "Pay LKR" button text may not reflect the actual cart total if synchronisation is delayed.
