import BasePage from '@pages/BasePage'

export default class CategoryPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.goto(`${process.env.BASE_URL}/womens`)
    // Wait for product cards to load
    await this.page.locator('button.item-wishlist-btn').first().waitFor({ state: 'visible' })
    return this
  }

  public async wishlistFirstProduct(): Promise<this> {
    // Wishlist buttons (class: item-wishlist-btn) only exist on category/listing pages,
    // not on the product detail page
    const alreadyWishlisted = await this.page
      .locator('button.item-wishlist-btn.wishlisted')
      .first()
      .isVisible()
    if (!alreadyWishlisted) {
      await this.page.locator('button.item-wishlist-btn').first().click()
      await this.page
        .locator('button.item-wishlist-btn.wishlisted')
        .first()
        .waitFor({ state: 'visible' })
    }
    return this
  }

  public async isFirstProductWishlisted(): Promise<boolean> {
    return this.page.locator('button.item-wishlist-btn.wishlisted').first().isVisible()
  }
}
