# TC_PROD_007 — Product Count Label Updates in Real-Time

## Test Case ID

TC_PROD_007

## Test Case Title

The "Showing X products" label updates immediately whenever any filter or search changes

## Feature Area

Product Browsing

## Priority

Medium

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- No filters applied — all products are visible

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Read and note the initial product count label (e.g. "Showing 12 products").
3. Type a search term that matches a subset of products (e.g. first 3 characters of one product name).
4. Read the count label immediately after typing — do not reload.
5. Clear the search input.
6. Read the count label after clearing.
7. Select **"Under LKR 100"** from the Price Range dropdown.
8. Read the count label after selecting.
9. Select **"All Prices"** to reset.
10. Read the count label after resetting.
11. Select **"Price: Low to High"** from the Sort By dropdown.
12. Read the count label after sorting.

## Expected Result

1. Women's category page loads.
2. Count label shows the total product count (e.g. "Showing 12 products").
3. Search term typed.
4. Count label updates immediately to show only the number of matching products (e.g. "Showing 3 products") — no page reload required.
5. Search cleared.
6. Count label returns to the full total (e.g. "Showing 12 products").
7. "Under LKR 100" selected.
8. Count label updates to show only products under LKR 100 (e.g. "Showing 5 products").
9. "All Prices" selected.
10. Count label returns to the full total.
11. "Price: Low to High" selected.
12. Count label remains the same as the full total — sort does not change how many products are shown, only their order.

## Notes and Assumptions

- Sort operations do not change the product count; only search and price filter do.
- The count label format is "Showing X products" — variations in wording should be noted as a potential defect.

## Defect Opportunity

- Count label may not update until the page is reloaded.
- Count label may update for search but not for price filter changes, or vice versa.
- Sort may incorrectly change the count label.
