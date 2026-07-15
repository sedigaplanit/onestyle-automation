# TC_WISH_006 — Navigate to Product Detail Page from Wishlist

## Test Case ID

TC_WISH_006

## Test Case Title

Clicking a product card on the Wishlist page navigates to that product's detail page

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- At least one product is in the wishlist
- User is on the Wishlist page (`/wishlist`)

## Test Steps

1. Ensure at least one product is in the wishlist (add via heart icon on any listing page if needed).
2. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/wishlist`.
3. Note the name of the first product card visible on the Wishlist page.
4. Click on that product card.
5. Observe the URL after clicking.
6. Verify the product detail page content matches the product that was clicked.

## Expected Result

1. Wishlist has at least one product.
2. Wishlist page (`/wishlist`) loads with product cards visible.
3. Product name is noted.
4. Click is registered.
5. URL changes to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/product/:productId` where `:productId` is the ID of the clicked product.
6. Product detail page displays:
   - Product name matching step 3 in an `h1` heading
   - Breadcrumb: HOME / SHOP / {category} / {product name}
   - Product image, star rating, prices, size selection, quantity controls, Add to Cart and Buy Now buttons

## Notes and Assumptions

- The clickable area on the wishlist card (image, name, or whole card) is unverified; test clicking on the product image and product name separately if the first click does not navigate.
- The product detail page structure is verified per the project application structure documentation.

## Defect Opportunity

- Clicking a wishlist card may not navigate to the product page.
- Navigation may go to an incorrect product (wrong `:productId`).
- The card may not be clickable at all.
