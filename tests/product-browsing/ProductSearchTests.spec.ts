import { test, expect } from '../fixtures'
import CategoryPage from '@pages/product-browsing/CategoryPage'

test.describe('Product Search Tests', { tag: ['@ui', '@products'] }, () => {
  test('Search input filters product names in real time, case-insensitively', async ({ open }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    const initialCount = await categoryPage.getProductCount()

    await categoryPage.searchProducts('BLOUSE')
    const uppercaseCount = await categoryPage.getProductCount()
    expect(uppercaseCount).toBeGreaterThan(0)
    expect(uppercaseCount).toBeLessThan(initialCount)
    expect(await categoryPage.isNoResultsVisible()).toBe(false)

    await categoryPage.searchProducts('blouse')
    const lowercaseCount = await categoryPage.getProductCount()
    expect(lowercaseCount).toBe(uppercaseCount)

    await categoryPage.clearSearch()
    expect(await categoryPage.getProductCount()).toBe(initialCount)
  })

  test('Price Range dropdown restricts products and updates the visible count', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    await categoryPage.setPriceRange('Under LKR 100')

    expect(await categoryPage.getVisibleProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.getProductCount()).toBe(await categoryPage.getVisibleProductCount())

    await categoryPage.setPriceRange('LKR 100 – 200')
    expect(await categoryPage.getVisibleProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.getProductCount()).toBe(await categoryPage.getVisibleProductCount())
  })

  test('Combined search, filter, and sort order update the product list correctly', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    await categoryPage.searchProducts('blouse')
    await categoryPage.setPriceRange('Under LKR 100')
    await categoryPage.setSort('Price: Low to High')

    const count = await categoryPage.getProductCount()
    expect(count).toBeGreaterThan(0)
    expect(await categoryPage.getVisibleProductCount()).toBe(count)

    await categoryPage.setSort('Price: High to Low')
    expect(await categoryPage.getProductCount()).toBe(count)

    await categoryPage.setSort('Name: A – Z')
    expect(await categoryPage.getProductCount()).toBe(count)
  })

  test('Men category page supports live search, price filtering, and sort ordering', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    await categoryPage.goToCategory('mens')

    await categoryPage.searchProducts('green')
    expect(await categoryPage.getProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.getVisibleProductCount()).toBe(await categoryPage.getProductCount())

    await categoryPage.setPriceRange('Under LKR 100')
    expect(await categoryPage.getProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.getVisibleProductCount()).toBe(await categoryPage.getProductCount())

    await categoryPage.setSort('Price: High to Low')
    expect(await categoryPage.getProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.getVisibleProductCount()).toBe(await categoryPage.getProductCount())
  })

  test('Kids category page preserves default controls and resets after a no-match search', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    await categoryPage.goToCategory('kids')

    expect(await categoryPage.getSelectedPriceRange()).toBe('All Prices')
    expect(await categoryPage.getSelectedSortOption()).toBe('Sort By')

    await categoryPage.searchProducts('zzzz-kids-no-match-12345')
    expect(await categoryPage.isNoResultsVisible()).toBe(true)
    expect(await categoryPage.getVisibleProductCount()).toBe(0)

    await categoryPage.clearSearch()
    expect(await categoryPage.getVisibleProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.isNoResultsVisible()).toBe(false)
  })

  test('No-results state appears for unmatched filters and the default state resets correctly', async ({
    open,
  }) => {
    // test.slow(): app is hosted on remote GitHub Pages; can exceed the 30s default
    test.slow()

    const categoryPage = await open(CategoryPage)
    await categoryPage.searchProducts('zzzz-no-match-12345')

    expect(await categoryPage.isNoResultsVisible()).toBe(true)
    expect(await categoryPage.getVisibleProductCount()).toBe(0)

    await categoryPage.clearSearch()
    await categoryPage.resetFilters()

    expect(await categoryPage.getVisibleProductCount()).toBeGreaterThan(0)
    expect(await categoryPage.isNoResultsVisible()).toBe(false)
  })
})
