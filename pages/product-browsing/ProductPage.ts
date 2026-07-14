import BasePage from '@pages/BasePage'

export default class ProductPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/product/, { timeout: 10000 })
    return this
  }

  public async selectSize(size: string): Promise<this> {
    await this.page.locator('.size-btn').filter({ hasText: size }).first().click()
    return this
  }

  public async clickAddToCart(): Promise<this> {
    await this.page.getByRole('button', { name: 'Add to Cart' }).click()
    return this
  }

  public async navigateToCartPage() {
    await this.page.locator('img[alt="Cart Icon"]').click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }
}
