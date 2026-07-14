import BasePage from '@pages/BasePage'
import type LandingPage from '@pages/landing/LandingPage'
import type LoginPage from '@pages/login/LoginPage'

export default class SignUpPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'Sign Up' })
      .waitFor({ state: 'visible', timeout: 5000 })
    return this
  }

  public async setName(name: string): Promise<this> {
    await this.page.getByPlaceholder('Your Name').fill(name)
    return this
  }

  public async setEmail(email: string): Promise<this> {
    await this.page.getByPlaceholder('Email Address').fill(email)
    return this
  }

  public async setGender(gender: string): Promise<this> {
    await this.page.getByRole('combobox').selectOption(gender)
    return this
  }

  public async setMobileNumber(mobile: string): Promise<this> {
    await this.page.getByPlaceholder('Mobile Number').fill(mobile)
    return this
  }

  public async setPassword(password: string): Promise<this> {
    await this.page.getByPlaceholder('Password', { exact: true }).fill(password)
    return this
  }

  public async setConfirmPassword(password: string): Promise<this> {
    await this.page.getByPlaceholder('Confirm Password', { exact: true }).fill(password)
    return this
  }

  public async isSignUpHeadingVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: 'Sign Up' }).isVisible()
  }

  public async areAllFieldsVisible(): Promise<boolean> {
    const results = await Promise.all([
      this.page.getByPlaceholder('Your Name').isVisible(),
      this.page.getByPlaceholder('Email Address').isVisible(),
      this.page.getByRole('combobox').isVisible(),
      this.page.getByPlaceholder('Mobile Number').isVisible(),
      this.page.getByPlaceholder('Password', { exact: true }).isVisible(),
      this.page.getByPlaceholder('Confirm Password', { exact: true }).isVisible(),
      this.page.getByPlaceholder('Address (optional)').isVisible(),
      this.page.getByRole('button', { name: 'Sign Up' }).isVisible(),
    ])
    return results.every(Boolean)
  }

  public async attemptSubmit(): Promise<this> {
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    return this
  }

  public async clickSignUp(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page)
  }

  public async toggleBackToLogin(): Promise<LoginPage> {
    await this.page.locator('.loginsignup-switch span').click()
    const { default: LoginPageClass } = await import('@pages/login/LoginPage')
    return new LoginPageClass(this.page).init()
  }
}
