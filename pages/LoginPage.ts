import BasePage from '@pages/BasePage'
import type LandingPage from '@pages/LandingPage'
import SignUpPage from '@pages/SignUpPage'

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
    const { default: LandingPageClass } = await import('@pages/LandingPage')
    return new LandingPageClass(this.page).init()
  }

  public async navigateToSignUp(): Promise<SignUpPage> {
    await this.page.locator('.loginsignup-switch span').click()
    return new SignUpPage(this.page).init()
  }
}
