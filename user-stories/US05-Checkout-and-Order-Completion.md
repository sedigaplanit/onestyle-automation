# User Story: Checkout and Order Completion

**As a** purchaser,  
**I want to** complete payment and receive an order confirmation,  
**So that** I can finish my purchase and continue browsing the store.

---

## Acceptance Criteria

### AC1 - Access the checkout flow

- Given I am logged in and have at least one item in my cart
- When I click "Proceed to Checkout" on the cart page (`/cart`)
- Then the checkout modal opens on Step 1: Payment Method Selection
- And the total amount payable is displayed in LKR

### AC2 - Payment method selection (Step 1)

- The checkout modal must display three payment method options:
  - 💳 Credit / Debit Card (default selected)
  - 🅿️ PayPal
  - 💵 Cash on Delivery
- Each option is displayed as a selectable card
- When I select a method and click "Continue →"
- Then I proceed to Step 2 (Delivery & Payment Details)

### AC3 - Delivery address required for all payment methods (Step 2)

- Given I am on Step 2 of the checkout for any payment method
- Then the form must collect the following delivery details:
  - Street Address (required, placeholder: "No. 12, Main Street")
  - City (required, placeholder: "Colombo")
  - Phone (required, placeholder: "+94 77 000 0000")

### AC4 - Credit / Debit Card payment details

- Given I selected Credit / Debit Card on Step 1
- Then Step 2 also displays a Card Details section requiring:
  - Cardholder Name (required)
  - Card Number (required, 16 digits, auto-formatted in groups of 4)
  - Expiry Date (required, MM/YY format, auto-formatted)
  - CVV (required, 3 digits)
- And the "Pay LKR [total]" button is shown to submit payment

### AC5 - Credit / Debit Card validation errors

- Given I submit the card payment form with missing or invalid data
- Then the form is not submitted
- And specific inline error messages are shown for each invalid field:
  - Empty delivery fields → "Required"
  - Card number fewer than 16 digits → "Enter a valid 16-digit card number"
  - Expiry date fewer than 5 characters → "Enter MM/YY"
  - CVV fewer than 3 digits → "Enter 3-digit CVV"

### AC6 - PayPal payment flow

- Given I selected PayPal on Step 1
- Then Step 2 displays:
  - The delivery address form (Street Address, City, Phone — all required)
  - A note: "You will be redirected to PayPal to complete your payment securely."
  - The order total in LKR
  - A "Proceed to PayPal" button
- When I fill in the delivery details and click "Proceed to PayPal"
- Then the order proceeds to the processing step
- **Known limitation:** The actual PayPal redirect is simulated in the current implementation and does not connect to a real PayPal gateway. This behaviour should be documented as a defect.

### AC7 - Cash on Delivery flow

- Given I selected Cash on Delivery on Step 1
- Then Step 2 displays only the delivery address form (no card fields)
- And the submit button label reads "Confirm Order"
- When I fill in the delivery details and click "Confirm Order"
- Then the order proceeds to the processing step

### AC8 - Processing step (Step 3)

- Given valid form data has been submitted on Step 2
- Then a processing screen is displayed with:
  - A loading spinner
  - "Processing your payment..." message
  - "Please do not close this window" instruction
- The processing screen is shown for approximately 2 seconds before proceeding to Step 4

### AC9 - Successful order placement (Step 4 — Success)

- Given payment processing completes successfully
- Then a success screen is displayed containing:
  - A "✓" checkmark icon
  - Heading: "Order Placed Successfully!"
  - The unique order number (e.g. ORD-XXXXXX)
  - Message: "Thank you for shopping with OneStyle!"
  - A message indicating auto-redirect ("This page will redirect in a few seconds...")
- And a toast notification confirms "Order [ORD-XXXXXX] placed successfully!"
- And the cart is cleared (both locally and on the server)
- And purchased items that were wishlisted are removed from the wishlist

### AC10 - Post-order navigation options on the success screen

- Given the success screen is displayed
- Then two action buttons are available:
  - "View My Orders" — navigates to the Order History page (`/orders`)
  - "Continue Shopping" — navigates to the home page (`/`)
- And after 6 seconds the modal auto-closes and redirects to the home page

### AC11 - Cancel or close checkout

- Given the checkout modal is open on Step 1
- When I click the "✕" close button or the "Cancel" button
- Then the modal closes without placing an order
- And my cart remains unchanged

### AC12 - Back navigation within checkout

- Given I am on Step 2 of the checkout
- When I click "← Back"
- Then I return to Step 1 (Payment Method Selection)
- And the back button on Step 1 header (←) also behaves as close/back

### AC13 - Checkout requires authentication

- Given I am not logged in and have items in my cart
- When I view the cart page
- Then the "Proceed to Checkout" button is not available
- And a prompt to "Sign in to proceed with checkout" is shown instead

### AC14 - Failed payment / server error does not show false success

- Given the order API call fails during the processing step
- Then no success screen is shown
- And an appropriate error state or message is surfaced to the user
- **Note:** In the current implementation, a server error during order saving is caught silently and the success screen is still shown. This is a known defect to document.
