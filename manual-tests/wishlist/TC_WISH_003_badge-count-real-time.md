# TC_WISH_003 — Wishlist Badge Count Updates in Real-Time

## Test Case ID

TC_WISH_003

## Test Case Title

Wishlist navbar badge count updates in real-time as items are added and removed

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- User is on the Home page (`/`)
- Wishlist is empty
- At least three product cards are visible

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Confirm wishlist badge in the navbar is absent or shows 0.
3. Click the heart icon on the first product card.
4. Read the wishlist badge count in the navbar.
5. Click the heart icon on a second product card.
6. Read the wishlist badge count in the navbar.
7. Click the heart icon on a third product card.
8. Read the wishlist badge count in the navbar.
9. Click the heart icon on the first product card again (to remove it).
10. Read the wishlist badge count in the navbar.

## Expected Result

1. Home page loads successfully.
2. Badge is absent or shows 0.
3. Heart icon on first card becomes filled.
4. Badge shows 1.
5. Heart icon on second card becomes filled.
6. Badge shows 2.
7. Heart icon on third card becomes filled.
8. Badge shows 3.
9. Heart icon on first card reverts to outline.
10. Badge shows 2.

## Notes and Assumptions

- Each badge update must occur without any page reload.
- Badge reflects the live count of wishlisted items at all times.

## Defect Opportunity

- Badge may only update after a page refresh.
- Badge count may go out of sync after multiple add/remove operations.
- Badge may not disappear or reset to 0 when wishlist becomes empty.
