# User Story: Order History

**As an** authenticated shopper,  
**I want to** view a history of all my past orders,  
**So that** I can review what I have purchased, including items, quantities, and totals paid.

---

> **Note:** This is an additional user story identified during application analysis. The order history feature is fully implemented but was not included in the original requirements.

---

## Acceptance Criteria

### AC1 - Accessing the order history page

- Given I am logged in
- When I click "My Orders" in the navbar
- Then I am navigated to the Order History page (`/orders`)
- And the page begins loading my order data from the server (`GET /api/orders`)

### AC2 - Loading state

- Given the order history page is fetching data from the server
- Then a "Loading orders..." message is displayed
- And no order cards are shown until the data is ready

### AC3 - Order list displayed when orders exist

- Given I have placed at least one order
- When the order data has loaded
- Then a subtitle shows "X order(s) placed"
- And each past order is displayed as a card containing:
  - Order number (e.g. ORD-XXXXXX) in the card header
  - Order date, formatted as day Month year (e.g. "15 July 2026")
  - Order status label: "Delivered"
  - Total amount paid in LKR
  - For each line item in the order:
    - Product image
    - Product name
    - Quantity and unit price (e.g. "Qty: 2 · LKR 150 each")
    - Line item subtotal
  - A footer showing the total item count and total amount paid

### AC4 - Orders sorted by most recent first

- Given I have multiple past orders
- Then they are displayed in reverse chronological order (most recent order at the top)

### AC5 - Empty order history state

- Given I have not placed any orders
- When the order history page has finished loading
- Then an empty state is displayed with:
  - A 📦 icon
  - Heading: "No orders yet"
  - Message: "You haven't placed any orders. Start shopping!"
  - A "Shop Now" button that navigates to the home page (`/`)

### AC6 - Navigate to order history from post-purchase success screen

- Given I have just completed a successful checkout
- When I click "View My Orders" on the order success screen
- Then I am navigated to `/orders`
- And my newly placed order is visible at the top of the list

### AC7 - Order history accessible only to authenticated users

- Given I am not logged in
- When I navigate to `/orders` directly
- Then the server returns a 401 Unauthorised response
- And no order data is displayed
- **Known gap:** The frontend route does not currently redirect unauthenticated users to `/login`; instead, it silently renders an empty order list. This behaviour should be documented as a defect and addressed by adding a route guard consistent with the `/profile` redirect pattern.
