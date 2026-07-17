import BasePage from '@pages/BasePage'
import type LandingPage from '@pages/landing/LandingPage'

export default class LoginPage extends BasePage {
  public async init(): Promise<this> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page.getByRole('heading', { level: 1, name: 'Login' }).waitFor({ state: 'visible' })
    return this
  }

  public async isLoginHeadingVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: 'Login' }).isVisible()
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
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}
