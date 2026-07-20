import BasePage from '@pages/BasePage'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    if (this.page.url() === 'about:blank') {
      await this.page.goto('')
    }
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page.getByRole('button', { name: 'My Orders' }).waitFor({ state: 'visible' })
    return true
  }
}
