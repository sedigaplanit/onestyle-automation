import BasePage from '@pages/BasePage'

export default class CartPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/cart/, { timeout: 5000 })
    return this
  }

  public async isCartEmpty(): Promise<boolean> {
    const cartItems = await this.page.locator('.cartitems-format').count()
    return cartItems === 0
  }
}
