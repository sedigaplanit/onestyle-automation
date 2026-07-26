import { test, expect } from '../fixtures'
import LandingPage from '@pages/landing/LandingPage'
import WishlistDataProvider from '@dataprovider/WishlistDataProvider'

test.describe('Wishlist Tests', { tag: ['@ui', '@wishlist'] }, () => {
  test(
    'Navbar wishlist icon navigates to Wishlist page',
    { tag: '@smoke' },
    async ({ open, page }) => {
      // test.slow(): app hosted on GitHub Pages — cold-start latency can exceed the 30s default
      test.slow()
      const wishlistPage = await open(LandingPage).then((_) => _.clickNavWishlistLink())
      expect(page.url()).toContain('/wishlist')
      expect(await wishlistPage.isPageVisible()).toBe(true)
    }
  )

  test('Wishlist page displays all wishlisted items with correct subtitle count', async ({
    open,
    apiContext,
  }) => {
    // test.slow(): app hosted on GitHub Pages — cold-start latency can exceed the 30s default
    test.slow()
    // Seed via UI click: BUG_CHECKOUT_003 — app reads wishlist from localStorage (not API) on load,
    // so API-seeded items are invisible until a UI interaction updates the React context.
    const wishlistPage = await open(LandingPage)
      .then((_) => _.clickFirstProductWishlistButton())
      .then((_) => _.clickNavWishlistLink())

    // AC5: "My Wishlist" heading confirms the non-empty state
    expect(await wishlistPage.isWishlistEmpty()).toBe(false)
    // AC5: subtitle shows correct item count
    expect(await wishlistPage.getItemCount()).toBe(1)
    // AC5: exactly one product card rendered
    expect(await wishlistPage.getWishlistCardCount()).toBe(1)
    // AC5: product card shows image, name, and both prices
    expect(await wishlistPage.isFirstCardImageVisible()).toBe(true)
    expect(await wishlistPage.getFirstCardProductName()).toBeTruthy()
    expect(await wishlistPage.getFirstCardPriceCount()).toBeGreaterThanOrEqual(2)
  })

  test.afterEach(async ({ apiContext }) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  })
})
