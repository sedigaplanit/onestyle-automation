### Test Case ID

TC_CART_008

### Test Case Title

Item removed from cart when quantity decremented to zero

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Exactly one item is in the cart with quantity exactly 1 (verify this before proceeding)
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, confirm the target item shows a quantity of "1".
2. Note the cart item count badge in the navbar.
3. Note the Sub Total and Total in the Cart Totals panel.
4. Click the `−` (hyphen) button next to the item with quantity 1.
5. Observe the cart item rows.
6. Observe the cart item count badge in the navbar.
7. Observe the Cart Totals panel values.
8. Observe the "Proceed to Checkout" button state.

### Expected Result

1. Item quantity is confirmed at "1".
2. Cart count badge value is noted.
3. Totals are noted.
4. Click `−` on item with quantity 1.
5. The item row is **removed** from the cart immediately — no item rows are visible.
6. Cart count badge decrements by 1 (to 0 if this was the only item).
7. Cart Totals update to show no Sub Total value; Total shows no value.
8. The "Proceed to Checkout" button is now **disabled** (has `disabled` attribute) since the cart is empty.

### Notes and Assumptions

- Tags: Regression (boundary case — decrement at minimum quantity)
- This is the documented NEG-002 edge case from `.playwright-mcp/flows/negative-edge.json`.
- The decrement button in the cart uses ASCII hyphen `-` (not Unicode minus `−`).

### Defect Opportunity

- Item is not removed when decremented from quantity 1.
- Quantity wraps to a negative value or very large number instead of removing the item.
- Cart count badge does not update after removal.
- "Proceed to Checkout" remains enabled after cart becomes empty.
