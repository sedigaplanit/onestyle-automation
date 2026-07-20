import { test as setup, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

//Define where session storage will be saved
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFile = path.join(__dirname, '../.auth/user.json')

setup('Authenticate and save session storage', async ({ page }) => {
  const userName = process.env.USER_NAME
  const password = process.env.PASSWORD
  if (!userName || !password) {
    throw new Error('CRITICAL: USER_NAME and PASSWORD must be set in .env or CI secrets.')
  }

  // Navigate to the login page
  await page.goto('')
  await page.getByRole('button', { name: 'Login' }).click()

  // Perform mandatory login steps using credentials from environment variables
  await page
    .getByRole('heading', { level: 1, name: 'Login' })
    .waitFor({ state: 'visible', timeout: 5000 })
  await page.getByRole('textbox', { name: 'Email Address' }).fill(userName)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).last().click()

  // Explicit timeout: login API is hosted on Render.com free tier.
  // Cold-start can delay the authenticated nav from appearing by up to 30s.
  await page
    .getByRole('button', { name: 'My Orders' })
    .waitFor({ state: 'visible', timeout: 30_000 })

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
