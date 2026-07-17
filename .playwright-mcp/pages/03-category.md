# Page: Category (Product Listing)

## URLs

| Category       | URL Pattern |
| -------------- | ----------- |
| Women          | `/womens`   |
| Men            | `/mens`     |
| Kids           | `/kids`     |
| Shop (landing) | `/`         |

All category pages share the **same page structure** — only the product data differs.

---

## Elements

### Filter / Controls Bar

| Element       | Role/Locator                                           | Notes                                                                         |
| ------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Product count | `getByText(/Showing \d+ products/)`                    | e.g. "Showing 12 products"                                                    |
| Search box    | `getByRole('textbox', { name: 'Search products...' })` | Filters by product name                                                       |
| Price filter  | `getByRole('combobox').first()`                        | Options: "All Prices", "Under LKR 100", "LKR 100 – 200", "Above LKR 200"      |
| Sort dropdown | `getByRole('combobox').nth(1)`                         | Options: "Sort By", "Price: Low to High", "Price: High to Low", "Name: A – Z" |

### Price Filter Options

- `All Prices` (default selected)
- `Under LKR 100`
- `LKR 100 – 200`
- `Above LKR 200`

### Sort Options

- `Sort By` (default selected)
- `Price: Low to High`
- `Price: High to Low`
- `Name: A – Z`

---

## Product Card Structure

Each product card on a category page contains:

| Element              | Role/Locator                                   | Notes                    |
| -------------------- | ---------------------------------------------- | ------------------------ |
| Product image (link) | `getByRole('link')` inside card                | Links to `/product/{id}` |
| Wishlist button      | `getByRole('button', { name: '♡' })`           | Toggles wishlist         |
| Product name         | `paragraph` inside card                        | Text of product name     |
| Sale price           | first `generic` in price container             | e.g. "LKR 50"            |
| Original price       | second `generic` in price container            | e.g. "LKR 80.5"          |
| Size S               | `getByRole('button', { name: 'S' })`           |                          |
| Size M               | `getByRole('button', { name: 'M' })`           |                          |
| Size L               | `getByRole('button', { name: 'L' })`           |                          |
| Size XL              | `getByRole('button', { name: 'XL' })`          |                          |
| Size XXL             | `getByRole('button', { name: 'XXL' })`         |                          |
| Add to Cart          | `getByRole('button', { name: 'Add to Cart' })` |                          |

> **Note**: On category pages, sizes are `<button>` elements. On product detail pages, sizes are `<generic>` (div) elements. Use `.nth()` for disambiguation.

---

## Known Products (Women's category, IDs 1–12)

| ID  | Name                                  | Sale Price |
| --- | ------------------------------------- | ---------- |
| 1   | Casual Striped Blouse with Peplum Hem | LKR 50     |
| 2   | Elegant Overlap Collar Top            | LKR 85     |
| 3   | Striped Summer Flutter Blouse         | LKR 60     |
| 4   | (women's product)                     | LKR 100    |

---

## Navigation

| Action              | Destination                     |
| ------------------- | ------------------------------- |
| Click product image | `/product/{id}`                 |
| Use Search          | Filters product list in-place   |
| Change Price filter | Filters product list in-place   |
| Change Sort         | Re-orders product list in-place |

---

## Screenshots

- `snapshots/03-category-womens.png` — Women's category page
