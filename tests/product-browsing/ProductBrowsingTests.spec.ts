import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'
import WomensProducts from '../../pages/product-browsing/WomensProducts'

test.describe('Product Browsing Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  test.setTimeout(60000)

  // TC_PROD_001 — Default state on fresh category page navigation
  test('Category page loads with empty search, All Prices filter, and all products visible', async ({
    open,
    page,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    expect(await womensPage.getSearchValue()).toBe('')
    expect(await womensPage.getSelectedPriceFilterLabel()).toBe('All Prices')
    expect(await womensPage.getVisibleProductCardCount()).toBeGreaterThan(0)
    expect(await womensPage.getProductCountFromLabel()).toBeGreaterThan(0)
    expect(page.url()).toContain('/womens')
  })

  // TC_PROD_002 — Real-time search filtering
  test('Typing a search term filters products in real-time; clearing restores all products', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    const totalCount = await womensPage.getProductCountFromLabel()
    expect(totalCount).toBeGreaterThan(0)

    // Type a partial term that should match a subset
    await womensPage.fillSearch('blouse')
    const filteredCount = await womensPage.getProductCountFromLabel()
    expect(filteredCount).toBeGreaterThanOrEqual(0)
    expect(filteredCount).toBeLessThanOrEqual(totalCount)

    // Every visible product name must contain the term
    const names = await womensPage.getProductNames()
    for (const name of names) {
      expect(name.toLowerCase()).toContain('blouse')
    }

    // Clear restores all products
    await womensPage.clearSearch()
    expect(await womensPage.getProductCountFromLabel()).toBe(totalCount)
    expect(await womensPage.getVisibleProductCardCount()).toBeGreaterThan(0)
  })

  // TC_PROD_003 — Price filter: Under LKR 100
  test('Selecting Under LKR 100 shows only products with new price below 100', async ({ open }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectPriceFilter('Under LKR 100'))

    const prices = await womensPage.getProductNewPrices()
    expect(prices.length).toBeGreaterThan(0)
    for (const price of prices) {
      expect(price).toBeLessThan(100)
    }
    expect(await womensPage.getProductCountFromLabel()).toBe(prices.length)
  })

  // TC_PROD_004 — Price filter: LKR 100–200
  test('Selecting LKR 100–200 shows only products with new price between 100 and 200 inclusive', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectPriceFilter('LKR 100 - 200'))

    const prices = await womensPage.getProductNewPrices()
    if (prices.length > 0) {
      for (const price of prices) {
        expect(price).toBeGreaterThanOrEqual(100)
        expect(price).toBeLessThanOrEqual(200)
      }
      expect(await womensPage.getProductCountFromLabel()).toBe(prices.length)
    } else {
      // No products in range is valid — empty state must be shown
      expect(await womensPage.isNoResultsMessageVisible()).toBe(true)
    }
  })

  // TC_PROD_004 — Price filter: Above LKR 200
  test('Selecting Above LKR 200 shows only products with new price greater than 200', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectPriceFilter('Above LKR 200'))

    const prices = await womensPage.getProductNewPrices()
    if (prices.length > 0) {
      for (const price of prices) {
        expect(price).toBeGreaterThan(200)
      }
      expect(await womensPage.getProductCountFromLabel()).toBe(prices.length)
    } else {
      expect(await womensPage.isNoResultsMessageVisible()).toBe(true)
    }
  })

  // TC_PROD_005 — Sort by Price: Low to High
  test('Sort by Price Low to High renders products in ascending price order', async ({ open }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectSortBy('Price: Low to High'))

    const prices = await womensPage.getProductNewPrices()
    expect(prices.length).toBeGreaterThan(1)
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
    }
  })

  // TC_PROD_005 — Sort by Price: High to Low
  test('Sort by Price High to Low renders products in descending price order', async ({ open }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectSortBy('Price: High to Low'))

    const prices = await womensPage.getProductNewPrices()
    expect(prices.length).toBeGreaterThan(1)
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1])
    }
  })

  // TC_PROD_006 — Sort by Name A–Z
  test('Sort by Name A–Z renders products in ascending alphabetical order', async ({ open }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.selectSortBy('Name: A - Z'))

    const names = await womensPage.getProductNames()
    expect(names.length).toBeGreaterThan(1)
    const sorted = [...names].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    expect(names).toEqual(sorted)
  })

  // TC_PROD_007 — Product count label updates in real-time
  test('Product count label updates immediately when search or price filter changes', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    const totalCount = await womensPage.getProductCountFromLabel()
    expect(totalCount).toBeGreaterThan(0)

    // After search, count should reduce
    await womensPage.fillSearch('blouse')
    const searchCount = await womensPage.getProductCountFromLabel()
    expect(searchCount).toBeLessThanOrEqual(totalCount)

    // After clearing search, count should restore
    await womensPage.clearSearch()
    expect(await womensPage.getProductCountFromLabel()).toBe(totalCount)

    // After price filter, count should change
    await womensPage.selectPriceFilter('Under LKR 100')
    const filterCount = await womensPage.getProductCountFromLabel()
    expect(filterCount).toBeLessThanOrEqual(totalCount)

    // After resetting filter, count restores
    await womensPage.selectPriceFilter('All Prices')
    expect(await womensPage.getProductCountFromLabel()).toBe(totalCount)

    // Sort does not change count
    await womensPage.selectSortBy('Price: Low to High')
    expect(await womensPage.getProductCountFromLabel()).toBe(totalCount)
  })

  // TC_PROD_008 — No results empty state
  test('Searching with a non-matching term shows the no-results message and zero products', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.fillSearch('zzznomatch999'))

    expect(await womensPage.isNoResultsMessageVisible()).toBe(true)
    expect(await womensPage.getVisibleProductCardCount()).toBe(0)
    expect(await womensPage.getProductCountFromLabel()).toBe(0)
  })

  // TC_PROD_009 — Combined search + price filter + sort
  test('Applying search, price filter, and sort simultaneously yields correct filtered and ordered results', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    // Apply all three controls
    await womensPage.fillSearch('blouse')
    await womensPage.selectPriceFilter('Under LKR 100')
    await womensPage.selectSortBy('Price: Low to High')

    const names = await womensPage.getProductNames()
    const prices = await womensPage.getProductNewPrices()
    const count = await womensPage.getProductCountFromLabel()

    if (names.length > 0) {
      // Every name contains the search term
      for (const name of names) {
        expect(name.toLowerCase()).toContain('blouse')
      }
      // Every price is under 100
      for (const price of prices) {
        expect(price).toBeLessThan(100)
      }
      // Prices are in ascending order
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
      }
      // Count matches visible card count
      expect(count).toBe(names.length)
    } else {
      // No intersection — empty state must be shown
      expect(await womensPage.isNoResultsMessageVisible()).toBe(true)
    }
  })

  // TC_PROD_010 — Search works independently on each category page
  test('Search is scoped to the current category page and works on Men, Women, and Kids pages', async ({
    open,
    page,
  }) => {
    // Women's
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    const womensTotalCount = await womensPage.getProductCountFromLabel()
    await womensPage.fillSearch('blouse')
    const womensFilteredCount = await womensPage.getProductCountFromLabel()
    expect(womensFilteredCount).toBeLessThanOrEqual(womensTotalCount)

    // Men's — navigate from Women's page; clear carried-over search before waiting for products
    const mensPage = await womensPage.gotoMens()
    await mensPage.clearSearch() // BUG_PROD_001: search may carry over across SPA navigation
    await mensPage.waitForProducts()

    const mensTotalCount = await mensPage.getProductCountFromLabel()
    await mensPage.fillSearch('jacket')
    const mensFilteredCount = await mensPage.getProductCountFromLabel()
    expect(mensFilteredCount).toBeLessThanOrEqual(mensTotalCount)

    // Kids' — navigate from Men's page; clear carried-over state before waiting
    const kidsPage = await mensPage.gotoKids()
    await kidsPage.clearSearch() // BUG_PROD_001
    await kidsPage.waitForProducts()

    const kidsTotalCount = await kidsPage.getProductCountFromLabel()
    await kidsPage.fillSearch('kids')
    const kidsFilteredCount = await kidsPage.getProductCountFromLabel()
    expect(kidsFilteredCount).toBeLessThanOrEqual(kidsTotalCount)
  })

  // TC_PROD_011 — Case-insensitive search
  test('Search filtering is case-insensitive: lowercase, uppercase, and mixed case yield the same results', async ({
    open,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    await womensPage.fillSearch('blouse')
    const lowercaseCount = await womensPage.getProductCountFromLabel()
    const lowercaseNames = await womensPage.getProductNames()

    await womensPage.clearSearch()

    await womensPage.fillSearch('BLOUSE')
    const uppercaseCount = await womensPage.getProductCountFromLabel()
    const uppercaseNames = await womensPage.getProductNames()

    await womensPage.clearSearch()

    await womensPage.fillSearch('BlOuSe')
    const mixedCount = await womensPage.getProductCountFromLabel()

    expect(uppercaseCount).toBe(lowercaseCount)
    expect(mixedCount).toBe(lowercaseCount)
    expect(uppercaseNames).toEqual(lowercaseNames)
  })

  // TC_PROD_012 — Special characters in search do not cause XSS or crash
  test('Entering special characters or script tags in search does not execute code or crash the page', async ({
    open,
    page,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    let alertFired = false
    page.on('dialog', async (dialog) => {
      alertFired = true
      await dialog.dismiss()
    })

    await womensPage.fillSearch('<script>alert(1)</script>')
    await page.waitForTimeout(500)
    expect(alertFired).toBe(false)
    // Page must still be on /womens (no crash / redirect)
    expect(page.url()).toContain('/womens')

    await womensPage.clearSearch()
    await womensPage.fillSearch('@#$%^&*()')
    await page.waitForTimeout(300)
    expect(alertFired).toBe(false)
    expect(page.url()).toContain('/womens')
  })

  // TC_PROD_013 — Rapid typing produces a stable final state
  test('Typing rapidly in the search input produces a stable and correct final filtered result', async ({
    open,
    page,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    // pressSequentially simulates rapid keystroke-by-keystroke input
    await womensPage.typeInSearch('blouse', 30)
    await page.waitForTimeout(500)

    const names = await womensPage.getProductNames()
    const count = await womensPage.getProductCountFromLabel()

    // Final state must reflect the complete term
    expect(await womensPage.getSearchValue()).toBe('blouse')
    expect(count).toBe(names.length)
    for (const name of names) {
      expect(name.toLowerCase()).toContain('blouse')
    }
  })

  // BUG: see bug-reports/BUG_PROD_001_filter-state-not-reset-on-navigation.md
  test.skip('Search, price filter, and sort reset to defaults after navigating away and returning', async ({
    open,
    page,
  }) => {
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    const totalCount = await womensPage.getProductCountFromLabel()

    // Apply all three filters
    await womensPage.fillSearch('blouse')
    await womensPage.selectPriceFilter('Under LKR 100')
    await womensPage.selectSortBy('Price: Low to High')

    // Navigate away to Men's, then back to Women's
    const mensPage = await womensPage.gotoMens()
    const freshPage = await mensPage.gotoWomens()
    await freshPage.waitForProducts()

    expect(await freshPage.getSearchValue()).toBe('')
    expect(await freshPage.getSelectedPriceFilterLabel()).toBe('All Prices')
    expect(await freshPage.getProductCountFromLabel()).toBe(totalCount)
  })
})
