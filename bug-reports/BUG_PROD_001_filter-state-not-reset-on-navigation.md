# BUG_PROD_001 — Filter State Not Reset When Navigating Away and Back to a Category Page

## Title

Search input and filter state persist on a category page after navigating away via the navbar and returning

## Steps to Reproduce

1. Navigate to `$BASE_URL/womens`.
2. Type `blouse` in the search input — product list filters in real-time.
3. Select **"Under LKR 100"** from the Price Range dropdown.
4. Select **"Price: Low to High"** from the Sort By dropdown.
5. Click the **Men** link in the navbar — the Men's category page loads.
6. Click the **Women** link in the navbar — the Women's category page loads.
7. Observe the search input, Price Range dropdown, and product list.

## Expected Result

Per **AC7**: "Given I navigate to a category page... Then all products in that category are displayed, the search input is empty, and the Price Range dropdown shows 'All Prices'."

After returning to `/womens` via the navbar:

- Search input should be **empty**.
- Price Range dropdown should show **"All Prices"**.
- Sort By should show the **blank default**.
- All Women's products should be displayed.

## Actual Result

After navigating away to Men's and back to Women's via the navbar:

- The search input still contains **"blouse"**.
- The price filter and sort order remain as previously set.
- Only filtered/sorted products are shown — not the full product list.

## Affected Test

`tests/product-browsing/ProductBrowsingTests.spec.ts`
Test: _"Search, price filter, and sort reset to defaults after navigating away and returning"_

**Also affects cross-category navigation** — search term entered on Women's page persists when navigating to Men's or Kids' page via the navbar, confirming the filter bar is a shared layout component whose state is not reset on React Router route changes.

## Severity

**Medium** — Impacts usability; returning shoppers would see a stale filtered view instead of all products, leading to confusion about available inventory.

## Root Cause Analysis

The React component managing filter state does not reset its local state (`useState`) on re-mount triggered by React Router SPA navigation. In-app navbar navigation (React Router `<Link>`) does not unmount and remount the component; it performs a client-side route transition that reuses the existing component state. The state should be reset on `useEffect` with an empty dependency array, or the component should respond to route changes.

## Fix Attempts Summary

- Attempted navigation via `gotoMens()` then `gotoWomens()` (React Router navbar click) → state persists.
- Root cause is application-level (React state not reset on route change) — no automation-side fix is possible without weakening the assertion.
