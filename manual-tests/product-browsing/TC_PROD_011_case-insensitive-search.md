# TC_PROD_011 — Case-Insensitive Search

## Test Case ID

TC_PROD_011

## Test Case Title

Search filtering is case-insensitive — uppercase, lowercase, and mixed-case terms return the same results

## Feature Area

Product Browsing

## Priority

High

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- A product with a known name exists (e.g. a product whose name contains "blouse")

## Test Steps

1. Navigate to `$BASE_URL/womens`.
2. Type the search term in **all lowercase** (e.g. `blouse`).
3. Note the product count and the names of visible products.
4. Clear the search input.
5. Type the same term in **ALL UPPERCASE** (e.g. `BLOUSE`).
6. Note the product count and the names of visible products.
7. Clear the search input.
8. Type the same term in **mixed case** (e.g. `BlOuSe`).
9. Note the product count and the names of visible products.
10. Compare the three result sets.

## Expected Result

1. Women's category page loads.
2. Lowercase term typed.
3. Products whose names contain "blouse" (in any case) are shown. Count noted.
4. Search cleared.
5. Uppercase term typed.
6. **Identical products** and **identical count** as step 3 are shown.
7. Search cleared.
8. Mixed-case term typed.
9. **Identical products** and **identical count** as steps 3 and 6 are shown.
10. All three result sets are identical — confirming case-insensitive matching.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- AC1 explicitly states the search is case-insensitive.

## Defect Opportunity

- Uppercase search may return zero results when lowercase returns matches (case-sensitive implementation).
- Mixed-case may partially match, returning a subset of the lowercase results.
