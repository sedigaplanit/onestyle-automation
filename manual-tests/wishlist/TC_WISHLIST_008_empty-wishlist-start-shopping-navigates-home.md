### Test Case ID

TC_WISHLIST_008

### Test Case Title

Start Shopping button on empty wishlist navigates to the home page

### Feature Area

Wishlist Management

### Priority

Low

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- The wishlist is empty
- User is on the Wishlist page (`/wishlist`) displaying the empty state (TC_WISHLIST_007 has been executed)

### Test Steps

1. Locate the "Start Shopping" button on the empty wishlist page.
2. Click the "Start Shopping" button.
3. Read the current page URL.
4. Locate the main hero section on the landing page.

### Expected Result

1. The "Start Shopping" button is visible on the empty wishlist page.
2. The browser navigates away from the Wishlist page.
3. The URL is the base URL (`/`) — the home page.
4. The landing page hero section is displayed (e.g. "Discover New Collections" heading is visible).

Overall: clicking "Start Shopping" from the empty wishlist state redirects the user to the home page.

### Notes and Assumptions

- Tags: Regression
- "Start Shopping" button locator: `getByRole('button', { name: 'Start Shopping' })`.
- Navigation target is documented as `/` in `09-wishlist.json` (`startShoppingButton.navigatesTo: "/"`).

### Defect Opportunity

- "Start Shopping" button may not trigger navigation.
- The button may navigate to an incorrect route (e.g. `/shop` or `/womens` instead of `/`).
