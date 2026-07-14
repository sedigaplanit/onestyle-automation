# TC_SIGNUP_003 - Verify All Sign Up Form Fields Are Present

## Test Case ID

TC_SIGNUP_003

## Test Case Title

Verify all required and optional Sign Up form fields are present with correct types and placeholders

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- The Sign Up form is displayed (navigate to `/login` and click the "Sign Up" toggle)

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Click the "Sign Up" span in the "Don't have an account? Sign Up" paragraph to display the Sign Up form
3. Verify the Name field is present (text input, placeholder: "Your Name")
4. Verify the Email field is present (email input, placeholder: "Email Address")
5. Verify the Gender dropdown is present with the following options: Select Gender, Male, Female, Other, Prefer not to say
6. Verify the Mobile Number field is present (tel input, placeholder: "Mobile Number")
7. Verify the Password field is present (password input, placeholder: "Password")
8. Verify the Confirm Password field is present (password input, placeholder: "Confirm Password")
9. Verify the Address field is present (text input, placeholder: "Address (optional)")
10. Verify the "Sign Up" submit button is present

## Expected Result

1. Login page loads at `/login`
2. Sign Up form is displayed with heading "Sign Up"
3. Name field is visible with placeholder "Your Name"
4. Email field is visible with placeholder "Email Address"
5. Gender dropdown is visible with default option "Select Gender" and options Male, Female, Other, Prefer not to say
6. Mobile Number field is visible with placeholder "Mobile Number"
7. Password field is visible with placeholder "Password" and characters masked
8. Confirm Password field is visible with placeholder "Confirm Password" and characters masked
9. Address field is visible with placeholder "Address (optional)"
10. A "Sign Up" button is present and clickable

**Overall:** All 7 form fields and the submit button are present, correctly typed, and display the correct placeholder text.

## Notes and Assumptions

- Address is the only optional field; all other fields are required
- Gender defaults to "Select Gender" which is not a valid gender selection for submission

## Defect Opportunity

- Any field missing, incorrectly labelled, or showing wrong placeholder text
- Gender dropdown missing one of the specified options
- Password fields not masking input characters
