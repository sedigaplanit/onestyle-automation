import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'

test.describe('Cart Management Tests', () => {
  test('Add product to cart from product detail page with size and quantity', async ({ open }) => {
    // test.slow(): app is hosted on GitHub Pages — cold-start navigation can exceed the 30s default
    test.slow()
    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())

    // Verify default quantity is 1 before any interaction
    const initialCartCount = await productPage.getCartItemCount()
    expect(await productPage.getQuantityValue()).toBe('1')

    // Increment quantity to 2
    await productPage.clickIncrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('2')

    // Select size M and add to cart
    await productPage.selectSize('M').then((_) => _.clickAddToCart())

    // Assert toast confirmation
    const toast = await productPage.getSuccessToastMessage()
    expect(toast).toContain('added to cart!')

    // Assert button switches to "In Cart — View Cart"
    expect(await productPage.isInCart()).toBe(true)

    // Assert cart count incremented by 2 (quantity added)
    expect(await productPage.getCartItemCount()).toBe(initialCartCount + 2)
  })

  test('View cart contents — item rows and Cart Totals panel validation', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start can exceed the 30s default
    test.slow()

    // Setup: navigate to a product, add to cart if not already there, then go to cart
    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    // 1. All 6 column headers present
    const headers = await cartPage.getColumnHeaders()
    expect(headers).toContain('Products')
    expect(headers).toContain('Title')
    expect(headers).toContain('Price')
    expect(headers).toContain('Quantity')
    expect(headers).toContain('Total')
    expect(headers).toContain('Remove')

    // 2-3. First item has product image and a non-empty name
    expect(await cartPage.isProductImageVisible(0)).toBe(true)
    expect(await cartPage.getItemName(0)).toBeTruthy()

    // 4. Unit price is in LKR format
    const unitPrice = await cartPage.getItemUnitPrice(0)
    expect(unitPrice).toMatch(/^LKR \d+/)

    // 5. Quantity control is present and shows a numeric value
    const qty = await cartPage.getQuantityForItem(0)
    expect(qty).toMatch(/^\d+$/)

    // 6-7. Line total is in LKR format and equals unit price × quantity
    const lineTotal = await cartPage.getItemLineTotal(0)
    expect(lineTotal).toMatch(/^LKR \d+/)
    const parseAmount = (s: string) => parseInt(s.replace('LKR', '').trim(), 10)
    expect(parseAmount(lineTotal)).toBe(parseAmount(unitPrice) * parseInt(qty, 10))

    // 8. Remove icon is present
    expect(await cartPage.isRemoveIconVisible(0)).toBe(true)

    // 9. Sub Total is in LKR format
    const subTotal = await cartPage.getSubTotal()
    expect(subTotal).toMatch(/^LKR \d+/)

    // 10. Shipping is labelled Free
    expect(await cartPage.isShippingFree()).toBe(true)

    // 11-12. Total is in LKR format and equals Sub Total (shipping is always Free)
    const total = await cartPage.getTotal()
    expect(total).toMatch(/^LKR \d+/)
    expect(total).toBe(subTotal)
  })

  test('Cart is saved to server on logout and local cart state is cleared', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start can exceed the 30s default
    test.slow()

    // Setup: ensure a product is in the cart
    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    // 1. Confirm cart has items before logout
    const cartCountBefore = await cartPage.getCartItemCount()
    expect(cartCountBefore).toBeGreaterThan(0)

    // 2. Logout — redirects to landing page (unauthenticated)
    const landingPage = await cartPage.clickLogout()

    // 3. Login button visible = unauthenticated state confirmed
    expect(await landingPage.isLoginButtonVisible()).toBe(true)

    // 4. Cart count badge resets to 0 — local state cleared
    expect(await landingPage.getCartItemCount()).toBe(0)

    // 5–6. Navigate to cart via cart icon — guest view: prompt present, no items
    const guestCartPage = await landingPage.clickCartIcon()
    expect(await guestCartPage.isGuestPromptVisible()).toBe(true)
    expect(await guestCartPage.getItemCount()).toBe(0)
  })

  test('Size selection required before adding to cart — error state validation', async ({
    open,
  }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    // Setup: clear cart so "Add to Cart" button is visible on the product page
    const cleanCart = await open(LandingPage).then((_) => _.clickCartIcon())
    await cleanCart.clearCart()
    const productPage = await cleanCart.clickLogo().then((_) => _.clickFirstProduct())

    const countBefore = await productPage.getCartItemCount()

    // Click Add to Cart WITHOUT selecting a size
    await productPage.clickAddToCart()

    // Size heading must change to error state
    expect(await productPage.hasSizeError()).toBe(true)

    // Cart count must remain unchanged
    expect(await productPage.getCartItemCount()).toBe(countBefore)
  })

  test('Quantity selector increments, decrements, and enforces minimum of 1', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())

    // Default quantity is 1
    expect(await productPage.getQuantityValue()).toBe('1')

    // Increment to 2, then 3
    await productPage.clickIncrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('2')
    await productPage.clickIncrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('3')

    // Decrement to 2, then 1
    await productPage.clickDecrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('2')
    await productPage.clickDecrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('1')

    // Decrement at minimum — must stay at 1 (minimum enforced)
    await productPage.clickDecrementQuantity()
    expect(await productPage.getQuantityValue()).toBe('1')
  })

  test('Buy Now shortcut adds product and opens checkout modal on cart page', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    await productPage.selectSize('M')
    const cartPage = await productPage.clickBuyNow()

    // Checkout modal opens automatically on landing at /cart
    expect(await cartPage.isCheckoutModalOpen()).toBe(true)
    // Product is in cart
    expect(await cartPage.getItemCount()).toBeGreaterThan(0)
  })

  test('Increase item quantity in cart recalculates line total and Cart Totals', async ({
    open,
  }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    const parseAmount = (s: string) => parseInt(s.replace('LKR', '').trim(), 10)
    const qtyBefore = parseInt(await cartPage.getQuantityForItem(0), 10)
    const unitPrice = await cartPage.getItemUnitPrice(0)
    const subTotalBefore = await cartPage.getSubTotal()

    await cartPage.clickIncrementForItem(0)

    const qtyAfter = parseInt(await cartPage.getQuantityForItem(0), 10)
    expect(qtyAfter).toBe(qtyBefore + 1)

    // Line total = unit price × new quantity
    const lineTotal = await cartPage.getItemLineTotal(0)
    expect(parseAmount(lineTotal)).toBe(parseAmount(unitPrice) * qtyAfter)

    // Sub Total increased by one unit price
    expect(parseAmount(await cartPage.getSubTotal())).toBe(
      parseAmount(subTotalBefore) + parseAmount(unitPrice)
    )

    // Total always equals Sub Total (free shipping)
    expect(await cartPage.getTotal()).toBe(await cartPage.getSubTotal())
  })

  test('Decrease item quantity in cart when quantity is greater than one', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    // Ensure quantity is at least 2 before decrement test
    await cartPage.clickIncrementForItem(0)
    const qtyBefore = parseInt(await cartPage.getQuantityForItem(0), 10)
    expect(qtyBefore).toBeGreaterThanOrEqual(2)

    const parseAmount = (s: string) => parseInt(s.replace('LKR', '').trim(), 10)
    const unitPrice = await cartPage.getItemUnitPrice(0)
    const subTotalBefore = await cartPage.getSubTotal()

    await cartPage.clickDecrementForItem(0)

    const qtyAfter = parseInt(await cartPage.getQuantityForItem(0), 10)
    expect(qtyAfter).toBe(qtyBefore - 1)

    // Item row must still be present (not removed)
    expect(await cartPage.getItemCount()).toBeGreaterThan(0)

    // Line total = unit price × new quantity
    expect(parseAmount(await cartPage.getItemLineTotal(0))).toBe(parseAmount(unitPrice) * qtyAfter)

    // Sub Total decreased by one unit price
    expect(parseAmount(await cartPage.getSubTotal())).toBe(
      parseAmount(subTotalBefore) - parseAmount(unitPrice)
    )
  })

  test('Item removed from cart when quantity decremented to zero', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    // Setup: clean cart, then add exactly one item with default quantity (1)
    const cleanCart = await open(LandingPage).then((_) => _.clickCartIcon())
    await cleanCart.clearCart()
    const productPage = await cleanCart.clickLogo().then((_) => _.clickFirstProduct())
    await productPage.selectSize('M').then((_) => _.clickAddToCart())
    const cartPage = await productPage.clickViewCart()

    expect(await cartPage.getQuantityForItem(0)).toBe('1')

    // Decrement from qty 1 — item must be removed
    await cartPage.clickDecrementForItem(0)

    expect(await cartPage.getItemCount()).toBe(0)
    expect(await cartPage.getCartItemCount()).toBe(0)
    // Checkout button disabled on empty cart
    expect(await cartPage.isCheckoutButtonEnabled()).toBe(false)
  })

  test('Remove item from cart using the remove icon', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    const rowCountBefore = await cartPage.getItemCount()
    expect(rowCountBefore).toBeGreaterThan(0)

    await cartPage.removeItem(0)

    // Row count decreased by 1
    expect(await cartPage.getItemCount()).toBe(rowCountBefore - 1)
  })

  test('Cart contents preserved after navigating through other pages and returning', async ({
    open,
  }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    const rowCountBefore = await cartPage.getItemCount()
    const itemNameBefore = await cartPage.getItemName(0)
    const badgeBefore = await cartPage.getCartItemCount()
    expect(rowCountBefore).toBeGreaterThan(0)

    // Navigate away: cart → home → product → cart
    const cartPageAgain = await cartPage
      .clickLogo()
      .then((_) => _.clickFirstProduct())
      .then((_) => _.clickCartIcon())

    expect(await cartPageAgain.getItemCount()).toBe(rowCountBefore)
    expect(await cartPageAgain.getItemName(0)).toBe(itemNameBefore)
    expect(await cartPageAgain.getCartItemCount()).toBe(badgeBefore)
  })

  test('Cart contents restored from server after logout and re-login', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start on login API
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartBefore = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    const itemCountBefore = await cartBefore.getItemCount()
    const itemNameBefore = await cartBefore.getItemName(0)
    expect(itemCountBefore).toBeGreaterThan(0)

    // Logout — cart cleared locally
    const landingUnauth = await cartBefore.clickLogout()
    expect(await landingUnauth.getCartItemCount()).toBe(0)

    // Re-login
    const loginPage = await landingUnauth.clickLoginButton()
    const landingAuth = await loginPage
      .setEmail(process.env.USER_NAME ?? '')
      .then((_) => _.setPassword(process.env.PASSWORD ?? ''))
      .then((_) => _.clickLogin())

    // Wait for authenticated nav — confirms Render.com login API has responded
    expect(await landingAuth.isMyOrdersButtonVisible()).toBe(true)

    // Navigate to cart — server cart must be restored
    const cartAfter = await landingAuth.clickCartIcon()
    expect(await cartAfter.getItemCount()).toBeGreaterThanOrEqual(itemCountBefore)
    expect(await cartAfter.getItemName(0)).toBe(itemNameBefore)
  })

  test('Checkout button disabled and visually inactive when cart is empty', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    // Setup: clear the cart
    const cartPage = await open(LandingPage).then((_) => _.clickCartIcon())
    await cartPage.clearCart()

    expect(await cartPage.isCheckoutButtonEnabled()).toBe(false)
  })

  test('Proceed to Checkout button active and opens checkout modal', async ({ open }) => {
    // test.slow(): GitHub Pages + Render.com backend cold-start
    test.slow()

    const productPage = await open(LandingPage).then((_) => _.clickFirstProduct())
    const cartPage = await productPage.addToCartIfNeeded('M').then((_) => _.clickViewCart())

    expect(await cartPage.isCheckoutButtonEnabled()).toBe(true)

    await cartPage.clickProceedToCheckout()

    expect(await cartPage.isCheckoutModalOpen()).toBe(true)
  })
})

test.describe('Cart Management Tests — Guest', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('Guest cart shows sign-in prompt and Sign Up / Login button', async ({ open, page }) => {
    const cartPage = await open(LandingPage).then((_) => _.clickCartIcon())

    // Cart count is 0 — guest cart is always empty
    expect(await cartPage.getCartItemCount()).toBe(0)
    expect(await cartPage.getItemCount()).toBe(0)

    // Sign-in prompt replaces the Checkout button
    expect(await cartPage.isGuestPromptVisible()).toBe(true)

    // Clicking Sign Up / Login navigates to /login
    await cartPage.clickSignUpLogin()
    expect(page.url()).toContain('/login')
  })
})
