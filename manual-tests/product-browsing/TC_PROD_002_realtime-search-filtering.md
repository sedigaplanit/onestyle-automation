# TC_PROD_002 — Real-Time Search Filtering by Product Name

## Test Case ID

TC_PROD_002

## Test Case Title

Typing a search term filters the product list in real-time to show only matching products

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- No filters are applied (default state)
- At least two products are visible with distinct names

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Note the total product count shown in the "Showing X products" label.
3. Note the names of the first two visible products.
4. Click on the search input (placeholder: "Search products...").
5. Type the first few characters of one product name (e.g. the first 4–5 characters).
6. Observe the product list while typing — do not wait for a button press.
7. Observe the product count label after typing.
8. Verify that every visible product card contains the typed search term in its name.
9. Clear the search input completely.
10. Observe the product list and count label after clearing.

## Expected Result

1. Women's category page loads with all products.
2. Product count shows the total number (e.g. "Showing 12 products").
3. Names of at least two products are noted.
4. Search input receives focus.
5. Characters are typed into the input.
6. The product list updates **in real-time** (without pressing Enter or clicking a button) — only products whose names contain the typed text are shown.
7. The count label updates to reflect the filtered number (e.g. "Showing 3 products").
8. Every displayed product card has a name that includes the typed search term.
9. Search input is empty.
10. All products are restored and the count label returns to the full total.

## Notes and Assumptions

- Real-time means the list updates as each character is typed, not on submit.
- The search field filters by product name only (not price, size, or category).

## Defect Opportunity

- Product list may only filter on Enter key press rather than on each keystroke.
- Count label may not update when filter is applied.
- Clearing the search may not restore all products without a page reload.
