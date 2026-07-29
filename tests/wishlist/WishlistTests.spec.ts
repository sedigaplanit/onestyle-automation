import { test, expect } from '../fixtures'
import LandingPage from '@pages/landing/LandingPage'
import WishlistDataProvider from '@dataprovider/WishlistDataProvider'

test.describe('Wishlist Tests', { tag: ['@ui', '@wishlist'] }, () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ apiContext }) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  })

  test(
    'Add product to wishlist from product card — heart icon toggles and navbar badge increments',
    { tag: '@smoke' },
    async ({ open }) => {
      // test.slow(): app hosted on GitHub Pages — cold-start latency can exceed the 30s default
      test.slow()
      const landingPage = await open(LandingPage)

      // TC_WISHLIST_001 pre-condition: heart is unfilled, badge is absent
      expect(await landingPage.isFirstProductWishlisted()).toBe(false)
      expect(await landingPage.getWishlistBadgeCount()).toBe(0)

      // AC1: click the heart icon on the first product card
      await landingPage.clickFirstProductWishlistButton()

      // AC1: heart should now be filled (clickFirstProductWishlistButton waits for .wishlisted)
      expect(await landingPage.isFirstProductWishlisted()).toBe(true)
      // AC1/AC3: navbar badge should increment to 1 — poll: badge is a separate React render
      await expect
        .poll(async () => landingPage.getWishlistBadgeCount(), {
          timeout: 5_000,
          intervals: [500],
          message: 'Waiting for navbar wishlist badge to increment to 1',
        })
        .toBe(1)
    }
  )

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
    // Seed via UI click: the wishlist page re-fetches from API on mount (see BUG_CHECKOUT_003
    // status update — fix was applied). The POST from the heart click races with the page's GET.
    // We use expect.poll() on the wishlist-page assertions to wait for the API data to arrive.
    const wishlistPage = await open(LandingPage)
      .then((_) => _.clickFirstProductWishlistButton())
      .then((_) => _.clickNavWishlistLink())

    // AC5: "My Wishlist" heading — poll because wishlist page fetches from API on mount
    await expect
      .poll(async () => wishlistPage.isWishlistEmpty(), {
        timeout: 15_000,
        intervals: [500],
        message: 'Waiting for wishlist page to show the API-fetched item',
      })
      .toBe(false)
    // AC5: subtitle shows correct item count
    await expect
      .poll(async () => wishlistPage.getItemCount(), {
        timeout: 10_000,
        intervals: [500],
        message: 'Waiting for wishlist subtitle to reflect 1 item',
      })
      .toBe(1)
    // AC5: exactly one product card rendered
    await expect
      .poll(async () => wishlistPage.getWishlistCardCount(), {
        timeout: 10_000,
        intervals: [500],
        message: 'Waiting for one wishlist card to be rendered',
      })
      .toBe(1)
    // AC5: product card shows image, name, and both prices (these are synchronous once cards load)
    expect(await wishlistPage.isFirstCardImageVisible()).toBe(true)
    expect(await wishlistPage.getFirstCardProductName()).toBeTruthy()
    expect(await wishlistPage.getFirstCardPriceCount()).toBeGreaterThanOrEqual(2)
  })

  test.afterEach(async ({ apiContext }) => {
    await new WishlistDataProvider(apiContext.wishlist).clearWishlist()
  })
})
