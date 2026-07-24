#!/usr/bin/env node

import { pathToFileURL } from 'node:url'
import path from 'node:path'

const FALLBACK_PRIORITIES = [
  'getByRole(role, { name })',
  'getByLabel(labelText)',
  'getByPlaceholder(text)',
  'getByText(text)',
  "locator('css')",
]

function classifyFailure({ error = '', specFile = '', testTitle = '' }) {
  const message = String(error || '').trim()

  if (
    /(strict mode violation|multiple elements|locator.*failed|resolve.*element|no element found|selector.*not found)/i.test(
      message
    )
  ) {
    return {
      verdict: 'heal_locator',
      confidence: 'high',
      reason:
        'The failure looks like a locator drift or selector ambiguity that can be recovered by trying a higher-priority semantic locator strategy.',
      context: { specFile, testTitle },
    }
  }

  if (/(Timeout|timed out|waiting for selector|waiting for element)/i.test(message)) {
    return {
      verdict: 'heal_wait',
      confidence: 'medium',
      reason:
        'The failure looks like a state or visibility timing issue that can be recovered with a more resilient wait strategy.',
      context: { specFile, testTitle },
    }
  }

  if (/(Expected .*received|toHave|toEqual|toContain|toBeTruthy)/i.test(message)) {
    return {
      verdict: 'report_bug',
      confidence: 'medium',
      reason:
        'The failure appears to be an assertion mismatch rather than a locator issue, which should be reviewed as a product or test bug.',
      context: { specFile, testTitle },
    }
  }

  return {
    verdict: 'ignore',
    confidence: 'low',
    reason: 'The failure signature is not confidently classified by the runtime healing policy.',
    context: { specFile, testTitle },
  }
}

function buildRecoveryPlan({ target = 'UI element', failureType = 'unknown', selectors = [] }) {
  const orderedFallbacks = [...selectors, ...FALLBACK_PRIORITIES].filter(
    (value, index, list) => value && list.indexOf(value) === index
  )

  if (failureType === 'strict-mode' || /strict/i.test(failureType)) {
    return {
      kind: 'locator',
      target,
      strategy: 'prefer exact semantic locators, then narrow with fallback selectors',
      fallbacks: orderedFallbacks,
    }
  }

  if (failureType === 'timeout' || /timeout/i.test(failureType)) {
    return {
      kind: 'wait',
      target,
      strategy: 'retry on the same page state with a bounded poll before giving up',
      fallbacks: orderedFallbacks,
    }
  }

  return {
    kind: 'assertion',
    target,
    strategy: 'document a bug report and inspect the expected vs actual app state',
    fallbacks: orderedFallbacks,
  }
}

function runRuntimeRecovery({ error = '', specFile = '', testTitle = '', selectors = [] }) {
  const classification = classifyFailure({ error, specFile, testTitle })
  const failureType =
    classification.verdict === 'heal_locator' ? 'strict-mode' : classification.verdict

  return {
    classification,
    recoveryPlan: buildRecoveryPlan({
      target: testTitle || 'UI element',
      failureType,
      selectors,
    }),
  }
}

export { classifyFailure, buildRecoveryPlan, runRuntimeRecovery, FALLBACK_PRIORITIES }

const isDirectInvocation = (() => {
  const invokedPath = process.argv[1]
  if (!invokedPath) return false
  return import.meta.url === pathToFileURL(path.resolve(invokedPath)).href
})()

if (isDirectInvocation) {
  const args = process.argv.slice(2)
  const payload = args[0] ? JSON.parse(args[0]) : {}
  console.log(JSON.stringify(runRuntimeRecovery(payload), null, 2))
}
