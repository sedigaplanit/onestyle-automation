### Test Case ID

TC_WISHLIST_004

### Test Case Title

Clicking wishlist icon in navbar navigates to the Wishlist page

### Feature Area

Wishlist Management

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- The landing page is displayed

### Test Steps

1. Locate the ♡ wishlist link in the navbar.
2. Click the ♡ wishlist link in the navbar.
3. Read the current page URL.
4. Locate the main content heading on the page.

### Expected Result

1. The ♡ wishlist link is visible in the navbar (locator: `getByRole('link', { name: '♡' })`).
2. The browser navigates away from the landing page.
3. The URL ends with `/wishlist`.
4. The page displays either the "My Wishlist" heading (h1) if items are present, or the "Your wishlist is empty" heading (h2) if the wishlist is empty.

Overall: clicking the wishlist navbar icon correctly routes the user to `/wishlist`.

### Notes and Assumptions

- Tags: Regression
- This test is valid for both authenticated and unauthenticated users since `/wishlist` does not require authentication per the app route map.
- Executed here with an authenticated user for consistency with other wishlist tests.
- Navbar wishlist link locator: `getByRole('link', { name: '♡' })`.

### Defect Opportunity

- Clicking the navbar wishlist link may navigate to an incorrect route.
- The page may not load (404 or blank state).
- The page may redirect to login despite not requiring authentication.
