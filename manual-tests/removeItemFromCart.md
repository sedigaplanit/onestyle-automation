### Test Case ID: TC_CART_003

Title: Remove an item from the cart
User Story Reference: 4
Priority: High
Preconditions:

- The cart contains one or more items.
  Test Steps:

1. Open the cart page.
2. Remove an item using the remove/delete action.
3. Confirm the cart shows the updated contents.
   Expected Result:
4. Cart page opens and items are visible.
5. The remove action is executed successfully.
6. The updated cart contents are displayed without the removed item.
   The removed item is no longer in the cart.
   The cart total recalculates.
   If empty, an empty-cart message appears.
   Notes / Assumptions:

- If there is a confirmation prompt, validate its behavior.
  Defect Opportunity:
- Remove action fails or leaves stale item data in the cart.
- Cart did not recalculate totals after removal.
