### Test Case ID

TC_PRODUCT_SEARCH_003

### Test Case Title

Combined search, price filter, and sort order update the product list correctly

### Feature Area

Product Search and Filtering

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- Open the Women category page (`/womens`)
- Confirm the Search / Filter bar is visible with the search box, Price Range dropdown, Sort By dropdown, and product count label

### Test Steps

1. Type "blouse" into the "Search products..." input.
2. Select the "Under LKR 100" option from the Price Range dropdown.
3. Select the "Price: Low to High" option from the Sort By dropdown.
4. Observe the resulting product cards and product count label.
5. Change the Sort By dropdown to "Price: High to Low".
6. Observe the order of the visible product cards.
7. Change the Sort By dropdown to "Name: A – Z".
8. Observe the order of the visible product cards again.

### Expected Result

1. Entering "blouse" narrows the visible set to products whose names contain the search term.
2. Applying the "Under LKR 100" filter keeps only products whose `new_price` is under LKR 100, and the count label reflects the exact visible result count.
3. Applying the "Price: Low to High" sort orders the visible products by ascending `new_price`.
4. Changing to "Price: High to Low" reorders the same visible set from highest price to lowest price while keeping the same search/filter subset.
5. Changing to "Name: A – Z" reorders the same visible set alphabetically by product name.
6. The visible product list remains consistent with the search term and price filter through each sort change, and no card outside the combined criteria remains visible.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC3, AC4, and AC6.
- The category page reference confirms the same filter bar is shared across Men, Women, and Kids pages.
- The exact matching product count may vary with the live dataset, but the count must match the visible cards after each change.

### Defect Opportunity

- The sort order may be applied before the search/filter combination is fully resolved, resulting in the wrong subset.
- The product count label may not match the visible filtered items after multiple control changes.
- The sort order may not remain stable when switching between criteria.
