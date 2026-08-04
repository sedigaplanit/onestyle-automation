import { test, expect } from '../fixtures'
import LandingPage from '@pages/landing/LandingPage'

test.describe('User Profile Tests', { tag: ['@ui', '@profile'] }, () => {
  test(
    'Navbar "Profile" button navigates authenticated user to the profile page',
    { tag: '@smoke' },
    async ({ open, page }) => {
      // test.slow(): app hosted on GitHub Pages — cold-start latency can exceed the 30s default
      test.slow()
      const profilePage = await open(LandingPage).then((_) => _.clickProfile())
      expect(await profilePage.getPageHeading()).toBe('My Profile')
      expect(page.url()).toContain('/profile')
    }
  )
})
