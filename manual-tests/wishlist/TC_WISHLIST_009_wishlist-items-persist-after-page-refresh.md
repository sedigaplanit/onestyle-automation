### Test Case ID

TC_WISHLIST_009

### Test Case Title

Wishlist items persist in localStorage after browser page refresh

### Feature Area

Wishlist Management

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- Wishlist is empty at test start

### Test Steps

1. Locate a product card on the landing page.
2. Click the ♡ (heart) button on the first product card in the "POPULAR IN WOMEN" section.
3. Read the wishlist badge count in the navbar (expected: "1").
4. Click the ♡ wishlist link in the navbar.
5. Read the count of product cards displayed on the Wishlist page (expected: 1).
6. Note the product name displayed on the wishlist card.
7. Press F5 to refresh the page.
8. Wait for the page to reload completely.
9. Read the count of product cards on the Wishlist page after reload.
10. Read the product name on the wishlist card after reload.

### Expected Result

1. A product card is visible on the landing page.
2. The heart icon on the product card fills (♥); the product is added to the wishlist.
3. The navbar badge shows "1".
4. The browser navigates to the Wishlist page showing 1 item.
5. One product card is displayed.
6. The product name is noted.
7. The page begins reloading.
8. The Wishlist page is displayed again after reload.
9. One product card is still displayed (the wishlist was not cleared by the refresh).
10. The product name after reload matches the name noted in step 6.

Overall: wishlist data is stored in localStorage and persists across page refreshes, so wishlisted items are still present after the browser reloads the page.

### Notes and Assumptions

- Tags: Regression
- Wishlist persistence uses browser localStorage — no backend sync is involved.
- This test verifies that the React app correctly reads wishlist state from localStorage on mount.
- Known issue: see BUG_CHECKOUT_003_wishlist-page-does-not-fetch-on-navigation.md — if items disappear on navigation (not refresh), that is a separate defect from persistence failure on refresh.

### Defect Opportunity

- Wishlist data may be stored in memory only and lost on page refresh.
- localStorage write may succeed but the React app may fail to read it on remount.
- The wishlist page may show an empty state after refresh despite items being in localStorage.
