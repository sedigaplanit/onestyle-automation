import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'

test.describe('Cart Tests', () => {
  test('Verify selected product is added to cart', async ({ open }) => {
    const cartPage = await open(LandingPage)
      .then((_) => _.navigateToMensSection())
      .then((_) => _.selectProductByName('Casual Green Zippered Jacket'))
      .then((_) => _.selectSize('M'))
      .then((_) => _.clickAddToCart())
      .then((_) => _.navigateToCartPage())
    expect(await cartPage.isCartEmpty()).toBe(false)
  })

  test('Verify removing an item from the cart updates cart contents and total', async ({
    open,
  }) => {
    const cartPage = await open(LandingPage)
      .then((_) => _.navigateToMensSection())
      .then((_) => _.selectProductByName('Casual Green Zippered Jacket'))
      .then((_) => _.selectSize('M'))
      .then((_) => _.clickAddToCart())
      .then((_) => _.navigateToCartPage())
      .then((_) => _.removeFirstItem())
    expect(await cartPage.isCartEmpty()).toBe(true)
    expect(await cartPage.getCartTotal()).toBe('LKR 0')
  })
})
