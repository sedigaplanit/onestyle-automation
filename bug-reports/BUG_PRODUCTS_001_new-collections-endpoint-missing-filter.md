# BUG_PRODUCTS_001 — /api/products/new-collections returns products not flagged as new collection

**Severity:** Medium
**Date:** 2026-07-21
**Affected Test:** `tests/api/ProductApiTests.spec.ts` — "GET /api/products/new-collections returns products flagged as new"

---

## Steps to Reproduce

```
GET https://onestyle-backend.onrender.com/api/products/new-collections
```

No authentication required.

## Expected Result

All products in the response have `is_new_collection: true`.

## Actual Result

The response contains products where `is_new_collection: false`. For example, products 1, 3, 4, 5, 6, 7, 9, 10, 11 (and others) have `is_new_collection: false` yet appear in the response.

## Swagger Contract

The endpoint is documented as:

```
"summary": "Get products flagged as new collection"
```

The `is_new_collection` field on the `Product` schema is a boolean. The endpoint must only return rows where `is_new_collection = true`.

## Likely Root Cause

The backend route handler for `/api/products/new-collections` is missing the `WHERE` clause. It may be returning all products instead of filtering. Compare with `/api/products/popular` which returns only `is_popular = true` products and works correctly.

## Fix

In the backend route handler, apply the filter:

```sql
SELECT * FROM products WHERE is_new_collection = true;
```

## Fix Attempts (Automation)

This is a pure backend defect. No automation-side fix is possible — the assertion is correct per the swagger contract.
