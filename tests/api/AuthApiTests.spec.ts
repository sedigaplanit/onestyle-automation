import { test, expect } from '../fixtures'
import AuthApiClient from '@api/auth/AuthApiClient'
import { request as baseRequest } from '@playwright/test'
import { getAuthCredentials } from '../getAuthCredentials'

test.describe('Auth API', { tag: ['@api', '@auth'] }, () => {
  test.describe.configure({ mode: 'serial' })
  test(
    'POST /api/auth/login with valid credentials returns 200 and a token',
    { tag: '@smoke' },
    async () => {
      // test.slow(): the Render-hosted auth API can cold-start and exceed the default test timeout.
      test.slow()

      const ctx = await baseRequest.newContext()
      try {
        const client = new AuthApiClient(ctx)
        const { email, password } = getAuthCredentials()
        const res = await client.login({ email, password })

        expect(res.status).toBe(200)
        expect(res.data.token).toBeTruthy()
        expect(res.data.user.email).toBe(email)
      } finally {
        await ctx.dispose()
      }
    }
  )

  test('POST /api/auth/login with invalid password returns 401', async () => {
    const ctx = await baseRequest.newContext()
    const client = new AuthApiClient(ctx)
    const res = await client.login({ email: process.env.USER_NAME!, password: 'wrong-password' })
    expect(res.status).toBe(401)
    await ctx.dispose()
  })

  test('POST /api/auth/login with missing email returns 400', async () => {
    const ctx = await baseRequest.newContext()
    const client = new AuthApiClient(ctx)
    const res = await client.login({ email: '', password: process.env.PASSWORD! })
    expect(res.status).toBe(400)
    await ctx.dispose()
  })

  test(
    'GET /api/auth/me returns the authenticated user profile',
    { tag: '@smoke' },
    async ({ apiContext }) => {
      const res = await apiContext.auth.getMe()
      expect(res.status).toBe(200)
      expect(res.data.user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      })
    }
  )

  test('GET /api/auth/me without token returns 401', async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/api/auth/me`)
    expect(res.status()).toBe(401)
  })

  test('POST /api/auth/logout returns 200', async ({ apiContext }) => {
    const res = await apiContext.auth.logout()
    expect(res.status).toBe(200)
    expect(res.data.message).toBeTruthy()
  })

  test('PUT /api/auth/profile updates profile and returns 200 with new token', async ({
    apiContext,
  }) => {
    const meRes = await apiContext.auth.getMe()
    const originalName = meRes.data.user.name
    // Update with the same name to avoid a side-effect; verifies the endpoint works
    const res = await apiContext.auth.updateProfile({ name: originalName })
    expect(res.status).toBe(200)
    expect(res.data.user.name).toBe(originalName)
    expect(res.data.token).toBeTruthy()
  })

  test('PUT /api/auth/profile with name shorter than 3 chars returns 400', async ({
    apiContext,
  }) => {
    const res = await apiContext.auth.updateProfile({ name: 'AB' })
    expect(res.status).toBe(400)
  })

  test('PUT /api/auth/profile without token returns 401', async ({ request }) => {
    const res = await request.put(`${process.env.API_URL}/api/auth/profile`, {
      data: { name: 'Test User' },
    })
    expect(res.status()).toBe(401)
  })
})
