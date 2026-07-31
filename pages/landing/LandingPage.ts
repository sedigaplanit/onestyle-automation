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
    // Start listening for the wishlist POST before clicking — avoids a race where the
    // response arrives before waitForResponse() is registered
    const wishlistResponsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/wishlist/') && response.request().method() === 'POST',
      { timeout: 10_000 }
    )
    await this.page.locator('.item-wishlist-btn').first().click()
    // Wait for the server to confirm the wishlist write before any further navigation
    await wishlistResponsePromise
    // Wait for the heart to flip to filled — UI feedback that the write was acknowledged
    await this.page
      .locator('button.item-wishlist-btn.wishlisted')
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 })
    return this
  }

  public async isFirstProductWishlisted(): Promise<boolean> {
    return this.page.locator('button.item-wishlist-btn.wishlisted').first().isVisible()
  }
}
