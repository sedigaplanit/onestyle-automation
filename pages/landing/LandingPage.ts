import BasePage from '@pages/BasePage'
import type LoginPage from '@pages/login/LoginPage'
import type SignUpPage from '@pages/sign-up/SignUpPage'
import MensProducts from '@pages/product-browsing/MensProducts'
import WomensProducts from '@pages/product-browsing/WomensProducts'
import KidsProducts from '@pages/product-browsing/KidsProducts'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    if (this.page.url() === 'about:blank') {
      await this.page.goto('')
    }
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    await this.page
      .getByRole('button', { name: 'My Orders' })
      .waitFor({ state: 'visible', timeout: 10000 })
    return true
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async navigateToMensSection(): Promise<MensProducts> {
    await this.page.getByRole('link', { name: 'Men', exact: true }).click()
    return new MensProducts(this.page).init()
  }

  public async navigateToWomensSection(): Promise<WomensProducts> {
    await this.page.getByRole('link', { name: 'Women', exact: true }).click()
    return new WomensProducts(this.page).init()
  }

  public async navigateToKidsSection(): Promise<KidsProducts> {
    await this.page.getByRole('link', { name: 'Kids', exact: true }).click()
    return new KidsProducts(this.page).init()
  }

  public async clickLoginButton(): Promise<LoginPage> {
    await this.page.getByRole('button', { name: 'Login' }).click()
    const { default: LoginPageClass } = await import('@pages/login/LoginPage')
    console.log('button clicked')
    return new LoginPageClass(this.page).init()
  }

  public async clickSignUpHeroButton(): Promise<SignUpPage> {
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    const { default: SignUpPageClass } = await import('@pages/sign-up/SignUpPage')
    console.log('button clicked')
    return new SignUpPageClass(this.page).init()
  }

  public async waitForProductCards(): Promise<this> {
    await this.page.locator('.item').first().waitFor({ state: 'visible', timeout: 10000 })
    return this
  }

  public async toggleWishlistByIndex(index: number): Promise<this> {
    await this.page.locator('.item-wishlist-btn').nth(index).click()
    return this
  }

  public async isProductWishlisted(index: number): Promise<boolean> {
    const cls = await this.page.locator('.item-wishlist-btn').nth(index).getAttribute('class')
    const classes = (cls ?? '')
      .trim()
      .split(/\s+/)
      .filter((c) => c.length > 0)
    // Active state appends an extra modifier class beyond the base 'item-wishlist-btn'
    return classes.some((c) => c !== 'item-wishlist-btn')
  }

  public async getProductNameByIndex(index: number): Promise<string> {
    const text = await this.page.locator('.item').nth(index).locator('p').first().textContent()
    return text?.trim() ?? ''
  }

  public async getWishlistBadgeCount(): Promise<number> {
    const badge = this.page.locator('.nav-wishlist-count')
    if ((await badge.count()) > 0) {
      const text = await badge.textContent()
      return text ? parseInt(text.trim(), 10) : 0
    }
    return 0
  }

  public async getWishlistCountFromStorage(): Promise<number> {
    return this.page.evaluate(() => {
      const candidates = ['wishlistItems', 'wishlist', 'wishlist_items', 'wishlisted']
      for (const key of candidates) {
        const raw = localStorage.getItem(key)
        if (raw) {
          try {
            const val = JSON.parse(raw)
            if (Array.isArray(val)) return val.length
            if (typeof val === 'object' && val !== null) return Object.keys(val).length
          } catch {
            /* continue */
          }
        }
      }
      for (const key of Object.keys(localStorage)) {
        if (key.toLowerCase().includes('wish')) {
          try {
            const val = JSON.parse(localStorage.getItem(key) ?? '[]')
            if (Array.isArray(val)) return val.length
          } catch {
            /* continue */
          }
        }
      }
      return 0
    })
  }

  public async clickNavWishlistIcon(): Promise<import('@pages/wishlist/WishlistPage').default> {
    await this.page.locator('.nav-wishlist-link').click()
    const { default: WishlistPageClass } = await import('@pages/wishlist/WishlistPage')
    return new WishlistPageClass(this.page).init()
  }
}
