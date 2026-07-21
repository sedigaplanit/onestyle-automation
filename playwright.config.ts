import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

// 1. Load the .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '.env') })
const authFile = path.resolve(__dirname, '.auth/user.json')
// 2. Validate essential variables immediately.
// If they are missing, the test run fails instantly with a clear error.
if (!process.env.BASE_URL) {
  throw new Error('CRITICAL: BASE_URL is not defined in the .env file.')
}
if (!process.env.API_URL) {
  throw new Error('CRITICAL: API_URL is not defined in the .env file.')
}

// 3. Cast string configurations into their correct primitive types
// Default: headless=true in CI (HEADLESS is not set); headless=false only when explicitly HEADLESS=false
const isHeadless = process.env.HEADLESS !== 'false'
const targetBrowser = process.env.BROWSER || 'chromium'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: undefined — Playwright defaults to half the CPU core count.
  // All state-mutating spec files use test.describe.configure({ mode: 'serial' }) so tests
  // within each file run sequentially. Each file also has beforeEach + afterEach to clear
  // shared server-side state (cart, wishlist) before and after every test.
  // NOTE: If two spec files that mutate the same resource run on separate workers at the
  // same time, transient interference is still possible. Use BROWSER=chromium npx playwright
  // test --workers=1 to guarantee zero cross-file interference with a single user account.

  timeout: 30_000, // Hard cap: every test must finish within 30s
  reporter: process.env.CI ? [['github'], ['html']] : 'html',

  // Global settings for all tests
  use: {
    baseURL: process.env.BASE_URL,
    headless: isHeadless,
    actionTimeout: 10_000, // Any single action (click, fill, waitFor) fails after 10s
    navigationTimeout: 30_000, // page.goto / page.waitForNavigation fail after 30s
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  // Projects configuration filtered dynamically by your .env choice
  projects: [
    //Define global setup project for authentication
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: authFile },
      dependencies: ['setup'], // Ensure setup runs before this project
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: authFile },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: authFile },
      dependencies: ['setup'],
    },
  ].filter((project) => {
    // 1. If VS Code is discovering or running tests, DO NOT filter anything out.
    // This keeps the extension UI perfectly happy.
    if (process.env.VSCODE_PID || process.env.PW_TEST_EXPLORER) {
      return true
    }

    // 2. Fallback for your manual command-line runs via terminal:
    if (!process.env.BROWSER) return true

    return project.name === 'setup' || project.name === process.env.BROWSER
  }),
})
