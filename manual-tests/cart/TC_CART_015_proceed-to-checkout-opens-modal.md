### Test Case ID

TC_CART_015

### Test Case Title

Proceed to Checkout button active and opens checkout modal when cart has items

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- At least one item is in the cart (TC_CART_001 has been executed or equivalent)
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, confirm at least one item row is visible.
2. Observe the "Proceed to Checkout" button in the Cart Totals panel.
3. Check the button's visual state (not disabled, normal opacity, pointer cursor).
4. Click the "Proceed to Checkout" button.
5. Observe the overlay/modal that appears.
6. Observe the URL in the browser address bar.

### Expected Result

1. At least one item row is visible — cart is not empty.
2. The "Proceed to Checkout" button is visible and does NOT have a `disabled` attribute.
3. Button appears active — normal opacity, pointer cursor on hover.
4. Clicking the button opens an overlay on the cart page.
5. The checkout modal is visible with a "Checkout" heading (h2 level).
6. The URL remains `/cart` — no route change occurs when the modal opens.

### Notes and Assumptions

- Tags: Regression
- The checkout modal URL stays at `/cart`; no additional route change occurs.
- Checkout modal ready marker: `getByRole('heading', { level: 2, name: 'Checkout' })`.
- The modal displays Step 1 of checkout (payment method selection) initially.

### Defect Opportunity

- "Proceed to Checkout" button remains disabled even when cart has items.
- Clicking the button does not open the checkout modal.
- The checkout modal shows an unexpected step or error on open.
- URL changes unexpectedly when opening the modal.
