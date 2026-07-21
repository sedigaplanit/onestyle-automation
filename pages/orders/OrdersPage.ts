import BasePage from '@pages/BasePage'

export default class OrdersPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'Order History' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async isOrderHistoryVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: 'Order History' }).isVisible()
  }
}
