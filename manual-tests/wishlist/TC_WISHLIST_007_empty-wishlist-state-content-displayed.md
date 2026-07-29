### Test Case ID

TC_WISHLIST_007

### Test Case Title

Empty wishlist state displays correct content — icon, heading, and message

### Feature Area

Wishlist Management

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- The wishlist is empty (no items have been added, or all items have been removed)

### Test Steps

1. Click the ♡ wishlist link in the navbar.
2. Locate the heart icon displayed in the empty state area.
3. Read the heading text displayed on the page.
4. Read the descriptive message text displayed below the heading.
5. Locate the "Start Shopping" button.

### Expected Result

1. The browser navigates to the Wishlist page (`/wishlist`).
2. A heart icon (♡) is displayed in the empty state area.
3. The heading reads exactly: "Your wishlist is empty".
4. The message reads exactly: "Save items you love by clicking the heart on any product."
5. A "Start Shopping" button is visible on the page.

Overall: when the wishlist contains no items, the page displays a complete empty state with a heart icon, the correct heading, the correct descriptive message, and a "Start Shopping" CTA button.

### Notes and Assumptions

- Tags: Regression
- Empty state heading locator: `getByRole('heading', { level: 2, name: 'Your wishlist is empty' })`.
- "Start Shopping" button locator: `getByRole('button', { name: 'Start Shopping' })`.
- The "My Wishlist" h1 heading should NOT be present in the empty state; only the empty state h2 heading is shown.
- This state is applicable for both authenticated and unauthenticated users (wishlist is localStorage-based).

### Defect Opportunity

- Empty state may not display when the wishlist is empty (e.g. shows a blank grid instead).
- Heading or message text may differ from the expected exact wording.
- The "Start Shopping" button may be absent or non-functional.
