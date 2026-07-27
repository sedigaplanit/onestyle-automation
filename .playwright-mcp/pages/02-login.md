# Page: Login

## URL

- **Pattern**: `/login`
- **Full URL**: `https://sedigaplanit.github.io/AI-R-D---Github-copilot/login`
- **Title**: `E-Commerce App`
- **Access**: Unauthenticated only — redirects to `/` if already logged in

---

## Elements

| Element             | Role/Locator                                                      | Notes                                                                                           |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Page heading        | `getByRole('heading', { level: 1, name: 'Login' })`               |                                                                                                 |
| Email field         | `getByRole('textbox', { name: 'Email Address' })`                 | `input[name="email"]`                                                                           |
| Password field      | `getByRole('textbox', { name: 'Password' })`                      | `input[name="password"]`                                                                        |
| Login submit button | `getByRole('button', { name: 'Login' })` inside `locator('form')` | i.e. `page.locator('form').getByRole('button', { name: 'Login' })`                              |
| Error message       | `getByText('Invalid email or password.')`                         | Shown after failed submit                                                                       |
| Sign Up link text   | `getByText("Don't have an account? Sign Up")`                     | Paragraph below form; click `locator('.loginsignup-switch span:has-text("Sign Up")')` to toggle |

---

## Sign Up Form (toggled state)

Displayed on the same `/login` page after clicking the "Sign Up" span. Heading changes to "Sign Up".

| Element                | Role/Locator                                              | Notes                                                                        |
| ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Page heading           | `getByRole('heading', { level: 1, name: 'Sign Up' })`     |                                                                              |
| Name field             | `getByRole('textbox', { name: 'Your Name' })`             | Required; min 3 chars                                                        |
| Email field            | `getByRole('textbox', { name: 'Email Address' })`         | Required; email format                                                       |
| Gender dropdown        | `getByRole('combobox')`                                   | Options: Select Gender / Male / Female / Other / Prefer not to say; required |
| Mobile field           | `getByRole('textbox', { name: 'Mobile Number' })`         | Required; 7–20 chars, digits/+/spaces/brackets/dots/dashes                   |
| Password field         | `getByRole('textbox', { name: 'Password', exact: true })` | Required; min 6 chars                                                        |
| Confirm Password field | `getByRole('textbox', { name: 'Confirm Password' })`      | Required; must match Password                                                |
| Address field          | `getByRole('textbox', { name: 'Address (optional)' })`    | Optional; no validation                                                      |
| Sign Up submit button  | `getByRole('button', { name: 'Sign Up' })`                | Becomes "Creating Account..." + disabled during submission                   |
| Toggle to Login text   | `getByText('Already have an account? Login')`             | Click `locator('.loginsignup-switch span:has-text("Login")')` to toggle      |

### Sign Up Validation Error Messages (captured from live app 2026-07-24)

| Field            | Trigger              | Error Message                |
| ---------------- | -------------------- | ---------------------------- |
| Name             | Empty                | Required                     |
| Name             | < 3 characters       | Must be 3 characters or more |
| Email            | Empty                | Required                     |
| Email            | Invalid format       | Invalid email address        |
| Gender           | Not selected         | Please select a gender       |
| Mobile           | Empty                | Required                     |
| Mobile           | Invalid format       | Enter a valid mobile number  |
| Password         | Empty                | Required                     |
| Password         | < 6 characters       | Must be 6 characters or more |
| Confirm Password | Empty                | Required                     |
| Confirm Password | Mismatch with Passw. | Passwords do not match       |

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
