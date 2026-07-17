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

// 3. Cast string configurations into their correct primitive types
const isHeadless = process.env.HEADLESS === 'true'
const targetBrowser = process.env.BROWSER || 'chromium'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: 30_000, // Hard cap: every test must finish within 30s
  reporter: 'html',

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
