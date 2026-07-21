import BasePage from '@pages/BasePage'
import type CartPage from '@pages/cart/CartPage'

export default class ProductPage extends BasePage {
  public async init(): Promise<this> {
    // Navigate to a known stable product (ID 1) to set up cart state
    await this.page.goto(`${process.env.BASE_URL}/product/1`)
    await this.page.getByRole('button', { name: 'Add to Cart' }).waitFor({ state: 'visible' })
    return this
  }

  public async selectSize(size: string): Promise<this> {
    // Size options are <div> elements on product page — use getByText, not getByRole('button')
    await this.page.getByText(size, { exact: true }).click()
    return this
  }

  public async clickAddToCart(): Promise<this> {
    await this.page.getByRole('button', { name: 'Add to Cart' }).click()
    await this.page
      .getByRole('button', { name: /In Cart.*View Cart/ })
      .waitFor({ state: 'visible' })
    return this
  }

  public async clickViewCart(): Promise<CartPage> {
    await this.page.getByRole('button', { name: /In Cart.*View Cart/ }).click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }

  public async clickAddToWishlist(): Promise<this> {
    // Use class-based locator — the empty heart label changes to filled heart when already wishlisted (auth storage persists wishlist)
    const alreadyWishlisted = await this.page
      .locator('button.item-wishlist-btn.wishlisted')
      .isVisible()
    if (!alreadyWishlisted) {
      await this.page.locator('button.item-wishlist-btn').click()
      await this.page.locator('button.item-wishlist-btn.wishlisted').waitFor({ state: 'visible' })
    }
    return this
  }

  public async isWishlisted(): Promise<boolean> {
    return this.page.locator('button.item-wishlist-btn.wishlisted').isVisible()
  }
}
