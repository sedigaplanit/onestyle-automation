import BasePage from '@pages/BasePage'

export default class WomensProducts extends BasePage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/womens/, { timeout: 5000 })
    return this
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }
}
