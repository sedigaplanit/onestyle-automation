### Test Case ID

TC_WISHLIST_003

### Test Case Title

Wishlist badge count in navbar reflects current item count

### Feature Area

Wishlist Management

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- Wishlist is empty at test start
- The landing page is displayed

### Test Steps

1. Locate the ♡ wishlist icon in the navbar.
2. Read the badge count adjacent to the wishlist icon (expected: no badge visible).
3. Click the ♡ button on the first product card in the "POPULAR IN WOMEN" section.
4. Read the badge count adjacent to the wishlist ♡ icon in the navbar.
5. Click the ♡ button on a second product card in the "POPULAR IN WOMEN" section.
6. Read the badge count adjacent to the wishlist ♡ icon in the navbar.

### Expected Result

1. The wishlist ♡ icon is visible in the navbar.
2. No numeric badge is displayed next to the wishlist icon (wishlist is empty).
3. The click is registered; the first product is added to the wishlist.
4. The navbar wishlist badge shows "1".
5. The click is registered; the second product is added to the wishlist.
6. The navbar wishlist badge updates to "2".

Overall: the wishlist badge in the navbar accurately reflects the current number of wishlisted items and updates in real-time as items are added.

### Notes and Assumptions

- Tags: Regression
- Navbar wishlist link locator: `getByRole('link', { name: '♡' })`.
- The badge is only rendered when the count is greater than 0, consistent with the cart badge behaviour (CSS `.nav-cart-count` only renders when count > 0).
- Two distinct product cards must be selected to avoid toggling the same product.

### Defect Opportunity

- Badge may not appear after adding the first item.
- Badge may not increment from "1" to "2" when a second item is added.
- Badge may display an incorrect count (e.g. always showing "1" regardless of actual items).
