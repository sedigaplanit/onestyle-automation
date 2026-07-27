---
description: 'Canonical template for manual TC .md files — section structure, file naming, and reserved prefixes. Used by manual-test-generator (output) and qa-review-criteria (completeness check).'
---

# TC File Format

## Section Template

Every TC file must contain exactly these 9 sections, all non-empty:

```
### Test Case ID
TC_{PREFIX}_{NNN}

### Test Case Title
Short descriptive title

### Feature Area
The feature name derived from the user story (e.g. Authentication, User Profile, Search,
Checkout, Dashboard, Notifications, End-to-End Journey, Negative and Edge Cases, Unverified Workflows)

### Priority
High / Medium / Low

**Priority definitions:**

| Priority | Assign when the scenario… | Examples |
|---|---|---|
| **High** | Covers a core user journey, auth gate, or data-integrity concern — failure blocks the app's primary value proposition | Login/Logout, Place order, Delete account, Payment flow, Protected route access |
| **Medium** | Covers an important feature that affects usability but is not a blocker for the core journey | Sort order, Empty state display, Navigation from a secondary screen, Form field validation |
| **Low** | Covers a minor UX detail, cosmetic element, or edge case unlikely to block a user | Auto-redirect timer, Minor label wording, Optional field behaviour, Browser-specific gotcha |

### Preconditions
- Navigate to $BASE_URL
- Concrete state descriptions (e.g. "User is not logged in", "Record has been created")
- Reference existing TC IDs for required state: "TC_FEATURE_001 has been executed"

### Test Steps
Numbered steps using exact UI labels, button text, and field names from .playwright-mcp/ reference

**Step writing rules — strictly enforced:**
- Every step **must begin with one of these approved verbs — no other verb may start a step:**

  | Category | Approved verbs | When to use |
  |---|---|---|
  | Basic interaction | **Click** | Buttons, links, checkboxes, radio buttons, menu items |
  | Text input | **Enter**, **Fill in** | Text fields, textareas, search boxes |
  | Selection | **Select** | Dropdowns (select elements), listboxes, comboboxes |
  | Keyboard | **Press** | Single keys (Enter, Escape, Tab, F5, F12) and combinations (Ctrl+A) |
  | Pointer | **Hover over** | Tooltips, dropdown menus that open on hover, context menus |
  | Pointer | **Double-click** | Double-tap actions, inline edit triggers |
  | Scrolling | **Scroll to** | Bring an off-screen element into view before interacting |
  | Drag and drop | **Drag**, **Drop onto** | Kanban boards, sortable lists, file drop zones |
  | File | **Attach** | File upload inputs (`<input type="file">`) |
  | Timing | **Wait for** | Explicit pauses for async transitions, loading spinners to disappear |
  | Content inspection | **Locate** | Find a specific element on screen before reading or noting its value |
  | Content inspection | **Read** | Look at and record text content — use when the value is obvious without needing two values to compare |
  | Value recording | **Note** | Capture a value that will be compared in a later step |
  | Comparison | **Compare** | Evaluate two named values against each other |

- **Any step beginning with a word not in the table above is a ❌ failure.** Common words that look active but are **banned**: *Observe, Confirm, Check, Verify, Ensure, Type, Open, Navigate, Go to, View, See, Inspect, Look, Find, Make sure, Ensure, Validate*.

- **One action per step.** Each numbered step must contain exactly one user action. Split compound instructions across multiple numbered steps.
  ```
  ❌ "Click the Settings icon and select 'Account' from the menu."
  ✅ 1. Click the Settings icon.
     2. Click "Account" in the dropdown menu.
  ```

- Never write "Observe X", "Confirm X is visible", or "Look for X" as standalone steps — what the user sees after an action belongs in the Expected Result section.
- State verification before an action (e.g. "Confirm the modal is open") is not a step — it belongs in Preconditions.
- **"Check X" is banned as a standalone step.** Use the specific verb that describes the intent:
  - To find and read content → **`Locate`** or **`Read`**: *"Locate the first order card and read its order number."*
  - To record a value for later → **`Note`**: *"Note the order number on the topmost card."*
  - To compare two values → **`Compare`**: *"Compare the noted order number against the value in Preconditions."*
  - "Check" is only acceptable when it names two things being compared: *"Check that the order number matches the value noted in Preconditions."*
- **Navigate between pages using UI elements** (navbar links, buttons, clickable cards) — never by typing a URL in steps. The two allowed exceptions are: (1) `Navigate to $BASE_URL` in Preconditions as the initial app entry point, and (2) steps in a Direct URL Access test that deliberately bypass normal navigation.

### Expected Result
Numbered expected result per step, plus a summary of overall expected behaviour

### Notes and Assumptions
- Tags: Regression
- Any assumptions about app state or known limitations from .playwright-mcp/

### Defect Opportunity
Potential failure points observed or inferred from .playwright-mcp/ notes and gotchas
```

---

## File Naming

```
manual-tests/{feature-folder}/TC_{PREFIX}_{NNN}_{short-description}.md
```

Short description: lowercase kebab-case, 3–6 words summarising what the test validates.

---

## Deriving Folder and Prefix

| Rule                                                               | Example                                           |
| ------------------------------------------------------------------ | ------------------------------------------------- |
| Folder: kebab-case of the feature area                             | `authentication`, `checkout`, `wishlist`          |
| Prefix: uppercase of the feature name (full word, no truncation)   | `TC_AUTH_*`, `TC_CHECKOUT_*`, `TC_WISHLIST_*`     |

**Sequence number:** find the highest existing `{NNN}` in the target subfolder and increment by 1. Never overwrite an existing file.

---

## Reserved Prefixes

The following prefixes are reserved across all domains:

| Purpose                                         | Folder           | Prefix            |
| ----------------------------------------------- | ---------------- | ----------------- |
| Authentication (login, sign-up, password reset) | `authentication` | `TC_AUTH_*`       |
| Navigation and routing                          | `navigation`     | `TC_NAV_*`        |
| End-to-End user journeys                        | `e2e`            | `TC_E2E_*`        |
| Negative and edge cases                         | `negative-edge`  | `TC_NEG_*`        |
| Unverified or exploratory workflows             | `unverified`     | `TC_UNVERIFIED_*` |

All other feature areas derive their folder and prefix from the feature name in the user story.
