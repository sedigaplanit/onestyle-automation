import { Page } from '@playwright/test'
import type LandingPage from '@pages/landing/LandingPage'
import type WishlistPage from '@pages/wishlist/WishlistPage'
import type OrdersPage from '@pages/orders/OrdersPage'

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

  public async clickNavWishlistLink(): Promise<WishlistPage> {
    await this.page.getByRole('link', { name: /♡/ }).click()
    // Wait for URL to settle on /wishlist before handing off to WishlistPage.init()
    await this.page.waitForURL('**/wishlist')
    const { default: WishlistPageClass } = await import('@pages/wishlist/WishlistPage')
    return new WishlistPageClass(this.page).init()
  }

  public async clickMyOrders(): Promise<OrdersPage> {
    // getByRole('button') confirmed — 'My Orders' is a <button> in the navbar (unlike the
    // wishlist icon which is an <a> link). Verified by test passing 2026-07-27.
    await this.page.getByRole('button', { name: 'My Orders' }).click()
    // Wait for URL to settle on /orders before handing off to OrdersPage.init()
    await this.page.waitForURL('**/orders')
    const { default: OrdersPageClass } = await import('@pages/orders/OrdersPage')
    return new OrdersPageClass(this.page).init()
  }

  public async clickLogout(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Logout' }).click()
    // Wait for Login button — confirms the unauthenticated state has been applied
    await this.page.getByRole('button', { name: 'Login' }).waitFor({ state: 'visible' })
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}
