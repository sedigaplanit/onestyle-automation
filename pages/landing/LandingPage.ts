import BasePage from '@pages/BasePage'
import type LoginPage from '@pages/login/LoginPage'
import type ProductPage from '@pages/product-browsing/ProductPage'

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

  public async isLoginButtonVisible(): Promise<boolean> {
    return this.page.getByRole('button', { name: 'Login' }).isVisible()
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async clickLoginButton(): Promise<LoginPage> {
    await this.page.getByRole('button', { name: 'Login' }).click()
    const { default: LoginPageClass } = await import('@pages/login/LoginPage')
    return new LoginPageClass(this.page).init()
  }

  public async waitForProductCards(): Promise<this> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page.locator('.item').first().waitFor({ state: 'visible' })
    return this
  }

  public async getProductNameByIndex(index: number): Promise<string> {
    const text = await this.page.locator('.item').nth(index).locator('p').first().textContent()
    return text?.trim() ?? ''
  }

  public async clickFirstProduct(): Promise<ProductPage> {
    await this.page.locator('.item').first().waitFor({ state: 'visible' })
    await this.page.locator('.item').first().click()
    const { default: ProductPageClass } = await import('@pages/product-browsing/ProductPage')
    return new ProductPageClass(this.page).init()
  }

  public async clickCartIcon(): Promise<import('@pages/cart/CartPage').default> {
    await this.page.getByRole('link', { name: 'Cart Icon' }).click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }
}
