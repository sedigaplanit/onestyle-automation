### Test Case ID

TC_WISHLIST_006

### Test Case Title

Empty wishlist page displays correct empty state elements

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- The wishlist is empty (no products have been added, or all have been removed)
- Navigate to `$BASE_URL/wishlist`

### Test Steps

1. Check the page heading displayed on the Wishlist page.
2. Check the descriptive message and the "Start Shopping" button.
3. Click the "Start Shopping" button.

### Expected Result

1. The page is on `/wishlist`; the "My Wishlist" heading (h1) is **not** visible. The heading reads "Your wishlist is empty" (`getByRole('heading', { level: 2, name: 'Your wishlist is empty' })`).
2. The descriptive message "Save items you love by clicking the heart on any product." is displayed. The "Start Shopping" button is visible (`getByRole('button', { name: 'Start Shopping' })`).
3. Clicking "Start Shopping" navigates to the home page (`/`).

### Notes and Assumptions

- Tags: Regression
- The empty state heading is an h2 (level 2); the non-empty state heading is an h1 (level 1) — verifying level is important for asserting the correct state
- The heart icon (♡) is also part of the empty state UI per AC7 — verify it is visible as a decorative element
- If the wishlist is not empty before the test, remove all items using TC_WISHLIST_002 steps first

### Defect Opportunity

- The empty state heading does not appear (page shows blank or loading state)
- The description text is incorrect or missing
- The "Start Shopping" button is missing or does not navigate to the home page
- The empty state (h2) heading remains visible even when items are present (state not updated)
