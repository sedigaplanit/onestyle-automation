# TC_NEG_004 - Sign Up Fails with an Invalid Email Format

## Test Case ID

TC_NEG_004

## Test Case Title

Verify the Sign Up form rejects an improperly formatted email address

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
3. Fill in all required fields with valid data except Email:
   - Name: "Test User"
   - Gender: "Other"
   - Mobile Number: "0771234567"
   - Password: "Password@123"
   - Confirm Password: "Password@123"
4. Enter "notanemail" in the Email field (no @ symbol)
5. Click the "Sign Up" button
6. Clear the Email field and enter "missing@domain" (no TLD)
7. Click the "Sign Up" button
8. Clear the Email field and enter "@nodomain.com" (no local part)
9. Click the "Sign Up" button

## Expected Result

1. Login page loads; Sign Up form is displayed
2. Sign Up form is visible
3. All other fields are filled in correctly
4. Email field accepts "notanemail" as input
5. Form is not submitted; an email format validation error is displayed near the Email field
6. Email field is updated to "missing@domain"
7. Form is not submitted; an email format validation error is displayed
8. Email field is updated to "@nodomain.com"
9. Form is not submitted; an email format validation error is displayed

**Overall:** The application validates email format on the Sign Up form and prevents submission of any value that does not conform to a valid email address structure.

## Notes and Assumptions

- Browser-native HTML5 email validation may handle some of these cases automatically
- The exact error message wording is unspecified; any clear indication of invalid format is acceptable

## Defect Opportunity

- Form may submit with an invalid email format
- Validation may only trigger after attempting to submit, not on blur/change
- Some invalid formats may pass validation (e.g. "missing@domain" may be accepted by some validators)
