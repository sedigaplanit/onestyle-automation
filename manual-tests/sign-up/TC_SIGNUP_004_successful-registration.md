# TC_SIGNUP_004 - Successful Registration with Valid Data

## Test Case ID

TC_SIGNUP_004

## Test Case Title

Successfully create a new account with all required fields filled in with valid data

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- The email address used for registration has not been previously registered
- Browser is open

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Click the "Sign Up" span in the "Don't have an account? Sign Up" paragraph
3. Enter a valid name in the Name field (e.g. "Test User")
4. Enter a unique valid email address in the Email field (e.g. "testuser_[timestamp]@example.com")
5. Select a gender from the Gender dropdown (e.g. "Male")
6. Enter a valid mobile number in the Mobile Number field (e.g. "0771234567")
7. Enter a valid password in the Password field (e.g. "Password@123")
8. Enter the same password in the Confirm Password field (e.g. "Password@123")
9. Leave the Address field empty (it is optional)
10. Click the "Sign Up" button

## Expected Result

1. Login page loads at `/login`
2. Sign Up form is displayed with heading "Sign Up"
3. Name field accepts the input "Test User"
4. Email field accepts the input without error
5. Gender dropdown shows the selected option "Male"
6. Mobile Number field accepts the input
7. Password field accepts the input with characters masked
8. Confirm Password field accepts the input with characters masked
9. Address field remains empty
10. After clicking "Sign Up":
    - Account is created successfully
    - User is redirected to the Landing page (`/`)
    - The navbar displays Profile, My Orders, and Logout buttons (authenticated state)
    - The Login button is no longer visible in the navbar

**Overall:** A new user can successfully register and is immediately authenticated and redirected to the Landing page.

## Notes and Assumptions

- Use a unique email address each time this test is executed to avoid duplicate email errors
- Address field is intentionally left blank to verify it is truly optional

## Defect Opportunity

- Redirect may not occur after successful sign up
- Authenticated nav (Profile / My Orders / Logout) may not appear after registration
- Session may not persist after redirect
