import BasePage from '@pages/BasePage'
import type LoginPage from '@pages/login/LoginPage'
import type SignUpPage from '@pages/sign-up/SignUpPage'
import MensProducts from '@pages/product-browsing/MensProducts'
import WomensProducts from '@pages/product-browsing/WomensProducts'
import KidsProducts from '@pages/product-browsing/KidsProducts'

export default class LandingPage extends BasePage {
  public async init(): Promise<this> {
    if (this.page.url() === 'about:blank') {
      await this.page.goto('')
    }
    return this
  }

  public async isMyOrdersButtonVisible(): Promise<boolean> {
    await this.page
      .getByRole('button', { name: 'My Orders' })
      .waitFor({ state: 'visible', timeout: 10000 })
    return true
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
    const { default: LoginPageClass } = await import('@pages/login/LoginPage')
    console.log('button clicked')
    return new LoginPageClass(this.page).init()
  }

  public async clickSignUpHeroButton(): Promise<SignUpPage> {
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    const { default: SignUpPageClass } = await import('@pages/sign-up/SignUpPage')
    console.log('button clicked')
    return new SignUpPageClass(this.page).init()
  }
}
