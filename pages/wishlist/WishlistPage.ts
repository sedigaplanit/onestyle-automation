import BasePage from '@pages/BasePage'

export default class WishlistPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/wishlist/, { timeout: 5000 })
    return this
  }

  public async isEmpty(): Promise<boolean> {
    return this.page.locator('.wishlist-empty').isVisible()
  }

  public async isEmptyHeadingVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Your wishlist is empty' }).isVisible()
  }

  public async isEmptyMessageVisible(): Promise<boolean> {
    return this.page
      .getByText('Save items you love by clicking the heart on any product.')
      .isVisible()
  }

  public async clickStartShopping(): Promise<import('@pages/landing/LandingPage').default> {
    await this.page.locator('.wishlist-shop-btn').click()
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }

  public async getProductCardCount(): Promise<number> {
    return this.page.locator('.item').count()
  }

  public async getSubtitleText(): Promise<string> {
    const el = this.page
      .locator('[class*="wishlist-saved"], [class*="wishlist-count"], [class*="wishlist-subtitle"]')
      .first()
    if ((await el.count()) === 0) return ''
    return (await el.textContent())?.trim() ?? ''
  }

  public async getFirstProductName(): Promise<string> {
    const text = await this.page.locator('.item').first().locator('p').first().textContent()
    return text?.trim() ?? ''
  }

  public async clickFirstProductCard(): Promise<
    import('@pages/product-browsing/ProductPage').default
  > {
    await this.page.locator('.item').first().locator('a').first().click()
    const { default: ProductPageClass } = await import('@pages/product-browsing/ProductPage')
    return new ProductPageClass(this.page).init()
  }
}
