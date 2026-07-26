### Test Case ID

TC_AUTH_010

### Test Case Title

Invalid mobile number format in Sign Up form shows validation error

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

1. Click into the "Mobile Number" field
2. Enter a value that does not match the expected mobile format (e.g. "abc" — alphabetic characters only)
3. Click out of the field (lose focus) or click the "Sign Up" button

### Expected Result

1. The Mobile Number field accepts the invalid input without an immediate inline error
2. The invalid value is held in the field
3. An inline validation error "Enter a valid mobile number" appears below the "Mobile Number" field
4. The form is not submitted; the page remains on `/login` with the Sign Up form visible
5. No toast notification appears and no navigation occurs

### Notes and Assumptions

- Tags: Regression
- The expected mobile format per AC9: 7–20 characters, digits and +, spaces, brackets, dots, dashes only
- Representative invalid values: "abc" (letters only), "12" (too short — 2 chars below min 7), "123456789012345678901" (21 chars, above max 20)
- Boundary: a number with exactly 6 characters (one below minimum) should also trigger this error

### Defect Opportunity

- No error appears for alphabetic-only input in the mobile field
- Error message text differs from "Enter a valid mobile number"
- A value of length 6 (below the 7-char minimum) is accepted without error
- A value of length 21 (above the 20-char maximum) is accepted without error
