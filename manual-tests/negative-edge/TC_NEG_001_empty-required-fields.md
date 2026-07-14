# TC_NEG_001 - Sign Up Fails When Required Fields Are Empty

## Test Case ID

TC_NEG_001

## Test Case Title

Verify the Sign Up form cannot be submitted with one or more required fields left empty

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
3. Leave all fields empty and click the "Sign Up" button
4. Observe the result
5. Enter a valid name in the Name field only, leave all other required fields empty, and click "Sign Up"
6. Observe the result
7. Fill in all required fields except Mobile Number, leave Mobile Number empty, and click "Sign Up"
8. Observe the result

## Expected Result

1. Login page loads; Sign Up form is displayed
2. Sign Up form is visible
3. Form is not submitted; validation messages are displayed for each empty required field (Name, Email, Mobile Number, Password, Confirm Password)
4. The page remains on `/login`; no redirect occurs
5. Form is not submitted; validation message is shown for the empty Email field (and other remaining empty required fields)
6. The page remains on `/login`
7. Form is not submitted; validation message is shown for the empty Mobile Number field
8. The page remains on `/login`

**Overall:** The Sign Up form enforces that all required fields must be filled before submission.

## Notes and Assumptions

- Address is optional and should not trigger a validation error when empty
- Gender left at default "Select Gender" may or may not be treated as an empty/invalid selection — observe and note actual behaviour

## Defect Opportunity

- Form may submit despite empty required fields
- Validation messages may not appear for all empty fields simultaneously
- Gender dropdown default "Select Gender" may be accepted as a valid submission
