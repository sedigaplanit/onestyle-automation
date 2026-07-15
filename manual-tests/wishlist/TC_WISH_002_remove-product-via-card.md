# TC_WISH_002 — Remove Product from Wishlist via Product Card

## Test Case ID

TC_WISH_002

## Test Case Title

Remove a wishlisted product by clicking the heart icon again on the product card

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on the Home page (`/`)
- At least one product is already in the wishlist (heart icon on that card is in the filled / highlighted state)
- Wishlist badge in the navbar shows a count ≥ 1

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Locate a product card whose heart (♡) icon is in the wishlisted state (filled / highlighted).
3. Note the current wishlist count badge value in the navbar.
4. Click the heart icon on that product card.
5. Observe the heart icon state on the product card after clicking.
6. Observe the wishlist count badge on the navbar heart icon after clicking.

## Expected Result

1. Home page loads with product cards visible.
2. A product card with a filled/highlighted heart icon is found.
3. Wishlist badge shows a count ≥ 1.
4. Click is registered.
5. Heart icon reverts to the unwishlisted state (outline / unfilled).
6. Wishlist count badge in the navbar decrements by 1. If count reaches 0, badge disappears or shows 0.

## Notes and Assumptions

- Precondition can be established by first running TC_WISH_001 to add a product, then performing this test.
- The state reversion should happen immediately without a page reload.

## Defect Opportunity

- Heart icon may remain in filled state after second click.
- Badge may not decrement or may decrement incorrectly.
- Double-click may be required for removal on some browsers.
