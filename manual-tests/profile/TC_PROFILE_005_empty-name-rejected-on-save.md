### Test Case ID

TC_PROFILE_005

### Test Case Title

Empty name field rejected on save with toast error

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
3. Press Delete to clear the field.
4. Read the current value in the "Full Name" field.
5. Click the "Save Changes" button.
6. Read the toast notification message.

### Expected Result

1. The "Full Name" field becomes focused.
2. All text is selected.
3. The field is cleared.
4. The "Full Name" field is now empty.
5. No `PUT /api/auth/profile` request is submitted; the save is blocked client-side.
6. A toast error appears with the message "Name must be at least 3 characters.".

Overall: Attempting to save a profile with an empty name field is blocked; a toast error message is displayed and no server request is made.

### Notes and Assumptions

- Tags: Regression
- This covers the empty-name case of AC6. The fewer-than-3-characters case is covered by TC_PROFILE_006.
- The validation is expected to be client-side (no network request).

### Defect Opportunity

- The save request might be submitted despite an empty name, causing unexpected server behaviour.
- The error toast might not appear, leaving the user with no feedback.
- A different error message text might be shown.
