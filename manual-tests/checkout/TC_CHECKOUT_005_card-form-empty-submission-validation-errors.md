### Test Case ID

TC_CHECKOUT_005

### Test Case Title

Card payment form shows inline validation errors when submitted empty

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 2 with Credit / Debit Card selected (TC_CHECKOUT_002 has been executed)
- All form fields (delivery and card details) are left empty

### Test Steps

1. Without filling in any form fields, scroll down to find the "Pay LKR [amount]" button.
2. Click the "Pay LKR [amount]" button.
3. Check each form field for inline validation error messages.

### Expected Result

1. The form is **not submitted** — the modal remains on Step 2. No order is placed.
2. Inline error messages appear next to each invalid field.
3. Errors shown simultaneously:
   - Street Address: "Required"
   - City: "Required"
   - Phone: "Required"
   - Cardholder Name: "Required"
   - Card Number: "Enter a valid 16-digit card number"
   - Expiry Date: "Enter MM/YY"
   - CVV: "Enter 3-digit CVV"
   - A total of 7 inline error messages are displayed.

### Notes and Assumptions

- Tags: Regression
- Error messages are rendered as `<span class="checkout-error">` elements.
- Delivery fields show "Required" for empty values across all payment methods.
- Card-specific fields (Card Number, Expiry, CVV) show format-specific error messages rather than "Required".

### Defect Opportunity

- Errors may not all appear simultaneously — some may only show after blur rather than on submit.
- The form may incorrectly proceed to Step 3 without valid data if client-side validation is bypassed.
- Error messages may be displayed in the wrong order or associated with the wrong field.
