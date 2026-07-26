### Test Case ID

TC_AUTH_006

### Test Case Title

Empty Sign Up form submission shows Required errors on all required fields

### Feature Area

Authentication

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is not logged in
- Navigate to `$BASE_URL/login`
- Toggle to the Sign Up form by clicking the "Sign Up" span
- All form fields are empty; the Gender dropdown shows "Select Gender"

### Test Steps

1. Leave all fields empty (do not enter any values)
2. Click the "Sign Up" button

### Expected Result

1. All fields remain empty; Gender shows "Select Gender"
2. The form is not submitted; the page remains on `/login` with the Sign Up form displayed
   - An inline "Required" error message appears below the "Your Name" field
   - An inline "Required" error message appears below the "Email Address" field
   - An inline "Please select a gender" error message appears below the Gender dropdown
   - An inline "Required" error message appears below the "Mobile Number" field
   - An inline "Required" error message appears below the "Password" field
   - An inline "Required" error message appears below the "Confirm Password" field
   - No error message appears for "Address (optional)" — it is not required
   - No toast notification is shown
   - No navigation occurs

### Notes and Assumptions

- Tags: Regression
- The "Please select a gender" message is specific to the gender field; all other required fields show "Required"
- The Address field is optional and must not show a validation error when empty
- Validation errors are inline — they appear adjacent to each field, not as a toast

### Defect Opportunity

- Form submits despite empty required fields (server-side validation only, no client-side guard)
- The gender field shows "Required" instead of "Please select a gender"
- Address field shows an unexpected "Required" error
- Toast error appears instead of inline errors
- Only some fields show errors (partial validation trigger)
