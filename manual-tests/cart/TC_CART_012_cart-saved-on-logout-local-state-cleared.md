### Test Case ID

TC_CART_012

### Test Case Title

Cart is saved to server on logout and local cart state is cleared

### Feature Area

Cart Management

### Priority

Medium

### Preconditions

- User is logged in using $USER_NAME / $PASSWORD
- Navigate to $BASE_URL
- At least one item is in the cart (note product name, quantity)
- Navigate to the cart page to confirm items are present

### Test Steps

1. On the cart page, confirm the item(s) and note the cart count badge value (e.g. "1").
2. Click the "Logout" button in the navbar.
3. Observe the page that loads after logout.
4. Observe the cart count badge in the navbar.
5. Navigate to `/cart`.
6. Observe the cart contents on the page.

### Expected Result

1. Cart shows items; cart count badge matches.
2. Logout is triggered.
3. User is redirected to the landing page — "Login" button is visible (unauthenticated state confirmed).
4. Cart count badge resets to "0" — local cart state is cleared.
5. Cart page loads.
6. No item rows are visible — the guest/unauthenticated view shows only the "Sign in to proceed with checkout" prompt and "Sign Up / Login" button (not the previously added items).

### Notes and Assumptions

- Tags: Regression
- The clearing of local cart state is the observable outcome on the client side; server-side saving is verified indirectly via TC_CART_011 (items reappear on re-login).
- Per the documented gotcha: "Guest cart is always empty — cart data is not persisted for unauthenticated users; logging out clears cart counter to 0".

### Defect Opportunity

- Cart count badge does not reset to 0 after logout.
- Previously added items remain visible in the cart after logout (local state not cleared).
- Logout does not redirect to the landing page.
