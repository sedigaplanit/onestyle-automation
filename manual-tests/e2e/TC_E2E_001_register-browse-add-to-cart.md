# TC_E2E_001 - End-to-End: Register from Landing Page then Add Product to Cart

## Test Case ID

TC_E2E_001

## Test Case Title

New user registers via the landing page Sign Up button, browses a category, adds a product to the cart, and proceeds to checkout

## Feature Area

End-to-End Journey

## Priority

High

## Preconditions

- User is not logged in
- Cart is empty
- A unique email address is available for registration

## Test Steps

1. Navigate to `https://sedigaplanit.github.io/AI-R-D---Github-copilot/`
2. Verify the Landing page loads with the hero section showing "Shop Now", "Sign Up", "Learn More" buttons
3. Click the "Sign Up" button in the hero section
4. Verify the Sign Up form is displayed
5. Fill in the Sign Up form:
   - Name: "E2E Test User"
   - Email: "e2e_test_[timestamp]@example.com" (unique)
   - Gender: "Female"
   - Mobile Number: "0771112233"
   - Password: "E2eTest@123"
   - Confirm Password: "E2eTest@123"
6. Click the "Sign Up" button
7. Verify the user is redirected to the Landing page with authenticated nav (Profile, My Orders, Logout visible)
8. Click the "Men" link in the navbar to navigate to `/mens`
9. Verify the Men category page loads showing "Showing 12 products", search bar, price filter, and sort dropdown
10. Click on any product image or name to navigate to its product detail page (`/product/:id`)
11. Verify the product page loads with: breadcrumb, product name, star rating, price, size buttons, quantity controls, Add to Cart and Buy Now buttons
12. Select a size (e.g. click "M")
13. Click the "Add to Cart" button
14. Verify the success toast notification appears
15. Verify the cart count badge in the navbar increases to "1"
16. Click the cart icon in the navbar to navigate to `/cart`
17. Verify the cart page shows the added item with correct product name, price, and a Remove icon
18. Verify "Proceed to Checkout" button is visible and enabled (cart is not empty, user is authenticated)
19. Click the "Proceed to Checkout" button

## Expected Result

1. Landing page loads at `/`
2. Hero section with three CTA buttons is visible
3. User is navigated to the Sign Up form
4. Sign Up form displays with all required fields
5. All fields are filled in without error
6. Form submits successfully
7. User is redirected to `/` and the navbar shows Profile, My Orders, and Logout
8. Men category page loads at `/mens`
9. Category page shows product count, search bar ("Search products..."), price filter dropdown, and sort dropdown
10. Product detail page loads at `/product/:id`
11. All product page elements are visible including breadcrumb, h1 name, rating, prices, size buttons (S/M/L/XL/XXL), quantity controls (-/count/+), Add to Cart, Buy Now
12. Selected size "M" is highlighted/selected
13. Item is added to cart
14. Success toast (.toast-success) appears confirming the item was added
15. The cart badge (.nav-cart-count) in the navbar shows "1"
16. Cart page loads at `/cart`
17. Cart shows one item row with the product image, name, price, quantity, total, and a Remove icon
18. "Proceed to Checkout" button is visible and enabled
19. Checkout flow is initiated (destination page is unverified — record actual behaviour)

**Overall:** A new user can complete the full journey from registration through to initiating checkout in a single session.

## Notes and Assumptions

- Use a unique timestamp-based email to ensure registration succeeds each run
- Step 19 destination is unverified; record what happens after clicking "Proceed to Checkout"

## Defect Opportunity

- "Sign Up" hero button may not navigate to the Sign Up form
- Authenticated nav may not appear after registration
- Cart badge may not update after adding an item
- "Proceed to Checkout" destination and payment flow are unverified
