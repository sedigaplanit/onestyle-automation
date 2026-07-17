### Test Case ID

TC_CART_014

### Test Case Title

Proceed to Checkout button disabled and styled inactive on empty cart

### Feature Area

Cart Management

### Priority

High

### Preconditions

- User is logged in (auth storage state active)
- Cart is empty (remove all items if any, or use a fresh authenticated session with no cart activity)
- Navigate to $BASE_URL/cart

### Test Steps

1. On the cart page, confirm no item rows are visible in the cart table.
2. Observe the "Proceed to Checkout" button in the Cart Totals panel.
3. Check the button's visual styling (opacity, cursor).
4. Attempt to click the "Proceed to Checkout" button.
5. Observe whether the checkout modal opens.

### Expected Result

1. No item rows are visible — cart is empty. Column headers are still present.
2. The "Proceed to Checkout" button is visible but has a `disabled` attribute.
3. The button is visually styled as inactive — reduced opacity and `not-allowed` cursor when hovered.
4. Clicking the disabled button has no effect.
5. No checkout modal opens — the page remains unchanged.

### Notes and Assumptions

- Tags: Regression
- This is the documented NEG-003 case from `.playwright-mcp/flows/negative-edge.json`.
- Button locator: `getByRole('button', { name: 'Proceed to Checkout' })` — verify `disabled` attribute is present.

### Defect Opportunity

- The "Proceed to Checkout" button is not disabled on empty cart.
- Clicking the disabled button unexpectedly opens the checkout modal.
- The button's visual styling does not indicate it is inactive (no opacity reduction, no `not-allowed` cursor).
