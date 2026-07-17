import BasePage from '@pages/BasePage'
import type CartPage from '@pages/cart/CartPage'

export default class ProductPage extends BasePage {
  public async init(): Promise<this> {
    // Explicit timeout override: product data is fetched from onestyle-backend.onrender.com
    // (Render.com free tier). Cold-start can take up to 60s on the first request of the day.
    // span.qty-value only renders after the API response — it is the reliable load landmark.
    await this.page.locator('span.qty-value').waitFor({ state: 'visible', timeout: 60_000 })
    return this
  }

  public async getQuantityValue(): Promise<string> {
    const text = await this.page.locator('span.qty-value').textContent()
    return text?.trim() ?? ''
  }

  public async clickIncrementQuantity(): Promise<this> {
    await this.page.getByRole('button', { name: '+' }).click()
    return this
  }

  public async clickDecrementQuantity(): Promise<this> {
    await this.page.getByRole('button', { name: '−' }).click()
    return this
  }

  public async selectSize(size: string): Promise<this> {
    await this.page.getByText(size, { exact: true }).click()
    return this
  }

  public async clickAddToCart(): Promise<this> {
    await this.page.getByRole('button', { name: 'Add to Cart' }).click()
    return this
  }

  public async clickBuyNow(): Promise<CartPage> {
    await this.page.getByRole('button', { name: 'Buy Now' }).click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }

  public async isInCart(): Promise<boolean> {
    return this.page.getByRole('button', { name: /In Cart.*View Cart/ }).isVisible()
  }

  public async hasSizeError(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Select Size — required' }).isVisible()
  }

  public async clickViewCart(): Promise<CartPage> {
    await this.page.getByRole('button', { name: /In Cart.*View Cart/ }).click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }

  public async addToCartIfNeeded(size: string): Promise<this> {
    if (await this.isInCart()) return this
    await this.selectSize(size)
    await this.clickAddToCart()
    // Wait for the button to transition — confirms the API accepted the item
    await this.page
      .getByRole('button', { name: /In Cart.*View Cart/ })
      .waitFor({ state: 'visible' })
    return this
  }

  public async clickCartIcon(): Promise<CartPage> {
    await this.page.getByRole('link', { name: 'Cart Icon' }).click()
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }
}
