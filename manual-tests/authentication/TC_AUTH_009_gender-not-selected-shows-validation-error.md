### Test Case ID

TC_AUTH_009

### Test Case Title

Gender not selected on Sign Up submission shows required gender error

### Feature Area

Authentication

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is not logged in
- Navigate to `$BASE_URL/login`
- Toggle to the Sign Up form by clicking the "Sign Up" span
- Fill all other required fields with valid data:
  - Your Name: "Test User"
  - Email Address: a unique valid email
  - Mobile Number: "+94712345678"
  - Password: "Pass@123"
  - Confirm Password: "Pass@123"
- Leave the Gender dropdown at its default value "Select Gender"

### Test Steps

1. Confirm all fields are filled except the Gender dropdown (still showing "Select Gender")
2. Click the "Sign Up" button

### Expected Result

1. All other required fields retain their valid values; Gender dropdown shows "Select Gender"
2. The form is not submitted; the page remains on `/login`
   - An inline validation error "Please select a gender" is shown below the Gender dropdown
   - No other field validation errors are shown (other fields have valid values)
   - No toast notification appears
   - No navigation occurs

### Notes and Assumptions

- Tags: Regression
- Partially covered by TC_AUTH_006 (empty form scenario also shows the gender error); this TC isolates gender as the sole failing field to verify targeted validation
- The gender dropdown role: `getByRole('combobox')`

### Defect Opportunity

- Form submits with no gender selected
- The error message reads "Required" instead of "Please select a gender"
- The error appears on the wrong field
- Other fields show unexpected errors despite having valid values
