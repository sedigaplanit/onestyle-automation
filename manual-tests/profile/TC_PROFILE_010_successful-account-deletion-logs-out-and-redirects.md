### Test Case ID

TC_PROFILE_010

### Test Case Title

Successful account deletion with correct password logs out and redirects to home

### Feature Area

User Profile

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- A **disposable** test account (not $USER_NAME) is logged in — use a dedicated deletion test account created specifically for this test
- The account's password is known
- The user is on the Profile page

### Test Steps

1. Scroll to the "Danger Zone" section.
2. Click the "Delete Account" button.
3. Wait for the deletion confirmation modal to appear.
4. Enter $DISPOSABLE_PASSWORD in the "Enter your password" field.
5. Click the "Yes, delete my account" button.
6. Read the label of the "Yes, delete my account" button.
7. Read whether the button is interactive (enabled or disabled).
8. Wait for the request to complete.
9. Read the toast notification message.
10. Read the current page URL.
11. Locate any authenticated-user-only navbar elements (e.g. "Profile" button, "My Orders" button).

### Expected Result

1. The Danger Zone section is in view.
2. The "Delete Account" button is clicked.
3. The deletion confirmation modal is open.
4. The password field is filled with the correct password.
5. The button is clicked and a `DELETE /api/auth/account` request is sent with the password.
6. The button label changes to "Deleting..." while the request is in progress.
7. The button is disabled (not clickable) during the request.
8. The request completes successfully.
9. A toast notification confirms the deletion (e.g. "Account deleted successfully" or similar).
10. The user is redirected to the home page (`/`).
11. Authenticated navbar elements ("Profile", "My Orders") are no longer visible; the user is logged out.

Overall: Submitting the correct password in the deletion modal sends the `DELETE` request, shows a "Deleting..." button state, displays a confirmation toast, logs the user out, and redirects to home.

### Notes and Assumptions

- Tags: Regression
- **This test is destructive** — use a dedicated disposable test account, not $USER_NAME. Define $DISPOSABLE_PASSWORD in `.env` as the password for this account.
- Use browser DevTools → Network → Throttle to "Slow 3G" before clicking "Yes, delete my account" in order to observe the "Deleting..." button state in steps 6–7.
- After this test the test account no longer exists; no teardown is needed.

### Defect Opportunity

- The deletion request might succeed on the server but the UI might not log the user out.
- The user might not be redirected to home after deletion.
- The "Deleting..." button state might not be applied, allowing double-click re-submission.
- A success toast might not appear, leaving the user uncertain about the outcome.
