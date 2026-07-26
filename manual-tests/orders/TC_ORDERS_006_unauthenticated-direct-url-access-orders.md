### Test Case ID

TC_ORDERS_006

### Test Case Title

Unauthenticated user accessing /orders directly sees no order data

### Feature Area

Orders

### Priority

High

**Rationale:** Auth gate on a data endpoint — exposing order data to unauthenticated users is a security and privacy concern, not merely a usability issue.

### Preconditions

- Navigate to $BASE_URL
- User is **not** logged in (logged out or a fresh browser session with no stored auth state)
- The navbar shows the unauthenticated state: "Login" / "Sign Up" visible; "My Orders" is absent

### Test Steps

1. Enter `$BASE_URL/orders` in the browser address bar.
2. Press Enter.
3. Press F12 to open browser DevTools.
4. Click the "Network" tab in DevTools.
5. Locate the `GET /api/orders` request in the Network log.
6. Note the response status code shown for that request.
7. Read the page body for any visible order cards or order count labels.

### Expected Result

1. The URL `$BASE_URL/orders` is entered in the address bar.
2. The browser navigates to `/orders` and the page loads. No redirect to `/login` occurs.
3. Browser DevTools opens.
4. The Network tab is active and the request log is visible.
5. The `GET /api/orders` request is visible in the Network log.
6. The status code is 401 Unauthorised. Per AC7, the server has correctly rejected the unauthenticated request.
7. No order cards and no "X orders placed" subtitle are visible on the page.

### Notes and Assumptions

- Tags: Regression
- AC7: This is a Direct URL Access test — entering the URL directly is intentional; it is the test scenario.
- **Known defect (AC7):** The frontend does NOT redirect unauthenticated users to `/login`. It renders an empty order state at `/orders` without changing the URL. This is inconsistent with the `/profile` route, which does redirect. Report as a defect if no redirect occurs.
- Confirmed via live app inspection 2026-07-26: the page stays at `/orders` with no redirect; the 401 response suppresses order data.

### Defect Opportunity

- **Known defect:** No redirect to `/login` for unauthenticated users — the URL stays at `/orders` instead of redirecting (inconsistent with `/profile` route guard).
- Order data from another session may be visible if the auth token check is missing or a cached response is served.
- The page may render a perpetual loading spinner instead of an empty state when the 401 is received.
