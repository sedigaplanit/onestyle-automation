### Test Case ID

TC_AUTH_011

### Test Case Title

Password with fewer than 6 characters shows minimum length error

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

1. Click into the "Password" field
2. Enter exactly 5 characters (e.g. "Pass1")
3. Click out of the field (lose focus) or click the "Sign Up" button

### Expected Result

1. The Password field accepts the 5-character input without an immediate inline error
2. The 5-character value is held in the field
3. An inline validation error "Must be 6 characters or more" appears below the "Password" field
4. The form is not submitted; the page remains on `/login` with the Sign Up form visible
5. No toast notification appears and no navigation occurs

### Notes and Assumptions

- Tags: Regression
- Boundary: 5 characters is below the minimum (6); the failing boundary is at ≤5 characters
- A complementary boundary check: entering exactly 6 characters should pass without this error
- Locator for the Password field (use `exact: true` to avoid matching Confirm Password): `getByRole('textbox', { name: 'Password', exact: true })`

### Defect Opportunity

- No error appears for a 5-character password (minimum length not enforced)
- Error message text differs from "Must be 6 characters or more"
- The Confirm Password field is incorrectly targeted instead of Password
- A 1-character password is accepted without error
