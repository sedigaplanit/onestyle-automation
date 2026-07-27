### Test Case ID

TC_WISHLIST_003

### Test Case Title

Navbar wishlist icon navigates to Wishlist page

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is on any page (Landing page used for this test)
- The wishlist navbar link (♡) is visible in the header

### Test Steps

1. Locate the wishlist link (♡) in the navbar (`getByRole('link', { name: /♡/ })`)
2. Click the wishlist link

### Expected Result

1. The wishlist link is visible in the navbar on the Landing page
2. The browser navigates to the Wishlist page
3. The page URL changes to `/wishlist`
4. The Wishlist page content is displayed (either "My Wishlist" heading with items, or "Your wishlist is empty" heading if no items are saved)

### Notes and Assumptions

- Tags: Regression
- The navbar wishlist link locator: `getByRole('link', { name: '♡' })` when count = 0; when count > 0 the accessible name includes the number (e.g. "♡ 1")
- The test applies to both authenticated and unauthenticated users — the wishlist page is accessible to all
- Use `getByRole('link', { name: /♡/ })` to match regardless of count badge

### Defect Opportunity

- Clicking the wishlist link does not navigate to `/wishlist`
- Navigation goes to a different route (e.g. `/login` or home)
- The wishlist link is not present in the navbar (missing for unauthenticated or authenticated state)
