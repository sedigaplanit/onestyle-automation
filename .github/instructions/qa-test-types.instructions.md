---
description: 'Use when generating or categorizing test cases for any application. Defines each test type with plain-English descriptions and generic examples applicable across domains.'
---

# QA Test Types

## How to Derive Test Cases

Do **not** generate one of each test type speculatively. Instead, work through the acceptance criteria one by one:

### Step A — Map ACs to Test Types

For each acceptance criterion (AC) in the user story, ask which test types it triggers:

| Question to ask about the AC                                    | Test type triggered    |
| --------------------------------------------------------------- | ---------------------- |
| Does it describe a successful action or outcome?                | Positive               |
| Does it mention an error, rejection, or validation?             | Negative               |
| Does it mention a minimum, maximum, or limit?                   | Boundary               |
| Does it describe state that should persist across navigation?   | State Consistency      |
| Does it apply to authenticated users only?                      | Unauthenticated Access |
| Could a user reach this page or state by typing a URL directly? | Direct URL Access      |

One AC can trigger multiple types. An AC that does not clearly trigger a type does not need a test for that type.

### Step B — Apply the Regression Suitability Filter

Before writing any test case, confirm it meets **all** of the following criteria:

| Criterion               | What it means                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| **Deterministic**       | The same steps always produce the same result — not dependent on random data or timing        |
| **Assertable**          | There is a specific, observable thing to verify (visible text, count, button state, redirect) |
| **Traceable**           | Directly tied to a stated acceptance criterion — not invented beyond what the AC says         |
| **Stable**              | Can run repeatedly without manual data setup or environment-specific conditions               |
| **Not already covered** | A different TC does not already test this exact behaviour (checked in the reuse audit)        |

**Skip the test and log a reason** if it fails any criterion. Examples of what to skip:

- "Check if the page looks correct" — no assertable criterion
- "Verify the page loads quickly" — performance, requires special tooling
- "Explore the cart and see if anything seems wrong" — exploratory, not deterministic
- Anything not tied to a specific AC

---

## Test Type Definitions

The six types that may be triggered by an AC:

---

## Positive — Happy Path

The main flow works as expected when the user does everything correctly.

> **Example:** User fills in all required fields and submits a form → success message is shown and data is saved correctly.

---

## Negative — Invalid or Rejected Action

The app handles incorrect or incomplete actions gracefully — an error is shown, nothing is broken, no unintended state change occurs.

> **Example:** User submits a form with a required field left empty → the field is highlighted with an error message; no data is submitted.

---

## Boundary — Minimum or Maximum Limit

Behaviour at the edge of an allowed range of values.

> **Example:** User enters a value of 0 in a quantity field that requires a minimum of 1 → the input is rejected or corrected to the minimum allowed value.

---

## State Consistency — Navigate Away and Return

State is correctly preserved when the user leaves a page and comes back.

> **Example:** User partially fills a multi-step form, navigates to a different section, then returns → previously entered values are still present.

---

## Unauthenticated Access — Guest User

Features that require login are correctly protected. A guest user (not logged in) sees a prompt or redirect, not the protected content.

> **Example:** An unauthenticated user navigates to a page that requires login → the app redirects to the login page or shows an access-denied message.

---

## Direct URL Access — Bypassing Normal Navigation

Behaviour when a user goes directly to a URL without clicking through the normal flow.

> **Example:** User types a protected page URL directly into the browser → the app loads the page correctly for authenticated users, or redirects to login for unauthenticated users.

---

## Output Rule

Every test case that passes the regression suitability filter must include `Tags: Regression` in its Notes and Assumptions section.
