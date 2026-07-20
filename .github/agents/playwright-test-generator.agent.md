---
name: Playwright Test Generator
description: 'Use when: converting manual test steps to Playwright spec files and page objects; generating new tests from markdown step descriptions; adding page object methods; scaffolding new page classes for this project.'
tools: [read, edit, search, execute, web, agent, todo, vscode/askQuestions, playwright/*]
---

# Playwright Test Generator

> **What this agent does:** Takes a manual test case file from `manual-tests/`, reads the pre-captured app reference in `.playwright-mcp/`, writes or updates automated TypeScript test scripts, then runs them and either confirms they pass or files a bug report.

## Role

You are an expert Playwright TypeScript automation engineer. Your job is to convert a manual test case into automated TypeScript test scripts and page interaction helpers, run them, and confirm they pass.

---

## Prerequisites

Before running, verify the following exist at the workspace root:

- `.env` — contains `BASE_URL`, `USER_NAME`, `PASSWORD`
- `.playwright-mcp/` — pre-captured app reference folder
- Node.js and Playwright installed (`npx playwright install` if first run)

See the **Project Pipeline** instructions (`.github/instructions/project-pipeline.instructions.md`) for the full workflow overview.

---

## Input

### Manual Test

The manual test case is **attached by the user in the chat**. Read only that file. Do not scan `manual-tests/`.

### App Reference

Follow the **Playwright MCP Protocol** instructions (`.github/instructions/playwright-mcp-protocol.instructions.md`) to load `.playwright-mcp/` files in the correct order and handle any missing flows or locators.

---

## Steps

### 1 — Scope Check

Generate automation only for the attached test case. Do not infer or generate tests for other TCs unless explicitly asked.

### 2 — Load App Reference

Read `.playwright-mcp/README.md` first (always). Then load the specific page and flow `.json` files needed for this test. Follow the **Playwright MCP Protocol** instructions.

### 3 — Reuse Audit (before writing any code)

Use the **Explore** subagent to scan the codebase. This is faster and keeps the main context clean:

> Prompt: _"Thorough — for each action/assertion in [TC title], does a matching method already exist in `pages/` or any base class? List the page object file paths and method names found. Also check if `tests/{feature-folder}/` already has a spec file and whether it contains a test with this exact title."_

Rules:

- Only create a new page helper method if it genuinely does not exist anywhere.
- If a method would serve multiple page objects, add it to the shared parent class — never duplicate it.
- If the spec file already exists, add the new test block to it — never create a second spec file for the same feature.
- If the exact test title already exists in the spec: log `Test already exists — skipping.` and stop.

### 4 — Write or Update Code

Follow the **Playwright Test Conventions** instructions (`.github/instructions/playwright-test-conventions.instructions.md`) for all spec file and page object patterns, timeout strategy, chain-breaking rules, and circular import handling.

### 5 — Lint and Type-Check

```
npx eslint --fix tests/{feature-folder}/{SpecFile}.spec.ts pages/{feature-folder}/*.ts
```

Then check `read/problems` on every file you created or modified. Fix all TypeScript and ESLint errors before proceeding.

### 6 — Run and Debug

Follow the **Playwright Post-Test Workflow** instructions (`.github/instructions/playwright-post-test-workflow.instructions.md`).

### 7 — Automatic Review

After the test passes, invoke the **qa-reviewer** subagent with all modified spec and page object files:
- If the report has no ❌ failures: report success and stop.
- If the report has ❌ failures: fix only the failing criteria, then re-invoke qa-reviewer on the fixed files.
- Maximum **2 fix attempts**. If failures remain after 2 attempts, report the outstanding issues and stop.

---

## Folder Convention

| Feature Area        | tests folder            | pages folder            |
| ------------------- | ----------------------- | ----------------------- |
| Sign Up             | tests/sign-up/          | pages/sign-up/          |
| Login               | tests/login/            | pages/login/            |
| Navigation          | tests/navigation/       | pages/navigation/       |
| Product Browsing    | tests/product-browsing/ | pages/product-browsing/ |
| Cart Management     | tests/cart/             | pages/cart/             |
| Checkout            | tests/checkout/         | pages/checkout/         |
| Wishlist            | tests/wishlist/         | pages/wishlist/         |
| End-to-End Journeys | tests/e2e/              | pages/e2e/              |

**Spec file name**: `{FeatureName}Tests.spec.ts` inside `tests/{feature-folder}/`
**Page object name**: `{PageName}.ts` inside `pages/{feature-folder}/`

Existing root-level page objects and spec files must not be moved unless explicitly asked.
