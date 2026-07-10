import { test, expect } from '@playwright/test'
import LoginPage from '../pages/LoginPage'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Sign Up Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
    await page.getByRole('button', { name: 'Login' }).click()
  })

  test('Register a new user with username, email, and password', async ({ page }) => {
    const landingPage = await new LoginPage(page)
      .init()
      .then((_) => _.navigateToSignUp())
      .then((_) => _.setName('Test User'))
      .then((_) => _.setEmail('testuser1@example.com'))
      .then((_) => _.setPassword('TestPassword123'))
      .then((_) => _.clickSignUp())
    await expect
      .poll(async () => await landingPage.isMyOrdersButtonVisible(), {
        timeout: 5000,
        intervals: [500],
        message: 'My Orders button did not become visible after sign up',
      })
      .toBe(true)
  })
})
