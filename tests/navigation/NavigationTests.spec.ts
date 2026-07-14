import { test, expect } from '../fixtures'
import LandingPage from '../../pages/landing/LandingPage'

test.describe('Navigation Tests', () => {
  test('Verify Shop page loads with product listings', async ({ open }) => {
    const shopPage = await open(LandingPage)
    expect(await shopPage.hasProductListings()).toBe(true)
  })

  test('Verify Men page loads with product listings', async ({ open }) => {
    const mensPage = await open(LandingPage).then((_) => _.navigateToMensSection())
    expect(await mensPage.hasProductListings()).toBe(true)
  })

  test('Verify Women page loads with product listings', async ({ open }) => {
    const womensPage = await open(LandingPage).then((_) => _.navigateToWomensSection())
    expect(await womensPage.hasProductListings()).toBe(true)
  })

  test('Verify Kids page loads with product listings', async ({ open }) => {
    const kidsPage = await open(LandingPage).then((_) => _.navigateToKidsSection())
    expect(await kidsPage.hasProductListings()).toBe(true)
  })
})
