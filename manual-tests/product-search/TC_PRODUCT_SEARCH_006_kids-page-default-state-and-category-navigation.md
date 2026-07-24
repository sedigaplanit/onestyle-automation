### Test Case ID

TC_PRODUCT_SEARCH_006

### Test Case Title

Kids category page navigation preserves the default search controls and resets to the full product list after a no-match search

### Feature Area

Product Search and Filtering

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- Open the landing page and verify that the Men, Women, and Kids category navigation links are visible
- The landing page is the starting point for category-page navigation

### Test Steps

1. Click the Kids navigation link from the landing page.
2. Verify the destination URL is `/kids`.
3. Observe the default Kids category page state.
4. Verify the Search products... textbox is empty.
5. Verify the Price Range dropdown shows "All Prices".
6. Verify the Sort By dropdown shows the blank default option.
7. Enter the unmatched search term "zzzz-kids-no-match-12345" into the search box.
8. Observe the product grid area.
9. Clear the search input.
10. Verify that the full Kids category listing is restored.

### Expected Result

1. Clicking Kids navigates to the Kids category page at `/kids`.
2. The Kids page uses the same shared Search / Filter bar and category-page layout as the other category routes.
3. The search input is empty on first load.
4. The Price Range dropdown defaults to "All Prices".
5. The Sort By dropdown defaults to the blank option with no specific ordering applied.
6. Entering an unmatched search term shows the message "No products match your filters." and renders no products in the grid.
7. Clearing the search input removes the no-results message and restores the full Kids category listing.
8. The control values return to the default state when no active filters are applied.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC5 and AC7.
- The Kids category page is expected to share the same product-search controls and behavior as the Women and Men pages.
- The search text chosen in this case is intentionally unique so it should not match any product name in the current category.

### Defect Opportunity

- Clicking the Kids link may not navigate to the correct category page.
- The default control values may not match the expected blank/All Prices state on first load.
- The no-results message may not appear, or stale product cards may linger after the unmatched search term is entered.
