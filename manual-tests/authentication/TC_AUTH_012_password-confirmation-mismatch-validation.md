### Test Case ID

TC_AUTH_012

### Test Case Title

Mismatched passwords show "Passwords do not match" error on Confirm Password field

### Feature Area

Authentication

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is not logged in
- Navigate to `$BASE_URL/login`
- Toggle to the Sign Up form by clicking the "Sign Up" span

### Test Steps

1. Fill in the "Password" field with a valid password of at least 6 characters (e.g. "Pass@123")
2. Fill in the "Confirm Password" field with a different value (e.g. "Pass@456")
3. Click the "Sign Up" button

### Expected Result

1. The Password field accepts "Pass@123" without error
2. The Confirm Password field accepts "Pass@456" without error
3. After clicking "Sign Up":
   - The form is not submitted
   - An inline validation error "Passwords do not match" is shown below the Confirm Password field
   - The Password field retains its value and shows no error
   - No toast notification appears
   - No navigation occurs

### Notes and Assumptions

- Tags: Regression
- The error is on the Confirm Password field, not the Password field, per AC11
- Locators: `getByRole('textbox', { name: 'Password', exact: true })` for Password; `getByRole('textbox', { name: 'Confirm Password' })` for Confirm Password

### Defect Opportunity

- Form submits despite mismatched passwords (validation not enforced)
- The error "Passwords do not match" appears on the Password field instead of Confirm Password
- The error message text differs from "Passwords do not match"
- Both password fields are cleared after the mismatch error is shown
