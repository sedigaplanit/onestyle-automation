import { test, expect } from '../fixtures'
import WishlistDataProvider from '@dataprovider/WishlistDataProvider'
import type { Product } from '@api/products/ProductApiClient'

test.describe('Wishlist API', { tag: ['@api', '@wishlist'] }, () => {
  test.describe.configure({ mode: 'serial' })

  let firstProduct: Product

  test.beforeEach(async ({ apiContext }, testInfo) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
    const res = await apiContext.products.getProducts()
    testInfo.skip(!res.data.products.length, 'No products in DB')
    firstProduct = res.data.products[0]
  })

  test.afterEach(async ({ apiContext }) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  })

  test(
    'GET /api/wishlist returns 200 with a wishlist array',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.wishlist.getWishlist()
      expect(res.status).toBe(200)
      expect(Array.isArray(res.data.wishlist)).toBe(true)
    }
  )

  test(
    'POST /api/wishlist/:productId adds a product and returns 200',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.wishlist.addToWishlist(firstProduct.id)
      expect(res.status).toBe(200)
    }
  )

  test('GET /api/wishlist after add reflects the new item', async ({ apiContext }) => {
    await apiContext.wishlist.addToWishlist(firstProduct.id)
    const res = await apiContext.wishlist.getWishlist()
    expect(res.data.wishlist.some((item) => item.product_id === firstProduct.id)).toBe(true)
  })

  test('POST /api/wishlist/:productId is idempotent � adding twice returns 200', async ({
    apiContext,
  }) => {
    await apiContext.wishlist.addToWishlist(firstProduct.id)
    const res = await apiContext.wishlist.addToWishlist(firstProduct.id)
    expect(res.status).toBe(200)
  })

  test('DELETE /api/wishlist/:productId removes the product and returns 200', async ({
    apiContext,
  }) => {
    await apiContext.wishlist.addToWishlist(firstProduct.id)
    const res = await apiContext.wishlist.removeFromWishlist(firstProduct.id)
    expect(res.status).toBe(200)
  })

  test('DELETE /api/wishlist/:productId for an item not in wishlist returns 404', async ({
    apiContext,
  }) => {
    const res = await apiContext.wishlist.removeFromWishlist(999999)
    expect(res.status).toBe(404)
  })

  test('DELETE /api/wishlist clears the entire wishlist and returns 200', async ({
    apiContext,
  }) => {
    await apiContext.wishlist.addToWishlist(firstProduct.id)
    const res = await apiContext.wishlist.clearWishlist()
    expect(res.status).toBe(200)
  })

  test('GET /api/wishlist without token returns 401', async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/api/wishlist`)
    expect(res.status()).toBe(401)
  })
})
