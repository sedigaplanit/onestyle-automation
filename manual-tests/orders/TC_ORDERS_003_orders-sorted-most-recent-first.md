### Test Case ID

TC_ORDERS_003

### Test Case Title

Orders are displayed in reverse chronological order with most recent first

### Feature Area

Orders

### Priority

Medium

**Rationale:** Incorrect sort order degrades usability but does not block order data access — a user can still find their orders, just with extra scrolling.

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- User has placed at least two orders on different calendar dates
- Navigate to the Order History page by clicking "My Orders" in the navbar

### Test Steps

1. Locate the first order card (topmost).
2. Note its date.
3. Locate the second order card.
4. Note its date.
5. Compare the two noted dates — the first must be more recent than the second.

### Expected Result

1. The first order card (topmost) is visible on the page.
2. The topmost card's date is noted (e.g. "26 July 2026").
3. The second order card is visible below the first.
4. The second card's date is noted (e.g. "25 July 2026" or earlier).
5. The first card's date is more recent than the second, confirming orders are sorted in reverse chronological order — most recently placed order at the top.

### Notes and Assumptions

- Tags: Regression
- AC4: Sort order must be descending by date (most recent first).
- Inspecting the first 3–5 cards is sufficient; verifying all cards is not required.
- If all orders share the same date (as with a test account that places many orders in one day), this test is inconclusive — use a fresh test account or place orders on separate calendar days to verify sort order definitively.

### Defect Opportunity

- Orders may be sorted ascending (oldest first) instead of descending.
- Orders on the same date may render in inconsistent order (no secondary sort key applied).
- Sort order may not update if a new order is placed and the page is not refreshed.
