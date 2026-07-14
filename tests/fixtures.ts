import { test as base, expect, Page } from '@playwright/test'
import BasePage from '../pages/BasePage'

type OpenFn = <T extends BasePage>(PageClass: new (page: Page) => T) => Promise<T>

type AppFixtures = {
  open: OpenFn
}

export const test = base.extend<AppFixtures>({
  open: async ({ page }, use) => {
    const open: OpenFn = (PageClass) => new PageClass(page).init()
    await use(open)
  },
})

export { expect }
