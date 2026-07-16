# TC_PROD_005 — Sort By: Price Low to High and Price High to Low

## Test Case ID

TC_PROD_005

## Test Case Title

Sort options reorder products by new price in ascending and descending order

## Feature Area

Product Browsing

## Priority

Medium

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- No search term or price filter is applied (all products visible)
- At least two products with different prices exist

## Test Steps

**Part A — Price: Low to High:**

1. Navigate to `$BASE_URL/womens`.
2. Note the price of the first and last visible product cards in the default order.
3. Open the Sort By dropdown and select **"Price: Low to High"**.
4. Observe the order of product cards after sorting.
5. Note the new price of each visible product from first to last.

**Part B — Price: High to Low:** 6. Open the Sort By dropdown and select **"Price: High to Low"**. 7. Observe the order of product cards after sorting. 8. Note the new price of each visible product from first to last.

**Part C — Reset sort:** 9. Open the Sort By dropdown and select the **blank default** option. 10. Observe the product order.

## Expected Result

**Part A:**

1. Women's category page loads with products in default order.
2. Default prices noted.
3. "Price: Low to High" is selected.
4. Product list reorders immediately.
5. The first product has the lowest new price and each subsequent product has an equal or higher new price (ascending order verified).

**Part B:** 6. "Price: High to Low" is selected. 7. Product list reorders immediately. 8. The first product has the highest new price and each subsequent product has an equal or lower new price (descending order verified).

**Part C:** 9. Default sort selected. 10. Products return to the default (unsorted) order.

## Notes and Assumptions

- Sorting is applied to the `new_price` (discounted price), not the old/original price.
- Products with equal prices may appear in any relative order — this is acceptable.

## Defect Opportunity

- Prices may be sorted as strings (lexicographic) instead of numbers, causing incorrect order (e.g. "100" sorted before "50").
- Sort may not apply until the page is refreshed.
- Resetting to blank default may not restore original product order.
