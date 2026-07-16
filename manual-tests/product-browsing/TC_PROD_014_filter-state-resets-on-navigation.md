# TC_PROD_014 — Filter State Resets After Navigating Away and Back

## Test Case ID

TC_PROD_014

## Test Case Title

Search, price filter, and sort state are reset to defaults when navigating away from a category page and returning

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Apply the following filters:
   a. Type `blouse` in the search input.
   b. Select **"Under LKR 100"** from the Price Range dropdown.
   c. Select **"Price: Low to High"** from the Sort By dropdown.
3. Verify the filters are applied (only matching products shown, sorted by price).
4. Click the **Men** link in the navbar to navigate to `/mens`.
5. Navigate back to `/womens` by clicking the **Women** link in the navbar.
6. Observe the search input value.
7. Observe the Price Range dropdown selection.
8. Observe the Sort By dropdown selection.
9. Observe the product list and count label.

## Expected Result

1. Women's category page loads.
2. All three filters applied simultaneously.
3. Filtered, sorted results confirmed.
4. Men's page loads.
5. Women's page reloads via navbar.
6. Search input is **empty** (no text from the previous session).
7. Price Range dropdown shows **"All Prices"** (reset to default).
8. Sort By dropdown shows the **blank default** option (reset).
9. All Women's products are displayed and the count label shows the full total.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- The expected behaviour is a full state reset on navigation. If the app intentionally preserves filter state via URL query parameters, that is an alternative acceptable behaviour — but must be documented.
- Test covers in-app navigation (navbar links), not browser Back button.

## Defect Opportunity

- Previously applied search term may persist in the input after navigation.
- Price filter or sort selection may persist after navigating away and returning.
- Product count may show the filtered count from the previous visit instead of the full count.
