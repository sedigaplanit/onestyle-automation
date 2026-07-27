import { test, expect } from '../fixtures'
import LandingPage from '@pages/landing/LandingPage'

test.describe('Orders Tests', { tag: ['@ui', '@orders'] }, () => {
  test(
    'Clicking "My Orders" in the navbar navigates to the Order History page',
    { tag: '@smoke' },
    async ({ open, page }) => {
      // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
      test.slow()

      const ordersPage = await open(LandingPage).then((_) => _.clickMyOrders())

      expect(page.url()).toContain('/orders')
      expect(await ordersPage.isOrderHistoryVisible()).toBe(true)

      // Order data loads asynchronously after the heading appears — poll for subtitle
      await expect
        .poll(async () => await ordersPage.getOrderCountText(), {
          timeout: 5_000,
          intervals: [500],
          message: 'Waiting for order count subtitle to appear after API fetch',
        })
        .toMatch(/\d+ orders placed/)

      expect(await ordersPage.hasOrderCards()).toBe(true)
    }
  )
})
