import { test, expect } from '@playwright/test'
import LandingPage from '../pages/LandingPage'

test.describe('Navigation Tests', () => {
  test('Verify Shop page loads with product listings', async ({ page }) => {
    const shopPage = await new LandingPage(page).init()
    expect(await shopPage.hasProductListings()).toBe(true)
  })

  test('Verify Men page loads with product listings', async ({ page }) => {
    const mensPage = await new LandingPage(page).init().then((_) => _.navigateToMensSection())
    expect(await mensPage.hasProductListings()).toBe(true)
  })

  test('Verify Women page loads with product listings', async ({ page }) => {
    const womensPage = await new LandingPage(page).init().then((_) => _.navigateToWomensSection())
    expect(await womensPage.hasProductListings()).toBe(true)
  })

  test('Verify Kids page loads with product listings', async ({ page }) => {
    const kidsPage = await new LandingPage(page).init().then((_) => _.navigateToKidsSection())
    expect(await kidsPage.hasProductListings()).toBe(true)
  })
})
