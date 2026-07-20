### Test Case ID

TC_CHECKOUT_001

### Test Case Title

Checkout modal opens on Step 1 and displays payment options with total

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- User is on the cart page (`/cart`)

### Test Steps

1. Observe the "Cart Totals" section on the `/cart` page.
2. Click the "Proceed to Checkout" button.
3. Observe the checkout modal that appears.
4. Observe the payment method options displayed in the modal.
5. Observe the total amount displayed in the modal.

### Expected Result

1. The "Cart Totals" section is visible and the "Proceed to Checkout" button is enabled.
2. A checkout modal overlay appears without any page navigation (URL remains `/cart`).
3. The modal heading reads "Checkout".
4. Three payment method cards are displayed:
   - 💳 Credit / Debit Card (selected by default)
   - 🅿️ PayPal
   - 💵 Cash on Delivery
5. A total amount is displayed formatted as "Total: **LKR X.XX**" in the modal.
6. A "Continue →" button and a "Cancel" button are visible.
7. A close button (✕) is visible in the modal header.

### Notes and Assumptions

- Tags: Regression
- The URL must remain `/cart` throughout — no navigation occurs when the modal opens.
- Default selected payment method is Credit / Debit Card.
- Total uses 2 decimal places in the modal (e.g., "LKR 50.00") even though the cart total uses integers.

### Defect Opportunity

- Modal may fail to open if cart data is not yet loaded (race condition on page load).
- Total amount may not match cart total if currency formatting differs between cart and modal.
- Modal may not trap focus or may appear below the visible viewport requiring scroll.
