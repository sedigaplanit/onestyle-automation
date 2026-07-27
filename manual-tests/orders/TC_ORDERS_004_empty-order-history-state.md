### Test Case ID

TC_ORDERS_004

### Test Case Title

Order History page shows correct empty state when no orders have been placed

### Feature Area

Orders

### Priority

Medium

**Rationale:** Incorrect empty state (blank page, spinner, or error) leaves a new user with no call-to-action — usability impact is significant but does not block existing order viewing.

### Preconditions

- Navigate to $BASE_URL
- User is logged in with an account that has **no previous orders** (use a freshly registered account — see TC_AUTH_004 to create one)
- Navigate to the Order History page by clicking "My Orders" in the navbar

### Test Steps

1. Read the heading and message content displayed in the main content area of the Order History page.
2. Click the "Shop Now" button.

### Expected Result

1. No order cards are displayed. The page shows the empty state with all of the following simultaneously present:
   - A 📦 icon
   - Heading: "No orders yet"
   - Message: "You haven't placed any orders. Start shopping!"
   - A "Shop Now" button
2. Clicking "Shop Now" navigates to the home page (`/`). The landing page loads correctly.

### Notes and Assumptions

- Tags: Regression
- AC5: All four empty state elements (icon, heading, message, button) must be present.
- **Important:** The standard test account ($USER_NAME = test@test.com) has a large order history. This test requires a fresh account with zero orders. Register via TC_AUTH_004 and use that account for this test run.
- The "Order History" h1 heading is expected to remain visible even in the empty state.
- Empty state structure is from AC5 specification — confirmed during live app inspection 2026-07-26 the account used had 291 orders so the empty state UI was not independently verified via live app.

### Defect Opportunity

- The empty state may not render — page may show a blank content area or an infinite loading spinner.
- The "Shop Now" button may navigate to the wrong URL (e.g. `/shop` instead of `/`).
- The "No orders yet" heading may be absent if the conditional rendering has a bug.
- The 📦 icon may be missing if the icon component fails to load.
