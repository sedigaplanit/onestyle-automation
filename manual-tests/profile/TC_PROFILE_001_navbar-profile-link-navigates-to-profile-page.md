### Test Case ID

TC_PROFILE_001

### Test Case Title

Navbar "Profile" button navigates authenticated user to the profile page

### Feature Area

User Profile

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME

### Test Steps

1. Locate the "Profile" button in the top navigation bar.
2. Click the "Profile" button.
3. Wait for the profile page to load.
4. Read the page heading.

### Expected Result

1. The "Profile" button is visible in the navbar.
2. The browser navigates to `/profile`.
3. The profile page loads with the heading "My Profile".
4. The heading text reads "My Profile".

Overall: An authenticated user clicking the navbar "Profile" button is taken to the `/profile` page displaying their account information.

### Notes and Assumptions

- Tags: Regression
- The "Profile" button is only visible in the navbar when the user is authenticated.
- Navigation is implemented as a link; no page reload is expected (SPA routing).

### Defect Opportunity

- Navbar link could be missing or broken for authenticated sessions.
- Route could redirect to an error page or home instead of `/profile`.
