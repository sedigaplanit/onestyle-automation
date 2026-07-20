### Test Case ID

TC_CHECKOUT_003

### Test Case Title

PayPal Step 2 displays delivery form, redirect note, and Proceed to PayPal button

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- Checkout modal is open on Step 1 (TC_CHECKOUT_001 has been executed)

### Test Steps

1. Click the "🅿️ PayPal" payment method card on Step 1.
2. Click the "Continue →" button.
3. Observe the Step 2 modal header.
4. Observe the form fields present in Step 2.
5. Observe any informational text or notes in the modal.
6. Observe the submit button label.
7. Confirm no card detail fields are present.

### Expected Result

1. The "🅿️ PayPal" option becomes the selected payment method.
2. The modal advances to Step 2 (URL remains `/cart`).
3. The modal heading reads "🅿️ PayPal".
4. An amount display is visible formatted as "Amount to pay: **LKR X.XX**".
5. The form contains exactly three delivery address fields:
   - Street Address (placeholder: "No. 12, Main Street")
   - City (placeholder: "Colombo")
   - Phone (placeholder: "+94 77 000 0000")
6. The informational note reads: "You will be redirected to PayPal to complete your payment securely."
7. The submit button label reads "Proceed to PayPal".
8. **No** card fields are present (Cardholder Name, Card Number, Expiry Date, CVV are absent).
9. A "← Back" button and a "←" header button are both visible.

### Notes and Assumptions

- Tags: Regression
- **Known limitation:** The PayPal redirect is simulated in the current implementation. Clicking "Proceed to PayPal" does not connect to a real PayPal gateway. Document as defect if tested to completion.
- The absence of card fields is the key differentiator from the Credit/Debit Card flow.

### Defect Opportunity

- Card fields may incorrectly appear on the PayPal form if the payment method selection state is not properly isolated.
- The PayPal redirect note text may be missing or incorrect.
- The "Proceed to PayPal" button may be mislabelled or behave unexpectedly (known limitation: simulated redirect).
