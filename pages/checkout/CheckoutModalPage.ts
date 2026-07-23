import BasePage from '@pages/BasePage'
import type CartPage from '@pages/cart/CartPage'
import type OrdersPage from '@pages/orders/OrdersPage'
import type LandingPage from '@pages/landing/LandingPage'

export default class CheckoutModalPage extends BasePage {
  private getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue →' })
  }

  private getCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' })
  }

  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'visible' })
    return this
  }

  // ─── Step 1 ─────────────────────────────────────────────────────────────────

  public async isModalVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Checkout' }).isVisible()
  }

  public async isStep1Visible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: 'Checkout' }).isVisible()
  }

  public async getTotalText(): Promise<string | null> {
    // .checkout-total is the modal-specific element; avoids matching cart page totals on same DOM
    return this.page.locator('.checkout-total').textContent()
  }

  public async areAllPaymentOptionsVisible(): Promise<boolean> {
    const card = await this.page.getByText('Credit / Debit Card').isVisible()
    const paypal = await this.page.getByText('PayPal').isVisible()
    const cod = await this.page.getByText('Cash on Delivery').isVisible()
    return card && paypal && cod
  }

  public async isContinueButtonVisible(): Promise<boolean> {
    await this.getContinueButton().waitFor({ state: 'visible' })
    return this.getContinueButton().isVisible()
  }

  public async isCancelButtonVisible(): Promise<boolean> {
    await this.getCancelButton().waitFor({ state: 'visible' })
    return this.getCancelButton().isVisible()
  }

  public async isCloseButtonVisible(): Promise<boolean> {
    // .checkout-close is the class for the header button (close on Step 1, back on Step 2)
    return this.page.locator('.checkout-close').isVisible()
  }

  public async selectPaymentMethod(method: 'credit-card' | 'paypal' | 'cod'): Promise<this> {
    const labelMap: Record<string, string> = {
      'credit-card': 'Credit / Debit Card',
      paypal: 'PayPal',
      cod: 'Cash on Delivery',
    }
    // getByText does substring matching — matches the emoji-prefixed option labels in the app UI
    await this.page.getByText(labelMap[method]).click()
    return this
  }

  public async clickContinue(): Promise<this> {
    await this.getContinueButton().click()
    // Back button (class: checkout-cancel-btn) only appears on Step 2 — safe wait condition
    await this.page
      .locator('.checkout-cancel-btn')
      .filter({ hasText: 'Back' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async clickCancel(): Promise<CartPage> {
    await this.getCancelButton().click()
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'hidden' })
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }

  public async clickClose(): Promise<CartPage> {
    await this.page.locator('.checkout-close').click()
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'hidden' })
    const { default: CartPageClass } = await import('@pages/cart/CartPage')
    return new CartPageClass(this.page).init()
  }

  // ─── Step 2 ─────────────────────────────────────────────────────────────────

  public async isCardStep2Visible(): Promise<boolean> {
    return this.page
      .getByRole('heading', { level: 2 })
      .filter({ hasText: 'Credit / Debit Card' })
      .isVisible()
  }

  public async isPayPalStep2Visible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2 }).filter({ hasText: 'PayPal' }).isVisible()
  }

  public async isCODStep2Visible(): Promise<boolean> {
    return this.page
      .getByRole('heading', { level: 2 })
      .filter({ hasText: 'Cash on Delivery' })
      .isVisible()
  }

  public async isAmountDisplayVisible(): Promise<boolean> {
    return this.page.getByText(/Amount to pay:.*LKR/).isVisible()
  }

  public async isFieldPresent(placeholder: string): Promise<boolean> {
    return (await this.page.getByPlaceholder(placeholder).count()) > 0
  }

  public async isPayPalRedirectNoteVisible(): Promise<boolean> {
    return this.page
      .getByText('You will be redirected to PayPal to complete your payment securely.')
      .isVisible()
  }

  public async isConfirmOrderButtonVisible(): Promise<boolean> {
    return this.page.getByRole('button', { name: 'Confirm Order' }).isVisible()
  }

  public async isPayButtonVisible(): Promise<boolean> {
    return this.page.getByRole('button', { name: /Pay LKR/ }).isVisible()
  }

  public async isProceedToPayPalButtonVisible(): Promise<boolean> {
    return this.page.getByRole('button', { name: 'Proceed to PayPal' }).isVisible()
  }

  public async isBackBottomButtonVisible(): Promise<boolean> {
    return this.page.locator('.checkout-cancel-btn').filter({ hasText: 'Back' }).isVisible()
  }

  public async isBackHeaderButtonVisible(): Promise<boolean> {
    // .checkout-close is shared by the Step 1 close button and the Step 2 header back button
    return this.page.locator('.checkout-close').isVisible()
  }

  public async hasCardFields(): Promise<boolean> {
    return (await this.page.getByPlaceholder('John Doe').count()) > 0
  }

  public async clickBackBottom(): Promise<this> {
    await this.page.locator('.checkout-cancel-btn').filter({ hasText: 'Back' }).click()
    await this.page
      .getByRole('heading', { level: 2, name: 'Checkout' })
      .waitFor({ state: 'visible' })
    await this.getContinueButton().waitFor({ state: 'visible' })
    await this.getCancelButton().waitFor({ state: 'visible' })
    return this
  }

  public async fillDeliveryAddress(street: string, city: string, phone: string): Promise<this> {
    await this.page.getByPlaceholder('No. 12, Main Street').fill(street)
    await this.page.getByPlaceholder('Colombo').fill(city)
    await this.page.getByPlaceholder('+94 77 000 0000').fill(phone)
    return this
  }

  public async fillCardDetails(
    name: string,
    number: string,
    expiry: string,
    cvv: string
  ): Promise<this> {
    await this.page.getByPlaceholder('John Doe').fill(name)
    await this.page.getByPlaceholder('1234 5678 9012 3456').fill(number)
    await this.page.getByPlaceholder('MM/YY').fill(expiry)
    // exact: true — '123' substring also matches the card number placeholder
    await this.page.getByPlaceholder('123', { exact: true }).fill(cvv)
    return this
  }

  public async clickPayButton(): Promise<this> {
    await this.page.getByRole('button', { name: /Pay LKR/ }).click()
    return this
  }

  public async clickConfirmOrder(): Promise<this> {
    await this.page.getByRole('button', { name: 'Confirm Order' }).click()
    return this
  }

  public async clickProceedToPayPal(): Promise<this> {
    await this.page.getByRole('button', { name: 'Proceed to PayPal' }).click()
    return this
  }

  // ─── Validation ─────────────────────────────────────────────────────────────

  public async getValidationErrors(): Promise<string[]> {
    await this.page.locator('.checkout-error').first().waitFor({ state: 'visible' })
    return this.page.locator('.checkout-error').allTextContents()
  }

  // ─── Processing / Success ───────────────────────────────────────────────────

  public async isProcessingVisible(): Promise<boolean> {
    return this.page.getByText('Processing your payment...').isVisible()
  }

  public async waitForSuccessScreen(): Promise<this> {
    // processing screen lasts ~2s before success appears; allow extra time on remote GitHub Pages
    await this.page
      .getByRole('heading', { name: 'Order Placed Successfully!' })
      .waitFor({ state: 'visible', timeout: 15_000 })
    return this
  }

  public async waitForSuccessToClose(): Promise<void> {
    // auto-redirect fires after ~6s; allow 15s for remote latency on GitHub Pages
    await this.page
      .getByRole('heading', { name: 'Order Placed Successfully!' })
      .waitFor({ state: 'hidden', timeout: 15_000 })
  }

  public async isSuccessVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Order Placed Successfully!' }).isVisible()
  }

  public async getOrderNumber(): Promise<string> {
    const text = await this.page
      .getByText(/ORD-\d{6}/)
      .first()
      .textContent()
    return text?.match(/ORD-\d{6}/)?.[0] ?? ''
  }

  public async clickViewMyOrders(): Promise<OrdersPage> {
    await this.page.getByRole('button', { name: 'View My Orders' }).click()
    const { default: OrdersPageClass } = await import('@pages/orders/OrdersPage')
    return new OrdersPageClass(this.page).init()
  }

  public async clickContinueShopping(): Promise<LandingPage> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click()
    await this.page
      .getByRole('heading', { name: 'Order Placed Successfully!' })
      .waitFor({ state: 'hidden' })
    const { default: LandingPageClass } = await import('@pages/landing/LandingPage')
    return new LandingPageClass(this.page).init()
  }
}
