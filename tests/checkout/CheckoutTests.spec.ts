import { test, expect } from '../fixtures'
import CartPage from '@pages/cart/CartPage'
import WishlistPage from '@pages/wishlist/WishlistPage'
import CartDataProvider from '@dataprovider/CartDataProvider'
import WishlistDataProvider from '@dataprovider/WishlistDataProvider'

test.describe('Checkout Tests', { tag: ['@ui', '@checkout'] }, () => {
  // Populated in beforeEach — derived from the first product returned by the API
  let seedProductId: number

  test.beforeEach(async ({ apiContext }) => {
    const res = await apiContext.products.getProducts()
    seedProductId = res.data.products[0].id

    const cart = new CartDataProvider(apiContext.cart)
    const wishlist = new WishlistDataProvider(apiContext.wishlist)
    await Promise.all([cart.clearCart(), wishlist.clearWishlist()])
    await cart.seedCart({ [String(seedProductId)]: 1 })
  })

  test.afterEach(async ({ apiContext }) => {
    const cart = new CartDataProvider(apiContext.cart)
    const wishlist = new WishlistDataProvider(apiContext.wishlist)
    await Promise.all([cart.clearCart(), wishlist.clearWishlist()])
  })

  test('Checkout modal opens on Step 1 and displays payment options with total', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage).then((_) => _.clickProceedToCheckout())

    expect(await modal.isModalVisible()).toBe(false)
    expect(page.url()).toContain('/cart')
    expect(await modal.areAllPaymentOptionsVisible()).toBe(true)
    expect(await modal.getTotalText()).toMatch(/Total:.*LKR/)
    expect(await modal.isContinueButtonVisible()).toBe(true)
    expect(await modal.isCancelButtonVisible()).toBe(true)
    expect(await modal.isCloseButtonVisible()).toBe(true)
  })

  test('Credit / Debit Card Step 2 displays delivery address and card detail fields', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    // Credit / Debit Card is the default selected method — click Continue directly
    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.clickContinue())

    expect(page.url()).toContain('/cart')
    expect(await modal.isCardStep2Visible()).toBe(true)
    expect(await modal.isAmountDisplayVisible()).toBe(true)
    expect(await modal.isFieldPresent('No. 12, Main Street')).toBe(true)
    expect(await modal.isFieldPresent('Colombo')).toBe(true)
    expect(await modal.isFieldPresent('+94 77 000 0000')).toBe(true)
    expect(await modal.hasCardFields()).toBe(true)
    expect(await modal.isPayButtonVisible()).toBe(true)
    expect(await modal.isBackBottomButtonVisible()).toBe(true)
    expect(await modal.isBackHeaderButtonVisible()).toBe(true)
  })

  test('PayPal Step 2 displays delivery form, redirect note, and Proceed to PayPal button', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('paypal'))
      .then((_) => _.clickContinue())

    expect(page.url()).toContain('/cart')
    expect(await modal.isPayPalStep2Visible()).toBe(true)
    expect(await modal.isAmountDisplayVisible()).toBe(true)
    expect(await modal.isFieldPresent('No. 12, Main Street')).toBe(true)
    expect(await modal.isPayPalRedirectNoteVisible()).toBe(true)
    expect(await modal.isProceedToPayPalButtonVisible()).toBe(true)
    expect(await modal.hasCardFields()).toBe(false)
    expect(await modal.isBackBottomButtonVisible()).toBe(true)
    expect(await modal.isBackHeaderButtonVisible()).toBe(true)
  })

  test('Cash on Delivery Step 2 shows delivery form only with Confirm Order button', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    expect(page.url()).toContain('/cart')
    expect(await modal.isCODStep2Visible()).toBe(true)
    expect(await modal.isFieldPresent('No. 12, Main Street')).toBe(true)
    expect(await modal.hasCardFields()).toBe(false)
    expect(await modal.isPayPalRedirectNoteVisible()).toBe(false)
    expect(await modal.isConfirmOrderButtonVisible()).toBe(true)
    expect(await modal.isBackBottomButtonVisible()).toBe(true)
    expect(await modal.isBackHeaderButtonVisible()).toBe(true)
  })

  test('Card payment form shows inline validation errors when submitted empty', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    // Credit / Debit Card is the default — proceed directly to Step 2
    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.clickContinue())

    await modal.clickPayButton()

    const errors = await modal.getValidationErrors()
    expect(errors).toContain('Required')
    expect(errors).toContain('Enter a valid 16-digit card number')
    expect(errors).toContain('Enter MM/YY')
    expect(errors).toContain('Enter 3-digit CVV')
    expect(errors).toHaveLength(7)
  })

  test('Card form boundary validation for partial card number, short expiry, and short CVV', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.fillCardDetails('Test User', '1234 5678 9012', '12/2', '12')
    await modal.clickPayButton()

    const errors = await modal.getValidationErrors()
    expect(errors).toContain('Enter a valid 16-digit card number')
    expect(errors).toContain('Enter MM/YY')
    expect(errors).toContain('Enter 3-digit CVV')
    expect(errors).toHaveLength(3)
  })

  test(
    'Successful COD order placement shows processing screen then order success screen',
    { tag: '@smoke' },
    async ({ open }) => {
      // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
      test.slow()

      const modal = await open(CartPage)
        .then((_) => _.clickProceedToCheckout())
        .then((_) => _.selectPaymentMethod('cod'))
        .then((_) => _.clickContinue())

      await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
      await modal.clickConfirmOrder()
      await modal.waitForSuccessScreen()

      expect(await modal.isSuccessVisible()).toBe(true)
      expect(await modal.getOrderNumber()).toMatch(/ORD-\d{6}/)

      const orderNumber = await modal.getOrderNumber()
      const toastText = await modal.getSuccessToastMessage()
      expect(toastText).toContain(orderNumber)
    }
  )

  test('Cart is cleared on both client and server after successful order placement', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickConfirmOrder()
    await modal.waitForSuccessScreen()

    await modal.clickContinueShopping()
    const cartPage = await open(CartPage)

    expect(await cartPage.getCartItemCount()).toBe(0)
    expect(await cartPage.isCheckoutButtonEnabled()).toBe(false)
  })

  test('View My Orders button on success screen navigates to Order History page', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickConfirmOrder()
    await modal.waitForSuccessScreen()

    const ordersPage = await modal.clickViewMyOrders()

    expect(page.url()).toContain('/orders')
    expect(await ordersPage.isOrderHistoryVisible()).toBe(true)
  })

  test('Continue Shopping button on success screen navigates to home page', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickConfirmOrder()
    await modal.waitForSuccessScreen()

    const landingPage = await modal.clickContinueShopping()

    expect(page.url()).not.toContain('/cart')
    expect(page.url()).not.toContain('/orders')
    expect(await landingPage.isMyOrdersButtonVisible()).toBe(true)
  })

  test('Success screen auto-redirects to home page after 6 seconds', async ({ open, page }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickConfirmOrder()
    await modal.waitForSuccessScreen()

    // Wait passively — auto-redirect fires after ~6 seconds; no user interaction
    await modal.waitForSuccessToClose()

    expect(await modal.isSuccessVisible()).toBe(false)
    expect(page.url()).not.toContain('/cart')
  })

  test('Cancel button closes checkout modal without placing an order', async ({ open, page }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const cartPage = await open(CartPage)

    const cartCountBefore = await cartPage.getCartItemCount()
    const modal = await cartPage.clickProceedToCheckout()

    expect(await modal.isModalVisible()).toBe(true)

    const returnedCart = await modal.clickCancel()

    expect(await returnedCart.isCheckoutModalOpen()).toBe(false)
    expect(page.url()).toContain('/cart')
    expect(await returnedCart.getCartItemCount()).toBe(cartCountBefore)
    expect(await returnedCart.isCheckoutButtonEnabled()).toBe(true)
  })

  test('Close button closes checkout modal without placing an order', async ({ open, page }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const cartPage = await open(CartPage)

    const cartCountBefore = await cartPage.getCartItemCount()
    const modal = await cartPage.clickProceedToCheckout()

    expect(await modal.isModalVisible()).toBe(true)

    const returnedCart = await modal.clickClose()

    expect(await returnedCart.isCheckoutModalOpen()).toBe(false)
    expect(page.url()).toContain('/cart')
    expect(await returnedCart.getCartItemCount()).toBe(cartCountBefore)
    expect(await returnedCart.isCheckoutButtonEnabled()).toBe(true)
  })

  test('Back button on Step 2 returns to Step 1 Payment Method Selection', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.clickContinue())
      .then((_) => _.clickBackBottom())

    expect(await modal.isStep1Visible()).toBe(true)
    expect(await modal.areAllPaymentOptionsVisible()).toBe(true)
    expect(await modal.isContinueButtonVisible()).toBe(true)
    expect(await modal.isCancelButtonVisible()).toBe(true)
    expect(page.url()).toContain('/cart')
  })

  test('Header close button on Step 1 closes modal after returning from Step 2', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const cartPage = await open(CartPage)
    const cartCountBefore = await cartPage.getCartItemCount()

    const modal = await cartPage.clickProceedToCheckout()
    // Navigate to Step 2 then back to Step 1 before closing
    const backOnStep1 = await modal.clickContinue().then((_) => _.clickBackBottom())

    expect(await backOnStep1.isStep1Visible()).toBe(true)

    const returnedCart = await backOnStep1.clickClose()

    expect(await returnedCart.isCheckoutModalOpen()).toBe(false)
    expect(page.url()).toContain('/cart')
    expect(await returnedCart.getCartItemCount()).toBe(cartCountBefore)
  })

  test('PayPal delivery form submission proceeds to processing and success screen', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('paypal'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickProceedToPayPal()
    await modal.waitForSuccessScreen()

    expect(await modal.isSuccessVisible()).toBe(true)
    expect(await modal.getOrderNumber()).toMatch(/ORD-\d{6}/)

    const orderNumber = await modal.getOrderNumber()
    const toastText = await modal.getSuccessToastMessage()
    expect(toastText).toContain(orderNumber)
  })

  // BUG: see bug-reports/BUG_CHECKOUT_003_wishlist-page-does-not-fetch-on-navigation.md
  test.skip('Wishlisted item is removed from wishlist after it is purchased', async ({
    open,
    apiContext,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    // Seed the wishlist via API (beforeEach already cleared it)
    await new WishlistDataProvider(apiContext.wishlist).ensureInWishlist(seedProductId)

    // Verify item appears in wishlist via UI
    const wishlistBefore = await open(WishlistPage)
    await expect
      .poll(async () => await wishlistBefore.isWishlistEmpty(), {
        timeout: 5000,
        intervals: [500],
        message: 'Waiting for wishlist to be populated after seeding via API',
      })
      .toBe(false)

    // Purchase the seeded product via COD (cart already seeded by beforeEach)
    const modal = await open(CartPage)
      .then((_) => _.clickProceedToCheckout())
      .then((_) => _.selectPaymentMethod('cod'))
      .then((_) => _.clickContinue())

    await modal.fillDeliveryAddress('No. 45, Main Street', 'Colombo', '+94 77 000 0000')
    await modal.clickConfirmOrder()
    await modal.waitForSuccessScreen()

    // Navigate to wishlist and verify purchased item is removed
    const wishlistAfter = await open(WishlistPage)
    expect(await wishlistAfter.isWishlistEmpty()).toBe(true)
  })
})

test.describe('Checkout Tests — Unauthenticated', { tag: ['@ui', '@checkout'] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('Unauthenticated user on cart page sees sign-in prompt instead of Proceed to Checkout', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const cartPage = await open(CartPage)

    expect(await cartPage.isSignInPromptVisible()).toBe(true)
    expect(await cartPage.isCheckoutButtonAbsent()).toBe(true)
    expect(page.url()).toContain('/cart')

    await cartPage.clickSignUpLogin()

    expect(page.url()).toContain('/login')
  })
})
