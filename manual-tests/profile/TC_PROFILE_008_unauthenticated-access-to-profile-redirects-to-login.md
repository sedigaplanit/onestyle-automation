### Test Case ID

TC_PROFILE_008

### Test Case Title

Unauthenticated user navigating directly to /profile is redirected to /login

### Feature Area

User Profile

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is NOT logged in (no active session)

### Test Steps

1. Fill in the browser address bar with $BASE_URL/profile.
2. Press Enter to load the URL.
3. Wait for the page to settle.
4. Read the current URL.
5. Read the page content to confirm the profile page is not displayed.

### Expected Result

1. The browser address bar shows $BASE_URL/profile.
2. The browser sends a request to the `/profile` route.
3. The page settles.
4. The current URL changes to `/login` (the user is redirected automatically).
5. The profile page content ("My Profile" heading, form fields, Danger Zone) is not visible; the login form is shown instead.

Overall: An unauthenticated user attempting to access `/profile` directly via URL is redirected to the login page; the profile content is never rendered.

### Notes and Assumptions

- Tags: Regression
- This is a direct URL access test covering AC8.
- To ensure the user is not logged in, clear browser session storage/local storage or use a private/incognito window.
- This is the only test where URL navigation in the steps is intentional (direct URL access test).

### Defect Opportunity

- The profile page might render briefly before redirecting, exposing protected content.
- The redirect might go to the home page instead of `/login`.
- No redirect occurs at all, leaving the profile page accessible without authentication.
