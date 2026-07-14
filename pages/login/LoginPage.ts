import BasePage from '@pages/BasePage'
import type LandingPage from '@pages/landing/LandingPage'
import SignUpPage from '@pages/sign-up/SignUpPage'

export default class LoginPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'Login' })
      .waitFor({ state: 'visible', timeout: 5000 })
    return this
  }

  public async isLoginHeadingVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: 'Login' }).isVisible()
  }

  public async setEmail(email: string): Promise<this> {
    await this.page.locator('input[name="email"]').fill(email)
    console.log(`Email set to: ${email}`)
    return this
  }

  public async setPassword(password: string): Promise<this> {
    await this.page.locator('input[name="password"]').fill(password)
    console.log(`Password set to: ${password}`)
    return this
  }

  public async clickLogin(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Login' }).last().click()
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    console.log('Login button clicked')
    return new LandingPageClass(this.page).init()
  }

  public async navigateToSignUp(): Promise<SignUpPage> {
    await this.page.locator('.loginsignup-switch span').click()
    return new SignUpPage(this.page).init()
  }
}
