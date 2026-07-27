import BasePage from '@pages/BasePage'

export default class WishlistPage extends BasePage {
  public async init(): Promise<this> {
    if (!this.page.url().includes('/wishlist')) {
      await this.page.goto(`${process.env.BASE_URL}/wishlist`)
    }
    await Promise.race([
      this.page
        .getByRole('heading', { level: 1, name: 'My Wishlist' })
        .waitFor({ state: 'visible' }),
      this.page
        .getByRole('heading', { level: 2, name: 'Your wishlist is empty' })
        .waitFor({ state: 'visible' }),
    ])
    return this
  }

  public async isPageVisible(): Promise<boolean> {
    const hasItems = await this.page
      .getByRole('heading', { level: 1, name: 'My Wishlist' })
      .isVisible()
    const isEmpty = await this.page
      .getByRole('heading', { level: 2, name: 'Your wishlist is empty' })
      .isVisible()
    return hasItems || isEmpty
  }

  public async isWishlistEmpty(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Your wishlist is empty' }).isVisible()
  }

  public async getItemCount(): Promise<number> {
    const text = await this.page.locator('.wishlist-subtitle').textContent()
    const match = text?.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  public async getWishlistCardCount(): Promise<number> {
    return this.page.locator('.wishlist-item-wrapper').count()
  }

  public async isFirstCardImageVisible(): Promise<boolean> {
    // Product images on the wishlist page have no alt text — CSS locator required
    return this.page.locator('.wishlist-grid img').first().isVisible()
  }

  public async getFirstCardProductName(): Promise<string> {
    const text = await this.page.locator('.wishlist-item-wrapper p').first().textContent()
    return text?.trim() ?? ''
  }

  public async getFirstCardPriceCount(): Promise<number> {
    // 3 [class*="price"] elements per card: container + sale price + original price
    return this.page.locator('.wishlist-grid [class*="price"]').count()
  }
}
