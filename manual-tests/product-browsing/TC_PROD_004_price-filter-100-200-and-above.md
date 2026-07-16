# TC_PROD_004 — Price Range Filter: LKR 100 – 200 and Above LKR 200

## Test Case ID

TC_PROD_004

## Test Case Title

Price range filters "LKR 100 – 200" and "Above LKR 200" each display only products within the correct price band

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on any category page (`$BASE_URL/womens`, `/mens`, or `/kids`)
- No search term or sort is applied
- Products across multiple price bands exist in the selected category

## Test Steps

**Part A — LKR 100 to 200 filter:**

1. Navigate to `$BASE_URL/womens`.
2. Open the Price Range dropdown and select **"LKR 100 – 200"**.
3. For each visible product card, record the displayed new price.
4. Observe the product count label.

**Part B — Above LKR 200 filter:** 5. Without navigating away, open the Price Range dropdown and select **"Above LKR 200"**. 6. For each visible product card, record the displayed new price. 7. Observe the product count label.

**Part C — Reset:** 8. Open the Price Range dropdown and select **"All Prices"**. 9. Observe the product list and count label.

## Expected Result

**Part A:**

1. Women's category page loads.
2. "LKR 100 – 200" is selected.
3. Every visible product card shows a new price **between LKR 100 and LKR 200 inclusive**.
4. Count label shows the number of products in this range.

**Part B:** 5. "Above LKR 200" is selected. 6. Every visible product card shows a new price **strictly greater than LKR 200**. 7. Count label shows the number of products above LKR 200.

**Part C:** 8. "All Prices" is selected. 9. All products are restored and count returns to the full total.

## Notes and Assumptions

- "LKR 100 – 200" is inclusive on both boundaries (100 ≤ price ≤ 200).
- "Above LKR 200" is exclusive of LKR 200 itself (price > 200).
- If a price band has zero products, the empty state message "No products match your filters." should appear and the count should show "Showing 0 products".

## Defect Opportunity

- Boundary values (exactly LKR 100 or LKR 200) may be incorrectly included or excluded.
- Switching filters without resetting may stack filter conditions instead of replacing them.
- Count label may not update on filter change.
