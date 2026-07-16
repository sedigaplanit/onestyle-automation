# User Story: Product Search and Filtering

**As a** shopper browsing a category,  
**I want to** search for products by name, filter by price range, and sort results,  
**So that** I can quickly find items that match my preferences without scrolling through everything.

## Acceptance Criteria

### AC1 - Search bar on category pages

- Given I am on any category page (`/mens`, `/womens`, or `/kids`)
- Then a search input with placeholder text "Search products..." is visible in the Search / Filter bar
- When I type a search term into the input
- Then the displayed product list updates in real-time to show only products whose names contain the search term
- And the search is case-insensitive

### AC2 - Price range filter

- Given I am on a category page
- Then a "Price Range" dropdown is available in the Search / Filter bar with the following options:
  - All Prices (default, no filter applied)
  - Under LKR 100
  - LKR 100 – 200
  - Above LKR 200
- When I select a price range option
- Then only products whose `new_price` falls within that range are displayed
- And the product count label updates to reflect the filtered count

### AC3 - Sort order

- Given I am on a category page
- Then a "Sort By" dropdown is available with the following options:
  - (blank default — no specific order applied)
  - Price: Low to High (ascending by `new_price`)
  - Price: High to Low (descending by `new_price`)
  - Name: A – Z (ascending alphabetically by product name)
- When I select a sort option
- Then the displayed products are reordered according to the selected criterion

### AC4 - Combined search, filter, and sort

- Given I apply a search term, a price range filter, and a sort order simultaneously
- Then only products matching both the search term and the price range are displayed
- And those products are ordered according to the selected sort option
- And the product count updates to reflect the exact number of matching items

### AC5 - No results state

- Given the active filters (search term and/or price range) match no products in the current category
- Then the message "No products match your filters." is displayed in the product grid area
- And no product cards are rendered

### AC6 - Product count display

- Given I am on a category page
- Then a label shows the current number of visible products (e.g. "Showing 8 products")
- And this count updates in real-time whenever the search term, price range, or sort order changes

### AC7 - Default state (no filters applied)

- Given I navigate to a category page for the first time or without any query parameters
- Then all products in that category are displayed
- And the search input is empty
- And the Price Range dropdown shows "All Prices"
- And the Sort By dropdown shows the blank default option
