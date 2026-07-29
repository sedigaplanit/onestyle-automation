### Test Case ID

TC_WISHLIST_001

### Test Case Title

Add product to wishlist from product card — heart icon toggles and navbar badge increments

### Feature Area

Wishlist Management

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- No products are currently in the wishlist (localStorage wishlist is empty)
- The landing page is displayed and product cards are visible

### Test Steps

1. Locate a product card in the "POPULAR IN WOMEN" section on the landing page.
2. Note the state of the heart icon on that card (unfilled ♡).
3. Note the wishlist badge count shown next to the ♡ icon in the navbar (expected: no badge or "0").
4. Click the ♡ (heart) button on the product card.
5. Locate the heart button on the same product card.
6. Locate the wishlist ♡ icon in the navbar.
7. Read the badge count next to the wishlist icon.

### Expected Result

1. The product card is visible with an unfilled heart icon (♡).
2. The heart icon is in the unwishlisted state (♡, title="Add to wishlist").
3. The navbar shows no numeric badge next to the wishlist icon (or badge value is 0).
4. The click is registered.
5. The heart icon on the product card changes to a filled heart (♥), indicating the product has been added to the wishlist.
6. The navbar wishlist icon is visible in the navbar.
7. The badge count next to the wishlist icon shows "1".

Overall: clicking the heart icon on a product card adds that product to the wishlist, visually confirmed by the heart icon filling and the navbar badge incrementing.

### Notes and Assumptions

- Tags: Regression
- Wishlist toggle button locators: unwishlisted = `getByRole('button', { name: '♡' })`, wishlisted = `getByRole('button', { name: '♥' })`.
- The navbar wishlist link is `getByRole('link', { name: '♡' })`.
- The cart badge uses CSS `.nav-cart-count` and is only rendered when count > 0; the wishlist badge behaves similarly.
- This test uses the landing page product cards; the same behaviour applies to category pages (/womens, /mens, /kids).

### Defect Opportunity

- Heart icon may not update visually after click (state not reflected in UI).
- Navbar badge may not appear or may show an incorrect count after adding.
- Clicking the heart on one product card may incorrectly toggle a different product's wishlist state.
