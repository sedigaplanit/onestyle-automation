### Test Case ID

TC_CART_011

### Test Case Title

Cart restored from server after logout and re-login (cross-session persistence)

### Feature Area

Cart Management

### Priority

Medium

### Preconditions

- User is logged in using $USER_NAME / $PASSWORD
- Navigate to $BASE_URL
- At least one item is in the cart — record the product name, size, quantity, and totals

### Test Steps

1. Navigate to the cart page (`/cart`) and note all cart item details: product names, quantities, line totals, Sub Total, and Total.
2. Click the "Logout" button in the navbar.
3. Observe the page and cart count badge after logout.
4. Navigate to `/login`.
5. Fill in the Email Address field with $USER_NAME.
6. Fill in the Password field with $PASSWORD.
7. Click the "Login" button in the form.
8. Wait for the "My Orders" button to appear in the navbar (auth success marker).
9. Navigate to the cart page (`/cart`).
10. Observe the cart item rows and totals.

### Expected Result

1. Cart contents are noted before logout.
2. Logout succeeds — redirected to the landing page (unauthenticated state); "Login" button is visible.
3. Cart count badge resets to 0 (per documented behaviour: guest cart is always empty).
4. Login page loads.
   5–6. Credentials entered.
5. Login form submitted.
6. "My Orders" button is visible — user is authenticated again.
7. Cart page loads.
8. Cart is restored from the server — the same items previously noted (product name, quantity, totals) are present in the cart.

### Notes and Assumptions

- Tags: Regression
- Per the app design: "cart data is not persisted for unauthenticated users; logging out clears cart counter to 0".
- The cart is restored from the server upon re-login, not from local state.

### Defect Opportunity

- Cart is not restored after re-login (items missing).
- Cart items are duplicated on re-login.
- Cart is restored with incorrect quantities.
- Login fails or does not authenticate correctly.
