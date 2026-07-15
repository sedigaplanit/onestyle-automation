# TC_WISH_008 — Wishlist Persisted in localStorage After Refresh

## Test Case ID

TC_WISH_008

## Test Case Title

Wishlist items are retained after browser refresh and after closing and reopening the tab

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on the Home page (`/`)
- Wishlist is empty

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Add two products to the wishlist by clicking the heart icon on two distinct product cards. Note the names of both products.
3. Confirm the wishlist badge in the navbar shows 2.
4. Open browser DevTools → Application → Local Storage → find the entry for `https://sedigaplanit.github.io` and confirm a wishlist key is present with the two product entries.
5. Press `F5` (or `Ctrl+R`) to refresh the page.
6. Observe the wishlist badge in the navbar after the refresh.
7. Navigate to `/wishlist` and confirm the two products are still listed.
8. Close the browser tab entirely.
9. Reopen a new tab and navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot`.
10. Observe the wishlist badge in the navbar.
11. Navigate to `/wishlist` and confirm the two products are still listed.

## Expected Result

1. Home page loads.
2. Two products added; names noted.
3. Badge shows 2.
4. LocalStorage contains the wishlist key with both product entries.
5. Page refresh completes.
6. Badge still shows 2 after refresh.
7. Both products are displayed on the Wishlist page with correct names.
8. Tab is closed.
9. New tab opens and the app loads.
10. Badge still shows 2.
11. Both products are still displayed on the Wishlist page.

## Notes and Assumptions

- localStorage persists across page refreshes and tab sessions within the same browser profile.
- If the app uses sessionStorage instead of localStorage, items would be lost after the tab is closed — this would be a defect against AC8.

## Defect Opportunity

- Wishlist may reset on page refresh (indicating sessionStorage or in-memory state is used instead of localStorage).
- Wishlist may persist on refresh but be lost when the tab is closed and reopened.
- localStorage key name may differ from expectations — record the actual key name found.
