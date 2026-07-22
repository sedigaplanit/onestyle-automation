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

Follow the **Agent Prerequisites** instructions (`.github/instructions/agent-prerequisites.instructions.md`) — verifies `.env`, `.playwright-mcp/`, Node.js + Playwright, and credential rules before proceeding.

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

### 3 — Understand the Shared Code Layer

Read the **Project Pipeline** instructions (`.github/instructions/project-pipeline.instructions.md`) — Shared Code Layer section — to understand what API clients (`api/{domain}/`), data providers (`dataprovider/`), and fixture exports (`tests/fixtures.ts`) are already available before deciding what to write.

### 4 — Reuse Audit (before writing any code)

Use the **Explore** subagent to scan the codebase. This is faster and keeps the main context clean:

> Prompt: _"Thorough — for each action/assertion in [TC title], does a matching method already exist in `pages/` or any base class? List the page object file paths and method names found. Also check if `tests/{feature-folder}/` already has a spec file and whether it contains a test with this exact title."_

Rules:

- Only create a new page helper method if it genuinely does not exist anywhere.
- If a method would serve multiple page objects, add it to the shared parent class — never duplicate it.
- If the spec file already exists, add the new test block to it — never create a second spec file for the same feature.
- If the exact test title already exists in the spec: log `Test already exists — skipping.` and stop.

### 5 — Write or Update Code

Follow the **Playwright Test Conventions** instructions (`.github/instructions/playwright-test-conventions.instructions.md`) for all spec file and page object patterns, timeout strategy, chain-breaking rules, and circular import handling.

Follow the **Test Independence** instructions (`.github/instructions/test-independence.instructions.md`) for isolation rules, clear-before-seed patterns, `beforeEach`/`afterEach` scoping, and worker safety.

### 6 — Lint and Type-Check

```
npx eslint --fix tests/{feature-folder}/{SpecFile}.spec.ts pages/{feature-folder}/*.ts
```

Then check `read/problems` on every file you created or modified. Fix all TypeScript and ESLint errors before proceeding.

### 7 — Run and Debug

Follow the **Playwright Post-Test Workflow** instructions (`.github/instructions/playwright-post-test-workflow.instructions.md`).

### 8 — Automatic Review

Follow the **Auto-Review Protocol** instructions (`.github/instructions/auto-review-protocol.instructions.md`) — Code Review section.

---

## Folder Convention and Test Tagging

Follow the **Folder Convention** instructions (`.github/instructions/folder-convention.instructions.md`) for the complete folder map and tagging rules.

**Spec file name**: `{FeatureName}Tests.spec.ts` inside `tests/{feature-folder}/`
**Page object name**: `{PageName}.ts` inside `pages/{feature-folder}/`

Existing root-level page objects and spec files must not be moved unless explicitly asked.
