### Test Case ID

TC_CHECKOUT_015

### Test Case Title

Unauthenticated user on cart page sees sign-in prompt instead of Proceed to Checkout

### Feature Area

Checkout

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is **not** logged in (logged out or browsing as guest)
- Navigate to the cart page (`/cart`)

### Test Steps

1. Navigate to the cart page (`/cart`) without logging in.
2. Observe the Cart Totals section.
3. Look for the "Proceed to Checkout" button.
4. Observe any alternative call-to-action or prompt displayed in the Cart Totals section.
5. Observe the "Sign Up / Login" button if present.
6. Click the "Sign Up / Login" button.

### Expected Result

1. The cart page loads at `/cart`.
2. The "Proceed to Checkout" button is **not present** in the Cart Totals section.
3. The text "Sign in to proceed with checkout" is displayed in the Cart Totals section.
4. A "Sign Up / Login" button is visible.
5. The "Sign Up / Login" button is clickable.
6. Clicking "Sign Up / Login" navigates the user to `/login`.

### Notes and Assumptions

- Tags: Regression
- Guest cart is always empty — cart data is not persisted for unauthenticated users. The cart item list will be empty.
- The sign-in prompt replaces the checkout button entirely; both elements should not appear simultaneously.
- This test must be run without the stored authentication state (i.e., do not use a pre-authenticated browser session).

### Defect Opportunity

- The "Proceed to Checkout" button may still appear for unauthenticated users if the auth check is missing or delayed.
- The "Sign in to proceed with checkout" prompt may not appear, leaving the unauthenticated user with no call-to-action.
- The "Sign Up / Login" button may navigate to the wrong URL (e.g., `/register` or `/signup` instead of `/login`).
