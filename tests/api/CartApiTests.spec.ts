import { test, expect } from '../fixtures'
import CartDataProvider from '@dataprovider/CartDataProvider'
import type { Product } from '@api/products/ProductApiClient'

test.describe('Cart API', { tag: ['@api', '@cart'] }, () => {
  test.describe.configure({ mode: 'serial' })

  let firstProduct: Product | undefined

  test.beforeEach(async ({ apiContext }) => {
    await new CartDataProvider(apiContext.cart).clearCart()
    const res = await apiContext.products.getProducts()
    firstProduct = res.data.products[0]
  })

  test.afterEach(async ({ apiContext }) => {
    await new CartDataProvider(apiContext.cart).clearCart()
  })

  test(
    'GET /api/cart returns 200 with cartItems map',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.cart.getCart()
      expect(res.status).toBe(200)
      expect(res.data).toHaveProperty('cartItems')
      expect(typeof res.data.cartItems).toBe('object')
    }
  )

  test(
    'PUT /api/cart saves items and returns 200',
    { tag: '@smoke' },
    async ({ apiContext }, testInfo) => {
      testInfo.skip(!firstProduct, 'No products in DB')
      const res = await apiContext.cart.saveCart({ [String(firstProduct!.id)]: 2 })
      expect(res.status).toBe(200)
      expect(res.data.message).toBeTruthy()
    }
  )

  test('GET /api/cart after PUT reflects saved items', async ({ apiContext }, testInfo) => {
    testInfo.skip(!firstProduct, 'No products in DB')
    const productId = String(firstProduct!.id)
    await apiContext.cart.saveCart({ [productId]: 2 })
    const res = await apiContext.cart.getCart()
    expect(res.status).toBe(200)
    expect(res.data.cartItems[productId]).toBe(2)
  })

  test('DELETE /api/cart clears the cart and returns 200', async ({ apiContext }, testInfo) => {
    testInfo.skip(!firstProduct, 'No products in DB')
    await apiContext.cart.saveCart({ [String(firstProduct!.id)]: 1 })
    const res = await apiContext.cart.clearCart()
    expect(res.status).toBe(200)
  })

  test('GET /api/cart after DELETE returns empty cartItems', async ({ apiContext }, testInfo) => {
    testInfo.skip(!firstProduct, 'No products in DB')
    await apiContext.cart.saveCart({ [String(firstProduct!.id)]: 1 })
    await apiContext.cart.clearCart()
    const res = await apiContext.cart.getCart()
    expect(res.status).toBe(200)
    expect(Object.keys(res.data.cartItems)).toHaveLength(0)
  })

  test('GET /api/cart without token returns 401', async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/api/cart`)
    expect(res.status()).toBe(401)
  })

  test('PUT /api/cart without token returns 401', async ({ request }) => {
    const res = await request.put(`${process.env.API_URL}/api/cart`, {
      data: { cartItems: { '1': 1 } },
    })
    expect(res.status()).toBe(401)
  })
})
