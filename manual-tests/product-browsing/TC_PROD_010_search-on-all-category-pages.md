# TC_PROD_010 — Search Applied on All Three Category Pages

## Test Case ID

TC_PROD_010

## Test Case Title

Search filtering works independently and correctly on each category page (Men, Women, Kids)

## Feature Area

Product Browsing

## Priority

Medium

## Preconditions

- User has no active filters
- All three category pages are accessible

## Test Steps

1. Navigate to `$BASE_URL/mens`.
2. Type a search term in the search input that is known to match at least one Men's product.
3. Verify that only Men's products matching the term are displayed.
4. Clear the search.
5. Navigate to `$BASE_URL/womens`.
6. Type the same search term.
7. Observe the product list — if the term matches Women's products, they are shown; if not, the empty state appears.
8. Clear the search.
9. Navigate to `$BASE_URL/kids`.
10. Type the same search term.
11. Observe the product list.
12. Verify at no point do products from a different category appear in the results.

## Expected Result

1. Men's category page loads.
2. Search term typed into the input.
3. Only Men's products whose names contain the term are displayed. No Women's or Kids' products appear.
4. Search cleared — all Men's products restored.
   5–8. Same filtering behaviour confirmed on Women's page (products are category-scoped).
   9–11. Same filtering confirmed on Kids' page.
5. Product filtering is always scoped to the current category — cross-category products never appear.

## Notes and Assumptions

- The search only filters within the current category page; it does not perform a global search across all categories.
- The same term may match products in multiple categories, but results are always category-scoped.

## Defect Opportunity

- Search may inadvertently show products from other categories.
- Navigating between categories may carry a search term from the previous page.
