### Test Case ID

TC_ORDERS_005

### Test Case Title

Newly placed order appears at the top of the Order History list

### Feature Area

Orders

### Priority

Medium

**Rationale:** A newly placed order not appearing at the top would require a user to scroll through their entire history to find their most recent purchase — significant usability impact, not a data loss issue.

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- At least one item has been added to the cart
- A successful order has been placed via Cash on Delivery (TC_CHECKOUT_007 has been executed)
- Note the order number displayed on the success screen (e.g. "ORD-793662")

### Test Steps

1. Click the "My Orders" button in the navbar.
2. Locate the topmost order card.
3. Note its order number.
4. Compare the noted order number against the value recorded in Preconditions.

### Expected Result

1. The browser navigates to `/orders`. The Order History page loads with the list of orders.
2. The topmost order card is visible at position 1 in the list.
3. The order number from the topmost card is noted.
4. The two order numbers match — the newly placed order is at position 1 in the list.

### Notes and Assumptions

- Tags: Regression
- AC6: Newly placed order must appear at the top of the list immediately after checkout.
- This TC complements TC_CHECKOUT_009 (which verifies navigation from success screen). This TC specifically verifies sort position.
- The order number is 6 digits in format `ORD-XXXXXX`. Record it exactly before navigating away from the success screen.
- If the page was already open before the order was placed, a page refresh may be required before the new order appears — note any refresh requirement as a defect.

### Defect Opportunity

- The newly placed order may not appear at the top if sort order is ascending.
- The newly placed order may not appear at all if the API response is cached and not invalidated after checkout.
- The order number shown on the list may not match the one on the success screen (ID inconsistency).
