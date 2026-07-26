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

1. Check the Cart Totals section for the presence or absence of the "Proceed to Checkout" button and any sign-in prompt.
2. Click the "Sign Up / Login" button.

### Expected Result

1. The "Proceed to Checkout" button is **not present** in the Cart Totals section. The text "Sign in to proceed with checkout" is displayed. A "Sign Up / Login" button is visible.
2. Clicking "Sign Up / Login" navigates the user to `/login`.

### Notes and Assumptions

- Tags: Regression
- Guest cart is always empty — cart data is not persisted for unauthenticated users. The cart item list will be empty.
- The sign-in prompt replaces the checkout button entirely; both elements should not appear simultaneously.
- This test must be run without the stored authentication state (i.e., do not use a pre-authenticated browser session).

### Defect Opportunity

- The "Proceed to Checkout" button may still appear for unauthenticated users if the auth check is missing or delayed.
- The "Sign in to proceed with checkout" prompt may not appear, leaving the unauthenticated user with no call-to-action.
- The "Sign Up / Login" button may navigate to the wrong URL (e.g., `/register` or `/signup` instead of `/login`).
