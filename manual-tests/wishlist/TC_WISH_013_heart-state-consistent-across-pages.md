# TC_WISH_013 — Wishlist Heart Icon Reflects Correct State on Category Pages (Men / Women / Kids)

## Test Case ID

TC_WISH_013

## Test Case Title

Heart icon fill state is consistent for the same product when viewed across different listing pages

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- User is on the Home page (`$BASE_URL`)
- Wishlist is empty
- The same product must appear on at least two different listing pages (e.g., Home and Women) — if this is not the case, skip this test and note it as not applicable

## Test Steps

1. Navigate to `$BASE_URL` (Home page).
2. Locate a product card in the "POPULAR IN WOMEN" section or any section that also appears on the Women listing page. Note the product name.
3. Click the heart icon on that product card — heart becomes filled.
4. Confirm the wishlist badge increments to 1.
5. Navigate to the Women page (`$BASE_URL/womens`).
6. Locate the same product by name in the Women listing.
7. Observe the heart icon state on that product card.
8. Navigate back to `$BASE_URL` (Home page).
9. Locate the original product card.
10. Observe its heart icon state.

## Expected Result

1. Home page loads with product cards.
2. A product that also appears on the Women page is identified.
3. Heart icon on the Home page card becomes filled.
4. Badge shows 1.
5. Women page (`/womens`) loads.
6. The same product card is found by name.
7. Heart icon on the Women page card is also **filled** — wishlist state is shared across all listing views for the same product.
8. Home page loads.
9. Original product card is found.
10. Heart icon is still **filled**.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- If a product does not appear on multiple pages, test with any category listing page (e.g., add from Men, verify badge and state when navigating to Men page after returning from Women).
- The wishlist state key should be product ID, not listing position, so the same product must show the same state regardless of which page renders its card.

## Defect Opportunity

- Heart icon on the Women page may show unfilled even though the product is in the wishlist (per-page isolated state instead of shared state by product ID).
- Badge count may be doubled if the same product is treated as a separate entry per listing page.
