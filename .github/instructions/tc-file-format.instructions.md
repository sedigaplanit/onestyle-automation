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

### Preconditions
- Navigate to $BASE_URL
- Concrete state descriptions (e.g. "User is not logged in", "Record has been created")
- Reference existing TC IDs for required state: "TC_FEATURE_001 has been executed"

### Test Steps
Numbered steps using exact UI labels, button text, and field names from .playwright-mcp/ reference

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
