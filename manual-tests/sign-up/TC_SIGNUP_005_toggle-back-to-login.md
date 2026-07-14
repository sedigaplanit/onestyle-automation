# TC_SIGNUP_005 - Toggle Back to Login Form from Sign Up

## Test Case ID

TC_SIGNUP_005

## Test Case Title

Switch back to the Login form from the Sign Up form using the toggle link

## Feature Area

Sign Up

## Priority

Medium

## Preconditions

- User is not logged in
- The Sign Up form is currently displayed on `/login`

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Click the "Sign Up" span in the "Don't have an account? Sign Up" paragraph to display the Sign Up form
3. Verify the Sign Up form is visible with heading "Sign Up"
4. Locate the paragraph "Already have an account? Login" below the Sign Up button
5. Click the "Login" link/span in that paragraph

## Expected Result

1. Login page loads at `/login` with the Login form
2. Sign Up form is displayed with heading "Sign Up"
3. Sign Up form is confirmed visible
4. The toggle paragraph "Already have an account? Login" is visible below the Sign Up button
5. The form switches back to Login state:
   - Page URL remains `/login`
   - Heading changes back to "Login"
   - Login form fields are displayed (Email Address, Password)
   - Login button is displayed
   - Toggle text changes back to "Don't have an account? Sign Up"

**Overall:** A user can freely toggle between the Login and Sign Up forms without navigating away from `/login`.

## Notes and Assumptions

- The URL must not change when toggling between forms
- Any data entered in the Sign Up form before toggling back may or may not be retained — this behaviour is unspecified

## Defect Opportunity

- Toggle may navigate to a different URL instead of switching the form state
- Login form fields may not render correctly after toggling back
