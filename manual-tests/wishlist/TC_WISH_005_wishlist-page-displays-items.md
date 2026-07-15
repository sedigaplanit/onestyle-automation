# TC_WISH_005 — Wishlist Page Displays Saved Items Correctly

## Test Case ID

TC_WISH_005

## Test Case Title

Wishlist page shows all saved products with correct details and item count subtitle

## Feature Area

Wishlist

## Priority

High

## Preconditions

- At least two products have been added to the wishlist (heart icon clicked on two distinct product cards)
- User knows the name and prices of the products that were wishlisted

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Add two distinct products to the wishlist by clicking the heart icon on their product cards. Note the name and prices of each product.
3. Click the wishlist heart (♡) icon in the navbar.
4. Observe the subtitle / item count shown on the Wishlist page.
5. Verify each wishlisted product card shows: product image, product name, old price (strikethrough), and new price in LKR.
6. Confirm that exactly 2 product cards are displayed — no more, no fewer.

## Expected Result

1. Home page loads with product cards visible.
2. Two products are added to the wishlist; their names and prices are noted.
3. Browser navigates to `/wishlist`.
4. A subtitle shows "2 item(s) saved" (or equivalent phrasing reflecting the count of 2).
5. Each product card displays:
   - Product image
   - Product name matching what was noted in step 2
   - Old price (displayed with strikethrough formatting)
   - New price in LKR
6. Exactly 2 cards are displayed on the Wishlist page.

## Notes and Assumptions

- The wishlist page content and exact subtitle text are listed as unverified in the project documentation; the expected format "X item(s) saved" is based on the user story AC5.
- Prices shown on the wishlist card must match the prices visible on the product listing page.

## Defect Opportunity

- Subtitle count may not match the actual number of items displayed.
- Product name, image, or prices may be missing or incorrect on the wishlist card.
- Items may appear in a different order than they were added.
