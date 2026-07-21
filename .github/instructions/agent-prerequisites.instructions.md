---
description: 'Shared pre-run checklist for all test-generation agents. Verify these items before running manual-test-generator or Playwright Test Generator.'
---

# Agent Prerequisites

Before running, verify the following exist at the workspace root:

| Requirement               | Location       | Purpose                                                                   |
| ------------------------- | -------------- | ------------------------------------------------------------------------- |
| `.env` file               | Workspace root | Contains `BASE_URL`, `API_URL`, `USER_NAME`, `PASSWORD`                   |
| `.playwright-mcp/` folder | Workspace root | Pre-captured app reference — must exist before any agent can run          |
| Node.js + Playwright      | Machine-level  | Run `npx playwright install` if tests have never been run on this machine |

`BASE_URL` — the UI app entry point (used by `playwright.config.ts` as `baseURL`).
`API_URL` — the REST API base URL (used by `BaseApiClient` for all API client calls).
`USER_NAME` / `PASSWORD` — credentials for both auth setup and the `apiContext` fixture.

See the **Project Pipeline** instructions (`.github/instructions/project-pipeline.instructions.md`) for the full workflow overview.

---

## Credential Rules — strictly enforced

- **Never** hardcode credential values in any generated file — code or test case.
- In generated TypeScript: always use `process.env.VARIABLE_NAME`.
- In manual TC `.md` files: use `$BASE_URL`, `$USER_NAME`, `$PASSWORD`.
- `$BASE_URL` appears **once only** per TC file, in the Preconditions section: `Navigate to $BASE_URL`.
