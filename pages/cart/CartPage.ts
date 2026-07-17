import BasePage from '@pages/BasePage'

export default class CartPage extends BasePage {
  public async init(): Promise<this> {
    // No explicit timeout — inherits actionTimeout (10s) from playwright.config.ts
    await this.page
      .getByRole('heading', { level: 1, name: 'Cart Totals' })
      .waitFor({ state: 'visible' })
    return this
  }

  // ── Column headers ────────────────────────────────────────────────────────
  public async getColumnHeaders(): Promise<string[]> {
    const texts = await this.page
      .locator('.cartitems-format-main:not(.cartitems-format)')
      .locator('p')
      .allTextContents()
    return texts.map((t) => t.trim())
  }

  // ── Item row helpers (index = 0-based row) ────────────────────────────────
  private row(index: number) {
    return this.page.locator('.cartitems-format.cartitems-format-main').nth(index)
  }

  public async isProductImageVisible(index: number): Promise<boolean> {
    return this.row(index).locator('.carticon-product-icon').isVisible()
  }

  public async getItemName(index: number): Promise<string> {
    const text = await this.row(index).locator('p').first().textContent()
    return text?.trim() ?? ''
  }

  public async getItemUnitPrice(index: number): Promise<string> {
    const text = await this.row(index).locator('p').nth(1).textContent()
    return text?.trim() ?? ''
  }

  public async getItemLineTotal(index: number): Promise<string> {
    const text = await this.row(index).locator('p').nth(2).textContent()
    return text?.trim() ?? ''
  }

  public async isRemoveIconVisible(index: number): Promise<boolean> {
    return this.row(index).locator('.carticon-remove-icon').isVisible()
  }

  // ── Quantity controls ─────────────────────────────────────────────────────
  public async getQuantityForItem(index: number): Promise<string> {
    const text = await this.row(index).locator('.cartitems-quantity').textContent()
    return text?.trim() ?? ''
  }

  public async clickIncrementForItem(index: number): Promise<this> {
    await this.row(index).getByRole('button', { name: '+' }).click()
    return this
  }

  public async clickDecrementForItem(index: number): Promise<this> {
    await this.row(index).getByRole('button', { name: '-' }).click()
    return this
  }

  // ── Cart Totals panel ─────────────────────────────────────────────────────
  public async getSubTotal(): Promise<string> {
    const text = await this.page
      .getByText('Sub Total:')
      .locator('..')
      .locator('p')
      .last()
      .textContent()
    return text?.trim() ?? ''
  }

  public async isShippingFree(): Promise<boolean> {
    return this.page.getByText('Shipping Free').isVisible()
  }

  public async getTotal(): Promise<string> {
    const text = await this.page.getByRole('heading', { level: 3 }).last().textContent()
    return text?.trim() ?? ''
  }

  public async isCheckoutButtonEnabled(): Promise<boolean> {
    return !(await this.page.getByRole('button', { name: 'Proceed to Checkout' }).isDisabled())
  }

  // ── Remove item ───────────────────────────────────────────────────────────
  public async removeItem(index: number): Promise<this> {
    await this.row(index).locator('.carticon-remove-icon').click()
    return this
  }

  public async getItemCount(): Promise<number> {
    return this.page.locator('.cartitems-format.cartitems-format-main').count()
  }

  // ── Guest view ────────────────────────────────────────────────────────────
  public async isGuestPromptVisible(): Promise<boolean> {
    return this.page.getByText('Sign in to proceed with checkout').isVisible()
  }

  public async clickSignUpLogin(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign Up / Login' }).click()
  }

  // ── Checkout modal ────────────────────────────────────────────────────────
  public async isCheckoutModalOpen(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Checkout' }).isVisible()
  }

  public async clickProceedToCheckout(): Promise<this> {
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    // Wait for the modal to open
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'visible' })
    return this
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  public async clickLogo(): Promise<import('@pages/landing/LandingPage').default> {
    await this.page
      .getByRole('link', { name: /OneStyle/ })
      .first()
      .click()
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }

  // ── Cart management ───────────────────────────────────────────────────────
  public async clearCart(): Promise<this> {
    while ((await this.page.locator('.carticon-remove-icon').count()) > 0) {
      const countBefore = await this.page.locator('.carticon-remove-icon').count()
      await this.page.locator('.carticon-remove-icon').first().click()
      // Wait for React to remove the DOM node before clicking the next icon
      await this.page.waitForFunction(
        (n) => document.querySelectorAll('.carticon-remove-icon').length < n,
        countBefore
      )
    }
    return this
  }
}
