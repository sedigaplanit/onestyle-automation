### Test Case ID

TC_PROFILE_009

### Test Case Title

Delete Account modal opens with correct content and Cancel closes it without action

### Feature Area

User Profile

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- TC_PROFILE_001 has been executed (user is on the Profile page)

### Test Steps

1. Scroll to the "Danger Zone" section at the bottom of the profile page.
2. Click the "Delete Account" button in the Danger Zone section.
3. Wait for the modal dialog to appear.
4. Read the modal heading.
5. Read the warning text inside the modal.
6. Locate the password input field inside the modal.
7. Locate the "Cancel" button inside the modal.
8. Locate the "Yes, delete my account" button inside the modal.
9. Click the "Cancel" button.
10. Wait for the modal to close.
11. Read the current page URL.

### Expected Result

1. The Danger Zone section is in view.
2. The "Delete Account" button is clicked.
3. A modal dialog appears overlaying the page.
4. The modal heading reads "Delete Account".
5. The warning text reads "This will permanently delete your account, orders, cart, wishlist and reviews. Enter your password to confirm." (or similar permanent-deletion warning covering all data).
6. A password input field with placeholder "Enter your password" is present.
7. A "Cancel" button is visible.
8. A "Yes, delete my account" button is visible.
9. The "Cancel" button is clicked.
10. The modal closes; the profile page is visible again.
11. The URL remains `/profile`; no navigation has occurred.

Overall: Clicking "Delete Account" opens a confirmation modal with the correct warning, password input, and action buttons. Clicking "Cancel" closes the modal and leaves the account intact.

### Notes and Assumptions

- Tags: Regression
- This test does NOT submit the deletion — it only tests the modal open/cancel flow (AC9).
- The backdrop-click dismissal behaviour described in AC9 is not tested here to avoid overlap; it can be considered a Low-priority exploratory test.

### Defect Opportunity

- Modal might not open, leaving no deletion path visible.
- Warning text might omit one or more data categories (orders, cart, wishlist, reviews).
- "Cancel" might not close the modal or might perform an unintended action.
