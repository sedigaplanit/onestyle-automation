# App Map — OneStyle E-Commerce

## App Overview

- **Name**: OneStyle
- **Base URL**: `https://sedigaplanit.github.io/AI-R-D---Github-copilot`
- **Title**: E-Commerce App
- **Framework**: React (GitHub Pages SPA)
- **Currency**: LKR (Sri Lankan Rupee)
- **Category**: Women's / Men's / Kids' clothing

---

## Route Map

| URL             | Page             | Auth Requirement                    |
| --------------- | ---------------- | ----------------------------------- |
| `/`             | Landing / Home   | Both                                |
| `/login`        | Login            | Unauthenticated (redirects if auth) |
| `/womens`       | Women's Category | Both                                |
| `/mens`         | Men's Category   | Both                                |
| `/kids`         | Kids' Category   | Both                                |
| `/product/{id}` | Product Detail   | Both                                |
| `/cart`         | Cart             | Both (different UX)                 |
| `/profile`      | Profile          | Authenticated                       |
| `/orders`       | My Orders        | Authenticated                       |
| `/wishlist`     | Wishlist         | Both                                |

---

## Page Transition Graph

```
Landing (unauth)
  └── Click Login → /login
         └── Submit valid creds → Landing (auth)

Landing (auth) / Category pages
  └── Click product card → /product/{id}
         └── Select size + Add to Cart → stays on /product (shows In Cart button)
                └── Click ✓ In Cart — View Cart → /cart

Any page
  └── Click Cart icon → /cart

/cart (auth, with items)
  └── Click Proceed to Checkout → /cart (+ modal overlay Step 1)
         ├── Click Cancel or ✕ → /cart (modal closed)
         ├── Select payment + Continue → /cart (+ modal overlay Step 2)
         │      ├── Click ← or ← Back → /cart (modal Step 1)
         │      └── Click Pay → (checkout completion)
         └── ...

/cart (guest)
  └── Click Sign Up / Login → /login

Any page (auth)
  └── Click Logout → Landing (unauth)
```

---

## Authentication State

### Unauthenticated Nav

- Login button → `/login`
- Wishlist ♡ → `/wishlist`
- Cart icon → `/cart`
- Cart count badge

### Authenticated Nav

- Profile → `/profile`
- My Orders → `/orders`
- Logout button
- Wishlist ♡ → `/wishlist`
- Cart icon → `/cart`
- Cart count badge

### Auth Marker

- **Authenticated**: `getByRole('button', { name: 'My Orders' })` visible
- **Unauthenticated**: `getByRole('button', { name: 'Login' })` visible

---

## Data

- **Products observed**: IDs 1–4, 8, 12–15, 17, 28, 35
- **Product sizes**: S, M, L, XL, XXL (all products)
- **Shipping**: Always free
- **Price format**: `LKR {amount}` in cart/categories; `LKR {amount}.00` in checkout modal
