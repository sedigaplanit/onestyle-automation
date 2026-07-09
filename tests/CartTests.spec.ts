import { test, expect } from '@playwright/test'
import CartPage from '../pages/CartPage'
import BasePage from '../pages/BasePage'
import LandingPage from '../pages/LandingPage'

test.describe('Cart Tests', () => {
  test('Verify selected product is added to cart', async ({ page }) => {
    await page.goto('')
    const landingPage = await new LandingPage(page)
      .init()
      .then((_) => _.navigateToMensSection())
      .then((_) => _.selectProductByName('Contemporary Green Jacket'))
      .then((_) => _.selectSize('M'))
      .then((_) => _.clickAddToCart())
      .then((_) => _.navigateToCartPage())
    const isCartEmpty = await landingPage.isCartEmpty()
    expect(isCartEmpty).toBe(false)
  })
})
