### Test Case ID

TC_PRODUCT_SEARCH_005

### Test Case Title

Men category page supports live search and price filtering for visible product results

### Feature Area

Product Search and Filtering

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- Open the landing page and click the Men navigation link to reach `/mens`
- Confirm the Search / Filter bar is visible with the search input, the Price Range dropdown, the Sort By dropdown, and the product count label

### Test Steps

1. Observe the initial Men category page state after navigation.
2. Enter the search term "green" into the Search products... textbox.
3. Observe the displayed product cards and the count label.
4. Change the Price Range dropdown to "Under LKR 100".
5. Observe the filtered product list and the updated count label.
6. Change the Sort By dropdown to "Price: High to Low".
7. Compare the visible order of the remaining products with the same filtered subset.

### Expected Result

1. The Men category page loads with the full category listing visible and the product count label displayed.
2. Typing "green" filters the list in real time to only products whose names contain "green", using a case-insensitive match.
3. The product count label updates to the number of visible products that match the search term.
4. Selecting "Under LKR 100" keeps only products whose `new_price` is below LKR 100, and the count label updates to the filtered subtotal.
5. The visible product cards remain consistent with the active price filter after the selection changes.
6. Changing the Sort By dropdown to "Price: High to Low" reorders the same filtered subset from highest price to lowest price without changing which items are included.
7. The final rendered product list reflects the combined search-term and price-filter criteria in the selected order.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC1, AC2, AC3, AC4, and AC6.
- The Men category page uses the same shared filter bar structure as Women and Kids category pages.
- The product count label is expected to reflect the visible filtered result set after each control change.

### Defect Opportunity

- The live search may not update immediately when typing into the search box.
- The Price Range dropdown may not filter the Men list correctly or may leave stale cards displayed.
- The Sort By dropdown may reorder the entire list instead of only the current filtered subset.
