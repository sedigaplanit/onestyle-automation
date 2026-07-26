### Test Case ID

TC_CHECKOUT_014

### Test Case Title

Back button on Step 2 returns to Step 1 Payment Method Selection

### Feature Area

Checkout

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 2 with Credit / Debit Card selected and the "← Back" button visible (TC_CHECKOUT_002 has been executed)

### Test Steps

1. Click the "← Back" button at the bottom of the Step 2 form.
2. Check the modal content — heading, payment method options, and buttons.

### Expected Result

1. Clicking "← Back" returns the modal to Step 1 — Payment Method Selection. The modal heading reads "Checkout".
2. All three payment method options are displayed: 💳 Credit / Debit Card, 🅿️ PayPal, 💵 Cash on Delivery. The "Continue →" and "Cancel" buttons are visible. The URL remains `/cart`.

### Notes and Assumptions

- Tags: Regression
- There are two back buttons on Step 2: a "←" button in the modal header and a "← Back" button at the bottom of the form. This test covers the bottom "← Back" button.
- Both buttons should produce the same result (return to Step 1). The header "←" button is not separately tested but should be verified manually.
- Any data entered in the Step 2 form does not need to persist when returning to Step 1.

### Defect Opportunity

- The "← Back" button may close the modal entirely instead of returning to Step 1.
- Previously entered form data from Step 2 may erroneously persist when the user returns to Step 1 and re-selects a payment method.
- The payment method selection on Step 1 may reset to the default (Credit / Debit Card) when returning, even if the user had selected a different method originally — this is acceptable behaviour but should be verified.
