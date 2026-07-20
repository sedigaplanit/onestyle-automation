---
description: 'Use when understanding how the agents work together. Explains the two-stage test automation workflow, what each agent does, the inputs and outputs at each stage, prerequisites, and the shared app reference.'
---

# Project Pipeline

## Overview

This project uses two agents in sequence to go from a written user story to fully automated browser tests.

```
User Story (.md file)
        ↓
  manual-test-generator
        ↓
  manual-tests/ folder  (one .md file per scenario, readable by any QA engineer)
        ↓
  Playwright Test Generator
        ↓
  tests/ and pages/ folders  (TypeScript code that runs automatically in CI)
```

---

## Stage 1 — manual-test-generator

|                  |                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------- |
| **You attach**   | A user story file in the chat                                                             |
| **Agent reads**  | The user story + the pre-captured app reference in `.playwright-mcp/`                     |
| **Agent writes** | One `TC_{PREFIX}_{NNN}_{description}.md` file per scenario into `manual-tests/{feature}/` |
| **A human can**  | Pick up those files and run the tests manually — no code knowledge needed                 |

The agent derives test scenarios covering normal use, error handling, edge cases, and permission checks. It checks for existing test cases first and never creates duplicates.

---

## Stage 2 — Playwright Test Generator

|                  |                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **You attach**   | One manual test case file from `manual-tests/` in the chat                                       |
| **Agent reads**  | The test case + the pre-captured app reference in `.playwright-mcp/`                             |
| **Agent writes** | Updated TypeScript code in `tests/{feature}/` (spec) and `pages/{feature}/` (page helpers)       |
| **Agent then**   | Runs the test, fixes failures up to 3 times, or files a bug report and marks the test as skipped |
| **A human can**  | Review the code, re-run with `npx playwright test` at any time                                   |

The agent checks existing code first and only adds what is genuinely missing — it will never create a duplicate test or duplicate a page helper method.

---

## Shared App Reference — `.playwright-mcp/`

Both agents read pre-captured snapshots of the live application. This means they don't need to browse the whole app from scratch on every run — they already know the page structure, routes, and element locations.

| File / Folder            | What it contains                                                           |
| ------------------------ | -------------------------------------------------------------------------- |
| `README.md`              | App name, key element locators, known quirks to be aware of                |
| `app-map.json`           | All pages and routes, and how to navigate between them                     |
| `pages/{nn}-{page}.json` | Exact UI elements on each page and how to locate them                      |
| `flows/{flow}.json`      | Step-by-step interaction sequences (e.g. login flow, primary user journey) |

If a required piece of information is missing from these files, the agent uses the live browser (via Playwright MCP) to inspect only that specific missing element, updates the reference file, and then continues — it does not re-explore the whole app.

---

## Prerequisites

Both agents require these to be in place before running:

| Requirement               | Location       | Purpose                                                                   |
| ------------------------- | -------------- | ------------------------------------------------------------------------- |
| `.env` file               | Workspace root | Contains `BASE_URL`, `USER_NAME`, `PASSWORD`                              |
| `.playwright-mcp/` folder | Workspace root | Pre-captured app reference — must exist before agents can run             |
| Node.js + Playwright      | Machine-level  | Run `npx playwright install` if tests have never been run on this machine |

Credentials are never hardcoded in any generated file — always referenced as `$BASE_URL` / `process.env.USER_NAME`.
