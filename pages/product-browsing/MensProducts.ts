import CategoryPage from '@pages/product-browsing/CategoryPage'
import ProductPage from '@pages/product-browsing/ProductPage'
import type WomensProducts from '@pages/product-browsing/WomensProducts'

export default class MensProducts extends CategoryPage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/mens/, { timeout: 5000 })
    return this
  }

  public async selectProductByName(productName: string): Promise<ProductPage> {
    const product = this.page.locator('.item').filter({ hasText: productName }).first()
    await product.waitFor({ state: 'visible', timeout: 5000 })
    await product.hover({ timeout: 5000 })
    await product.click()
    return new ProductPage(this.page).init()
  }

  public async navigateToWomensSection(): Promise<WomensProducts> {
    await this.page.getByRole('link', { name: 'Women', exact: true }).click()
    const { default: WomensProductsClass } = await import('@pages/product-browsing/WomensProducts')
    return new WomensProductsClass(this.page).init()
  }
}
