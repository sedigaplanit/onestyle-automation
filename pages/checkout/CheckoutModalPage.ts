import BasePage from '@pages/BasePage'
import type CartPage from '@pages/cart/CartPage'

export default class CheckoutModalPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async isModalVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Checkout' }).isVisible()
  }

  public async clickClose(): Promise<CartPage> {
    await this.page.getByRole('button', { name: '✕' }).click()
    // Wait for modal heading to disappear before returning to CartPage
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'hidden' })
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }
}
