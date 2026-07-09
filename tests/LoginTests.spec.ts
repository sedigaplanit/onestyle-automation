import { test, expect } from '@playwright/test'
import BasePage from '../pages/BasePage'
import LoginPage from '../pages/LoginPage'

test.use({ storageState: { cookies: [], origins: [] } }) // Clear storage state for this test
test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
    await page.getByRole('button', { name: 'Login' }).click()
  })

  test('Login with valid credentials', async ({ page }) => {
    const landingPage = await new LoginPage(page)
      .setEmail(process.env.USER_NAME || '')
      .then((_) => _.setPassword(process.env.PASSWORD || ''))
      .then((_) => _.clickLogin())
    expect(await landingPage.isMyOrdersButtonVisible()).toBe(true)
  })
})
