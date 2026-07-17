# Page: Product Detail

## URL

- **Pattern**: `/product/{id}`
- **Example**: `/product/1` — Casual Striped Blouse with Peplum Hem
- **Title**: `E-Commerce App`

---

## Elements

### Breadcrumb

```
HOME → SHOP → {category} → {product name}
```

All breadcrumb parts are plain text separated by arrow icons.

### Product Images

| Element     | Role/Locator                                    | Notes               |
| ----------- | ----------------------------------------------- | ------------------- |
| Main image  | `getByRole('img', { name: 'Product' }).first()` | Large product image |
| Thumbnail 1 | `getByRole('img', { name: 'Product' }).nth(1)`  | Clickable           |
| Thumbnail 2 | `getByRole('img', { name: 'Product' }).nth(2)`  | Clickable           |
| Thumbnail 3 | `getByRole('img', { name: 'Product' }).nth(3)`  | Clickable           |

### Product Info

| Element        | Role/Locator                                  | Notes                                           |
| -------------- | --------------------------------------------- | ----------------------------------------------- |
| Product name   | `getByRole('heading', { level: 1 })`          | First h1 on the page detail area                |
| Rating stars   | `getByRole('img', { name: 'Star' })` ×5       |                                                 |
| Review count   | `getByText('(15 Reviews)')`                   |                                                 |
| Original price | first `generic` in price row                  | e.g. "LKR 80.5" (higher, typically crossed out) |
| Sale price     | second `generic` in price row                 | e.g. "LKR 50" (lower, displayed prominently)    |
| Description    | `paragraph` inside product detail area        |                                                 |
| Category badge | `getByText('Category: women')` (or mens/kids) |                                                 |

### Size Selector

| Element         | Role/Locator                                    | Notes                                                   |
| --------------- | ----------------------------------------------- | ------------------------------------------------------- |
| Section heading | `getByRole('heading', { name: 'Select Size' })` | Changes to "Select Size — required" on error            |
| S option        | `getByText('S', { exact: true })`               | Generic/div element (not button — use exact text match) |
| M option        | `getByText('M', { exact: true })`               |                                                         |
| L option        | `getByText('L', { exact: true })`               |                                                         |
| XL option       | `getByText('XL', { exact: true })`              |                                                         |
| XXL option      | `getByText('XXL', { exact: true })`             |                                                         |

> **Important**: On the product detail page, size options are `<div>` (generic) elements, not `<button>` elements. Use `getByText` with `{ exact: true }` to avoid matching L inside XL/XXL.

### Quantity Selector

| Element          | Role/Locator                                 | Notes                                  |
| ---------------- | -------------------------------------------- | -------------------------------------- |
| Section heading  | `getByRole('heading', { name: 'Quantity' })` |                                        |
| Decrement button | `getByRole('button', { name: '−' })`         | Unicode minus sign (−), not hyphen (-) |
| Quantity value   | `locator('span.qty-value')`                  | Default: "1"                           |
| Increment button | `getByRole('button', { name: '+' })`         |                                        |

### Action Buttons

| Element               | Role/Locator                                          | State                        |
| --------------------- | ----------------------------------------------------- | ---------------------------- |
| Add to Cart           | `getByRole('button', { name: 'Add to Cart' })`        | Visible when NOT in cart     |
| ✓ In Cart — View Cart | `getByRole('button', { name: /In Cart.*View Cart/ })` | Visible after adding to cart |
| Buy Now               | `getByRole('button', { name: 'Buy Now' })`            | Always visible               |

---

## States

### Default (no size selected)

- Size heading: `"Select Size"`
- Add to Cart button: enabled
- No error shown

### Size Selected

- Selected size option gets a visual highlight (CSS class change)
- Size heading: `"Select Size"` (unchanged)
- Add to Cart button: enabled

### Error (submitted without size)

- Size heading changes to: **"Select Size — required"**
- `getByRole('heading', { name: 'Select Size — required' })` becomes visible
- `hasSizeErrorState()` → checks for this heading
- `hasSelectSizeRequiredLabel()` → same check

### In Cart (after successful add)

- "Add to Cart" button replaced by **"✓ In Cart — View Cart"** button
- Cart counter in nav increments by 1
- Clicking "✓ In Cart — View Cart" navigates to `/cart`

---

## Product Examples

| ID  | Name                                  | Sale Price | Original Price | Category |
| --- | ------------------------------------- | ---------- | -------------- | -------- |
| 1   | Casual Striped Blouse with Peplum Hem | LKR 50     | LKR 80.5       | women    |
| 2   | Elegant Overlap Collar Top            | LKR 85     | LKR 120.5      | women    |
| 3   | Striped Summer Flutter Blouse         | LKR 60     | LKR 100.5      | women    |

---

## Navigation

| Action                        | Destination                   |
| ----------------------------- | ----------------------------- |
| Click "✓ In Cart — View Cart" | `/cart`                       |
| Click breadcrumb category     | `/womens` / `/mens` / `/kids` |
| Click breadcrumb SHOP         | `/`                           |

---

## Screenshots

- `snapshots/04-product-no-size.png` — product page, no size selected
- `snapshots/04-product-size-selected.png` — size M selected
- `snapshots/04-product-no-size-error.png` — error state ("Select Size — required")
- `snapshots/04-product-in-cart.png` — after adding to cart (shows "✓ In Cart — View Cart")
