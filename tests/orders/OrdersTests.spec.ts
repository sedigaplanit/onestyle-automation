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

  test('Orders are displayed in reverse chronological order with most recent first', async ({
    open,
  }) => {
    // test.slow(): remote GitHub Pages + async order API load can exceed the 30s default
    test.slow()

    const ordersPage = await open(LandingPage).then((_) => _.clickMyOrders())

    // Wait for order data to load
    await expect
      .poll(async () => ordersPage.getOrderCountText(), {
        timeout: 5_000,
        intervals: [500],
        message: 'Waiting for order count subtitle to appear after API fetch',
      })
      .toMatch(/\d+ orders placed/)

    // Collect the first 3 order card dates
    const dates = await ordersPage.getFirstOrderCardDates(3)

    expect(dates.length).toBeGreaterThanOrEqual(2)

    // Each date must be >= the next (descending / most-recent-first order)
    for (let i = 0; i < dates.length - 1; i++) {
      expect(
        dates[i].getTime(),
        `Card ${i + 1} date (${dates[i].toDateString()}) must be >= card ${i + 2} date (${dates[i + 1].toDateString()})`
      ).toBeGreaterThanOrEqual(dates[i + 1].getTime())
    }
  })
})
