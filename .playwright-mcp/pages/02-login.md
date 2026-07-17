# Page: Login

## URL

- **Pattern**: `/login`
- **Full URL**: `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
- **Title**: `E-Commerce App`
- **Access**: Unauthenticated only — redirects to `/` if already logged in

---

## Elements

| Element             | Role/Locator                                                      | Notes                                                              |
| ------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Page heading        | `getByRole('heading', { level: 1, name: 'Login' })`               |                                                                    |
| Email field         | `getByRole('textbox', { name: 'Email Address' })`                 | `input[name="email"]`                                              |
| Password field      | `getByRole('textbox', { name: 'Password' })`                      | `input[name="password"]`                                           |
| Login submit button | `getByRole('button', { name: 'Login' })` inside `locator('form')` | i.e. `page.locator('form').getByRole('button', { name: 'Login' })` |
| Error message       | `getByText('Invalid email or password.')`                         | Shown after failed submit                                          |
| Sign Up link text   | `getByText("Don't have an account? Sign Up")`                     | Paragraph below form                                               |

---

## States

### Default (empty form)

- Email and Password inputs are empty
- No error message visible
- Login button is enabled

### Filled (credentials entered)

- Inputs contain values
- No error message
- Login button is active

### Error (wrong credentials)

- Error message visible: **"Invalid email or password."**
- Inputs retain their values
- Login button remains active
- Page stays on `/login`

### Success (correct credentials)

- Redirects to `/` (landing page)
- Navigation changes: Login button replaced by Profile + My Orders + Logout
- `getByRole('button', { name: 'My Orders' })` becomes visible

---

## Credentials (from .env)

```
USER_NAME=test@test.com
PASSWORD=Test@123
```

> Use `process.env.USER_NAME` and `process.env.PASSWORD` in tests — never hardcode.

---

## Auth Storage

After successful login, `auth.setup.ts` saves context to `.auth/user.json`.
All browser test projects depend on this setup project.

---

## Navigation

| Action                                    | Destination                  |
| ----------------------------------------- | ---------------------------- |
| Successful login                          | `/` (landing, authenticated) |
| Failed login                              | Stays on `/login` with error |
| Visit `/login` when already authenticated | Redirects to `/`             |

---

## Screenshots

- `snapshots/02-login.png` — default empty form
- `snapshots/02-login-error.png` — after wrong credentials
- `snapshots/02-login-filled.png` — credentials filled, before submit
