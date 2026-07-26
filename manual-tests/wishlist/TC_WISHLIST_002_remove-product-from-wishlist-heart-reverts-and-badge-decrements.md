### Test Case ID

TC_WISHLIST_002

### Test Case Title

Remove product from wishlist via product card — heart reverts and badge decrements

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in
- At least one product card on the Landing page has the heart icon in the wishlisted state (♥, filled heart, class="item-wishlist-btn wishlisted")
- Note the current wishlist count badge value in the navbar

### Test Steps

1. On the Landing page, locate a product card whose heart icon shows ♥ (wishlisted state; title="Remove from wishlist")
2. Note the current wishlist count badge in the navbar
3. Click the ♥ heart button on that product card (`getByRole('button', { name: '♥' }).first()`)

### Expected Result

1. A product card is visible with a ♥ filled heart button (wishlisted state)
2. The current wishlist count badge value is noted for comparison
3. The heart button on the clicked card reverts from ♥ back to ♡ (unfilled; title becomes "Add to wishlist"; "wishlisted" class is removed)
4. The wishlist count badge in the navbar decrements by 1 (e.g. if it was "♡ 2", it now shows "♡ 1"; if it was "♡ 1", the count badge disappears or shows 0)
5. No page reload occurs; the change is immediate and in-place

### Notes and Assumptions

- Tags: Regression
- AC3 (wishlist badge count updates in real-time on remove) is also verified by this TC
- TC_WISHLIST_001 must be executed first if no product is currently in the wishlist
- Wishlisted button locator: `getByRole('button', { name: '♥' })` or `locator('button.item-wishlist-btn.wishlisted')`

### Defect Opportunity

- Heart icon does not revert to ♡ after clicking ♥ (toggle does not work in remove direction)
- Count badge does not decrement after removal
- Count badge remains visible with "1" when the wishlist is now empty (should disappear or show 0)
- The product is visually removed from the card list rather than the heart toggling
