### Test Case ID

TC_CART_005

### Test Case Title

View cart contents — item rows and Cart Totals panel validation

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Navigate to $BASE_URL
- At least one product has been added to the cart (e.g. via TC_CART_001 steps)
- Navigate to the cart page: `/cart`

### Test Steps

1. Observe the cart table column headers.
2. Identify the first item row and observe the product image.
3. Observe the product name in the item row.
4. Observe the unit price in the item row (format: `LKR {amount}`).
5. Observe the quantity controls in the item row — note the "−" button, quantity value, and "+" button.
6. Observe the line total in the item row.
7. Verify the line total is calculated correctly (unit price × quantity).
8. Observe the remove icon (✕) at the end of the item row.
9. Observe the Cart Totals panel — note the Sub Total value.
10. Observe the Shipping row in Cart Totals.
11. Observe the Total value in Cart Totals.
12. Verify Total equals Sub Total (given shipping is free).

### Expected Result

1. The cart table shows all 6 headers: **Products**, **Title**, **Price**, **Quantity**, **Total**, **Remove**.
2. A product image is displayed in the item row.
3. The product name is displayed correctly in the item row.
4. Unit price is shown in `LKR {amount}` format.
5. Quantity controls show "−" (ASCII hyphen), the current quantity value, and "+".
6. Line total is visible in the item row.
7. Line total equals unit price × quantity (e.g. if unit price is LKR 50 and quantity is 1, line total = LKR 50).
8. A remove icon (✕) is present in the item row; clicking it will remove the item.
9. Sub Total in Cart Totals matches the sum of all line totals.
10. Shipping is labelled "Shipping Free" with value "Free".
11. Total is displayed in Cart Totals.
12. Total equals Sub Total (no shipping cost added).

### Notes and Assumptions

- Tags: Regression
- The decrement button in the cart uses ASCII hyphen `-`, not the Unicode minus `−` used on the product page.
- The "Cart Totals" heading (h1) is the wait-for marker confirming the cart page has loaded.
- If multiple items are in the cart, each has its own row; line totals are per-item.

### Defect Opportunity

- Item row missing image, name, price, or line total.
- Line total does not match unit price × quantity.
- Cart Totals do not reflect the correct Sub Total or Total.
- Shipping shows a non-zero value instead of "Free".
- Remove icon (✕) is absent or non-functional.
