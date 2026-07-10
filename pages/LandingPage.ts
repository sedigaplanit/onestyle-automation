import BasePage from '@pages/BasePage'
import type LoginPage from '@pages/LoginPage'
import MensProducts from '@pages/MensProducts'
import WomensProducts from '@pages/WomensProducts'
import KidsProducts from '@pages/KidsProducts'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    await this.page.goto('')
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'My Orders' }).isVisible()
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async navigateToMensSection(): Promise<MensProducts> {
    await this.page.getByRole('link', { name: 'Men', exact: true }).click()
    return new MensProducts(this.page).init()
  }

  public async navigateToWomensSection(): Promise<WomensProducts> {
    await this.page.getByRole('link', { name: 'Women', exact: true }).click()
    return new WomensProducts(this.page).init()
  }

  public async navigateToKidsSection(): Promise<KidsProducts> {
    await this.page.getByRole('link', { name: 'Kids', exact: true }).click()
    return new KidsProducts(this.page).init()
  }

  public async clickLoginButton(): Promise<LoginPage> {
    await this.page.getByRole('button', { name: 'Login' }).click()
    const { default: LoginPageClass } = await import('@pages/LoginPage')
    return new LoginPageClass(this.page).init()
  }
}
