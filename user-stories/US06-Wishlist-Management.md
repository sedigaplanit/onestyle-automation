# User Story: Wishlist Management

**As a** shopper,  
**I want to** save products to a wishlist and manage those saved items,  
**So that** I can easily revisit and purchase products I am interested in later.

---

## Acceptance Criteria

### AC1 - Toggle wishlist from a product card

- Given I am on any product listing page (Home, Men, Women, Kids)
- When I click the heart (♡) icon on a product card
- Then the product is added to my wishlist
- And the heart icon changes state to indicate the product is saved (filled / highlighted)
- And the wishlist count badge in the navbar increments

### AC2 - Remove a product from the wishlist via product card

- Given a product is already in my wishlist and I can see its card
- When I click the heart icon again
- Then the product is removed from my wishlist
- And the heart icon reverts to the unwishlisted state
- And the wishlist count badge in the navbar decrements

### AC3 - Wishlist badge count in the navbar

- Given I have one or more items in my wishlist
- Then the wishlist heart icon (♡) in the navbar shows a numeric count badge
- And the count updates in real-time as I add or remove items

### AC4 - Navigate to the wishlist page

- Given I am on any page
- When I click the wishlist heart icon (♡) in the navbar
- Then I am navigated to the Wishlist page (`/wishlist`)

### AC5 - Wishlist page — items displayed

- Given I have one or more wishlisted products
- When I navigate to `/wishlist`
- Then all wishlisted products are displayed as product cards showing image, name, old price, and new price
- And a subtitle shows "X item(s) saved"

### AC6 - Navigate to product detail from wishlist

- Given I am on the Wishlist page
- When I click on a product card
- Then I am navigated to that product's detail page (`/product/:productId`)

### AC7 - Empty wishlist state

- Given my wishlist is empty
- When I navigate to `/wishlist`
- Then an empty state is displayed with:
  - A heart icon (♡)
  - Heading: "Your wishlist is empty"
  - Message: "Save items you love by clicking the heart on any product."
  - A "Start Shopping" button that navigates to the home page (`/`)

### AC8 - Wishlist persisted in localStorage

- Given I have items in my wishlist
- When I refresh the browser or close and reopen the tab
- Then my wishlist items are still present (persisted in localStorage)

### AC9 - Wishlist items cleared after a successful purchase

- Given I have purchased one or more items that are also in my wishlist
- After the checkout completes successfully
- Then the purchased items are automatically removed from my wishlist
- And any remaining wishlisted items (not purchased) are unaffected
