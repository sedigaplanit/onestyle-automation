import BasePage from '@pages/BasePage'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    if (this.page.url() === 'about:blank') {
      await this.page.goto('')
    }
    await this.page
      .getByRole('heading', { level: 1, name: 'Discover New Collections' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page.getByRole('button', { name: 'My Orders' }).waitFor({ state: 'visible' })
    return true
  }

  public async clickFirstProductWishlistButton(): Promise<this> {
    await this.page.getByRole('button', { name: '♡' }).first().click()
    // Wait for the heart to flip to filled — confirms the wishlist write has been applied
    await this.page
      .locator('button.item-wishlist-btn.wishlisted')
      .first()
      .waitFor({ state: 'visible' })
    return this
  }
}
