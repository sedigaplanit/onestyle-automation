import { test, expect } from '../fixtures'
import CartPage from '../../pages/cart/CartPage'
import ProductPage from '../../pages/product-browsing/ProductPage'

test.describe('Checkout Tests', () => {
  test('Close (✕) button closes checkout modal without placing an order', async ({
    open,
    page,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    // Precondition: ensure at least one item is in the cart
    const cartPage = await open(ProductPage)
      .then((_) => _.selectSize('M'))
      .then((_) => _.clickAddToCart())
      .then((_) => _.clickViewCart())

    const cartCountBefore = await cartPage.getCartItemCount()

    const modal = await cartPage.clickProceedToCheckout()
    expect(await modal.isModalVisible()).toBe(true)

    const returnedCart = await modal.clickClose()

    expect(await returnedCart.isCheckoutModalOpen()).toBe(false)
    expect(page.url()).toContain('/cart')
    expect(await returnedCart.getCartItemCount()).toBe(cartCountBefore)
    expect(await returnedCart.isCheckoutButtonEnabled()).toBe(true)
  })
})
