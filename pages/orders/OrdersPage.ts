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

  /** Returns the raw subtitle text, e.g. "291 orders placed"
   * Uses CSS class selector — `.orderhistory-subtitle` is a plain <p> with no ARIA role;
   * confirmed as the only reliable locator via live app inspection 2026-07-26.
   */
  public async getOrderCountText(): Promise<string> {
    const text = await this.page.locator('.orderhistory-subtitle').textContent()
    return text ? text.trim() : ''
  }

  /** Returns true when at least one order card is displayed (count > 0 per subtitle) */
  public async hasOrderCards(): Promise<boolean> {
    const text = await this.getOrderCountText()
    const match = text.match(/^(\d+) orders? placed$/)
    return match !== null && parseInt(match[1], 10) > 0
  }
}
