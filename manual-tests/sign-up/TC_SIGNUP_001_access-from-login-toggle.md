# TC_SIGNUP_001 - Access Sign Up Form from Login Page Toggle

## Test Case ID

TC_SIGNUP_001

## Test Case Title

Access the Sign Up form by clicking the toggle link on the Login page

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- Browser is open

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Verify the Login form is displayed with heading "Login", Email Address field, Password field, and Login button
3. Locate the paragraph "Don't have an account? Sign Up" below the Login button
4. Click the "Sign Up" span text inside that paragraph

## Expected Result

1. The Login page loads at `/login` showing the Login form
2. Login form is visible with "Login" heading, two fields (Email Address, Password), and a Login button
3. The toggle paragraph "Don't have an account? Sign Up" is visible below the Login button
4. The form switches to Sign Up state:
   - Page URL remains `/login`
   - Heading changes to "Sign Up"
   - Sign Up form fields become visible (Name, Email, Gender, Mobile Number, Password, Confirm Password, Address)
   - A "Sign Up" submit button is displayed
   - Toggle text changes to "Already have an account? Login"

**Overall:** The Sign Up form is accessible from the Login page without navigating to a different URL.

## Notes and Assumptions

- The `/signup` route does not exist; both forms share the `/login` URL toggled by React state
- The clickable element is the `<span>` inside `.loginsignup-switch`, not the full paragraph

## Defect Opportunity

- Clicking the paragraph text outside the span may not trigger the toggle
- The URL should not change — if it navigates away, that is a defect
