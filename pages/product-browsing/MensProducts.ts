import BasePage from '@pages/BasePage'
import ProductPage from '@pages/product-browsing/ProductPage'

export default class MensProducts extends BasePage {
  public async init(): Promise<this> {
    const urlIncludesMens = this.page.url().includes('/mens')
    if (!urlIncludesMens) {
      throw new Error('Not on the Mens Products page')
    }
    return this
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async selectProductByName(productName: string): Promise<ProductPage> {
    const product = this.page.locator('.item').filter({ hasText: productName }).first()
    await product.waitFor({ state: 'visible', timeout: 5000 })
    await product.hover({ timeout: 5000 })
    await product.click()
    return new ProductPage(this.page).init()
  }
}
