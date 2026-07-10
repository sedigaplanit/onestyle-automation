import { test, expect } from '@playwright/test'
import CartPage from '../pages/CartPage'
import BasePage from '../pages/BasePage'
import LandingPage from '../pages/LandingPage'

test.describe('Cart Tests', () => {
  test('Verify selected product is added to cart', async ({ page }) => {
    const landingPage = await new LandingPage(page)
      .init()
      .then((_) => _.navigateToMensSection())
      .then((_) => _.selectProductByName('Casual Green Zippered Jacket'))
      .then((_) => _.selectSize('M'))
      .then((_) => _.clickAddToCart())
      .then((_) => _.navigateToCartPage())
    const isCartEmpty = await landingPage.isCartEmpty()
    expect(isCartEmpty).toBe(false)
  })

  test('Verify removing an item from the cart updates cart contents and total', async ({
    page,
  }) => {
    const cartPage = await new LandingPage(page)
      .init()
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
