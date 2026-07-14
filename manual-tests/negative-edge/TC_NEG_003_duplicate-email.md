# TC_NEG_003 - Sign Up Fails with a Duplicate Email Address

## Test Case ID

TC_NEG_003

## Test Case Title

Verify the Sign Up form cannot be submitted with an email address that is already registered

## Feature Area

Sign Up

## Priority

High

## Preconditions

- User is not logged in
- A registered account already exists with email "test@test.com"
- The Sign Up form is displayed on `/login`

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
2. Click the "Sign Up" span to display the Sign Up form
3. Fill in all required fields:
   - Name: "Duplicate User"
   - Email: "test@test.com" (already registered account)
   - Gender: "Male"
   - Mobile Number: "0779876543"
   - Password: "Password@123"
   - Confirm Password: "Password@123"
4. Click the "Sign Up" button

## Expected Result

1. Login page loads; Sign Up form is displayed
2. Sign Up form is visible
3. All fields are filled in as specified with the duplicate email "test@test.com"
4. After clicking "Sign Up":
   - Form is not submitted
   - An error message indicating the email address is already in use is displayed
   - The page remains on `/login`
   - No new account is created

**Overall:** The application prevents duplicate registrations by rejecting an email address that is already associated with an existing account.

## Notes and Assumptions

- The account with "test@test.com" is a known pre-existing test account used across tests
- The exact error message wording is unspecified; any clear indication that the email is already registered is acceptable

## Defect Opportunity

- Form may accept duplicate email and create a second account
- No error message displayed for duplicate email
- Application may silently redirect or show a generic error instead of a specific "email already in use" message
