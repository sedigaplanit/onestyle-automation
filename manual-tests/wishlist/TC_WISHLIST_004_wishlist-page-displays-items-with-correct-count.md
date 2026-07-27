### Test Case ID

TC_WISHLIST_004

### Test Case Title

Wishlist page displays all wishlisted items with correct subtitle count

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- Exactly 1 product has been added to the wishlist (execute TC_WISHLIST_001 if needed)
- Navigate to `$BASE_URL/wishlist`

### Test Steps

1. Check the page heading and subtitle count displayed on the Wishlist page.
2. Check a product card for its image, name, old price, and new price.

### Expected Result

1. The page heading reads "My Wishlist" (`getByRole('heading', { level: 1, name: 'My Wishlist' })`). The subtitle reads "1 item(s) saved" (`locator('p.wishlist-subtitle')` with text pattern "{N} item(s) saved").
2. One product card is visible corresponding to the wishlisted product. The card displays: a product image, the product name, the old (original) price, and the new (sale) price.

### Notes and Assumptions

- Tags: Regression
- The "with items" state uses an h1 heading "My Wishlist" — distinct from the empty state which uses an h2 "Your wishlist is empty"
- Subtitle locator: `locator('p.wishlist-subtitle')` — text pattern: "{N} item(s) saved"
- If 2 items are wishlisted, step 2 should read "2 item(s) saved" — TC uses 1 item for simplicity
- Known issue: BUG_CHECKOUT_003 documents that the wishlist page may not re-fetch from the API on navigation; items seeded via API may not appear until the app is reloaded

### Defect Opportunity

- The "My Wishlist" heading does not appear (page stays in or reverts to empty state)
- The subtitle count is incorrect (e.g. "0 item(s) saved" despite 1 item being present)
- The product card is missing the image, name, or price information
- The wishlist page shows stale data and does not reflect server-side state (see BUG_CHECKOUT_003)
