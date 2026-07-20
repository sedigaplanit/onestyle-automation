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
3. Observe whether the form is submitted or remains on Step 2.
4. Observe each form field for inline error messages.
5. Observe the Street Address field error message.
6. Observe the City field error message.
7. Observe the Phone field error message.
8. Observe the Cardholder Name field error message.
9. Observe the Card Number field error message.
10. Observe the Expiry Date field error message.
11. Observe the CVV field error message.

### Expected Result

1. The form is **not submitted** — the modal remains on Step 2.
2. No order is placed.
3. Inline error messages appear next to each invalid field:
4. Street Address error: "Required"
5. City error: "Required"
6. Phone error: "Required"
7. Cardholder Name error: "Required"
8. Card Number error: "Enter a valid 16-digit card number"
9. Expiry Date error: "Enter MM/YY"
10. CVV error: "Enter 3-digit CVV"
11. A total of 7 inline error messages are displayed simultaneously.

### Notes and Assumptions

- Tags: Regression
- Error messages are rendered as `<span class="checkout-error">` elements.
- Delivery fields show "Required" for empty values across all payment methods.
- Card-specific fields (Card Number, Expiry, CVV) show format-specific error messages rather than "Required".

### Defect Opportunity

- Errors may not all appear simultaneously — some may only show after blur rather than on submit.
- The form may incorrectly proceed to Step 3 without valid data if client-side validation is bypassed.
- Error messages may be displayed in the wrong order or associated with the wrong field.
