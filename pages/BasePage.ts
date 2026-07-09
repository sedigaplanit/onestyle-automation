import { Page } from '@playwright/test'

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

  public async getCartItemCount(): Promise<number> {
    const cartCountText = await this.page.locator('.nav-cart-count').textContent()
    return cartCountText ? parseInt(cartCountText.trim(), 10) : 0
  }
}
