# TC_PROD_001 — Default State on Fresh Category Page Navigation

## Test Case ID

TC_PROD_001

## Test Case Title

All products are displayed with controls in default state when navigating to a category page for the first time

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User has not previously applied any filters on the category page
- No query parameters are present in the URL

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Observe the search input in the Search / Filter bar.
3. Observe the Price Range dropdown.
4. Observe the Sort By dropdown.
5. Observe the product count label.
6. Observe the number of product cards rendered in the grid.
7. Repeat steps 1–6 for `$BASE_URL/mens`.
8. Repeat steps 1–6 for `$BASE_URL/kids`.

## Expected Result

1. The Women's category page loads successfully.
2. The search input is visible and its value is **empty** (placeholder text "Search products..." is shown).
3. The Price Range dropdown shows **"All Prices"** as the selected option.
4. The Sort By dropdown shows the **blank default** option (no sort applied).
5. A product count label is visible reading **"Showing X products"** where X equals the total number of products in the Women's category.
6. All products in the Women's category are rendered as product cards — none are hidden by any filter.
   7–8. The same default state is confirmed for `/mens` and `/kids`.

## Notes and Assumptions

- The default state must be consistent across all three category pages.
- No login is required to access category pages.

## Defect Opportunity

- Page may load with a previously cached filter state if state is not reset on navigation.
- Product count label may be absent or show an incorrect number.
- Dropdown default labels may differ from "All Prices" / blank Sort By.
