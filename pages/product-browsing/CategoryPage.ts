import BasePage from '@pages/BasePage'

export default class CategoryPage extends BasePage {
  public async init(): Promise<this> {
    return this.goToCategory('womens')
  }

  public async goToCategory(category: 'mens' | 'womens' | 'kids'): Promise<this> {
    await this.page.goto(`${process.env.BASE_URL}/${category}`)
    await this.page
      .getByRole('textbox', { name: 'Search products...' })
      .waitFor({ state: 'visible' })
    await this.page.getByText(/Showing \d+ products/).waitFor({ state: 'visible' })
    return this
  }

  public async searchProducts(term: string): Promise<this> {
    await this.page.getByRole('textbox', { name: 'Search products...' }).fill(term)
    return this
  }

  public async clearSearch(): Promise<this> {
    await this.page.getByRole('textbox', { name: 'Search products...' }).fill('')
    return this
  }

  public async setPriceRange(option: string): Promise<this> {
    await this.page.getByRole('combobox').first().selectOption({ label: option })
    return this
  }

  public async setSort(option: string): Promise<this> {
    await this.page.getByRole('combobox').nth(1).selectOption({ label: option })
    return this
  }

  public async resetFilters(): Promise<this> {
    await this.clearSearch()
    await this.setPriceRange('All Prices')
    await this.setSort('Sort By')
    return this
  }

  public async getSelectedPriceRange(): Promise<string> {
    const selectedOption = this.page.getByRole('combobox').first().locator('option:checked')
    const selectedText = await selectedOption.textContent()
    return selectedText?.trim() ?? ''
  }

  public async getSelectedSortOption(): Promise<string> {
    const selectedOption = this.page.getByRole('combobox').nth(1).locator('option:checked')
    const selectedText = await selectedOption.textContent()
    return selectedText?.trim() ?? ''
  }

  public async getProductCount(): Promise<number> {
    const bodyText = await this.page.locator('body').textContent()
    const match = bodyText?.match(/Showing (\d+) product(s)?/)
    return match ? Number(match[1]) : 0
  }

  public async getVisibleProductCount(): Promise<number> {
    return this.page.locator('button.item-wishlist-btn').count()
  }

  public async isNoResultsVisible(): Promise<boolean> {
    return this.page.getByText('No products match your filters.').isVisible()
  }

  public async wishlistFirstProduct(): Promise<this> {
    // Wishlist buttons (class: item-wishlist-btn) only exist on category/listing pages,
    // not on the product detail page
    const alreadyWishlisted = await this.page
      .locator('button.item-wishlist-btn.wishlisted')
      .first()
      .isVisible()
    if (!alreadyWishlisted) {
      await this.page.locator('button.item-wishlist-btn').first().click()
      await this.page
        .locator('button.item-wishlist-btn.wishlisted')
        .first()
        .waitFor({ state: 'visible' })
    }
    return this
  }

  public async isFirstProductWishlisted(): Promise<boolean> {
    return this.page.locator('button.item-wishlist-btn.wishlisted').first().isVisible()
  }
}
