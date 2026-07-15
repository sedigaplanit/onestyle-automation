# TC_WISH_007 — Empty Wishlist State Display

## Test Case ID

TC_WISH_007

## Test Case Title

Wishlist page shows the correct empty state when no items are saved

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- The wishlist is empty (no products have been wishlisted, or all previously wishlisted items have been removed)
- User is not required to be logged in

## Test Steps

1. Clear the wishlist if any items exist: navigate to the Home page and click the heart icon on any filled-heart product cards to remove them, until the navbar badge shows 0 or disappears.
   - Alternatively, open browser DevTools → Application → Local Storage → find the wishlist key → delete its contents → refresh the page.
2. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/wishlist`.
3. Observe the full content of the Wishlist page.
4. Verify the presence of each expected empty state element.
5. Click the "Start Shopping" button.
6. Observe the URL after clicking.

## Expected Result

1. Wishlist is confirmed empty (badge absent or shows 0).
2. Wishlist page (`/wishlist`) loads.
3. No product cards are displayed.
4. The following empty state elements are visible:
   - A heart icon (♡)
   - Heading: **"Your wishlist is empty"**
   - Descriptive message: **"Save items you love by clicking the heart on any product."**
   - A **"Start Shopping"** button
5. "Start Shopping" button click is registered.
6. URL changes to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/` (Home page).

## Notes and Assumptions

- The exact text of the empty state message is taken from AC7 of the user story. Actual text may differ slightly; record any discrepancy as a defect.
- Local Storage manipulation is an acceptable alternative precondition-setup step if the UI does not provide a "clear wishlist" option.

## Defect Opportunity

- Empty state may not display at all (page may be blank or show an error).
- Heading or message text may differ from the specified copy.
- "Start Shopping" button may be absent or may navigate to an incorrect page.
