import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ open }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.setEmail(process.env.USER_NAME || ''))
      .then((_) => _.setPassword(process.env.PASSWORD || ''))
      .then((_) => _.clickLogin())
    expect(await landingPage.isMyOrdersButtonVisible()).toBe(true)
  })
})
