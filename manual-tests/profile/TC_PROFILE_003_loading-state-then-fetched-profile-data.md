### Test Case ID

TC_PROFILE_003

### Test Case Title

Profile page shows loading state then displays fetched profile data

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME

### Test Steps

1. Click the "Profile" button in the navbar.
2. Wait for the loading indicator to appear.
3. Read any loading text displayed in place of the form.
4. Wait for the "Loading profile..." text to disappear.
5. Wait for the profile form to render.
6. Read the value in the "Full Name" input field.
7. Read the selected value in the "Gender" dropdown.
8. Read the value in the "Mobile Number" input field.

### Expected Result

1. The browser navigates to `/profile`.
2. A "Loading profile..." message is displayed while the server request (`GET /api/auth/me`) is in progress.
3. The loading text reads "Loading profile...".
4. The "Loading profile..." text is no longer visible.
5. The profile form is now rendered on the page; the loading state has been replaced by the form fields.
6. The "Full Name" field reflects the value stored on the server (not stale JWT data).
7. The "Gender" dropdown reflects the value stored on the server.
8. The "Mobile Number" field reflects the value stored on the server.

Overall: Navigating to the profile page triggers a fresh `GET /api/auth/me` fetch; a loading state is shown during the request; the form is populated with the server's current values once the fetch completes.

### Notes and Assumptions

- Tags: Regression
- The loading state may flash briefly on fast connections; if it is not observed, re-test on a throttled network (Network tab → Slow 3G in DevTools).
- Covers both AC3 (fresh data fetch) and AC4 (loading state) as both are part of the same page-load sequence.

### Defect Opportunity

- Loading state might never appear (data loaded from stale cache without a server fetch).
- Loading state might persist indefinitely if the API request fails silently.
- Form might display stale JWT values instead of the latest server values.
