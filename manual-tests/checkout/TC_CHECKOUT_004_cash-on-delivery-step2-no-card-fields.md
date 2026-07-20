### Test Case ID

TC_CHECKOUT_004

### Test Case Title

Cash on Delivery Step 2 shows delivery form only with Confirm Order button

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

1. Click the "💵 Cash on Delivery" payment method card on Step 1.
2. Click the "Continue →" button.
3. Observe the Step 2 modal header.
4. Observe the form fields present in Step 2.
5. Confirm no card detail fields are present.
6. Confirm no PayPal redirect note is present.
7. Observe the submit button label.

### Expected Result

1. The "💵 Cash on Delivery" option becomes the selected payment method.
2. The modal advances to Step 2 (URL remains `/cart`).
3. The modal heading reads "💵 Cash on Delivery".
4. The form contains exactly three delivery address fields:
   - Street Address (placeholder: "No. 12, Main Street")
   - City (placeholder: "Colombo")
   - Phone (placeholder: "+94 77 000 0000")
5. **No** card detail fields are present (Cardholder Name, Card Number, Expiry Date, CVV are absent).
6. **No** PayPal redirect note is present.
7. The submit button label reads "Confirm Order".
8. A "← Back" button and a "←" header button are both visible.

### Notes and Assumptions

- Tags: Regression
- The "Confirm Order" button label is unique to Cash on Delivery — it differentiates this flow from both the Card ("Pay LKR [amount]") and PayPal ("Proceed to PayPal") flows.
- The total is displayed as a heading (e.g., "LKR 85") without the "Amount to pay:" label present in other methods.

### Defect Opportunity

- Card fields may erroneously appear if the payment method selection state is not properly isolated.
- The button may be mislabelled as "Pay" or "Proceed" instead of "Confirm Order".
- The total display format may differ from the cart total (missing decimal points or wrong currency).
