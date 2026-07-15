# TC_WISH_010 — Rapid Double-Click on Heart Icon Does Not Corrupt Wishlist State

## Test Case ID

TC_WISH_010

## Test Case Title

Rapid successive clicks on the heart icon result in a stable, consistent wishlist state

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on the Home page (`$BASE_URL`)
- Wishlist is empty

## Test Steps

1. Navigate to `$BASE_URL` (Home page).
2. Locate any product card with a heart (♡) icon in the unfilled/outline state.
3. Note the wishlist badge count in the navbar (should be 0 or absent).
4. Click the heart icon on the product card twice in rapid succession (double-click as fast as possible).
5. Wait 2 seconds for any async state updates to settle.
6. Observe the final heart icon state on the product card.
7. Observe the wishlist badge count in the navbar.
8. Navigate to `/wishlist` and observe how many items are listed.

## Expected Result

1. Home page loads with product cards visible.
2. A product card with an unfilled heart icon is found.
3. Badge shows 0 or is absent (wishlist is empty).
4. Two rapid clicks are registered.
5. State settles after 2 seconds.
6. Heart icon is in the **unfilled / outline state** (two clicks = add then remove = net zero change).
7. Badge shows 0 or is absent.
8. Wishlist page shows the empty state ("Your wishlist is empty").

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- A double-click should be equivalent to one toggle on and one toggle off, resulting in no net change to the wishlist.
- If the app debounces clicks, a rapid second click within the debounce window may be ignored — in that case, the heart should be in the filled state (1 item added). Record actual behaviour.

## Defect Opportunity

- Race condition may cause the item to be added twice, resulting in a count of 2 instead of 0.
- UI state (heart icon fill) may desync from the actual wishlist data stored in localStorage.
- Badge count may show an incorrect value after rapid toggling.
