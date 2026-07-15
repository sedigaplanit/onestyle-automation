# TC_WISH_001 — Add Product to Wishlist from Product Card

## Test Case ID

TC_WISH_001

## Test Case Title

Add a product to the wishlist by clicking the heart icon on a product card

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on the Home page (`/`)
- Wishlist is empty (wishlist badge shows 0 or is not visible)
- At least one product card is visible in any listing section

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Locate any product card that displays a heart (♡) icon.
3. Observe the heart icon state before clicking (outline / unfilled).
4. Observe the wishlist count badge on the navbar heart icon before clicking.
5. Click the heart (♡) icon on the product card.
6. Observe the heart icon state on the product card after clicking.
7. Observe the wishlist count badge on the navbar heart icon after clicking.

## Expected Result

1. Home page loads successfully with product cards visible.
2. A product card with a heart (♡) icon is found.
3. Heart icon is in the unwishlisted state (outline / unfilled / unhighlighted).
4. Wishlist badge shows 0 or is not displayed.
5. Click is registered.
6. Heart icon changes to the wishlisted state (filled / highlighted) — confirming the product is saved.
7. Wishlist count badge in the navbar increments by 1 (e.g. badge now shows 1).

## Notes and Assumptions

- The heart icon is present on product cards on the Home, Men, Women, and Kids pages.
- The badge increment should be reflected immediately without a page reload.
- No login is required to add items to the wishlist (wishlist may be persisted in localStorage).

## Defect Opportunity

- Heart icon may not change visual state after click.
- Navbar badge may not update in real-time or may not appear at all.
- Click on heart icon may trigger navigation instead of wishlist toggle.
