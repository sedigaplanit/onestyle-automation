---
description: 'Shared pre-run checklist for all test-generation agents. Verify these items before running manual-test-generator or Playwright Test Generator.'
---

# Agent Prerequisites

Before running any agent, verify the following exist at the workspace root:

| Requirement | Location | Purpose |
|---|---|---|
| `.env` file | Workspace root | Contains app credentials and base URLs |
| `.playwright-mcp/` folder | Workspace root | Pre-captured app reference — must exist before any agent can run |
| Node.js + Playwright | Machine-level | Run `npx playwright install` if tests have never been run on this machine |

---

## Required `.env` Variables

The `.env` file must define at minimum:

| Variable | Purpose | Example |
|---|---|---|
| `BASE_URL` | UI app entry point — used as `baseURL` in `playwright.config.ts` | `https://yourapp.example.com` |
| `API_URL` | REST API base URL — used by `BaseApiClient` for all HTTP calls | `https://api.yourapp.example.com` |
| `USER_NAME` | Primary test account email/username | `testuser@example.com` |
| `PASSWORD` | Primary test account password | _(stored in `.env`, never hardcoded)_ |

**For apps that use additional env variables** (e.g. `ADMIN_USER`, `SECONDARY_USER`, `API_KEY`): add them to `.env` and reference them via `process.env.VARIABLE_NAME` in code and `$VARIABLE_NAME` in manual TC files.

**Apps without an API layer** (pure UI, no backend): `API_URL` can be omitted. Remove the `apiContext` fixture usage from `tests/fixtures.ts` if no API clients are needed.

---

## `.playwright-mcp/` Initial Setup

The `.playwright-mcp/` folder must be created and populated before the agents can run. For a new app:

1. Create the folder structure:
   ```
   .playwright-mcp/
     README.md          ← App name, base URL, key locators, known gotchas
     app-map.md         ← All routes and how to navigate between them
     app-map.json       ← Same content in JSON for automated consumption
     pages/             ← One .json and .md file per page/feature area
     flows/             ← Step sequences for key user flows (login, primary journey)
   ```
2. Use Playwright MCP browser tools to navigate the app and capture element locators, route patterns, and page states.
3. Populate `README.md` first — it is always read first by both agents.
4. Add page files as you encounter features — start with auth pages and the main user journey.

If a required locator or state is missing at generation time, follow the **Missing Flow Protocol** in `playwright-mcp-protocol.instructions.md`.

---

## Credential Rules — strictly enforced

- **Never** hardcode credential values in any generated file — code or manual TC.
- In generated TypeScript: always use `process.env.VARIABLE_NAME`.
- In manual TC `.md` files: use `$BASE_URL`, `$USER_NAME`, `$PASSWORD`.
- `$BASE_URL` appears **once only** per TC file, in the Preconditions section: `Navigate to $BASE_URL`.
- For additional test accounts: use `$ADMIN_USER`, `$SECONDARY_USER` etc. — always match the `.env` variable name prefixed with `$`.
