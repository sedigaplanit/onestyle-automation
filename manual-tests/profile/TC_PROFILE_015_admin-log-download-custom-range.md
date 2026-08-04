### Test Case ID

TC_PROFILE_015

### Test Case Title

Admin log download — custom date range mode triggers correct download request

### Feature Area

User Profile

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $ADMIN_EMAIL
- Admin profile page is open and the "Admin — Download Logs" panel is visible
- Browser DevTools → Network → Throttle is set to "Slow 3G" to allow observation of the button's "Downloading..." state (step 9)

### Test Steps

1. Locate the "Custom range" radio button in the Admin — Download Logs panel.
2. Click the "Custom range" radio button.
3. Locate the "From" datetime picker.
4. Read the default value of the "From" datetime picker.
5. Locate the "To" datetime picker.
6. Read the default value of the "To" datetime picker.
7. Note the default "From" value.
8. Note the default "To" value.
9. Click the "Download Range" button using the pre-filled default From and To values.
10. Wait for the "Downloading..." button label to return to "Download Range".
11. Read the toast notification message.
12. Read the filename of the downloaded file.

### Expected Result

1. The "Custom range" radio button is located.
2. The radio button is selected; the view switches to show two datetime pickers.
3. The "From" picker is displayed labelled "From".
4. The "From" picker shows a UTC datetime value.
5. The "To" picker is displayed labelled "To".
6. The "To" picker shows a UTC datetime value.
7. The noted "From" default value is earlier than the noted "To" default value (consistent with a 1-hour default window).
8. The noted "To" default value is later than the noted "From" default value.
9. The \"Download Range\" button is clicked; the button label changes to "Downloading..." and the button is disabled.
10. The button label reverts to "Download Range" and is enabled again, indicating the download is complete.
11. A success toast appears confirming the download (e.g. "Download complete" or similar).
12. The downloaded filename follows the pattern `app-logs-<from>_to_<to>.logs` where `<from>` and `<to>` correspond to the From and To values noted in steps 7 and 8.

Overall: Selecting "Custom range" reveals two UTC datetime pickers with sensible defaults; filling them and clicking "Download Range" sends the correct API request and saves the log file with the correct name.

### Notes and Assumptions

- Tags: Regression
- Requires $ADMIN_EMAIL in `.env`.
- The datetime pickers are described as UTC (server time) per AC14; ensure the values entered are in UTC.
- The "From" picker max should be capped at the "To" value, and vice versa (min) — this constraint is verified as part of observing the picker behaviour but is not explicitly stepped through here.
- Covers AC14.

### Defect Opportunity

- "Custom range" radio might not switch to the datetime picker view.
- Pickers might not default to the correct UTC times.
- The request might use local time instead of UTC, causing incorrect log retrieval.
- The downloaded filename format might not match the expected pattern.
