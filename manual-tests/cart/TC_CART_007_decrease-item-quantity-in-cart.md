### Test Case ID

TC_CART_007

### Test Case Title

Decrease item quantity in cart when quantity is greater than one

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- An item is in the cart with quantity 2 or more (use TC_CART_006 to increase to 2 first, or add with quantity 2 via TC_CART_001)
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, confirm the target item has a quantity of 2 or greater (e.g. "2").
2. Note the current line total for the item and the Cart Totals Sub Total and Total.
3. Click the `−` (hyphen) button next to the item.
4. Observe the quantity value for the item.
5. Observe the line total for the item.
6. Observe the Sub Total and Total in the Cart Totals panel.
7. Confirm the item row is still present in the cart.

### Expected Result

1. Item has quantity 2 (or more) confirmed.
2. Values are noted for comparison.
3. Click `−` successfully.
4. Quantity decrements by 1 (e.g. "2" → "1") immediately.
5. Line total recalculates to unit price × new quantity immediately.
6. Sub Total and Total in Cart Totals update immediately to reflect the reduced quantity.
7. Item row remains in the cart — it is NOT removed when quantity decrements from 2 to 1.

### Notes and Assumptions

- Tags: Regression
- The decrement button in the cart uses ASCII hyphen `-` (not Unicode minus `−`).
- Item removal only occurs when quantity is decremented from 1 to 0 (covered in TC_CART_008).

### Defect Opportunity

- Quantity does not decrement after clicking `−`.
- Item is incorrectly removed when quantity is decremented from 2 to 1.
- Totals do not recalculate after decrement.
