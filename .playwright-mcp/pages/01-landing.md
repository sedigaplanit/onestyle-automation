# Page: Landing (Home)

## URL

- **Pattern**: `/` (BASE_URL root)
- **Full URL**: `https://sedigaplanit.github.io/AI-R-D---Github-copilot/`
- **Title**: `E-Commerce App`
- **App Name**: OneStyle

---

## Sections

### Navigation Bar (Unauthenticated)

| Element         | Role/Locator                                                   | Notes                   |
| --------------- | -------------------------------------------------------------- | ----------------------- |
| Brand logo      | `getByRole('link', { name: 'OneStyle Logo OneStyle' })`        | Links to `/`            |
| Shop nav link   | `getByRole('link', { name: 'Shop' })`                          | Links to `/`            |
| Men nav link    | `getByRole('link', { name: 'Men' })`                           | Links to `/mens`        |
| Women nav link  | `getByRole('link', { name: 'Women' })`                         | Links to `/womens`      |
| Kids nav link   | `getByRole('link', { name: 'Kids' })`                          | Links to `/kids`        |
| Login button    | `getByRole('button', { name: 'Login' })`                       | Inside link to `/login` |
| Wishlist link   | `getByRole('link', { name: '♡' })`                             | Links to `/wishlist`    |
| Cart icon link  | `getByRole('img', { name: 'Cart Icon' })`                      | Inside link to `/cart`  |
| Cart item count | CSS `.nav-cart-count` or accessible text inside cart link area | Default `"0"`           |

### Navigation Bar (Authenticated)

| Element          | Role/Locator                                 | Notes                                 |
| ---------------- | -------------------------------------------- | ------------------------------------- |
| Profile button   | `getByRole('button', { name: 'Profile' })`   | Inside link to `/profile`             |
| My Orders button | `getByRole('button', { name: 'My Orders' })` | Inside link to `/orders`              |
| Logout button    | `getByRole('button', { name: 'Logout' })`    | Triggers logout, redirects to landing |
| Wishlist         | same as unauthenticated                      |                                       |
| Cart icon        | same as unauthenticated                      |                                       |

### Hero Section

| Element                    | Role/Locator                                                           | Notes                    |
| -------------------------- | ---------------------------------------------------------------------- | ------------------------ |
| "Welcome to Our Store"     | `getByRole('heading', { level: 2, name: 'Welcome to Our Store' })`     |                          |
| "Discover New Collections" | `getByRole('heading', { level: 1, name: 'Discover New Collections' })` |                          |
| Tagline                    | `getByText('Explore the latest trends designed for everyone.')`        |                          |
| Shop Now button            | `getByRole('button', { name: 'Shop Now' })`                            |                          |
| Sign Up button             | `getByRole('button', { name: 'Sign Up' })`                             | **Unauthenticated only** |
| Learn More button          | `getByRole('button', { name: /Learn More/ })`                          | Contains arrow icon img  |
| Free Shipping badge        | `getByText('Free Shipping')`                                           |                          |
| Easy Returns badge         | `getByText('Easy Returns')`                                            |                          |
| Secure Payment badge       | `getByText('Secure Payment')`                                          |                          |
| Hero image                 | `getByRole('img', { name: 'Hero' })`                                   |                          |

### POPULAR IN WOMEN Section

| Element         | Role/Locator                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| Section heading | `getByRole('heading', { level: 1, name: 'POPULAR IN WOMEN' })`                                                      |
| Product cards   | Each card: link to `/product/{id}`, ♡ button, name paragraph, prices, size buttons S/M/L/XL/XXL, Add to Cart button |

### Exclusive Offers Banner

| Element     | Role/Locator                                       |
| ----------- | -------------------------------------------------- |
| Heading     | `getByRole('heading', { name: 'Exclusive' })`      |
| Subheading  | `getByRole('heading', { name: 'Offers For You' })` |
| Description | `getByText('ONLY ON BEST SELLERS PRODUCT')`        |
| CTA button  | `getByRole('button', { name: 'Check Now!' })`      |

### New Collections Section

| Element         | Role/Locator                                                  |
| --------------- | ------------------------------------------------------------- |
| Section heading | `getByRole('heading', { level: 1, name: 'New Collections' })` |
| Product cards   | Same structure as POPULAR IN WOMEN                            |

### Newsletter Subscription

| Element          | Role/Locator                                                           |
| ---------------- | ---------------------------------------------------------------------- |
| Heading          | `getByRole('heading', { name: 'Get Exclusive Offers On Your Email' })` |
| Email input      | `getByRole('textbox', { name: 'Your Email Id' })`                      |
| Subscribe button | `getByRole('button', { name: 'Subscribe' })`                           |

### Footer

| Element   | Locator                                               | Notes      |
| --------- | ----------------------------------------------------- | ---------- |
| Company   | `getByRole('listitem', { name: 'Company' })`          | Footer nav |
| Products  | `getByRole('listitem', { name: 'Products' })`         | Footer nav |
| Offices   | `getByRole('listitem', { name: 'Offices' })`          | Footer nav |
| About     | `getByRole('listitem', { name: 'About' })`            | Footer nav |
| Contact   | `getByRole('listitem', { name: 'Contact' })`          | Footer nav |
| Copyright | `getByText('Copyright @ 2024 - All Rights Reserved')` |            |

---

## States

| State           | Description                                                  | Auth Marker                                          |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| Unauthenticated | Shows Login button, Sign Up button in hero                   | No Profile/My Orders/Logout                          |
| Authenticated   | Shows Profile, My Orders, Logout buttons; no Sign Up in hero | `getByRole('button', { name: 'My Orders' })` visible |

---

## Navigation Targets

| Action                   | Destination          |
| ------------------------ | -------------------- |
| Click Logo               | `/` (landing)        |
| Click Men                | `/mens` (category)   |
| Click Women              | `/womens` (category) |
| Click Kids               | `/kids` (category)   |
| Click Login (unauth)     | `/login`             |
| Click Cart icon          | `/cart`              |
| Click Wishlist           | `/wishlist`          |
| Click Profile            | `/profile`           |
| Click My Orders          | `/orders`            |
| Click product card image | `/product/{id}`      |

---

## Product Card Structure (on Landing Page)

```
[Product image link → /product/{id}]
[♡ Wishlist button]
[Product name — paragraph]
[Sale price] [Original price]
[S] [M] [L] [XL] [XXL]  ← size buttons
[Add to Cart button]
```

---

## Screenshots

- `snapshots/01-landing.png` — unauthenticated landing (full page)
- `snapshots/01-landing-authenticated.png` — authenticated landing (viewport)
