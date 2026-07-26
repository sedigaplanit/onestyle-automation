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
3. Check the delivery address fields on Step 2.
4. Check that no card detail fields and no PayPal redirect note are present.
5. Check the submit button label.

### Expected Result

1. The "💵 Cash on Delivery" option becomes the selected payment method.
2. The modal advances to Step 2 (URL remains `/cart`). The modal heading reads "💵 Cash on Delivery".
3. The form contains exactly three delivery address fields: Street Address (placeholder: "No. 12, Main Street"), City (placeholder: "Colombo"), Phone (placeholder: "+94 77 000 0000").
4. **No** card detail fields are present. **No** PayPal redirect note is present.
5. The submit button label reads "Confirm Order". A "← Back" button and a "←" header button are both visible.

### Notes and Assumptions

- Tags: Regression
- The "Confirm Order" button label is unique to Cash on Delivery — it differentiates this flow from both the Card ("Pay LKR [amount]") and PayPal ("Proceed to PayPal") flows.
- The total is displayed as a heading (e.g., "LKR 85") without the "Amount to pay:" label present in other methods.

### Defect Opportunity

- Card fields may erroneously appear if the payment method selection state is not properly isolated.
- The button may be mislabelled as "Pay" or "Proceed" instead of "Confirm Order".
- The total display format may differ from the cart total (missing decimal points or wrong currency).
