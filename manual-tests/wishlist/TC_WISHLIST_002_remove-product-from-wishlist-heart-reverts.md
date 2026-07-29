### Test Case ID

TC_WISHLIST_002

### Test Case Title

Remove product from wishlist via product card — heart icon reverts and navbar badge decrements

### Feature Area

Wishlist Management

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- Exactly one product has been added to the wishlist (TC_WISHLIST_001 has been executed)
- The landing page is displayed and the wishlisted product card is visible with a filled heart (♥)

### Test Steps

1. Locate the product card for the product that is already in the wishlist.
2. Note the state of the heart icon on that card (filled ♥, title="Remove from wishlist").
3. Note the current wishlist badge count in the navbar (expected: "1").
4. Click the ♥ (filled heart) button on that product card.
5. Locate the heart button on the same product card.
6. Locate the wishlist ♡ icon in the navbar.
7. Read the badge count next to the wishlist icon.

### Expected Result

1. The product card is visible with a filled heart icon (♥).
2. The heart icon is in the wishlisted state (♥, class includes `wishlisted`).
3. The navbar badge shows "1".
4. The click is registered.
5. The heart icon on the product card reverts to the unfilled heart (♡), indicating the product has been removed from the wishlist.
6. The navbar wishlist icon is visible in the navbar.
7. The navbar wishlist badge is no longer displayed (or shows "0"), reflecting the decrement.

Overall: clicking a filled heart icon on a product card removes that product from the wishlist, confirmed by the heart icon reverting and the navbar badge decrementing.

### Notes and Assumptions

- Tags: Regression
- Wishlisted toggle locator: `locator('button.item-wishlist-btn.wishlisted')` or `getByRole('button', { name: '♥' })`.
- Navbar badge disappears entirely when wishlist count reaches 0 (consistent with cart badge behaviour described in README).
- Assumes wishlist state is stored in localStorage and is reflected immediately in the UI.

### Defect Opportunity

- Heart icon may not revert to unfilled state after removal click.
- Navbar badge may not decrement or may persist showing "1" after removal.
- The product may remain in the wishlist (remove action not persisted to localStorage).
