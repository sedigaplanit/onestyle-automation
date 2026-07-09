import BasePage from '@pages/BasePage'
import type LoginPage from '@pages/LoginPage'
import MensProducts from '@pages/MensProducts'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('button', { name: 'My Orders' })
      .waitFor({ state: 'visible', timeout: 5000 })
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'My Orders' }).isVisible()
  }

  public async navigateToMensSection(): Promise<MensProducts> {
    await this.page.getByRole('link', { name: 'Men', exact: true }).click()
    return new MensProducts(this.page).init()
  }

  public async clickLoginButton(): Promise<LoginPage> {
    await this.page.getByRole('button', { name: 'Login' }).click()
    const { default: LoginPageClass } = await import('./LoginPage')
    return new LoginPageClass(this.page).init()
  }
}
