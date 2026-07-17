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

## Notes

- Modal is rendered **below the cart table** in the DOM — may require scrolling on smaller viewports
- URL does **not change** when modal opens/closes (stays `/cart`)
- The modal total uses 2 decimal places (e.g. "LKR 50.00") while cart totals use integers ("LKR 50")

---

## Screenshots

- `snapshots/06-checkout-modal-step1.png` — Step 1 payment selection
- `snapshots/06-checkout-modal-step2-card.png` — Step 2 credit card form (viewport)
- `snapshots/06-checkout-modal-step2-card-fullpage.png` — Step 2 credit card form (full page)
