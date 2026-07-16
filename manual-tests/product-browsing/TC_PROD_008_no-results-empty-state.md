# TC_PROD_008 — No Results State When Filters Match Zero Products

## Test Case ID

TC_PROD_008

## Test Case Title

An empty state message is displayed when active filters match no products

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on any category page (`$BASE_URL/womens`, `/mens`, or `/kids`)
- The category has a finite number of products

## Test Steps

**Part A — No results via search:**

1. Navigate to `$BASE_URL/womens`.
2. In the search input, type a term that is guaranteed to match no product names (e.g. `zzznomatch999`).
3. Observe the product grid area.
4. Observe the product count label.

**Part B — No results via combined search + price filter:** 5. Clear the search input from Part A. 6. Type a search term that matches 1–2 products. 7. With those products visible, select a Price Range that none of them fall within (e.g. if the matched products are all under LKR 100, select "Above LKR 200"). 8. Observe the product grid area. 9. Observe the product count label.

**Part C — Recovery:** 10. Clear the search input and reset Price Range to "All Prices". 11. Observe the product grid.

## Expected Result

**Part A:**

1. Women's category page loads.
2. Non-matching search term typed.
3. The message **"No products match your filters."** is displayed in the product grid area. No product cards are rendered.
4. Count label shows **"Showing 0 products"** (or equivalent).

**Part B:** 5. Search cleared. 6. 1–2 products are visible. 7. Conflicting price filter selected. 8. The message **"No products match your filters."** is displayed. No product cards are rendered. 9. Count label shows **"Showing 0 products"**.

**Part C:** 10. Filters reset. 11. All products are restored and count returns to the full total.

## Notes and Assumptions

- The exact empty state message is taken from AC5: "No products match your filters."
- If the app shows a different message, record the actual text as a potential defect.

## Defect Opportunity

- Empty state message may not appear; the grid may simply be blank.
- Count label may show 0 but not update to the empty state message.
- Recovery (clearing filters) may not restore products without a page reload.
