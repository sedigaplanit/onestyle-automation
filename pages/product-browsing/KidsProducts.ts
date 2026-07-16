import CategoryPage from '@pages/product-browsing/CategoryPage'

export default class KidsProducts extends CategoryPage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/kids/, { timeout: 5000 })
    return this
  }
}
