import { test as setup, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

//Define where session storage will be saved
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFile = path.join(__dirname, '../.auth/user.json')

setup('Authenticate and save session storage', async ({ page }) => {
  // Navigate to the login page
  await page.goto('')
  await page.getByRole('button', { name: 'Login' }).click()

  // Perform mandatory login steps using credentials from environment variables
  await page
    .getByRole('heading', { level: 1, name: 'Login' })
    .waitFor({ state: 'visible', timeout: 5000 })
  await page.locator('input[name="email"]').fill(process.env.USER_NAME || '')
  await page.locator('input[name="password"]').fill(process.env.PASSWORD || '')
  await page.getByRole('button', { name: 'Login' }).last().click()

  // Explicit timeout: login API is hosted on Render.com free tier.
  // Cold-start can delay the authenticated nav from appearing by up to 30s.
  await page
    .getByRole('button', { name: 'My Orders' })
    .waitFor({ state: 'visible', timeout: 30_000 })

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
