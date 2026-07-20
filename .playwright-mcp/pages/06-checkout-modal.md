# Page: Checkout Modal

## URL

- **Pattern**: `/cart` (modal overlay — no navigation occurs)
- **Trigger**: Click "Proceed to Checkout" on the cart page
- **Auth Required**: Yes — must be authenticated

---

## Step 1: Payment Method Selection

### Elements

| Element              | Role/Locator                                           | Notes                         |
| -------------------- | ------------------------------------------------------ | ----------------------------- |
| Modal heading        | `getByRole('heading', { level: 2, name: 'Checkout' })` | Wait-for marker               |
| Close button (✕)     | `getByRole('button', { name: '✕' })`                   | Closes modal, returns to cart |
| Total display        | `getByText(/Total:.*LKR/)`                             | Format: "Total: **LKR X.XX**" |
| Payment method label | `getByText('Select Payment Method')`                   |                               |
| Credit/Debit Card    | `getByText('💳Credit / Debit Card')`                   | Generic/div, not button       |
| PayPal               | `getByText('🅿️PayPal')`                                | Generic/div                   |
| Cash on Delivery     | `getByText('💵Cash on Delivery')`                      | Generic/div                   |
| Continue button      | `getByRole('button', { name: 'Continue →' })`          | Proceeds to Step 2            |
| Cancel button        | `getByRole('button', { name: 'Cancel' })`              | Closes modal, returns to cart |

### Payment Options

1. **💳 Credit / Debit Card** — leads to credit card form (Step 2 variant A)
2. **🅿️ PayPal** — leads to PayPal flow (Step 2 variant B)
3. **💵 Cash on Delivery** — leads to delivery-only form (Step 2 variant C)

---

## Step 2A: Credit / Debit Card Form

### Trigger

Step 1 → select "Credit / Debit Card" → click "Continue →"

### Elements

| Element                      | Role/Locator                                                         | Notes                                 |
| ---------------------------- | -------------------------------------------------------------------- | ------------------------------------- |
| Modal heading                | `getByRole('heading', { level: 2, name: '💳 Credit / Debit Card' })` |                                       |
| Back header button           | `getByRole('button', { name: '←' })`                                 | Returns to Step 1                     |
| Amount display               | `getByText(/Amount to pay:.*LKR/)`                                   | Format: "Amount to pay: **LKR X.XX**" |
| **Delivery Address section** |                                                                      |                                       |
| Street Address field         | `getByRole('textbox', { name: 'No. 12, Main Street' })`              | Placeholder value                     |
| City field                   | `getByRole('textbox', { name: 'Colombo' })`                          | Placeholder value                     |
| Phone field                  | `getByRole('textbox', { name: '+94 77 000 0000' })`                  | Placeholder value                     |
| **Card Details section**     |                                                                      |                                       |
| Cardholder Name field        | `getByRole('textbox', { name: 'John Doe' })`                         | Placeholder value                     |
| Card Number field            | `getByRole('textbox', { name: '1234 5678 9012 3456' })`              | Placeholder value                     |
| Expiry Date field            | `getByRole('textbox', { name: 'MM/YY' })`                            | Placeholder value                     |
| CVV field                    | `getByRole('textbox', { name: '123' })`                              | Placeholder value                     |
| Pay button                   | `getByRole('button', { name: /Pay LKR/ })`                           | e.g. "Pay LKR 50.00"                  |
| Back button                  | `getByRole('button', { name: '← Back' })`                            | Returns to Step 1                     |

### Form Field Sections

- **Delivery Address**: Street Address, City, Phone
- **Card Details**: Cardholder Name, Card Number, Expiry Date, CVV

---

## Modal Behavior

| Action                          | Result                         |
| ------------------------------- | ------------------------------ |
| Click Close (✕)                 | Modal closes, stays on `/cart` |
| Click Cancel                    | Modal closes, stays on `/cart` |
| Click ← (header, Step 2)        | Returns to Step 1              |
| Click ← Back (bottom, Step 2)   | Returns to Step 1              |
| Click Continue → (no selection) | Unknown — requires testing     |
| Click Pay                       | Submits payment (behavior TBD) |

---

## Step 2B: PayPal Form

### Trigger

Step 1 → select "🅿️ PayPal" → click "Continue →"

### Elements

| Element              | Role/Locator                                                                       | Notes                                 |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------- |
| Modal heading        | `getByRole('heading', { level: 2, name: '🅿️ PayPal' })`                            |                                       |
| Back header button   | `getByRole('button', { name: '←' })`                                               | Returns to Step 1                     |
| Amount display       | `getByText(/Amount to pay:.*LKR/)`                                                 | Format: "Amount to pay: **LKR X.XX**" |
| Street Address field | `getByRole('textbox', { name: 'No. 12, Main Street' })`                            | Placeholder value; required           |
| City field           | `getByRole('textbox', { name: 'Colombo' })`                                        | Placeholder value; required           |
| Phone field          | `getByRole('textbox', { name: '+94 77 000 0000' })`                                | Placeholder value; required           |
| PayPal redirect note | `getByText('You will be redirected to PayPal to complete your payment securely.')` | `<p>` element                         |
| Proceed to PayPal    | `getByRole('button', { name: 'Proceed to PayPal' })`                               | Submits order                         |
| Back button          | `getByRole('button', { name: '← Back' })`                                          | Returns to Step 1                     |

