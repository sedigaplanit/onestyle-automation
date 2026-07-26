### Test Case ID

TC_AUTH_007

### Test Case Title

Name field with fewer than 3 characters shows minimum length error

### Feature Area

Authentication

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is not logged in
- Navigate to `$BASE_URL/login`
- Toggle to the Sign Up form by clicking the "Sign Up" span

### Test Steps

1. Click into the "Your Name" field
2. Enter exactly 2 characters (e.g. "Ab")
3. Click out of the field (lose focus) or click the "Sign Up" button

### Expected Result

1. The Name field accepts the 2-character input without an immediate inline error
2. The 2-character input is held in the field
3. An inline validation error "Must be 3 characters or more" appears below the "Your Name" field
4. The form is not submitted; the page remains on `/login` with the Sign Up form visible
5. No toast notification appears and no navigation occurs

### Notes and Assumptions

- Tags: Regression
- Boundary: 2 characters is below the minimum (3); test with exactly 2 characters
- A complementary boundary check with exactly 3 characters should pass — this TC targets the failing boundary
- The error may appear on blur (focus loss) or only on submit-click, per AC6

### Defect Opportunity

- No error appears for a 2-character name (minimum length not enforced)
- Error message text differs from "Must be 3 characters or more"
- The error appears immediately on keystroke rather than on blur/submit
- A 1-character name or empty value also triggers this same error (regression on AC5)
