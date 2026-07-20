---
description: 'Use when reading or updating .playwright-mcp/ reference files during test generation or live app inspection. Covers loading order, missing flow protocol, token efficiency, and locator update rules.'
---

# Playwright MCP Protocol

## Source of Truth

All UI details — routes, element locators, page states, element names, and flows — **must come from `.playwright-mcp/`** at the workspace root. Never assume, invent, or hardcode any app-specific data.

## Loading Order

Read only the files relevant to the current task. Do not load every file unconditionally.

1. **`.playwright-mcp/README.md`** — app identity, key locators, critical gotchas (always read first)
2. **`.playwright-mcp/app-map.json`** — routes, transitions, auth requirements
3. **`.playwright-mcp/pages/{nn}-{page}.json`** — exact elements, locators, and states for pages the task touches
4. **`.playwright-mcp/flows/{flow}.json`** — step sequences for flows the task covers

> **Manual test generation only:** use the `.md` versions of page files (`pages/{nn}-{page}.md`) and `app-map.md` instead of the `.json` equivalents.

## Missing Flow Protocol — STRICTLY ENFORCED

If a locator, state, or flow required by the task is **not found in any `.playwright-mcp/` file**:

1. Identify exactly what is missing (e.g. "wishlist item count locator not in `pages/09-wishlist.json`").
2. Use Playwright MCP browser tools to inspect **only that specific element/state** — navigate directly to the relevant URL.
3. Do **not** re-explore the whole app. Do not visit unrelated pages.
4. **After capturing the missing data, update the relevant `.playwright-mcp/` file** (pages or flows) before writing any code or test cases.

## Token Efficiency Rule

Use `playwright/browser_evaluate` with a precise JS query rather than `playwright/browser_snapshot` (full accessibility tree):

```js
// ✅ Targeted — cheap, returns only what you need
document.querySelector('.wishlist-count')?.textContent

// ❌ Expensive — avoid unless absolutely necessary
// playwright/browser_snapshot (full accessibility tree)
```

## Locator Update Rule

If a test fails because a locator has changed in the live app:

1. Use Playwright MCP browser tools to find the new correct locator for that specific element.
2. Update the locator in the page object.
3. **Also update the corresponding `.playwright-mcp/pages/` or `.playwright-mcp/flows/` file** so the reference stays accurate for future use.
