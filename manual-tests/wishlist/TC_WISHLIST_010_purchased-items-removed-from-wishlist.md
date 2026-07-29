### Test Case ID

TC_WISHLIST_010

### Test Case Title

Purchased items are automatically removed from wishlist after successful checkout

### Feature Area

Wishlist Management

### Priority

High

### Preconditions

- Navigate to $BASE_URL
- User is logged in as $USER_NAME
- Wishlist is empty at test start
- The cart is empty at test start

### Test Steps

1. Locate a product card on the landing page (Product A).
2. Click the ♡ button on Product A's card to add it to the wishlist.
3. Locate a second product card on the landing page (Product B, different from Product A).
4. Click the ♡ button on Product B's card to add it to the wishlist.
5. Read the wishlist badge count in the navbar (expected: "2").
6. Scroll to Product A's card on the landing page.
7. Select a size on Product A's card (e.g. click the "S" size button).
8. Click the "Add to Cart" button on Product A's card.
9. Click the ♡ wishlist link in the navbar to go to the Wishlist page.
10. Read the count of product cards on the Wishlist page (expected: 2 — both Product A and Product B).
11. Click the Cart icon in the navbar to go to the Cart page.
12. Click the "Proceed to Checkout" button.
13. Click "💳Credit / Debit Card" in the payment method options.
14. Click "Continue →" to proceed to Step 2.
15. Fill in the Street Address field (e.g. "No. 12, Main Street").
16. Fill in the City field (e.g. "Colombo").
17. Fill in the Phone field (e.g. "+94 77 000 0000").
18. Fill in the Cardholder Name field (e.g. "John Doe").
19. Fill in the Card Number field (e.g. "1234 5678 9012 3456").
20. Fill in the Expiry Date field (e.g. "12/26").
21. Fill in the CVV field (e.g. "123").
22. Click the "Pay LKR" button to complete the purchase.
23. Wait for the checkout confirmation to appear.
24. Click the ♡ wishlist link in the navbar to return to the Wishlist page.
25. Read the count of product cards on the Wishlist page.
26. Read the product names displayed on the Wishlist page.

### Expected Result

1. Product A's card is visible on the landing page.
2. Product A is added to the wishlist; its heart icon fills (♥).
3. Product B's card is visible on the landing page.
4. Product B is added to the wishlist; its heart icon fills (♥).
5. The navbar badge shows "2".
6. Product A's card is in view on the landing page.
7. A size is selected on Product A's card.
8. Product A is added to the cart.
9. The Wishlist page is displayed.
10. Two product cards are shown (Product A and Product B both in wishlist).
11. The Cart page is displayed with Product A in the cart.
12. The Checkout modal opens at Step 1.
13. "Credit / Debit Card" is selected as the payment method.
14. The checkout modal advances to Step 2 showing the Credit / Debit Card form.
15. The Street Address field is filled.
16. The City field is filled.
17. The Phone field is filled.
18. The Cardholder Name field is filled.
19. The Card Number field is filled.
20. The Expiry Date field is filled.
21. The CVV field is filled.
22. The payment is submitted.
23. A checkout success confirmation is shown.
24. The Wishlist page is displayed.
25. Only one product card is shown (Product B remains; Product A has been removed).
26. Product B is displayed; Product A is no longer present in the wishlist.

Overall: after a successful checkout, the purchased item (Product A) is automatically removed from the wishlist, while any non-purchased wishlisted item (Product B) remains unaffected.

### Notes and Assumptions

- Tags: Regression
- This test depends on the checkout flow documented in TC_CHECKOUT_001 and TC_CHECKOUT_002 for payment step details.
- "Product A" and "Product B" refer to any two distinct products available on the landing page.
- The wishlist clear behaviour is triggered by checkout completion — the exact mechanism (event, localStorage update) is internal to the app.
- If checkout fails (e.g. backend unavailable), the wishlist should not be modified.
- Refer to TC_CHECKOUT_001 for the full checkout modal interaction steps if needed.

### Defect Opportunity

- Purchased item may remain in the wishlist after checkout (wishlist not cleared on purchase).
- All wishlist items (including non-purchased ones) may be cleared incorrectly.
- The wishlist may not update immediately after checkout, requiring a manual refresh.
- If the checkout flow fails silently, the wishlist may be cleared despite no actual purchase completing.
