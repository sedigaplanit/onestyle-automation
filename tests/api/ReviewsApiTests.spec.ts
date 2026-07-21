import { test, expect } from '../fixtures'

test.describe('Reviews API', { tag: ['@api', '@reviews'] }, () => {
  test.describe.configure({ mode: 'serial' })

  test(
    'POST /api/reviews creates or updates a review and returns 201',
    { tag: '@smoke' },
    async ({ apiContext }, testInfo) => {
      const listRes = await apiContext.products.getProducts()
      const firstProduct = listRes.data.products[0]
      testInfo.skip(!firstProduct, 'No products in DB')
      const res = await apiContext.reviews.submitReview({
        productId: firstProduct!.id,
        rating: 4,
        comment: 'Good quality product - automation test.',
      })
      expect(res.status).toBe(201)
      expect(res.data.review.rating).toBe(4)
    },
  )

  test('POST /api/reviews with rating out of range (6) returns 400', async ({ apiContext }, testInfo) => {
    const listRes = await apiContext.products.getProducts()
    const firstProduct = listRes.data.products[0]
    testInfo.skip(!firstProduct, 'No products in DB')
    const res = await apiContext.reviews.submitReview({
      productId: firstProduct!.id,
      rating: 6,
    })
    expect(res.status).toBe(400)
  })

  test('DELETE /api/reviews/:id deletes an existing review and returns 200', async ({
    apiContext,
  }, testInfo) => {
    const listRes = await apiContext.products.getProducts()
    const firstProduct = listRes.data.products[0]
    testInfo.skip(!firstProduct, 'No products in DB')
    const submitRes = await apiContext.reviews.submitReview({
      productId: firstProduct!.id,
      rating: 3,
    })
    expect(submitRes.status).toBe(201)
    const deleteRes = await apiContext.reviews.deleteReview(submitRes.data.review.id)
    expect(deleteRes.status).toBe(200)
  })

  test('DELETE /api/reviews/:id for non-existent review returns 404', async ({ apiContext }) => {
    const res = await apiContext.reviews.deleteReview(999999)
    expect(res.status).toBe(404)
  })

  test('POST /api/reviews without token returns 401', async ({ request }) => {
    const res = await request.post(`${process.env.API_URL}/api/reviews`, {
      data: { productId: 1, rating: 3 },
    })
    expect(res.status()).toBe(401)
  })
})