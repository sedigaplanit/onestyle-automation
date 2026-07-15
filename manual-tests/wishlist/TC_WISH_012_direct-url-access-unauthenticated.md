# TC_WISH_012 — Direct URL Access to Wishlist Page When Unauthenticated

## Test Case ID

TC_WISH_012

## Test Case Title

Unauthenticated user can access the Wishlist page directly via URL without being redirected to login

## Feature Area

Wishlist

## Priority

Medium

## Preconditions

- User is NOT logged in (no active session)
- Wishlist may be empty or contain items previously saved to localStorage

## Test Steps

1. Ensure no active session exists: if logged in, click **Logout** in the navbar.
2. Do **not** navigate through the app normally — type `$BASE_URL/wishlist` directly into the browser address bar and press Enter.
3. Observe what page loads.
4. Observe whether a login redirect occurs.
5. If the Wishlist page loads:
   a. Verify the URL remains `$BASE_URL/wishlist` (no redirect).
   b. Observe the content: empty state or product cards (depending on localStorage contents).
6. If a redirect to `/login` occurs, record this as the actual behaviour.

## Expected Result

1. User is confirmed unauthenticated (Login button visible in navbar).
2. Direct URL typed and Enter pressed.
3. The Wishlist page (`/wishlist`) loads directly.
4. **No redirect to the login page.** The wishlist is accessible to unauthenticated users.
   5a. URL stays at `$BASE_URL/wishlist`.
   5b. If localStorage is empty: empty wishlist state is displayed ("Your wishlist is empty" + Start Shopping button). If localStorage contains items: those items are displayed as product cards.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- Based on the user story, wishlist functionality does not require authentication (AC8 states persistence via localStorage, not a user account).
- If the app requires login to view the wishlist (redirect to `/login`), this may be intentional product behaviour or a defect — record the actual result for triage.

## Defect Opportunity

- App may incorrectly redirect unauthenticated users to `/login` when they try to access `/wishlist`.
- A 404 or blank page may load instead of the wishlist.
- localStorage items may not load for an unauthenticated session if the app checks for an auth token before reading wishlist state.
