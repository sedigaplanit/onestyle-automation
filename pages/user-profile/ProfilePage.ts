import BasePage from '@pages/BasePage'

export default class ProfilePage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'My Profile' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async getPageHeading(): Promise<string> {
    const text = await this.page
      .getByRole('heading', { level: 1, name: 'My Profile' })
      .textContent()
    return text ? text.trim() : ''
  }
}
