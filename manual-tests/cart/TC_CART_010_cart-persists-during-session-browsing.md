### Test Case ID

TC_CART_010

### Test Case Title

Cart contents persist after navigating to other pages and returning

### Feature Area

Cart Management

### Priority

Medium

### Preconditions

- User is logged in (auth storage state active)
- At least one item is in the cart (record product name, quantity, and line total)
- Navigate to $BASE_URL/cart and note the cart contents

### Test Steps

1. On the cart page, note the item name, quantity, line total, Sub Total, and Total.
2. Note the cart count badge in the navbar.
3. Navigate to the Home page (`/` — click the OneStyle logo or Home nav link).
4. Navigate to the Women's category page (`/womens`).
5. Navigate to the Men's category page (`/mens`).
6. Navigate to the Kids' category page (`/kids`).
7. Navigate to a product detail page (e.g. `/product/3`).
8. Navigate back to the cart page (`/cart`) by clicking the Cart icon in the navbar.
9. Observe the cart item rows, quantities, and totals.
10. Compare with the values noted in step 1.

### Expected Result

1. Cart contents noted (e.g. 1 item, qty 1, LKR 50 line total, Sub Total LKR 50, Total LKR 50).
2. Cart count badge noted (e.g. "1").
   3–7. Navigation to each page succeeds without error.
3. Cart page loads with "Cart Totals" heading visible.
4. All previously noted items are present, with the same quantities, line totals, Sub Total, and Total.
5. Cart contents are identical to those noted before navigating away — no data loss occurred.

### Notes and Assumptions

- Tags: Regression
- Cart count badge should remain consistent throughout all navigations.
- This tests in-session state persistence, not cross-session persistence (covered in TC_CART_011).

### Defect Opportunity

- Cart is cleared or reset when navigating to another page.
- Item quantity changes unexpectedly.
- Cart count badge resets to 0 during navigation.
