### Test Case ID

TC_CART_003

### Test Case Title

Quantity selector controls on product detail page — increment, decrement, and minimum boundary

### Feature Area

Cart Management

### Priority

Medium

### Preconditions

- User is logged in (auth storage state active)
- Navigate to $BASE_URL
- Navigate to any product detail page (e.g. `/product/1`)

### Test Steps

1. Observe the Quantity section on the product detail page — note the displayed quantity value.
2. Click the `+` (increment) button once.
3. Observe the displayed quantity value.
4. Click the `+` button again.
5. Observe the displayed quantity value.
6. Click the `−` (decrement) button once. (Note: this uses the Unicode minus sign `−`, not a hyphen.)
7. Observe the displayed quantity value.
8. With the quantity showing "1", click the `−` button.
9. Observe the displayed quantity value.
10. Select size "L" and click "Add to Cart".
11. Navigate to `/cart` by clicking the "✓ In Cart — View Cart" button.
12. Observe the quantity shown for the item in the cart.

### Expected Result

1. Quantity defaults to "1" on page load.
2. Quantity increments to "2".
3. Quantity increments to "3" after the second click.
4. Quantity decrements to "2" after clicking `−`.
5. N/A (covered by step 4).
6. N/A (covered by step 4–5).
7. Quantity shows "2".
8. Clicking `−` when quantity is "1" does NOT decrease below 1 — quantity remains "1" (minimum enforced).
9. Quantity remains "1".
10. Product is added with the quantity displayed (1).
11. Cart page opens.
12. The item quantity in the cart matches what was set on the product page (1 in this case).

### Notes and Assumptions

- Tags: Regression (boundary test — minimum quantity of 1)
- The decrement button on the product page uses Unicode minus `−` (U+2212), not ASCII hyphen `-`.
- The quantity minimum is 1; the app should not allow decrement below 1.

### Defect Opportunity

- Quantity can be decremented below 1 on the product detail page.
- Quantity selected on product page is not honoured when item is added to cart.
- Increment/decrement buttons do not respond to click.
