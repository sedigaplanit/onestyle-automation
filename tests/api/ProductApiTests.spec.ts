import { test, expect } from '../fixtures'

test.describe('Products API', { tag: ['@api', '@products'] }, () => {
  test.describe.configure({ mode: 'serial' })

  test(
    'GET /api/products returns 200 with a non-empty products array',
    { tag: '@smoke' },
    async ({ apiContext }, testInfo) => {
      const res = await apiContext.products.getProducts()
      expect(res.status).toBe(200)
      expect(Array.isArray(res.data.products)).toBe(true)
      testInfo.skip(
        res.data.products.length === 0,
        'No products in DB — seed the products table before running this test'
      )
      expect(res.data.products.length).toBeGreaterThan(0)
    }
  )

  test('GET /api/products?category=women returns only women products', async ({ apiContext }) => {
    const res = await apiContext.products.getProducts({ category: 'women' })
    expect(res.status).toBe(200)
    expect(res.data.products.every((p) => p.category === 'women')).toBe(true)
  })

  test('GET /api/products?category=men returns only men products', async ({ apiContext }) => {
    const res = await apiContext.products.getProducts({ category: 'men' })
    expect(res.status).toBe(200)
    expect(res.data.products.every((p) => p.category === 'men')).toBe(true)
  })

  test('GET /api/products?category=kid returns only kid products', async ({ apiContext }) => {
    const res = await apiContext.products.getProducts({ category: 'kid' })
    expect(res.status).toBe(200)
    expect(res.data.products.every((p) => p.category === 'kid')).toBe(true)
  })

  test('GET /api/products?sort=price-asc returns products in ascending price order', async ({
    apiContext,
  }) => {
    const res = await apiContext.products.getProducts({ sort: 'price-asc' })
    expect(res.status).toBe(200)
    const prices = res.data.products.map((p) => p.new_price)
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  test('GET /api/products?search returns matching products', async ({ apiContext }) => {
    const res = await apiContext.products.getProducts({ search: 'shirt' })
    expect(res.status).toBe(200)
    expect(Array.isArray(res.data.products)).toBe(true)
  })

  test('GET /api/products/new-collections returns products flagged as new', async ({
    apiContext,
  }) => {
    const res = await apiContext.products.getNewCollections()
    expect(res.status).toBe(200)
    expect(Array.isArray(res.data.products)).toBe(true)
    expect(res.data.products.every((p) => p.is_new_collection === true)).toBe(true)
  })

  test('GET /api/products/popular returns products flagged as popular', async ({ apiContext }) => {
    const res = await apiContext.products.getPopular()
    expect(res.status).toBe(200)
    expect(Array.isArray(res.data.products)).toBe(true)
    expect(res.data.products.every((p) => p.is_popular === true)).toBe(true)
  })

  test('GET /api/products/:id returns the correct product', async ({ apiContext }, testInfo) => {
    const listRes = await apiContext.products.getProducts()
    const firstProduct = listRes.data.products[0]
    testInfo.skip(!firstProduct, 'No products in DB')
    const res = await apiContext.products.getById(firstProduct!.id)
    expect(res.status).toBe(200)
    expect(res.data.product.id).toBe(firstProduct!.id)
  })

  test('GET /api/products/:id with non-existent id returns 404', async ({ apiContext }) => {
    const res = await apiContext.products.getById(999999)
    expect(res.status).toBe(404)
  })

  test('GET /api/products/:id/reviews returns reviews and aggregate data', async ({
    apiContext,
  }, testInfo) => {
    const listRes = await apiContext.products.getProducts()
    const firstProduct = listRes.data.products[0]
    testInfo.skip(!firstProduct, 'No products in DB')
    const res = await apiContext.products.getReviews(firstProduct!.id)
    expect(res.status).toBe(200)
    expect(res.data).toMatchObject({
      reviews: expect.any(Array),
      average_rating: expect.any(Number),
      total_reviews: expect.any(Number),
    })
  })
})
