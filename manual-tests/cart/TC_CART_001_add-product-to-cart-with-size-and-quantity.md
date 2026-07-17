### Test Case ID

TC_CART_001

### Test Case Title

Add product to cart from product detail page with size and quantity

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Navigate to $BASE_URL
- Navigate to any product detail page (e.g. `/product/1` — Casual Striped Blouse with Peplum Hem)
- Cart is noted for current item count (or assumed to start at 0)

### Test Steps

1. On the product detail page, observe the quantity control showing the default value of "1".
2. Click the `+` button (increment) in the Quantity section once to set quantity to 2.
3. Click the `M` size option in the "Select Size" section.
4. Click the "Add to Cart" button.
5. Observe the toast notification that appears.
6. Observe the "Add to Cart" button area.
7. Observe the cart item count badge in the navbar.

### Expected Result

1. Quantity control defaults to "1" on page load.
2. Quantity value updates to "2" after clicking `+`.
3. The "M" size option shows a visual highlight indicating it is selected.
4. Product is added to the cart with size M and quantity 2.
5. A toast notification appears confirming the addition, e.g. `"2× '[product name]...' added to cart!"`.
6. The "Add to Cart" button is replaced by the "✓ In Cart — View Cart" button.
7. The cart count badge in the navbar increments by 2 (reflecting the quantity added).

### Notes and Assumptions

- Tags: Regression
- The product detail page size options are `<div>` elements, not `<button>` elements — interact by clicking the text label exactly.
- Toast message format includes the quantity and a truncated product name.
- Cart counter reflects the total number of units, not the number of distinct items.

### Defect Opportunity

- Toast does not appear or shows incorrect quantity/product name.
- Cart counter does not update immediately after adding.
- "Add to Cart" button does not transition to "✓ In Cart — View Cart".
- Quantity selected is not reflected in cart (defaults back to 1).
