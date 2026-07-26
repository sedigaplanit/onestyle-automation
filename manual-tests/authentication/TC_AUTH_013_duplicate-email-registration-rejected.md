### Test Case ID

TC_AUTH_013

### Test Case Title

Registration with already-registered email shows duplicate email toast error

### Feature Area

Authentication

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is not logged in
- Navigate to `$BASE_URL/login`
- Toggle to the Sign Up form by clicking the "Sign Up" span
- An account with email $USER_NAME already exists in the system

### Test Steps

1. Fill in the "Your Name" field with a valid name (e.g. "Test User")
2. Fill in the "Email Address" field with an email already registered: $USER_NAME
3. Select a gender from the Gender dropdown (e.g. "Female")
4. Fill in the "Mobile Number" field with a valid number (e.g. "+94712345678")
5. Fill in the "Password" field with a valid password (e.g. "Pass@123")
6. Fill in the "Confirm Password" field with the same password (e.g. "Pass@123")
7. Click the "Sign Up" button

### Expected Result

1. The "Your Name" field accepts "Test User"
2. The Email Address field accepts $USER_NAME; no inline validation error appears
3. The Gender dropdown shows the selected gender (e.g. "Female")
4. The Mobile Number field accepts the valid number; no error appears
5. The Password field accepts the value; no error appears
6. The Confirm Password field accepts the matching value; no error appears
7. A toast error notification is displayed: "Email already registered."
8. No new account is created
9. The user remains on the `/login` page with the Sign Up form still visible
10. All previously entered field values are retained in the form
11. No navigation to the Landing page occurs

### Notes and Assumptions

- Tags: Regression
- The pre-existing account email is $USER_NAME — this account is seeded in the environment and persists across runs
- The error appears as a toast notification (not an inline field error), per AC12
- Do NOT hardcode the email address — use $USER_NAME

### Defect Opportunity

- A duplicate account is created despite the email already existing
- The toast shows a generic error message rather than "Email already registered."
- The error appears as an inline field error on the Email field instead of a toast
- Form fields are cleared after the error, requiring re-entry
- The user is redirected away from the form after the error
