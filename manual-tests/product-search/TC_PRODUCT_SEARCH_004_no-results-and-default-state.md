### Test Case ID

TC_PRODUCT_SEARCH_004

### Test Case Title

No-results state appears for unmatched filters and the default state resets correctly

### Feature Area

Product Search and Filtering

### Priority

Medium

### Preconditions

- Navigate to $BASE_URL
- Open the Women category page (`/womens`)
- Confirm the Search / Filter bar is visible with the search box, Price Range dropdown, Sort By dropdown, and product count label

### Test Steps

1. Observe the category page in its initial default state.
2. Verify the search input, the Price Range dropdown, and the Sort By dropdown values.
3. Enter the unique search term "zzzz-no-match-12345" into the search box.
4. Observe the product grid area.
5. Clear the search input.
6. Reset the form to the default state by setting the Price Range dropdown back to "All Prices" and the Sort By dropdown to the blank default option.

### Expected Result

1. The category page initially shows all products in the category.
2. The search input is empty, the Price Range dropdown shows "All Prices", and the Sort By dropdown shows the blank default option.
3. Entering the unique unmatched search term causes the message "No products match your filters." to appear in the product grid area.
4. No product cards are rendered while that no-results state is active.
5. Clearing the search input removes the no-results message and restores the category listing.
6. Resetting to the default state restores the full category listing, clears the search input, and returns both dropdowns to their initial default values.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC5 and AC7.
- The blank default option in the Sort By dropdown is the initial selection that implies no specific ordering.
- The no-results behavior is deterministic if the search term is guaranteed not to match any product name in the current category.

### Defect Opportunity

- The product grid may continue to render stale cards even when the filters match no products.
- The default controls may not return to the initial blank/All Prices state after resetting.
- The count label may continue to show the old count instead of resetting with the visible results.
