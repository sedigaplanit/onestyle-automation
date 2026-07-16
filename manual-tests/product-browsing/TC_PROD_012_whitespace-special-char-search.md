# TC_PROD_012 — Whitespace-Only and Special Character Search Inputs

## Test Case ID

TC_PROD_012

## Test Case Title

Entering whitespace-only or special characters in the search input produces a stable result

## Feature Area

Product Browsing

## Priority

Medium

## Preconditions

- User is on the Women's category page (`$BASE_URL/womens`)
- All products are visible (no filters applied)

## Test Steps

**Part A — Whitespace-only input:**

1. Navigate to `$BASE_URL/womens`.
2. Note the total product count.
3. Click the search input and press the **Space** key three times (entering `   `).
4. Observe the product list and count label.

**Part B — Special characters:** 5. Clear the search input. 6. Type `<script>alert(1)</script>` into the search input. 7. Observe the product list, count label, and page behaviour. 8. Clear the search input. 9. Type `'; DROP TABLE products; --` into the search input. 10. Observe the product list and page behaviour. 11. Clear the search input. 12. Type `@#$%^&*()` into the search input. 13. Observe the product list and count label.

**Part C — Very long input:** 14. Clear the search input. 15. Type a string of 200 characters (e.g. repeat "a" 200 times). 16. Observe the product list, count label, and page stability.

## Expected Result

**Part A:**

1. Women's category page loads.
2. Total count noted.
3. Spaces entered.
4. The product list shows either (a) all products (whitespace treated as empty) or (b) the empty state message — both are acceptable. The page must NOT crash or freeze. Count label must reflect the displayed state.

**Part B:**
5–13. For each special character input:

- No JavaScript is executed in the browser (no alert box appears).
- The page does not crash, navigate away, or throw an error.
- The empty state message "No products match your filters." is displayed (special characters won't match product names) or all products are shown if treated as empty.
- The search input displays the typed characters as literal text, not interpreted as code.

**Part C:**
14–16. The page remains stable, no crash, no performance freeze. Empty state or all products shown. Count label updates.

## Notes and Assumptions

- **Regression tag:** This test is suitable for regression runs.
- The primary concern for special characters is XSS prevention — the input must be rendered as plain text, not executed.
- The primary concern for whitespace is consistent, non-crashing behaviour.

## Defect Opportunity

- Special characters may cause an XSS vulnerability if rendered without sanitisation.
- Long inputs may freeze the browser or trigger JavaScript errors.
- Whitespace-only may produce unexpected partial matches.
