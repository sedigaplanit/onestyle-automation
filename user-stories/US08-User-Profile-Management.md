# User Story: User Profile Management

**As an** authenticated shopper,  
**I want to** view and update my profile details,  
**So that** my account information stays current for deliveries and personal preferences.

---

> **Note:** This is an additional user story identified during application analysis. The profile management feature is fully implemented but was not included in the original requirements.

---

## Acceptance Criteria

### AC1 - Accessing the profile page

- Given I am logged in
- When I click the "Profile" button in the navbar
- Then I am navigated to the Profile page (`/profile`)
- And the page displays my current account information

### AC2 - Profile page content

- The profile page must display the following read-only information:
  - A circular avatar showing the first letter of the user's name (uppercased)
  - The user's email address (read-only, not editable)
- The profile page must display the following editable fields in a form:
  - Full Name (text input, required)
  - Gender (dropdown: Select gender / Male / Female / Other / Prefer not to say)
  - Mobile Number (text input, placeholder: "+94 77 000 0000")
  - Address (textarea, optional, placeholder: "Your delivery address", 3 rows)
- A "Save Changes" submit button must be present
- Below the form, a **Danger Zone** section must be present with a "Delete Account" button
- If the authenticated user has admin privileges (`is_admin: true`), an **Admin — Download Logs** panel must be visible between the form and the Danger Zone

### AC3 - Fresh profile data fetched on page load

- Given I navigate to the profile page
- Then the application fetches the latest profile data from the server (`GET /api/auth/me`)
- And any stale data cached in the JWT is replaced with the server's current values
- And a loading state is shown while the fetch is in progress

### AC4 - Loading state on profile page

- Given the profile data is being fetched from the server
- Then the profile form is replaced with a "Loading profile..." message
- And once the data is available the form is displayed with the fetched values

### AC5 - Successful profile update

- Given I am on the profile page with the profile data loaded
- When I change one or more fields and click "Save Changes"
- Then the updated data is sent to the server (`PUT /api/auth/profile`)
- And a toast notification "Profile updated successfully!" is displayed
- And the form reflects the saved values returned from the server
- And the stored user context is updated with a refreshed JWT token

### AC6 - Name validation on save

- Given I attempt to save a profile with an empty name or a name fewer than 3 characters
- Then the save request is not submitted
- And a toast error "Name must be at least 3 characters." is shown

### AC7 - Saving state on the button

- Given I click "Save Changes"
- Then the button label changes to "Saving..." and is disabled for the duration of the request
- And when the request completes the button reverts to "Save Changes"

### AC8 - Profile page inaccessible to unauthenticated users

- Given I am not logged in
- When I navigate to `/profile` directly (e.g. via URL)
- Then I am automatically redirected to `/login`
- And the profile page content is not shown

### AC9 - Account deletion — confirmation modal

- Given I am on the profile page
- When I click the "Delete Account" button in the Danger Zone
- Then a modal dialog appears with:
  - A warning that deletion is permanent and covers all orders, cart, wishlist, and reviews
  - A password input field for confirmation
  - A "Cancel" button and a "Yes, delete my account" button
- When I click "Cancel" or the backdrop
- Then the modal closes and no action is taken

### AC10 - Account deletion — successful deletion

- Given the deletion confirmation modal is open
- When I enter my correct password and click "Yes, delete my account"
- Then a `DELETE /api/auth/account` request is sent with the password
- And a toast notification confirms the deletion
- And I am logged out and redirected to the home page (`/`)
- And the "Yes, delete my account" button shows "Deleting..." and is disabled during the request

### AC11 - Account deletion — wrong password

- Given the deletion confirmation modal is open
- When I enter an incorrect password and click "Yes, delete my account"
- Then a toast error is shown with the server's error message
- And the modal remains open so I can retry

### AC12 - Admin panel visibility

- Given I am logged in as an admin user (JWT contains `is_admin: true`, set via the `ADMIN_EMAIL` environment variable)
- When I navigate to the Profile page
- Then the **Admin — Download Logs** panel is visible between the form and the Danger Zone
- Given I am logged in as a non-admin user
- Then the Admin panel is not rendered at all

### AC13 - Admin log download — Last N minutes mode (default)

- Given I am on the profile page as an admin
- And the "Last N minutes" radio button is selected (default)
- Then a stepper control is shown displaying the current value in minutes (default: 10)
- When I click the "−" button
  - Then the value decreases by 10 (minimum: 1)
  - And the button is disabled when the value is 1
- When I click the "+" button
  - Then the value increases by 10 (maximum: 1440)
  - And the button is disabled when the value is 1440
- When I click "Download Last N min"
  - Then a `GET /api/admin/logs/download?minutes=N` request is made with the JWT
  - And the response is saved as `app-logs-last-Nmin-<timestamp>.logs`
  - And a success toast is shown confirming the download

### AC14 - Admin log download — Custom range mode

- Given I am on the profile page as an admin
- When I select the "Custom range" radio button
- Then two datetime pickers labelled "From" and "To" are displayed, both in UTC (server time)
- And the "From" picker defaults to 1 hour ago (UTC) and the "To" picker defaults to the current UTC time
- When I set a From and To datetime and click "Download Range"
  - Then a `GET /api/admin/logs/download?from=<ISO UTC>&to=<ISO UTC>` request is made
  - And the response is saved as `app-logs-<from>_to_<to>.logs`
  - And a success toast is shown confirming the download
- The "From" picker must be capped at the "To" value (max) and vice versa (min) to prevent invalid ranges

### AC15 - Admin log download — error states

- Given I click the download button
- When no log entries exist in the selected time range
  - Then a toast error "No log entries found in the selected time range." is shown
- When the network request fails
  - Then a toast error with the server's error message is shown
- During the download request the button shows "Downloading..." and is disabled
