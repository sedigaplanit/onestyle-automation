### Test Case ID

TC_PROFILE_006

### Test Case Title

Name fewer than 3 characters rejected on save with toast error

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_003 has been executed (profile page is loaded with form data)

### Test Steps

1. Click the "Full Name" input field.
2. Press Ctrl+A to select all existing text.
3. Enter "AB" in the "Full Name" field.
4. Read the current value in the "Full Name" field.
5. Click the "Save Changes" button.
6. Read the toast notification message.

### Expected Result

1. The "Full Name" field becomes focused.
2. All existing text is selected.
3. The field now shows "AB".
4. The field value is "AB" (2 characters — below the 3-character minimum).
5. No `PUT /api/auth/profile` request is submitted; the save is blocked.
6. A toast error appears with the message "Name must be at least 3 characters.".

Overall: Entering a name shorter than 3 characters and clicking "Save Changes" is rejected client-side with the toast error "Name must be at least 3 characters.".

### Notes and Assumptions

- Tags: Regression
- This tests the boundary at the minimum (< 3 characters) for the name field (AC6).
- A complementary positive test (3+ characters accepted) is covered by TC_PROFILE_004.

### Defect Opportunity

- A 2-character name might be accepted, allowing invalid data to be saved.
- The error message text might differ from the specified copy "Name must be at least 3 characters.".
