### Test Case ID

TC_WISHLIST_001

### Test Case Title

Add product to wishlist from product card — heart icon changes and badge increments

### Feature Area

Wishlist

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in (Profile, My Orders, and Logout buttons are visible in the navbar)
- At least one product card on the Landing page is NOT already in the wishlist (heart icon shows ♡)
- Note the current wishlist count displayed in the navbar wishlist link (e.g. "♡" for 0, "♡ 1" for 1)

### Test Steps

1. On the Landing page, locate a product card whose heart icon shows ♡ (unwishlisted state)
2. Note the current wishlist count badge in the navbar (the number shown alongside the ♡ link, or the absence of a count if 0)
3. Click the ♡ heart button on that product card (`getByRole('button', { name: '♡' }).first()`)

### Expected Result

1. A product card is visible with a ♡ heart button in its unwishlisted state (title="Add to wishlist")
2. The current wishlist count badge value is noted for comparison
3. The heart button on the clicked product card changes from ♡ to ♥ (filled heart; title becomes "Remove from wishlist"; class gains "wishlisted")
4. The wishlist count badge in the navbar increments by 1 (e.g. if it was 0, the badge now shows "♡ 1"; if it was 1, it now shows "♡ 2")
5. No page reload occurs; the change is immediate and visible in-place

### Notes and Assumptions

- Tags: Regression
- AC3 (wishlist badge count) is also verified by this TC (badge updates in real-time on add)
- Unwishlisted button locator: `getByRole('button', { name: '♡' })`; wishlisted: `getByRole('button', { name: '♥' })` or `locator('button.item-wishlist-btn.wishlisted')`
- The navbar wishlist link name changes from "♡" to "♡ 1" (with count) when the first item is added
- The count badge may not render when the count is 0 (consistent with the cart badge behaviour)

### Defect Opportunity

- Heart icon does not visually change after clicking (no feedback)
- The count badge does not increment after adding to wishlist
- The wrong product's heart icon changes state
- The heart button is not accessible via `getByRole('button', { name: '♡' })` (title or aria-label missing)
