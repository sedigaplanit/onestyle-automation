import { test, expect } from '../fixtures'

test.describe('System API', { tag: ['@api', '@system'] }, () => {
  test.describe.configure({ mode: 'serial' })
  test('GET /api/health returns 200 with status ok', { tag: '@smoke' }, async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/api/health`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})
