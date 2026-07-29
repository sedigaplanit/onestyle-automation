### Test Case ID

TC_WISHLIST_005

### Test Case Title

Wishlist page displays wishlisted product cards with correct info and subtitle

### Feature Area

Wishlist Management

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- Exactly two products have been added to the wishlist (TC_WISHLIST_003 has been executed or equivalent setup performed)

### Test Steps

1. Click the ♡ wishlist link in the navbar.
2. Locate the page subtitle (`.wishlist-subtitle`).
3. Read the subtitle text.
4. Locate the product cards in the wishlist grid (`.wishlist-item-wrapper`).
5. Read the count of product cards displayed.
6. Locate the first product card in the wishlist grid.
7. Read the product name text on the first product card.
8. Locate the sale price element on the first product card.
9. Locate the original price element on the first product card.
10. Locate the product image on the first product card.

### Expected Result

1. The browser navigates to the Wishlist page (`/wishlist`) showing the "My Wishlist" heading (h1).
2. The wishlist subtitle element is present.
3. The subtitle reads "2 items saved" (plural form for 2 items).
4. Two product card wrappers (`.wishlist-item-wrapper`) are present in the wishlist grid.
5. The count of displayed product cards is 2.
6. The first product card is visible with a name, prices, and an image.
7. The product name is displayed as a text paragraph inside the card.
8. A sale price is displayed on the card (e.g. "LKR 50").
9. An original price is displayed on the card alongside the sale price.
10. A product image is visible inside the `.item-img-wrapper` container.

Overall: the Wishlist page displays all wishlisted products as cards, each showing an image, product name, sale price, and original price, with a subtitle indicating the total count.

### Notes and Assumptions

- Tags: Regression
- Item count text pattern: `"{N} item saved"` (singular) / `"{N} items saved"` (plural) — the live app uses "saved" not "saved(s)"; see `09-wishlist.json`.
- Sale price locator: `locator('.wishlist-grid [class*="price"]').nth(1)`; original price: `locator('.wishlist-grid [class*="price"]').nth(2)`.
- Product images have no alt text — use CSS locator, not `getByRole('img')`.
- Card count locator: `locator('.wishlist-item-wrapper').count()`.

### Defect Opportunity

- Wishlist page may fail to fetch items on navigation (see BUG_CHECKOUT_003_wishlist-page-does-not-fetch-on-navigation.md — check if this bug affects the current state).
- Subtitle may show "item(s) saved" instead of the correct singular/plural form.
- Price or product name may be missing or incorrectly formatted on the card.
