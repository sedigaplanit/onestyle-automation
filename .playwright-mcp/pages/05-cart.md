# Page: Cart

## URL

- **Pattern**: `/cart`
- **Full URL**: `https://sedigaplanit.github.io/AI-R-D---Github-copilot/cart`
- **Title**: `E-Commerce App`
- **Auth**: Accessible by both authenticated and unauthenticated users (different UX)

---

## Elements — Cart Table

### Column Headers

| Header   | Locator                                                  |
| -------- | -------------------------------------------------------- |
| Products | `getByRole('paragraph').filter({ hasText: 'Products' })` |
| Title    | `getByRole('paragraph').filter({ hasText: 'Title' })`    |
| Price    | `getByRole('paragraph').filter({ hasText: 'Price' })`    |
| Quantity | `getByRole('paragraph').filter({ hasText: 'Quantity' })` |
| Total    | `getByRole('paragraph').filter({ hasText: 'Total' })`    |
| Remove   | `getByRole('paragraph').filter({ hasText: 'Remove' })`   |

> All 6 headers are always present, even when the cart is empty.

### Item Row (Per Item)

| Element             | Locator                                | Notes                                                    |
| ------------------- | -------------------------------------- | -------------------------------------------------------- |
| Product name        | `paragraph` in item row                | e.g. "Casual Striped Blouse with Peplum Hem"             |
| Unit price          | `paragraph` in item row                | e.g. "LKR 50"                                            |
| Decrease qty button | `getByRole('button', { name: '-' })`   | ASCII hyphen (-) — different from product page decrement |
| Qty value           | `generic` element showing count        | e.g. "1", "2"                                            |
| Increase qty button | `getByRole('button', { name: '+' })`   |                                                          |
| Line total          | `paragraph` in item row                | unit price × quantity                                    |
| Remove icon         | `getByRole('img', { name: 'Remove' })` | Clicking removes item immediately                        |

> Use `.first()` / `.nth()` for targeting specific rows when multiple items exist.

---

## Elements — Cart Totals

| Element               | Role/Locator                                              | Notes                                                |
| --------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| "Cart Totals" heading | `getByRole('heading', { level: 1, name: 'Cart Totals' })` | Wait-for marker                                      |
| Sub Total label       | `getByText('Sub Total:')`                                 |                                                      |
| Sub Total value       | `paragraph` next to "Sub Total:"                          | e.g. "LKR 135"                                       |
| Shipping label        | `getByText('Shipping Free')`                              | Always shows "Free"                                  |
| Shipping value        | `getByText('Free')`                                       |                                                      |
| Total heading         | `getByRole('heading', { level: 3, name: 'Total:' })`      |                                                      |
| Total value           | `getByRole('heading', { level: 3 }).last()`               | e.g. "LKR 135" (same as subtotal when free shipping) |
| Proceed to Checkout   | `getByRole('button', { name: 'Proceed to Checkout' })`    | **Disabled when cart is empty**                      |

---

## Elements — Guest / Unauthenticated View

When the user is **not logged in**, the Cart Totals section shows a different CTA:

| Element                | Locator                                            | Notes                    |
| ---------------------- | -------------------------------------------------- | ------------------------ |
| Sign-in prompt         | `getByText('Sign in to proceed with checkout')`    | Replaces Checkout button |
| Sign Up / Login button | `getByRole('button', { name: 'Sign Up / Login' })` | Navigates to `/login`    |

---

## States

### With Items (Authenticated)

- Item rows visible with product names, prices, quantity controls
- Remove icons present
- Subtotal, shipping (Free), and total values populated
- "Proceed to Checkout" button: **enabled**

### Empty (Authenticated)

- No item rows in table
- Column headers still present
- Totals section shows no values
- "Proceed to Checkout" button: **disabled** (`[disabled]` attribute)

### Guest / Unauthenticated

- Cart count = 0 (guest cart is cleared on logout)
- No item rows
- No "Proceed to Checkout" button
- Instead shows: "Sign in to proceed with checkout" + "Sign Up / Login" button

---

## Quantity Behavior

| Action              | Result                                                           |
| ------------------- | ---------------------------------------------------------------- |
| Click `+`           | Quantity increments, line total and subtotal update              |
| Click `-` (qty > 1) | Quantity decrements, totals update                               |
| Click `-` (qty = 1) | Item is **removed** from cart (decrements to 0, item disappears) |
| Click Remove icon   | Item removed immediately                                         |

---

## Screenshots

- `snapshots/05-cart-with-items.png` — cart with 2 items
- `snapshots/05-cart-empty.png` — empty cart (Proceed to Checkout disabled)
- `snapshots/07-guest-cart.png` — unauthenticated cart (Sign Up / Login prompt)
