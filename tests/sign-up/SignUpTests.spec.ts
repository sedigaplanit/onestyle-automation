import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'

test.use({ storageState: { cookies: [], origins: [] } })

const randomEmail = () => `testuser_${Date.now()}@example.com`

test.describe('Sign Up Tests', () => {
  // TC_SIGNUP_001 - Access Sign Up form from Login page toggle
  test('Sign Up form is accessible via toggle on Login page', async ({ open, page }) => {
    const signUpPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
    expect(await signUpPage.isSignUpHeadingVisible()).toBe(true)
    expect(page.url()).toContain('/login')
  })

  // TC_SIGNUP_002 - Access Sign Up form from Landing page hero button
  test('Sign Up form is accessible via hero Sign Up button on Landing page', async ({ open }) => {
    const signUpPage = await open(LandingPage).then((_) => _.clickSignUpHeroButton())
    expect(await signUpPage.isSignUpHeadingVisible()).toBe(true)
  })

  // TC_SIGNUP_003 - All form fields present
  test('All Sign Up form fields and submit button are visible', async ({ open }) => {
    const signUpPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
    expect(await signUpPage.areAllFieldsVisible()).toBe(true)
  })

  // TC_SIGNUP_004 - Successful registration with all required fields
  test('Successfully register a new user with all required fields', async ({ open }) => {
    const landingPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
      .then((_) => _.setName('Test User'))
      .then((_) => _.setEmail(randomEmail()))
      .then((_) => _.setGender('Male'))
      .then((_) => _.setMobileNumber('0771234567'))
      .then((_) => _.setPassword('Password@123'))
      .then((_) => _.setConfirmPassword('Password@123'))
      .then((_) => _.clickSignUp())
    await expect
      .poll(async () => await landingPage.isMyOrdersButtonVisible(), {
        timeout: 5000,
        intervals: [500],
        message: 'My Orders button did not become visible after sign up',
      })
      .toBe(true)
  })

  // TC_SIGNUP_005 - Toggle back to Login from Sign Up
  test('Can toggle back to Login form from Sign Up form', async ({ open, page }) => {
    const loginPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
      .then((_) => _.toggleBackToLogin())
    expect(await loginPage.isLoginHeadingVisible()).toBe(true)
    expect(page.url()).toContain('/login')
  })

  // TC_NEG_001 - Submit with all fields empty
  test('Sign Up form cannot be submitted with all fields empty', async ({ open }) => {
    const signUpPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
      .then((_) => _.attemptSubmit())
    expect(await signUpPage.isSignUpHeadingVisible()).toBe(true)
  })

  // TC_NEG_002 - Mismatched passwords
  test('Sign Up form cannot be submitted when passwords do not match', async ({ open }) => {
    const signUpPage = await open(LandingPage)
      .then((_) => _.clickLoginButton())
      .then((_) => _.navigateToSignUp())
      .then((_) => _.setName('Test User'))
      .then((_) => _.setEmail('testuser_mismatch@example.com'))
      .then((_) => _.setGender('Female'))
      .then((_) => _.setMobileNumber('0771234567'))
      .then((_) => _.setPassword('Password@123'))
      .then((_) => _.setConfirmPassword('Password@456'))
      .then((_) => _.attemptSubmit())
    expect(await signUpPage.isSignUpHeadingVisible()).toBe(true)
  })
})
