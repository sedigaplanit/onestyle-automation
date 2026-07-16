# TC_PROD_003 — Price Range Filter: Under LKR 100

## Test Case ID

TC_PROD_003

## Test Case Title

Selecting "Under LKR 100" shows only products with a new price below LKR 100

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- No search term or sort is applied
- At least one product with a new price under LKR 100 exists in the category

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Note the total product count label (e.g. "Showing 12 products").
3. Locate the Price Range dropdown in the Search / Filter bar.
4. Click the Price Range dropdown and select **"Under LKR 100"**.
5. Observe the product list after selecting.
6. For each visible product card, note the displayed new price (LKR amount).
7. Observe the product count label.
8. Change the Price Range dropdown back to **"All Prices"**.
9. Observe the product list and count label after resetting.

## Expected Result

1. Women's category page loads with all products.
2. Full product count is noted.
3. Price Range dropdown is visible with "All Prices" as default.
4. "Under LKR 100" is selected.
5. The product list updates immediately — only products with a new price **strictly less than LKR 100** are shown.
6. Every displayed product card shows a new price below LKR 100. No product with LKR 100 or above is visible.
7. Count label updates to reflect the filtered number (e.g. "Showing 4 products").
8. "All Prices" is re-selected.
9. All products are restored and the count returns to the full total.

## Notes and Assumptions

- The filter applies to the `new_price` field (the lower, discounted price on the card).
- If no products exist under LKR 100 in the Women's category, use `/mens` or `/kids` where such products exist. Note the category used.

## Defect Opportunity

- Products with prices exactly at LKR 100 may incorrectly appear in the "Under LKR 100" filtered results.
- Count label may not update after filter is applied.
- Filter may apply to the old price instead of the new price.
