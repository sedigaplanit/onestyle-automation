import BasePage from '@pages/BasePage'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function parseOrderDate(dateText: string): Date {
  const [day, month, year] = dateText.split(' ')
  return new Date(parseInt(year, 10), MONTHS.indexOf(month), parseInt(day, 10))
}

export default class OrdersPage extends BasePage {
  public async init(): Promise<this> {
    await this.page
      .getByRole('heading', { level: 1, name: 'Order History' })
      .waitFor({ state: 'visible' })
    return this
  }

  public async isOrderHistoryVisible(): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: 'Order History' }).isVisible()
  }

  /** Returns the raw subtitle text, e.g. "291 orders placed"
   * Uses CSS class selector — `.orderhistory-subtitle` is a plain <p> with no ARIA role;
   * confirmed as the only reliable locator via live app inspection 2026-07-26.
   */
  public async getOrderCountText(): Promise<string> {
    const text = await this.page.locator('.orderhistory-subtitle').textContent()
    return text ? text.trim() : ''
  }

  /** Returns true when at least one order card is displayed (count > 0 per subtitle) */
  public async hasOrderCards(): Promise<boolean> {
    const text = await this.getOrderCountText()
    const match = text.match(/^(\d+) orders? placed$/)
    return match !== null && parseInt(match[1], 10) > 0
  }

  /**
   * Returns the dates of the first `count` order cards as Date objects.
   * Parsed from span.orderhistory-date text ("DD Month YYYY").
   * Waits for the first date element to become visible before collecting.
   */
  public async getFirstOrderCardDates(count: number): Promise<Date[]> {
    const dateLocator = this.page.locator('.orderhistory-date')
    await dateLocator.first().waitFor({ state: 'visible' })
    const allDateEls = await dateLocator.all()
    const results: Date[] = []
    for (let i = 0; i < Math.min(count, allDateEls.length); i++) {
      const text = (await allDateEls[i].textContent())?.trim() ?? ''
      results.push(parseOrderDate(text))
    }
    return results
  }
}