### Notes

- No card fields — delivery address only
- **Known limitation:** PayPal redirect is simulated; no real PayPal gateway connection

---

## Step 2C: Cash on Delivery Form

### Trigger

Step 1 → select "💵 Cash on Delivery" → click "Continue →"

### Elements

| Element              | Role/Locator                                                      | Notes                       |
| -------------------- | ----------------------------------------------------------------- | --------------------------- |
| Modal heading        | `getByRole('heading', { level: 2, name: '💵 Cash on Delivery' })` |                             |
| Back header button   | `getByRole('button', { name: '←' })`                              | Returns to Step 1           |
| Total display        | `getByRole('heading', { level: 3 }).last()`                       | Format: "LKR X"             |
| Street Address field | `getByRole('textbox', { name: 'No. 12, Main Street' })`           | Placeholder value; required |
| City field           | `getByRole('textbox', { name: 'Colombo' })`                       | Placeholder value; required |
| Phone field          | `getByRole('textbox', { name: '+94 77 000 0000' })`               | Placeholder value; required |
| Confirm Order button | `getByRole('button', { name: 'Confirm Order' })`                  | Submits order               |
| Back button          | `getByRole('button', { name: '← Back' })`                         | Returns to Step 1           |

### Notes

- No card fields — delivery address only
- No PayPal redirect note

---

## Step 3: Processing

### Trigger

Valid form submitted on Step 2 (any payment method) → processing screen shown ~2 seconds

### Elements

| Element            | Role/Locator                                   | Notes                       |
| ------------------ | ---------------------------------------------- | --------------------------- |
| Spinner            | CSS `[class*="spinner"]` or similar            | Loading indicator           |
| Processing message | `getByText('Processing your payment...')`      | Displayed during processing |
| Do not close msg   | `getByText('Please do not close this window')` |                             |

### Notes

- Duration: approximately 2 seconds before auto-advancing to Step 4
- This step is too brief to capture reliably in automated assertions without timing tricks

---

## Step 4: Order Success

### Trigger

Processing completes → success screen shown

### Elements

| Element               | Role/Locator                                                             | Notes                           |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------- |
| Checkmark icon        | `getByText('✓')` (first occurrence in modal)                             | Success icon                    |
| Success heading       | `getByRole('heading', { level: 2, name: 'Order Placed Successfully!' })` |                                 |
| Order number label    | `getByText('ORDER NUMBER')`                                              |                                 |
| Order number value    | `getByText(/ORD-\d+/)`                                                   | Format: `ORD-XXXXXX` (6 digits) |
| Thank you message     | `getByText('Thank you for shopping with OneStyle!')`                     | `<p>` element                   |
| Redirect message      | `getByText('This page will redirect in a few seconds...')`               |                                 |
| View My Orders button | `getByRole('button', { name: 'View My Orders' })`                        | Navigates to `/orders`          |
| Continue Shopping btn | `getByRole('button', { name: 'Continue Shopping' })`                     | Navigates to `/`                |
| Toast notification    | `getByText(/Order ORD-\d+ placed successfully!/)`                        | Appears at bottom of screen     |

### Post-Order State

- Cart is cleared (cart total = LKR 0, cart count = 0)
- Auto-redirects to home page (`/`) after 6 seconds
- Wishlisted purchased items removed from wishlist

---

## Validation Errors (Step 2A Card Form)

### Trigger

Click "Pay LKR [total]" with missing or invalid fields

### Error Elements

| Field           | Error Message                        | Locator                                           |
| --------------- | ------------------------------------ | ------------------------------------------------- |
| Street Address  | "Required"                           | `locator('span.checkout-error').nth(0)`           |
| City            | "Required"                           | `locator('span.checkout-error').nth(1)`           |
| Phone           | "Required"                           | `locator('span.checkout-error').nth(2)`           |
| Cardholder Name | "Required"                           | `locator('span.checkout-error').nth(3)`           |
| Card Number     | "Enter a valid 16-digit card number" | `getByText('Enter a valid 16-digit card number')` |
| Expiry Date     | "Enter MM/YY"                        | `getByText('Enter MM/YY')`                        |
| CVV             | "Enter 3-digit CVV"                  | `getByText('Enter 3-digit CVV')`                  |

### Notes

- Error class: `checkout-error` (SPAN elements)
- Form is **not submitted** when errors are present

---

## Notes

- Modal is rendered **below the cart table** in the DOM — may require scrolling on smaller viewports
- URL does **not change** when modal opens/closes (stays `/cart`)
- The modal total uses 2 decimal places (e.g. "LKR 50.00") while cart totals use integers ("LKR 50")

---

## Screenshots

- `snapshots/06-checkout-modal-step1.png` — Step 1 payment selection
- `snapshots/06-checkout-modal-step2-card.png` — Step 2 credit card form (viewport)
- `snapshots/06-checkout-modal-step2-card-fullpage.png` — Step 2 credit card form (full page)
- `snapshots/06-checkout-modal-step2-paypal.png` — Step 2 PayPal form
- `snapshots/06-checkout-modal-step2-cod.png` — Step 2 Cash on Delivery form
