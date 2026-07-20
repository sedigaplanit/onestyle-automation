### Test Case ID

TC_CHECKOUT_006

### Test Case Title

Card form boundary validation for partial card number, short expiry, and short CVV

### Feature Area

Checkout

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 2 with Credit / Debit Card selected (TC_CHECKOUT_002 has been executed)

### Test Steps

1. Fill in all delivery address fields with valid data:
   - Street Address: "No. 45, Main Street"
   - City: "Colombo"
   - Phone: "+94 77 000 0000"
2. Fill in the Cardholder Name field with: "Test User"
3. Fill in the Card Number field with fewer than 16 digits (e.g., "1234 5678 9012").
4. Fill in the Expiry Date field with fewer than 5 characters (e.g., "12/2").
5. Fill in the CVV field with fewer than 3 digits (e.g., "12").
6. Click the "Pay LKR [amount]" button.
7. Observe inline error messages for the Card Number, Expiry Date, and CVV fields.
8. Observe that no error messages are shown for the delivery or cardholder name fields.

### Expected Result

1. Delivery address fields and Cardholder Name show no errors (valid data accepted).
2. The form is **not submitted**.
3. Card Number field shows error: "Enter a valid 16-digit card number"
4. Expiry Date field shows error: "Enter MM/YY"
5. CVV field shows error: "Enter 3-digit CVV"
6. Only 3 error messages are shown (the delivery and name fields have no errors).

### Notes and Assumptions

- Tags: Regression
- This test targets the minimum-length boundary for card fields only.
- The Card Number field auto-formats with spaces in groups of 4 — entering "1234 5678 9012" counts as 12 digits.
- The Expiry Date field auto-formats as MM/YY — entering "12/2" is 4 characters (below the 5-character minimum).
- CVV minimum is 3 digits; entering 2 digits triggers the error.

### Defect Opportunity

- Auto-formatting of Card Number may allow fewer than 16 raw digits to pass validation if the space characters are counted.
- Expiry Date field may accept "12/2" as valid if the auto-formatting incorrectly pads the year.
- CVV field may not validate length if the field type is text rather than numeric with maxlength.
