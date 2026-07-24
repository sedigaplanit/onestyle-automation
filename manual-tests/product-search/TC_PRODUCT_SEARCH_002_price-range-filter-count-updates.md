### Test Case ID

TC_PRODUCT_SEARCH_002

### Test Case Title

Price Range dropdown restricts products and updates the visible count

### Feature Area

Product Search and Filtering

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- Open the Women category page (`/womens`)
- Confirm the Search / Filter bar is visible and the Price Range dropdown defaults to "All Prices"

### Test Steps

1. Record the current product count label shown on the page.
2. Select the "Under LKR 100" option from the Price Range dropdown.
3. Observe the displayed product cards and the product count label.
4. Change the Price Range dropdown to "LKR 100 – 200".
5. Observe the product cards and count label again.

### Expected Result

1. The category page loads with the Price Range dropdown showing "All Prices" by default.
2. Selecting "Under LKR 100" recalculates the visible product set and the product count label changes from the default state.
3. Every visible product card after the change reflects a `new_price` below LKR 100, and no card outside that range remains visible.
4. Switching to "LKR 100 – 200" recalculates the product set again and the count label changes to the new visible total.
5. Every visible product card after the second change reflects a `new_price` in the LKR 100 – 200 range, and the visible list is consistent with the selected filter.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC2 and AC6.
- The Price Range dropdown options are defined in the category page reference.
- The exact product count will vary by data set, but the label must always update to the visible result count.

### Defect Opportunity

- The product count label may remain on the previous value after the filter changes.
- The price-range matching may include products outside the requested band.
- The dropdown may not reset correctly when another filter changes.
