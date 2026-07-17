import { Page } from '@playwright/test'
import type LandingPage from '@pages/landing/LandingPage'

export default abstract class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  abstract init(): Promise<this>

  public async getSuccessToastMessage(): Promise<string> {
    const toastMessage = await this.page.locator('.toast-success').textContent()
    return toastMessage ? toastMessage.trim() : ''
  }

  public async getErrorToastMessage(): Promise<string> {
    const toastMessage = await this.page.locator('.toast-error').textContent()
    return toastMessage ? toastMessage.trim() : ''
  }

  public async getCartItemCount(): Promise<number> {
    const el = this.page.locator('.nav-cart-count')
    if ((await el.count()) === 0) return 0
    const cartCountText = await el.textContent()
    return cartCountText ? parseInt(cartCountText.trim(), 10) : 0
  }

  public async clickLogout(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Logout' }).click()
    // Wait for Login button — confirms the unauthenticated state has been applied
    await this.page.getByRole('button', { name: 'Login' }).waitFor({ state: 'visible' })
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}
