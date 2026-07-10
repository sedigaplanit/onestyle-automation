### Test Case ID: TC_SIGNUP_001

Title: Register a new user with username, email, and password
User Story Reference: 1
Priority: High
Preconditions:

- The application homepage is accessible.
- The user is not logged in.
- The Sign Up or Register flow is available.
  Test Steps:

1. Navigate to the homepage.
2. Click the Sign Up or Register link/button.
3. Enter a valid username.
4. Enter a valid email address.
5. Enter a valid password.
6. Submit the registration form.
   Expected Result:
7. Homepage loads successfully.
8. Sign Up form or registration page is displayed.
9. Username field accepts the input.
10. Email field accepts the valid email.
11. Password field accepts the input.
12. Signup form is submitted successfully.
    The application accepts the signup form.
    A confirmation or welcome message is displayed.
    The user is either logged in automatically or redirected to a login confirmation page.
    Notes / Assumptions:

- If the app only supports these fields, do not expect a confirm-password field.
  Defect Opportunity:
- Missing or invalid validation for username, email, and password fields.
- Sign up flow fails silently or does not return a clear success state.
