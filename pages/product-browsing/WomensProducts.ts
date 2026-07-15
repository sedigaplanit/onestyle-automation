import BasePage from '@pages/BasePage'
import MensProducts from '@pages/product-browsing/MensProducts'

export default class WomensProducts extends BasePage {
  public async init(): Promise<this> {
    await this.page.waitForURL(/\/womens/, { timeout: 5000 })
    return this
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async waitForProducts(): Promise<this> {
    await this.page.locator('.item').first().waitFor({ state: 'visible', timeout: 10000 })
    return this
  }

  public async toggleWishlistByIndex(index: number): Promise<this> {
    await this.page.locator('.item-wishlist-btn').nth(index).click()
    return this
  }

  public async isProductWishlisted(index: number): Promise<boolean> {
    const cls = await this.page.locator('.item-wishlist-btn').nth(index).getAttribute('class')
    const classes = (cls ?? '')
      .trim()
      .split(/\s+/)
      .filter((c) => c.length > 0)
    return classes.some((c) => c !== 'item-wishlist-btn')
  }

  public async navigateToMensSection(): Promise<MensProducts> {
    await this.page.getByRole('link', { name: 'Men', exact: true }).click()
    return new MensProducts(this.page).init()
  }
}
