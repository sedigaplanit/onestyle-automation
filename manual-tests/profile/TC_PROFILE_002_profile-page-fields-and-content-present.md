### Test Case ID

TC_PROFILE_002

### Test Case Title

Profile page displays all required fields, avatar, and section elements

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_001 has been executed (user is on the Profile page)

### Test Steps

1. Locate the circular avatar element at the top of the profile section.
2. Read the character displayed inside the avatar.
3. Locate the email address displayed below the avatar.
4. Read the email address text.
5. Locate the "Full Name" text input field.
6. Locate the "Gender" dropdown.
7. Locate the "Mobile Number" text input field.
8. Read the placeholder text of the "Mobile Number" field.
9. Locate the "Address (optional)" textarea.
10. Read the placeholder text of the "Address (optional)" field.
11. Locate the "Save Changes" button.
12. Scroll to the bottom of the form area.
13. Locate the "Danger Zone" section heading.
14. Locate the "Delete Account" button within the Danger Zone section.

### Expected Result

1. The circular avatar is present.
2. The avatar displays the first letter of the user's name uppercased (e.g. "T" for "test user").
3. The email address is displayed below the avatar.
4. The email address matches $USER_NAME and is read-only (not an editable input).
5. The "Full Name" text input is visible and pre-filled with the stored name.
6. The "Gender" dropdown is visible with options: "Select gender", "Male", "Female", "Other", "Prefer not to say".
7. The "Mobile Number" text input is visible.
8. The placeholder text reads "+94 77 000 0000".
9. The "Address (optional)" textarea is visible.
10. The placeholder text reads "Your delivery address".
11. The "Save Changes" button is visible and enabled.
12. The page scrolls to reveal the Danger Zone section.
13. The "Danger Zone" heading is visible.
14. The "Delete Account" button is visible inside the Danger Zone section.

Overall: The profile page renders all required read-only information, editable form fields, action buttons, and the Danger Zone section as specified in AC2.

### Notes and Assumptions

- Tags: Regression
- The avatar displays the first letter of the user's **name** (uppercased) per AC2; the live app shows "T" which matches the test account name "test user".
- The email field is a paragraph/text element, not an editable input — it is not expected to be focusable or editable.
- The admin panel is NOT expected to be visible for a non-admin user ($USER_NAME).

### Defect Opportunity

- Avatar could show wrong initial or be missing.
- Email could be rendered as an editable input instead of read-only text.
- A required field could be absent or incorrectly labelled.
- The Danger Zone section could be missing or outside the visible scroll area.
