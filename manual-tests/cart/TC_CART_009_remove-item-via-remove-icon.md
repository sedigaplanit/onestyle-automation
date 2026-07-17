### Test Case ID

TC_CART_009

### Test Case Title

Remove item from cart using the remove icon

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- At least one item is in the cart
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, identify an item row and confirm the remove icon (✕) is visible.
2. Note the product name, line total, and the current Sub Total/Total in Cart Totals.
3. Note the cart item count badge in the navbar.
4. Click the remove icon (✕) for the target item.
5. Observe the cart item rows.
6. Observe the Cart Totals panel values.
7. Observe the cart count badge in the navbar.

### Expected Result

1. The remove icon (✕) is present in the item row.
2. Values are noted for comparison.
3. Cart count is noted.
4. Click is registered on the remove icon.
5. The item row is **removed from the cart immediately** — that product no longer appears.
6. Cart Totals (Sub Total, Total) recalculate immediately to reflect the removed item. If no items remain, totals show no values and "Proceed to Checkout" becomes disabled.
7. Cart count badge decrements by the quantity of the removed item.

### Notes and Assumptions

- Tags: Regression
- The remove icon locator is `getByRole('img', { name: 'Remove' })`.
- This is the documented NEG-006 edge case from `.playwright-mcp/flows/negative-edge.json`.
- If multiple items are in the cart, only the targeted item is removed; other items remain intact.

### Defect Opportunity

- Clicking the remove icon does not remove the item.
- Cart Totals do not recalculate after removal.
- Cart count badge does not update.
- The wrong item is removed when multiple items exist.
