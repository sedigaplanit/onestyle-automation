# TC_WISH_004 — Navigate to Wishlist Page via Navbar Icon

## Test Case ID

TC_WISH_004

## Test Case Title

Clicking the wishlist heart icon in the navbar navigates to the Wishlist page

## Feature Area

Wishlist

## Priority

High

## Preconditions

- User is on any page of the application
- Navbar is visible

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot` (Home page).
2. Locate the heart (♡) icon in the navbar (between the category links and the cart icon).
3. Note the current URL.
4. Click the wishlist heart (♡) icon in the navbar.
5. Observe the URL after clicking.
6. Repeat steps 3–5 from the Men page (`/mens`).
7. Repeat steps 3–5 from the Women page (`/womens`).
8. Repeat steps 3–5 from the Kids page (`/kids`).

## Expected Result

1. Home page loads with navbar visible.
2. Wishlist heart icon is visible in the navbar.
3. URL is the current page URL.
4. Browser navigates to the Wishlist page.
5. URL changes to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/wishlist`.
   6–8. Same navigation behaviour confirmed from Men, Women, and Kids pages.

## Notes and Assumptions

- The wishlist icon must be clickable from all pages that display the navbar.
- No login is required to navigate to `/wishlist`.

## Defect Opportunity

- Icon may not be clickable and may only show a badge.
- Navigation may go to an incorrect route or a 404 page.
- Icon may not be present on all pages.
