import BasePage from '@pages/BasePage'

export default class WishlistPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.goto(`${process.env.BASE_URL}/wishlist`)
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

  public async isWishlistEmpty(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Your wishlist is empty' }).isVisible()
  }

  public async getItemCount(): Promise<number> {
    const text = await this.page.locator('.wishlist-subtitle').textContent()
    const match = text?.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }
}
