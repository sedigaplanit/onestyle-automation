### Test Case ID

TC_PROFILE_011

### Test Case Title

Wrong password in deletion modal shows error and keeps modal open

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_009 has been executed (user knows the delete account modal opens)

### Test Steps

1. Scroll to the "Danger Zone" section.
2. Click the "Delete Account" button.
3. Wait for the deletion confirmation modal to appear.
4. Enter an incorrect password "WrongPassword999!" in the "Enter your password" field.
5. Click the "Yes, delete my account" button.
6. Wait for the server response.
7. Read the toast notification message.
8. Locate the deletion confirmation modal.

### Expected Result

1. The Danger Zone section is in view.
2. The "Delete Account" button is clicked.
3. The deletion confirmation modal is open.
4. The incorrect password is entered in the password field.
5. A `DELETE /api/auth/account` request is sent.
6. The server responds with an error (incorrect password).
7. A toast error notification is displayed with the server's error message (e.g. "Incorrect password." or equivalent).
8. The deletion confirmation modal remains open; the user can retry with the correct password.

Overall: Submitting an incorrect password in the deletion modal triggers a server error response; the error message is shown as a toast and the modal stays open so the user can retry.

### Notes and Assumptions

- Tags: Regression
- Covers AC11.
- The exact error message text is server-determined; the test validates that the modal remains open and some error toast is shown, rather than a specific message string.
- The account must NOT be deleted as a result of this test.

### Defect Opportunity

- The modal might close after a failed deletion attempt, trapping the user.
- No error toast might appear, making the failure invisible to the user.
- The account might be deleted despite the wrong password (critical security defect).
