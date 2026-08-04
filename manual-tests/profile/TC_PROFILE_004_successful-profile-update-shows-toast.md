### Test Case ID

TC_PROFILE_004

### Test Case Title

Successful profile update saves changes and displays success toast

### Feature Area

User Profile

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_003 has been executed (profile page is loaded with form data)

### Test Steps

1. Note the current value in the "Full Name" input field.
2. Click the "Full Name" input field.
3. Press Ctrl+A to select all text in the field.
4. Enter "Updated Test User" in the "Full Name" field.
5. Select "Female" from the "Gender" dropdown.
6. Click the "Mobile Number" input field.
7. Press Ctrl+A to select all text in the field.
8. Enter "+94 77 123 4567" in the "Mobile Number" field.
9. Click the "Save Changes" button.
10. Wait for the server response to complete.
11. Read the toast notification message.
12. Read the current value in the "Full Name" input field.

### Expected Result

1. The current name value is noted for reference.
2. The "Full Name" field becomes focused.
3. All text in the field is selected.
4. The field now shows "Updated Test User".
5. The "Gender" dropdown now shows "Female".
6. The "Mobile Number" field becomes focused.
7. All text in the field is selected.
8. The field now shows "+94 77 123 4567".
9. A `PUT /api/auth/profile` request is sent with the updated values.
10. The request completes successfully.
11. A toast notification appears with the message "Profile updated successfully!".
12. The "Full Name" field shows "Updated Test User" (the saved value returned from the server).

Overall: Changing profile fields and clicking "Save Changes" sends the data to the server, displays a success toast, and reflects the saved values in the form.

### Notes and Assumptions

- Tags: Regression
- After the test, consider restoring the original name to avoid affecting subsequent tests. Alternatively, restore by repeating the save with the original value noted in step 1.
- The stored user context is updated with a refreshed JWT token — this is not directly assertable in a manual test without inspecting browser storage.

### Defect Opportunity

- The save request might fail silently with no feedback.
- Toast might not appear or might show an error message on a valid save.
- Form might not reflect the server's returned values after save.
- JWT token refresh might not occur, causing stale user context.
