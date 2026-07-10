import BasePage from '@pages/BasePage'
import type LandingPage from '@pages/LandingPage'

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

  public async setPassword(password: string): Promise<this> {
    await this.page.getByPlaceholder('Password').fill(password)
    return this
  }

  public async clickSignUp(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    const { default: LandingPageClass } = await import('@pages/LandingPage')
    return new LandingPageClass(this.page)
  }
}
