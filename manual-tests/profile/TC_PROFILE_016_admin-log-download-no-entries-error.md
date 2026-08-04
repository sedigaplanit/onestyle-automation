### Test Case ID

TC_PROFILE_016

### Test Case Title

Admin log download — error toast when no log entries exist in selected range

### Feature Area

User Profile

### Priority

Low

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $ADMIN_EMAIL
- Admin profile page is open and the "Admin — Download Logs" panel is visible
- Browser DevTools → Network → Throttle is set to "Slow 3G" to allow observation of the button's loading state (steps 5–6)

### Test Steps

1. Click the "Custom range" radio button.
2. Fill in the "From" datetime picker with a date far in the past where no logs exist (e.g. 2000-01-01T00:00:00 UTC).
3. Fill in the "To" datetime picker with 2000-01-01T01:00:00 UTC (1-hour window in year 2000).
4. Click the "Download Range" button.
5. Read the label of the "Download Range" button.
6. Read whether the "Download Range" button is enabled or disabled.
7. Wait for the server response to complete.
8. Read the toast notification message.

### Expected Result

1. The custom range view is shown.
2. The "From" picker is set to the specified past date.
3. The "To" picker is set to the specified past date/time.
4. The button is clicked; a `GET /api/admin/logs/download?from=...&to=...` request is sent.
5. The button label changes to "Downloading...".
6. The button is disabled (not clickable) while the request is in progress.
7. The server responds indicating no log entries found.
8. A toast error is displayed with the message "No log entries found in the selected time range.".

Overall: Requesting a log download for a time range with no entries causes the server to return an error; the error is surfaced as a toast and the download does not trigger a file save.

### Notes and Assumptions

- Tags: Regression
- Requires $ADMIN_EMAIL in `.env`.
- The "Downloading..." button state (AC15) is also verified in step 6 of this test.
- Covers the "no log entries" error state and the "Downloading..." button state from AC15.

### Defect Opportunity

- An empty download might be saved instead of returning an error.
- The error toast might not appear.
- The button might not show "Downloading..." during the request.
- The error message text might differ from "No log entries found in the selected time range.".
