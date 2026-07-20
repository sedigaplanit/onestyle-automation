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
- Checkout modal is open on Step 2 with Credit / Debit Card selected (TC_CHECKOUT_002 has been executed)

### Test Steps

1. Confirm the checkout modal is on Step 2 (Credit / Debit Card form visible).
2. Click the "← Back" button at the bottom of the Step 2 form.
3. Observe the modal content after clicking.
4. Observe the payment method options displayed.

### Expected Result

1. The Step 2 form (Credit / Debit Card) is visible with the "← Back" button at the bottom.
2. Clicking "← Back" returns the modal to Step 1 — Payment Method Selection.
3. The modal heading reads "Checkout".
4. All three payment method options are displayed again:
   - 💳 Credit / Debit Card
   - 🅿️ PayPal
   - 💵 Cash on Delivery
5. The "Continue →" and "Cancel" buttons are visible.
6. The URL remains `/cart` — no navigation occurred.

### Notes and Assumptions

- Tags: Regression
- There are two back buttons on Step 2: a "←" button in the modal header and a "← Back" button at the bottom of the form. This test covers the bottom "← Back" button.
- Both buttons should produce the same result (return to Step 1). The header "←" button is not separately tested but should be verified manually.
- Any data entered in the Step 2 form does not need to persist when returning to Step 1.

### Defect Opportunity

- The "← Back" button may close the modal entirely instead of returning to Step 1.
- Previously entered form data from Step 2 may erroneously persist when the user returns to Step 1 and re-selects a payment method.
- The payment method selection on Step 1 may reset to the default (Credit / Debit Card) when returning, even if the user had selected a different method originally — this is acceptable behaviour but should be verified.
