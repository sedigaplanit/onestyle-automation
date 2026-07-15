import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'
import WishlistPage from '../../pages/wishlist/WishlistPage'

test.describe('Wishlist Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  test.setTimeout(60000)

  // TC_WISH_001 — Add product to wishlist from product card
  test('Heart icon becomes active and wishlist count increments when adding a product', async ({
    open,
  }) => {
    const landingPage = await open(LandingPage).then((_) => _.waitForProductCards())

    expect(await landingPage.isProductWishlisted(0)).toBe(false)
    expect(await landingPage.getWishlistBadgeCount()).toBe(0)

    await landingPage.toggleWishlistByIndex(0)

    expect(await landingPage.isProductWishlisted(0)).toBe(true)
    expect(await landingPage.getWishlistBadgeCount()).toBe(1)
  })

  // TC_WISH_002 — Remove product from wishlist via product card
  test('Heart icon reverts and wishlist count decrements when removing a product', async ({
    open,
  }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.waitForProductCards())
      .then((_) => _.toggleWishlistByIndex(0))

    expect(await landingPage.isProductWishlisted(0)).toBe(true)
    expect(await landingPage.getWishlistBadgeCount()).toBe(1)

    await landingPage.toggleWishlistByIndex(0)

    expect(await landingPage.isProductWishlisted(0)).toBe(false)
    expect(await landingPage.getWishlistBadgeCount()).toBe(0)
  })

  // TC_WISH_003 — Wishlist badge count updates in real-time
  test('Wishlist badge count reflects real-time add and remove operations', async ({ open }) => {
    const landingPage = await open(LandingPage).then((_) => _.waitForProductCards())

    expect(await landingPage.getWishlistBadgeCount()).toBe(0)

    await landingPage.toggleWishlistByIndex(0)
    expect(await landingPage.getWishlistBadgeCount()).toBe(1)

    await landingPage.toggleWishlistByIndex(1)
    expect(await landingPage.getWishlistBadgeCount()).toBe(2)

    await landingPage.toggleWishlistByIndex(2)
    expect(await landingPage.getWishlistBadgeCount()).toBe(3)

    await landingPage.toggleWishlistByIndex(0)
    expect(await landingPage.getWishlistBadgeCount()).toBe(2)
  })

  // TC_WISH_004 — Navigate to the wishlist page via navbar icon
  test('Clicking the navbar wishlist icon navigates to /wishlist', async ({ open, page }) => {
    const wishlistPage = await open(LandingPage)
      .then((_) => _.waitForProductCards())
      .then((_) => _.clickNavWishlistIcon())

    expect(page.url()).toContain('/wishlist')
    expect(wishlistPage).toBeInstanceOf(WishlistPage)
  })

  // TC_WISH_007 — Empty wishlist state
  test('Wishlist page shows empty state UI when no items are saved', async ({ open }) => {
    const wishlistPage = await open(LandingPage).then((_) => _.clickNavWishlistIcon())

    expect(await wishlistPage.isEmpty()).toBe(true)
    expect(await wishlistPage.isEmptyHeadingVisible()).toBe(true)
    expect(await wishlistPage.isEmptyMessageVisible()).toBe(true)
  })

  // TC_WISH_007 — Start Shopping button navigates back to home
  test('Start Shopping button on empty wishlist navigates to home page', async ({ open, page }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.clickNavWishlistIcon())
      .then((_) => _.clickStartShopping())

    expect(page.url()).toMatch(/\/$|\/AI-R-D---Github-copilot\/?$/)
    expect(await landingPage.hasProductListings()).toBe(true)
  })

  // TC_WISH_008 — Wishlist persisted in localStorage after page reload
  test('Wishlisted items remain after page reload', async ({ open, page }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.waitForProductCards())
      .then((_) => _.toggleWishlistByIndex(0))
      .then((_) => _.toggleWishlistByIndex(1))

    expect(await landingPage.getWishlistCountFromStorage()).toBe(2)

    await page.reload()
    await page.locator('.item').first().waitFor({ state: 'visible', timeout: 10000 })

    expect(await landingPage.getWishlistCountFromStorage()).toBe(2)
    expect(await landingPage.isProductWishlisted(0)).toBe(true)
    expect(await landingPage.isProductWishlisted(1)).toBe(true)
  })

  // TC_WISH_010 — Rapid double-click on heart icon does not corrupt state
  test('Rapid double-click on heart icon results in stable unwishlisted state', async ({
    open,
    page,
  }) => {
    const landingPage = await open(LandingPage).then((_) => _.waitForProductCards())

    await landingPage.toggleWishlistByIndex(0)
    await landingPage.toggleWishlistByIndex(0)
    await page.waitForTimeout(500)

    expect(await landingPage.isProductWishlisted(0)).toBe(false)
    expect(await landingPage.getWishlistCountFromStorage()).toBe(0)
  })

  // TC_WISH_011 — Heart state persists after navigating between pages
  test('Heart icon fill state is preserved after navigating away and back via navbar', async ({
    open,
    page,
  }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.waitForProductCards())
      .then((_) => _.toggleWishlistByIndex(0))

    expect(await landingPage.isProductWishlisted(0)).toBe(true)

    await landingPage.navigateToWomensSection()
    await page.getByRole('link', { name: 'Shop', exact: true }).click()
    await page.locator('.item').first().waitFor({ state: 'visible', timeout: 10000 })

    expect(await landingPage.isProductWishlisted(0)).toBe(true)
    expect(await landingPage.getWishlistBadgeCount()).toBe(1)
  })

  // TC_WISH_012 — Direct URL access to /wishlist when unauthenticated
  test('Unauthenticated user can access /wishlist directly without being redirected', async ({
    open,
    page,
  }) => {
    await open(LandingPage)
    await page.goto('/wishlist')

    expect(page.url()).toContain('/wishlist')
    expect(page.url()).not.toContain('/login')
  })

  // TC_WISH_013 — Wishlist heart state is consistent across listing pages
  test('Heart state of a wishlisted product persists after navigating away and back to the same category page', async ({
    open,
  }) => {
    // Step 1: Wishlist first product on Women's page
    const womensPage = await open(LandingPage)
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())
      .then((_) => _.toggleWishlistByIndex(0))

    expect(await womensPage.isProductWishlisted(0)).toBe(true)

    // Step 2: Navigate to Men's and back to Women's (forces full React re-render)
    const womensPageReturned = await womensPage
      .navigateToMensSection()
      .then((_) => _.navigateToWomensSection())
      .then((_) => _.waitForProducts())

    // Step 3: Heart must still be filled — state is keyed by product ID, not listing position
    expect(await womensPageReturned.isProductWishlisted(0)).toBe(true)
  })
})
