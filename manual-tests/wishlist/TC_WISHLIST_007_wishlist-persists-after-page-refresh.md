### Test Case ID

TC_WISHLIST_007

### Test Case Title

Wishlist items persist in localStorage after page refresh

### Feature Area

Wishlist

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- At least one product has been added to the wishlist (execute TC_WISHLIST_001 if needed)
- The wishlist count badge in the navbar shows the expected count (e.g. "♡ 1")

### Test Steps

1. Refresh the browser page (press F5 or click the browser refresh button).
2. After the page fully reloads, check the wishlist count badge in the navbar.
3. Click the ♡ navbar link to go to the Wishlist page.
4. Check the wishlist page content — heading and listed items.

### Expected Result

1. The page reloads completely.
2. The wishlist count badge in the navbar shows the same count as before the refresh (wishlist state is preserved).
3. The browser navigates to `/wishlist`.
4. The Wishlist page displays the same items that were present before the refresh — the "My Wishlist" heading (h1) is visible and the subtitle shows the correct item count.

### Notes and Assumptions

- Tags: Regression
- Wishlist state is persisted in localStorage per AC8; this is a client-side persistence mechanism
- The test verifies the wishlist survives a page reload within the same session (localStorage is not cleared on refresh)
- Tab closure and reopen (also mentioned in AC8) is not covered by this TC — it is a separate scenario

### Defect Opportunity

- Wishlist items disappear after page refresh (localStorage not written or read correctly)
- The wishlist count badge resets to 0 after refresh
- The Wishlist page shows the empty state after refresh despite items existing before reload
