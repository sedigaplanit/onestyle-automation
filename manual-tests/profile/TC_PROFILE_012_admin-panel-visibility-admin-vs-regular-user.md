### Test Case ID

TC_PROFILE_012

### Test Case Title

Admin panel visible for admin user and hidden for regular user

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- **Part A (Admin user):** User is logged in as $ADMIN_EMAIL
- **Part B (Regular user):** User is logged in as $USER_NAME

### Test Steps

**Part A — Admin user:**

1. Click the "Profile" button in the navbar.
2. Wait for the profile page to load.
3. Scroll to the section between the form and the Danger Zone.
4. Locate the "Admin — Download Logs" panel heading.

**Part B — Regular user:**

5. Click the "Logout" button in the navbar.
6. Wait for the home page to load.
7. Click the "Login" link in the navbar.
8. Fill in the email field with $USER_NAME.
9. Fill in the password field with $PASSWORD.
10. Click the "Login" button.
11. Wait for the home page to load after login.
12. Click the "Profile" button in the navbar.
13. Wait for the profile page to load.
14. Scroll to the section between the form and the Danger Zone.
15. Read all headings visible between the form and the Danger Zone.

### Expected Result

**Part A:**

1. The browser navigates to `/profile`.
2. The profile page loads with admin user data.
3. The section between the form and Danger Zone is visible.
4. The "Admin — Download Logs" panel heading is visible; the admin panel is rendered.

**Part B:**

5. The "Logout" button is clicked.
6. The home page loads and authenticated-only navbar elements ("Profile", "My Orders") are no longer visible; the user is logged out.
7. The login page is shown with the login form.
8. The email field is filled with $USER_NAME.
9. The password field is filled.
10. The login button is clicked.
11. The home page loads; the "Profile" and "My Orders" buttons are visible in the navbar confirming successful login as $USER_NAME.
12. The browser navigates to `/profile`.
13. The profile page loads with $USER_NAME's data.
14. The section between the form and Danger Zone is visible.
15. No "Admin — Download Logs" heading is present in the section; only the "Danger Zone" heading is visible. The admin panel is not rendered at all.

Overall: The Admin — Download Logs panel is rendered only when the authenticated user has `is_admin: true` in their JWT. It is completely absent for regular users.

### Notes and Assumptions

- Tags: Regression
- Requires $ADMIN_EMAIL to be defined in `.env` and an admin account to exist on the server with `is_admin: true`.
- If $ADMIN_EMAIL is not configured, Part A cannot be executed — skip and log as blocked.
- Covers AC12.

### Defect Opportunity

- The admin panel might be visible to non-admin users (security defect).
- The admin panel might be hidden for admin users (feature not working).
- The panel might be rendered but invisible (e.g. CSS `display: none` not removed).
