### Test Case ID

TC_CART_002

### Test Case Title

Size selection required before adding to cart — error state validation

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Navigate to $BASE_URL
- Navigate to any product detail page (e.g. `/product/1`)
- No size has been selected

### Test Steps

1. On the product detail page, observe the size section heading — it should read "Select Size".
2. Do NOT select any size option.
3. Note the current cart item count badge in the navbar.
4. Click the "Add to Cart" button.
5. Observe the size section heading.
6. Observe any toast notifications.
7. Observe the cart item count badge in the navbar.

### Expected Result

1. Size section heading initially reads "Select Size".
2. No size is selected.
3. Cart count badge is noted for comparison.
4. Clicking "Add to Cart" without a size does not add the product to the cart.
5. The size section heading changes to **"Select Size — required"**, indicating an error state.
6. A toast error notification is displayed: `"Please select a size first!"`.
7. Cart count badge remains unchanged — the item was NOT added.

### Notes and Assumptions

- Tags: Regression
- The size heading change acts as a visual error highlight for the size selector area.
- The "Add to Cart" button does NOT change to "✓ In Cart — View Cart" in this scenario.
- The error state should clear when a size is subsequently selected.

### Defect Opportunity

- Product is incorrectly added to cart without a size selected.
- Toast error message does not appear.
- Size section heading does not change to "Select Size — required".
- Cart counter increments despite no size being selected.
