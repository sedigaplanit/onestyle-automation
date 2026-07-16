import BasePage from '@pages/BasePage'

export default abstract class CategoryPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────

  protected searchInput() {
    return this.page.getByPlaceholder('Search products...')
  }

  // Identified by containing the "All Prices" option
  protected priceFilterSelect() {
    return this.page
      .locator('select')
      .filter({ has: this.page.locator('option', { hasText: 'All Prices' }) })
  }

  // Identified by containing the "Sort By" option
  protected sortBySelect() {
    return this.page
      .locator('select')
      .filter({ has: this.page.locator('option', { hasText: 'Sort By' }) })
  }

  // ── Search ─────────────────────────────────────────────────────────────────

  public async fillSearch(term: string): Promise<this> {
    await this.searchInput().fill(term)
    return this
  }

  public async typeInSearch(term: string, delay = 30): Promise<this> {
    await this.searchInput().pressSequentially(term, { delay })
    return this
  }

  public async clearSearch(): Promise<this> {
    await this.searchInput().clear()
    return this
  }

  public async getSearchValue(): Promise<string> {
    return this.searchInput().inputValue()
  }

  // ── Price Filter ───────────────────────────────────────────────────────────

  // Index-based selection avoids label mismatches caused by
  // en-dash vs hyphen character differences in option text.
  private static readonly PRICE_FILTER_INDEX: Record<string, number> = {
    'All Prices': 0,
    'Under LKR 100': 1,
    'LKR 100 - 200': 2,
    'Above LKR 200': 3,
  }

  public async selectPriceFilter(
    option: 'All Prices' | 'Under LKR 100' | 'LKR 100 - 200' | 'Above LKR 200'
  ): Promise<this> {
    await this.priceFilterSelect().selectOption({ index: CategoryPage.PRICE_FILTER_INDEX[option] })
    return this
  }

  public async getSelectedPriceFilterLabel(): Promise<string> {
    return this.priceFilterSelect().evaluate(
      (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text?.trim() ?? ''
    )
  }

  // ── Sort ───────────────────────────────────────────────────────────────────

  private static readonly SORT_INDEX: Record<string, number> = {
    'Sort By': 0,
    'Price: Low to High': 1,
    'Price: High to Low': 2,
    'Name: A - Z': 3,
  }

  public async selectSortBy(
    option: 'Sort By' | 'Price: Low to High' | 'Price: High to Low' | 'Name: A - Z'
  ): Promise<this> {
    await this.sortBySelect().selectOption({ index: CategoryPage.SORT_INDEX[option] })
    return this
  }

  public async getSelectedSortByLabel(): Promise<string> {
    return this.sortBySelect().evaluate(
      (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text?.trim() ?? ''
    )
  }

  // ── Product Count ──────────────────────────────────────────────────────────

  public async getProductCountFromLabel(): Promise<number> {
    const el = this.page.getByText(/Showing \d+ products?/).first()
    const text = await el.textContent()
    const match = text?.match(/\d+/)
    return match ? parseInt(match[0], 10) : -1
  }

  public async getVisibleProductCardCount(): Promise<number> {
    return this.page.locator('.item').count()
  }

  // ── Product Data ───────────────────────────────────────────────────────────

  public async waitForProducts(): Promise<this> {
    await this.page.locator('.item').first().waitFor({ state: 'visible', timeout: 10000 })
    return this
  }

  public async hasProductListings(): Promise<boolean> {
    return (await this.page.locator('.item').count()) > 0
  }

  public async getProductNames(): Promise<string[]> {
    const names = await this.page.locator('.item p').allTextContents()
    return names.map((n) => n.trim()).filter((n) => n.length > 0)
  }

  public async getProductNewPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.item-price-new').allTextContents()
    return priceTexts.map((t) => parseFloat(t.replace(/[^0-9.]/g, ''))).filter((n) => !isNaN(n))
  }

  public async getFirstProductName(): Promise<string> {
    const text = await this.page.locator('.item').first().locator('p').first().textContent()
    return text?.trim() ?? ''
  }

  // ── Empty State ────────────────────────────────────────────────────────────

  public async isNoResultsMessageVisible(): Promise<boolean> {
    return this.page.getByText('No products match your filters.').isVisible()
  }

  // ── Cross-category navigation (dynamic imports prevent circular deps) ──────

  public async gotoMens(): Promise<import('@pages/product-browsing/MensProducts').default> {
    await this.page.getByRole('link', { name: 'Men', exact: true }).click()
    const { default: MensProductsClass } = await import('@pages/product-browsing/MensProducts')
    return new MensProductsClass(this.page).init()
  }

  public async gotoWomens(): Promise<import('@pages/product-browsing/WomensProducts').default> {
    await this.page.getByRole('link', { name: 'Women', exact: true }).click()
    const { default: WomensProductsClass } = await import('@pages/product-browsing/WomensProducts')
    return new WomensProductsClass(this.page).init()
  }

  public async gotoKids(): Promise<import('@pages/product-browsing/KidsProducts').default> {
    await this.page.getByRole('link', { name: 'Kids', exact: true }).click()
    const { default: KidsProductsClass } = await import('@pages/product-browsing/KidsProducts')
    return new KidsProductsClass(this.page).init()
  }
}
