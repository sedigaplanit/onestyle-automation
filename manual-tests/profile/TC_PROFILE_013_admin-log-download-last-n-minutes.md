### Test Case ID

TC_PROFILE_013

### Test Case Title

Admin log download — last N minutes mode: stepper control and download

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $ADMIN_EMAIL
- TC_PROFILE_012 Part A has been executed (admin profile page is open and admin panel is visible)

### Test Steps

1. Locate the "Admin — Download Logs" panel on the profile page.
2. Locate the "Last N minutes" radio button.
3. Read whether the "Last N minutes" radio button is selected by default.
4. Read the current value displayed in the stepper control.
5. Click the "−" (decrement) button once.
6. Read the updated stepper value.
7. Click the "+" (increment) button three times.
8. Read the updated stepper value.
9. Click the "Download Last N min" button.
10. Wait for the download to complete.
11. Read the toast notification message.
12. Read the filename of the downloaded file (from the browser's download indicator or the saved file).

### Expected Result

1. The "Admin — Download Logs" panel is visible.
2. The "Last N minutes" radio button is located.
3. The "Last N minutes" radio button is selected by default.
4. The default stepper value is 10.
5. The decrement button is clicked; the value decreases to 1 (the minimum allowed value) and the "−" button becomes disabled.
6. The stepper value now shows 1.
7. Three "+" clicks increase the value by 10 each time (1 → 11 → 21 → 31).
8. The stepper value now shows 31.
9. A `GET /api/admin/logs/download?minutes=31` request is sent with the current stepper value and the JWT.
10. The download completes.
11. A success toast confirms the download.
12. The downloaded file is named `app-logs-last-31min-<timestamp>.logs`.

Overall: The "Last N minutes" mode shows a stepper defaulting to 10, allows increment/decrement in steps of 10, and triggers an authenticated download request with the selected value, saving the result as a `.logs` file.

### Notes and Assumptions

- Tags: Regression
- Requires $ADMIN_EMAIL in `.env`.
- AC13 states the minimum is 1 and default is 10. Clicking "−" from 10 may result in the value being clamped to 1 and the "−" button becoming disabled. Actual behaviour should be verified in the live app.
- The exact stepper step size (10) and clamping behaviour should be confirmed against the live app UI during test execution.
- Covers AC13 (happy path and stepper behaviour).

### Defect Opportunity

- Stepper might allow values below 1 or above 1440.
- Download button might not trigger a network request.
- Response file might not be saved or might have an incorrect filename format.
- No success toast after a successful download.
