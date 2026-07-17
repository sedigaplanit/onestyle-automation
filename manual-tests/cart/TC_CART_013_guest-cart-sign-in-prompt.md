### Test Case ID

TC_CART_013

### Test Case Title

Guest cart shows sign-in prompt and Sign Up / Login button instead of checkout

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is NOT logged in (either navigate after logout, or open in a fresh unauthenticated session)
- Navigate to $BASE_URL

### Test Steps

1. Confirm unauthenticated state — the "Login" button is visible in the navbar (not "My Orders").
2. Navigate to the cart page by clicking the Cart icon in the navbar or going to `$BASE_URL/cart` directly.
3. Observe the cart item rows in the cart table.
4. Observe the Cart Totals panel area.
5. Look for the "Proceed to Checkout" button.
6. Look for the "Sign in to proceed with checkout" prompt.
7. Look for the "Sign Up / Login" button.
8. Click the "Sign Up / Login" button.
9. Observe the URL and the form displayed.

### Expected Result

1. "Login" button is visible in navbar — user is not authenticated.
2. Cart page loads. Cart count badge shows "0".
3. No item rows are visible in the cart table.
4. The Cart Totals panel is visible.
5. The "Proceed to Checkout" button is **NOT** present for unauthenticated users.
6. The text "Sign in to proceed with checkout" is displayed in the Cart Totals panel area.
7. The "Sign Up / Login" button is visible.
8. Clicking "Sign Up / Login" navigates the user.
9. The URL changes to `/login` and the Sign Up form (or login page) is displayed.

### Notes and Assumptions

- Tags: Regression
- This is the documented NEG-004 case from `.playwright-mcp/flows/negative-edge.json`.
- Guest cart is always empty — cart data from a previous authenticated session is not visible to unauthenticated users.
- The AC states "Sign Up form pre-selected" upon redirect — verify the form shown on `/login` after this navigation.

### Defect Opportunity

- "Proceed to Checkout" button appears for unauthenticated users.
- "Sign in to proceed with checkout" prompt is missing.
- "Sign Up / Login" button does not navigate to `/login`.
- Login page does not show the Sign Up form pre-selected.
