# TC_PROD_009 — Combined Search, Price Filter, and Sort Applied Simultaneously

## Test Case ID

TC_PROD_009

## Test Case Title

Applying search, price range filter, and sort order simultaneously shows the correct filtered and sorted subset

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- The category has enough product variety to have overlapping results across a search term and a price band
- No filters are applied on load

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Note the total product count.
3. In the search input, type a term that matches multiple products (e.g. first 2 characters shared by several products).
4. Observe and note the product count after the search filter is applied.
5. With the search still active, select **"Under LKR 100"** from the Price Range dropdown.
6. Observe the product list — only products matching both the search term AND the price range should appear.
7. Note the product count after both filters are applied.
8. With both filters still active, select **"Price: Low to High"** from the Sort By dropdown.
9. Observe the product order.
10. Verify that every visible product:
    a. Contains the search term in its name.
    b. Has a new price under LKR 100.
    c. Is ordered from lowest to highest new price.
11. Note the product count — it must match step 7.

## Expected Result

1. Women's category page loads with all products.
2. Full count noted.
3. Search term typed.
4. Count reduces to show only matching products.
5. Price filter applied on top of the search.
6. Product list reduces further — only products satisfying BOTH conditions are shown.
7. Count updates to the intersection count (search matches ∩ price range matches).
8. Sort applied.
9. Products reorder without any items being added or removed.
   10a. Every card's name contains the search term.
   10b. Every card's new price is under LKR 100.
   10c. Prices are in ascending order from top to bottom.
10. Count matches step 7 exactly.

## Notes and Assumptions

- All three controls (search, price filter, sort) operate simultaneously and independently — sort does not change count, search and price filter both reduce count.
- If the intersection is empty, the empty state message should appear (see TC_PROD_008).

## Defect Opportunity

- Applying a second filter may reset the first one instead of stacking them.
- Sort may reset the price filter or search when applied.
- Product count may not reflect the combined filter result correctly.
