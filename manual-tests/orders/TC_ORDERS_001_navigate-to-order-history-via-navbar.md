### Test Case ID

TC_ORDERS_001

### Test Case Title

Clicking "My Orders" in the navbar navigates to the Order History page

### Feature Area

Orders

### Priority

High

**Rationale:** Core navigation to a primary feature area — failure blocks users from accessing their complete purchase history.

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- The navbar displays the authenticated state: "Profile", "My Orders", and "Logout" buttons are visible

### Test Steps

1. Click the "My Orders" button in the navbar.

### Expected Result

1. The browser navigates to `/orders`. The page heading reads "Order History" (h1). A subtitle "X orders placed" is visible below the heading. At least one order card is visible on the page.

### Notes and Assumptions

- Tags: Regression
- AC1: The "My Orders" button is only visible to authenticated users.
- Subtitle format confirmed via live app inspection 2026-07-26: "X orders placed" (plural; singular "1 order placed" not confirmed).
- The URL must change to `/orders` — this is a full route navigation, not a modal.

### Defect Opportunity

- The "My Orders" button may navigate to the wrong URL (e.g. `/profile` instead of `/orders`).
- The page heading may not render if the orders component fails to load.
- The subtitle may be absent if the API call for orders fails silently.
