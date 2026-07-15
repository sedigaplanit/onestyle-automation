# TC_WISH_011 — Wishlist Heart State Persists After Navigating Between Pages

## Test Case ID

TC_WISH_011

## Test Case Title

Heart icon fill state on a product card remains consistent when navigating away and back to the same page

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on the Home page (`$BASE_URL`)
- Wishlist is empty

## Test Steps

1. Navigate to `$BASE_URL` (Home page).
2. Add the first product card's heart icon to the wishlist — heart becomes filled. Note the product name.
3. Navigate to the Men page (`$BASE_URL/mens`).
4. Navigate back to the Home page (`$BASE_URL`) using the browser's **Back** button.
5. Observe the heart icon state on the product card noted in step 2.
6. Observe the wishlist badge in the navbar.
7. Navigate to `$BASE_URL/womens` and then back to `$BASE_URL` using the navbar link (not Back button).
8. Observe the heart icon state on the same product card.
9. Observe the wishlist badge in the navbar.

## Expected Result

1. Home page loads with product cards.
2. Heart icon on the selected card becomes filled; badge shows 1.
3. Men page loads.
4. Browser navigates back to the Home page.
5. Heart icon on the product card noted in step 2 is still **filled** (state preserved).
6. Wishlist badge still shows 1.
7. Women page loads and then Home page reloads via navbar link.
8. Heart icon on the same product card is still **filled**.
9. Wishlist badge still shows 1.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- State persistence across navigation is critical for UX — losing wishlist visual state on page re-render would be a defect even if localStorage is intact.
- Covers both browser Back button navigation and in-app navbar navigation.

## Defect Opportunity

- Heart icon may revert to unfilled when the page component re-renders after navigation.
- Badge may reset to 0 after navigating away and back even though localStorage still contains the item.
- State may be preserved via Back button (cached render) but lost on fresh in-app navigation.
