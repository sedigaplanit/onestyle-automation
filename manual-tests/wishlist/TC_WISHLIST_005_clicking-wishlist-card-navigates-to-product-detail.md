### Test Case ID

TC_WISHLIST_005

### Test Case Title

Clicking a product card on the Wishlist page navigates to that product's detail page

### Feature Area

Wishlist

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- At least one product is in the wishlist (execute TC_WISHLIST_001 if needed)
- Navigate to `$BASE_URL/wishlist`
- The "My Wishlist" heading is visible and at least one product card is displayed

### Test Steps

1. On the Wishlist page, identify a product card and note the product's name
2. Click on the product card (the product image link area)

### Expected Result

1. A product card is visible with a product name and image
2. The browser navigates to that product's detail page
3. The URL changes to `/product/{id}` where `{id}` is the ID of the clicked product
4. The product detail page displays the correct product name matching the card clicked in step 1

### Notes and Assumptions

- Tags: Regression
- The product card image is a link to `/product/{id}`; clicking the image or card link triggers navigation
- Product IDs for seeded products start from 1 (e.g. `/product/1` for product ID 1)
- The product detail page heading: `getByRole('heading', { level: 1 })` — first h1 in the product detail area

### Defect Opportunity

- Clicking a product card on the wishlist page does not navigate to the product detail page
- Navigation goes to the wrong product (incorrect ID in URL)
- The product detail page heading does not match the product name from the wishlist card
- Clicking the card removes the item from wishlist instead of navigating to the detail page
