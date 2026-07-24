import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyFailure, buildRecoveryPlan } from './self-heal-runtime.mjs'

test('classifies selector drift as recoverable', () => {
  const outcome = classifyFailure({
    error: 'locator.click: Error: strict mode violation: locator("button").click()',
    specFile: 'tests/checkout/CheckoutTests.spec.ts',
    testTitle: 'opens checkout modal',
  })

  assert.equal(outcome.verdict, 'heal_locator')
  assert.equal(outcome.confidence, 'high')
})

test('builds a recovery plan with prioritized locator fallbacks', () => {
  const plan = buildRecoveryPlan({
    target: 'Checkout modal',
    failureType: 'strict-mode',
    selectors: ['button.checkout-submit', 'getByRole("button", { name: "Proceed to Checkout" })'],
  })

  assert.equal(plan.kind, 'locator')
  assert.ok(plan.fallbacks.includes('getByRole("button", { name: "Proceed to Checkout" })'))
})
