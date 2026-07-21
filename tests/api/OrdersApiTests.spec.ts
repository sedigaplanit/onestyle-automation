import { test, expect } from '../fixtures'
import OrdersDataProvider from '@dataprovider/OrdersDataProvider'

test.describe('Orders API', { tag: ['@api', '@orders'] }, () => {
  test.describe.configure({ mode: 'serial' })

  test(
    'GET /api/orders returns 200 with an orders array',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.orders.getOrders()
      expect(res.status).toBe(200)
      expect(Array.isArray(res.data.orders)).toBe(true)
    }
  )

  test(
    'POST /api/orders creates an order and returns 201 with orderId',
    { tag: '@smoke' },
    async ({ apiContext }, testInfo) => {
      const listRes = await apiContext.products.getProducts()
      const firstProduct = listRes.data.products[0]
      const orderId = await new OrdersDataProvider(apiContext.orders).seedOrder(firstProduct!)
      expect(orderId).toMatch(/^ORD-\d{8}-[A-Z0-9]{4}$/)
    }
  )

  test('POST /api/orders with missing items returns 400', async ({ apiContext }) => {
    const res = await apiContext.orders.createOrder({
      id: 'ORD-TEST-MISSING',
      total: 0,
      items: [],
    })
    expect(res.status).toBe(400)
  })

  test('POST /api/orders with duplicate order id returns 409', async ({ apiContext }, testInfo) => {
    const listRes = await apiContext.products.getProducts()
    const firstProduct = listRes.data.products[0]
    testInfo.skip(!firstProduct, 'No products in DB')
    const firstOrderRes = await apiContext.orders.createOrder({
      id: 'ORD-DUPE-TEST-001',
      date: new Date().toISOString(),
      total: firstProduct!.new_price,
      items: [
        {
          id: firstProduct!.id,
          name: firstProduct!.name,
          price: firstProduct!.new_price,
          quantity: 1,
        },
      ],
    })
    if (firstOrderRes.status === 201) {
      const res = await apiContext.orders.createOrder({
        id: 'ORD-DUPE-TEST-001',
        date: new Date().toISOString(),
        total: firstProduct!.new_price,
        items: [
          {
            id: firstProduct!.id,
            name: firstProduct!.name,
            price: firstProduct!.new_price,
            quantity: 1,
          },
        ],
      })
      expect(res.status).toBe(409)
    }
  })

  test('GET /api/orders without token returns 401', async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/api/orders`)
    expect(res.status()).toBe(401)
  })

  test('POST /api/orders without token returns 401', async ({ request }) => {
    const res = await request.post(`${process.env.API_URL}/api/orders`, {
      data: { id: 'ORD-NO-AUTH', total: 10, items: [] },
    })
    expect(res.status()).toBe(401)
  })
})
