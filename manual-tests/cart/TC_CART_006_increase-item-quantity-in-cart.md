### Test Case ID

TC_CART_006

### Test Case Title

Increase item quantity in cart — line total and Cart Totals recalculate

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- At least one item is in the cart with quantity 1 (TC_CART_001 has been executed or equivalent setup)
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, note the initial quantity value for the target item (e.g. "1").
2. Note the current line total for the item (e.g. LKR 50 for a LKR 50 unit-price item).
3. Note the current Sub Total and Total values in the Cart Totals panel.
4. Click the `+` button next to the target item.
5. Observe the quantity value for the item.
6. Observe the line total for the item.
7. Observe the Sub Total value in the Cart Totals panel.
8. Observe the Total value in the Cart Totals panel.
9. Click the `+` button once more.
10. Observe that all values update again.

### Expected Result

1. Quantity starts at "1".
2. Line total is LKR {unit price × 1}.
3. Sub Total and Total are noted.
4. Quantity increments to "2" immediately after clicking `+`.
5. Quantity shows "2".
6. Line total updates to LKR {unit price × 2} immediately.
7. Sub Total recalculates to reflect the new line total (increases by unit price).
8. Total recalculates to match the new Sub Total (shipping remains Free).
9. Quantity increments to "3".
10. Line total and totals all update immediately to reflect quantity of 3.

### Notes and Assumptions

- Tags: Regression
- The `+` button in the cart is `getByRole('button', { name: '+' })`.
- Totals recalculate immediately without a page reload.
- If multiple items exist in the cart, only the targeted item's line total and the overall totals change.

### Defect Opportunity

- Quantity does not increment after clicking `+`.
- Line total does not update to reflect the new quantity.
- Cart Totals (Sub Total, Total) do not recalculate immediately.
- Total includes an unexpected shipping fee after quantity change.
