import BasePage from '@pages/BasePage'
import type CheckoutModalPage from '@pages/checkout/CheckoutModalPage'

export default class CartPage extends BasePage {
  public async init(): Promise<this> {
    if (!this.page.url().includes('/cart')) {
      // goto('/cart') navigates to domain root on GitHub Pages; must use full BASE_URL path
      await this.page.goto(`${process.env.BASE_URL}/cart`)
    }
    await this.page
      .getByRole('heading', { level: 1, name: 'Cart Totals' })
      .waitFor({ state: 'visible' })
    // Wait for the cart API fetch to complete so nav count and checkout button are stable
    await this.page.waitForLoadState('networkidle')
    return this
  }

  public async clickProceedToCheckout(): Promise<CheckoutModalPage> {
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    const { default: CheckoutModalPageClass } = await import('@pages/checkout/CheckoutModalPage')
    return new CheckoutModalPageClass(this.page).init()
  }

  public async isCheckoutModalOpen(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Checkout' }).isVisible()
  }

  public async isCheckoutButtonEnabled(): Promise<boolean> {
    return this.page.getByRole('button', { name: 'Proceed to Checkout' }).isEnabled()
  }

  public async isSignInPromptVisible(): Promise<boolean> {
    return this.page.getByText('Sign in to proceed with checkout').isVisible()
  }

  public async isCheckoutButtonAbsent(): Promise<boolean> {
    return !(await this.page.getByRole('button', { name: 'Proceed to Checkout' }).isVisible())
  }

  public async clickSignUpLogin(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign Up / Login' }).click()
  }
}
