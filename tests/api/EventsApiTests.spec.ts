import { test, expect } from '../fixtures'

test.describe('Events API', { tag: ['@api', '@events'] }, () => {
  test.describe.configure({ mode: 'serial' })
  test(
    'POST /api/events with a valid event type returns 204',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.events.trackEvent({
        event: 'PAGE_VIEW',
        page: '/shop',
      })
      expect(res.status).toBe(204)
    }
  )

  test('POST /api/events PRODUCT_VIEW with productId returns 204', async ({ apiContext }) => {
    const res = await apiContext.events.trackEvent({
      event: 'PRODUCT_VIEW',
      productId: 1,
      productName: 'Test Product',
      category: 'women',
    })
    expect(res.status).toBe(204)
  })

  test('POST /api/events CART_ADD with meta qty returns 204', async ({ apiContext }) => {
    const res = await apiContext.events.trackEvent({
      event: 'CART_ADD',
      productId: 1,
      meta: { qty: 2 },
    })
    expect(res.status).toBe(204)
  })

  test('POST /api/events CHECKOUT_START returns 204', async ({ apiContext }) => {
    const res = await apiContext.events.trackEvent({
      event: 'CHECKOUT_START',
    })
    expect(res.status).toBe(204)
  })

  test('POST /api/events with unknown event type returns 400', async ({ request }) => {
    const res = await request.post(`${process.env.API_URL}/api/events`, {
      data: { event: 'UNKNOWN_EVENT_TYPE' },
    })
    expect(res.status()).toBe(400)
  })
})
