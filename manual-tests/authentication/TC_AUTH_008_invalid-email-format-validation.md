### Test Case ID

TC_AUTH_008

### Test Case Title

Invalid email format in Sign Up form shows validation error

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

1. Click into the "Email Address" field
2. Enter a value that is not a valid email address (e.g. "notanemail")
3. Click out of the field (lose focus) or click the "Sign Up" button

### Expected Result

1. The Email field accepts the invalid input without an immediate inline error
2. The invalid value is held in the field
3. An inline validation error "Invalid email address" appears below the "Email Address" field
4. The form is not submitted; the page remains on `/login` with the Sign Up form visible
5. No toast notification appears and no navigation occurs

### Notes and Assumptions

- Tags: Regression
- Representative invalid values: "notanemail" (no @), "user@" (no domain), "@domain.com" (no local part), "user@domain" (no TLD)
- The field type is `email` in the user story spec — browser-level validation may intercept before custom validation

### Defect Opportunity

- No error appears for an invalid email format
- Error message text differs from "Invalid email address"
- The browser's native email validation intercepts before the custom error message is displayed
- A valid email format that uses an unregistered domain is incorrectly rejected at this stage
