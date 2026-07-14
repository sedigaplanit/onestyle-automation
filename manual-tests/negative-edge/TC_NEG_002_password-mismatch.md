# TC_NEG_002 - Sign Up Fails When Passwords Do Not Match

## Test Case ID

TC_NEG_002

## Test Case Title

Verify the Sign Up form cannot be submitted when Password and Confirm Password values do not match

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- The Sign Up form is displayed on `/login`

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Click the "Sign Up" span to display the Sign Up form
3. Fill in all required fields with valid data:
   - Name: "Test User"
   - Email: "testuser_mismatch@example.com"
   - Gender: "Female"
   - Mobile Number: "0771234567"
4. Enter "Password@123" in the Password field
5. Enter "Password@456" in the Confirm Password field (intentionally different)
6. Click the "Sign Up" button

## Expected Result

1. Login page loads; Sign Up form is displayed
2. Sign Up form is visible
3. All fields are filled in as specified
4. Password field accepts "Password@123" with characters masked
5. Confirm Password field accepts "Password@456" with characters masked
6. Form is not submitted:
   - An error message indicating the passwords do not match is displayed
   - The page remains on `/login`
   - No account is created
   - No redirect occurs

**Overall:** The Sign Up form validates that Password and Confirm Password match before allowing submission.

## Notes and Assumptions

- The mismatch error should be shown near the Confirm Password field or as a form-level error
- The error message wording is unspecified; any clear indication of mismatch is acceptable

## Defect Opportunity

- Form may submit despite mismatched passwords
- No error message displayed on mismatch
- Error message may appear only after redirect attempt rather than inline validation
