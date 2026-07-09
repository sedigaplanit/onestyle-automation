import BasePage from '@pages/BasePage'
import LandingPage from '@pages/LandingPage'

export default class LoginPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'Login' })
      .waitFor({ state: 'visible', timeout: 5000 })
    return this
  }

  public async setEmail(email: string): Promise<this> {
    await this.page.locator('input[name="email"]').fill(email)
    return this
  }

  public async setPassword(password: string): Promise<this> {
    await this.page.locator('input[name="password"]').fill(password)
    return this
  }

  public async clickLogin(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Login' }).last().click()
    return new LandingPage(this.page).init()
  }
}
