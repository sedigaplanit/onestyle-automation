# TC_PROD_006 — Sort By: Name A – Z

## Test Case ID

TC_PROD_006

## Test Case Title

Sort By "Name: A – Z" reorders products alphabetically by product name in ascending order

## Feature Area

Product Browsing

## Priority

Medium

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- No search term or price filter is applied
- At least three products with distinct names are visible

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Note the names of the first three product cards in the default order.
3. Open the Sort By dropdown and select **"Name: A – Z"**.
4. Observe the order of product cards after sorting.
5. Note the names of the first five visible products in their new order.
6. Verify the names are in alphabetical (A–Z) ascending order.
7. Open the Sort By dropdown and select the **blank default** option.
8. Observe the product order after resetting.

## Expected Result

1. Women's category page loads with products in default order.
2. Default names noted.
3. "Name: A – Z" is selected.
4. Product list reorders immediately.
5. Names of first five products noted.
6. Names are in strict ascending alphabetical order (A comes before B, etc.). The comparison should be case-insensitive (lowercase letters treated the same as uppercase).
7. Default sort selected.
8. Products return to the default (unsorted) order.

## Notes and Assumptions

- Alphabetical sort is based on the full product name as displayed on the card.
- Sorting should be case-insensitive; a product named "Zipper Jacket" should appear after "amber blouse" even if the display uses title case.

## Defect Opportunity

- Sort may be case-sensitive, causing all uppercase-named products to appear before lowercase ones.
- Sort may apply to a different field (e.g. product ID) rather than the display name.
- Sort may not apply until a page refresh.
