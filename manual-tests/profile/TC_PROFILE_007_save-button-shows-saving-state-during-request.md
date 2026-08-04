### Test Case ID

TC_PROFILE_007

### Test Case Title

Save Changes button shows "Saving..." and is disabled during the request

### Feature Area

User Profile

### Priority

Low

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_003 has been executed (profile page is loaded with form data)

### Test Steps

1. Click the "Full Name" input field.
2. Press Ctrl+A to select all existing text.
3. Enter "Test Saving State" in the "Full Name" field.
4. Click the "Save Changes" button.
5. Read the label of the "Save Changes" button.
6. Read whether the button is interactive (enabled or disabled).
7. Wait for the request to complete.
8. Read the label of the button after the request completes.

### Expected Result

1. The "Full Name" field becomes focused.
2. All existing text is selected.
3. The field now shows "Test Saving State".
4. The button is clicked and the request begins.
5. The button label changes to "Saving...".
6. The button is disabled (not clickable) while the request is in progress.
7. The request completes.
8. The button label reverts to "Save Changes" and is enabled again.

Overall: While the profile update request is in flight, the "Save Changes" button shows "Saving..." and is disabled; once the request completes it returns to its original state.

### Notes and Assumptions

- Tags: Regression
- This state may be difficult to observe on fast connections. Use browser DevTools → Network → Throttle to "Slow 3G" to slow the request if needed.
- Covers AC7.

### Defect Opportunity

- The button might not change to "Saving..." state, allowing double submission.
- The button might remain disabled after the request completes.
