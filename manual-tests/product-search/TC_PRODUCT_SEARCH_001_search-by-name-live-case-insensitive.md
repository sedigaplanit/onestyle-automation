### Test Case ID

TC_PRODUCT_SEARCH_001

### Test Case Title

Search input filters product names in real time, case-insensitively

### Feature Area

Product Search and Filtering

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- Open the Women category page (`/womens`)
- Confirm the Search / Filter bar is visible with the search input and product count label

### Test Steps

1. Observe the product count label on the category page.
2. Enter the search term "BLOUSE" into the "Search products..." input.
3. Observe the product list as the text is entered.
4. Clear the search input.
5. Enter the same search term using lowercase characters, "blouse", into the search input.

### Expected Result

1. The category page loads with the default product list visible and the product count label shown.
2. Typing "BLOUSE" updates the visible product cards in real time so that every remaining product card name contains the text "blouse".
3. The filtering is case-insensitive, so the lowercase entry produces the same matching count and the same visible result set as the uppercase entry.
4. Clearing the search input restores the full category product list and the default item count.
5. The count label changes as the filter narrows the visible result set and then returns to the original value after the search is cleared.

### Notes and Assumptions

- Tags: Regression
- This test is directly traceable to AC1 and AC6.
- The search input is the category page textbox with placeholder "Search products...".
- The visible product count should update as the result set changes.

### Defect Opportunity

- Search may not update in real time and only apply after pressing Enter or blur.
- Filtering may be case-sensitive and return inconsistent results between uppercase and lowercase inputs.
- The count label may not reflect the filtered result set correctly.
