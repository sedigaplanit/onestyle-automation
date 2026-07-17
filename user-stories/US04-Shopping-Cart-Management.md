# User Story: Shopping Cart Management

**As a** buyer,  
**I want to** add products to my cart, update quantities, and remove items,  
**So that** I can manage my order before proceeding to checkout.

---

## Acceptance Criteria

### AC1 - Add a product to the cart from the product detail page

- Given I am on a product detail page (`/product/:productId`)
- When I select a size (S, M, L, XL, or XXL)
- And I set the desired quantity using the quantity controls (default is 1)
- And I click "Add to Cart"
- Then the selected product is added to the cart with the chosen quantity
- And a toast notification confirms the addition (e.g. "1× '[product name]...' added to cart!")
- And the cart item count in the navbar updates immediately to reflect the new total

### AC2 - Size selection is required before adding to cart

- Given I am on a product detail page
- When I click "Add to Cart" without selecting a size
- Then the product is NOT added to the cart
- And a toast error "Please select a size first!" is displayed
- And the size selector visually highlights in an error state

### AC3 - Quantity selector on the product detail page

- Given I am on a product detail page and have not yet added the product to the cart
- Then a quantity control with "−" and "+" buttons is shown, defaulting to 1
- When I click "+" the displayed quantity increases by 1
- When I click "−" the displayed quantity decreases by 1 (minimum 1)
- When I add the product to the cart, the quantity in the cart reflects the selected amount

### AC4 - Buy Now shortcut

- Given I have selected a size on a product detail page
- When I click "Buy Now"
- Then the product is added to my cart (if not already present)
- And I am navigated to the cart page (`/cart`) with the checkout modal opening automatically

### AC5 - View cart contents

- Given I have one or more items in my cart
- When I navigate to the cart page (`/cart`)
- Then I see each cart item displayed in a row containing:
  - Product image
  - Product name
  - Unit price (in LKR)
  - Quantity control ("−", quantity value, "+")
  - Line total (unit price × quantity, in LKR)
  - Remove icon (✕)
- And the Cart Totals panel shows:
  - Sub Total (in LKR)
  - Shipping: Free
  - Total (in LKR)

### AC6 - Increase item quantity in cart

- Given I am on the cart page
- When I click the "+" button next to a cart item
- Then the quantity for that item increases by 1
- And the line total and the Cart Totals (Sub Total and Total) recalculate immediately

### AC7 - Decrease item quantity in cart (quantity > 1)

- Given I am on the cart page and an item has a quantity greater than 1
- When I click the "−" button
- Then the quantity decreases by 1
- And all totals update immediately

### AC8 - Remove item when quantity is decremented to zero

- Given I am on the cart page and an item has a quantity of exactly 1
- When I click the "−" button
- Then the item is removed from the cart entirely
- And the cart and totals update immediately

### AC9 - Remove item using the remove icon

- Given I am on the cart page
- When I click the remove icon (✕) next to an item
- Then that item is removed from the cart immediately
- And all totals recalculate

### AC10 - Cart contents persist during session browsing

- Given I have items in my cart
- When I navigate to other pages (Home, Men, Women, Kids, Product) and return to `/cart`
- Then my cart contents are preserved unchanged

### AC11 - Cart persistence for authenticated users across sessions

- Given I am logged in and have items in my cart
- When I log out and later log back in
- Then my cart is restored from the server with the items I had before logging out

### AC12 - Cart is saved to server on logout

- Given I am logged in and have items in my cart
- When I click "Logout"
- Then the current cart is saved to the server before the session ends
- And the local cart state is cleared

### AC13 - Guest checkout prompt

- Given I am not logged in
- When I navigate to the cart page (`/cart`)
- Then a "Sign in to proceed with checkout" prompt is shown in the Cart Totals panel
- And a "Sign Up / Login" button is displayed
- When I click "Sign Up / Login"
- Then I am navigated to `/login` with the Sign Up form pre-selected

### AC14 - Checkout button disabled for empty cart

- Given I am logged in
- And my cart contains no items
- When I view the cart page
- Then the "Proceed to Checkout" button is disabled and visually styled as inactive (reduced opacity, not-allowed cursor)

### AC15 - Proceed to checkout

- Given I am logged in and have at least one item in my cart
- When I view the cart page
- Then the "Proceed to Checkout" button is active and clickable
- And clicking it opens the checkout modal
