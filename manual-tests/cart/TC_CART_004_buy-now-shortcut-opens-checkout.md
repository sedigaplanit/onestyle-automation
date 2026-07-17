### Test Case ID

TC_CART_004

### Test Case Title

Buy Now shortcut adds product and opens checkout modal on cart page

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Navigate to $BASE_URL
- Navigate to any product detail page (e.g. `/product/2` — Elegant Overlap Collar Top)

### Test Steps

1. On the product detail page, click the "S" size option to select it.
2. Observe the current URL and cart count in the navbar.
3. Click the "Buy Now" button.
4. Observe the current URL.
5. Observe whether a checkout modal has opened.
6. Verify the product is present in the cart.

### Expected Result

1. The "S" size option is visually highlighted as selected.
2. URL is on the product detail page (e.g. `/product/2`); cart count is noted.
3. Clicking "Buy Now" triggers navigation.
4. The URL changes to `/cart` (or stays on `/cart` if already there).
5. The checkout modal opens automatically — a "Checkout" heading (h2) is visible.
6. The product detail (product name, size S) is visible in the cart item list within the modal/cart page.

### Notes and Assumptions

- Tags: Regression
- A size must be selected before clicking "Buy Now" — the product detail page shares the same size-required validation as "Add to Cart".
- The checkout modal URL stays at `/cart`; no additional route change occurs when the modal opens.
- If the product was already in the cart before clicking "Buy Now", the quantity should increase rather than creating a duplicate entry.

### Defect Opportunity

- Clicking "Buy Now" without size does not show the "Select Size — required" error.
- Navigation does not occur to `/cart`.
- Checkout modal does not open automatically after navigating to cart.
- Product is not present in cart after using Buy Now.
