### Test Case ID

TC_WISHLIST_006

### Test Case Title

Clicking a product card on the Wishlist page navigates to the product detail page

### Feature Area

Wishlist Management

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one product is in the wishlist
- The user is on the Wishlist page (`/wishlist`) showing wishlisted product cards

### Test Steps

1. Locate the first product card on the Wishlist page.
2. Note the product name displayed on the first card.
3. Click the product image (link) on the first product card.
4. Read the current page URL.
5. Locate the product name heading on the product detail page.

### Expected Result

1. The first product card is visible with an image, product name, and prices.
2. The product name is noted for reference.
3. The browser navigates away from the Wishlist page.
4. The URL matches the pattern `/product/{productId}` (e.g. `.../product/1`).
5. The product detail page displays the same product name that was noted in step 2.

Overall: clicking on a product card on the Wishlist page correctly navigates to that product's detail page at `/product/:productId`.

### Notes and Assumptions

- Tags: Regression
- The clickable element is a link inside `.item-img-wrapper`: `getByRole('link') inside .item-img-wrapper — href: /product/{id}`.
- The product name on the wishlist card is a paragraph element: `locator('.wishlist-item-wrapper p').first()`.
- If the product name is not shown as a heading on the product detail page, look for a `<h1>` or `<h2>` matching the product name.

### Defect Opportunity

- Clicking the product card may not navigate to the product detail page.
- The product detail page may load an incorrect product (wrong ID in the URL).
- The image wrapper link may be inactive or navigate to a 404.
