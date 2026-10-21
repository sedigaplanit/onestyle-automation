# AI RnD Automation Suite

## Docker

This project runs as a Playwright test runner container rather than a long-lived web service.

1. Create a local env file:

```bash
cp .env.example .env
```

2. Build the image:

```bash
docker compose build
```

3. Run the commands you need:

```bash
docker compose run --rm lint
docker compose run --rm typecheck
docker compose run --rm api-tests
docker compose run --rm ui-chromium
docker compose run --rm ui-firefox
docker compose run --rm ui-webkit
docker compose run --rm ui-all
docker compose run --rm full-suite
```

Reports are written back to `playwright-report/`, `test-results/`, and `blob-report/` on the host.

If you want CI-style reporters and retry behavior locally, prefix any command with `CI=true`.
