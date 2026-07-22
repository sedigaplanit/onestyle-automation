---
description: 'Shared protocol for automatically invoking the qa-reviewer subagent after generation. Used by manual-test-generator (TC files) and Playwright Test Generator (spec/page files). Never skip this step.'
---

# Auto-Review Protocol

After every generation step, automatically invoke the **qa-reviewer** subagent on all produced or modified files. Never skip this step.

---

## TC File Review — manual-test-generator

Pass each new TC `.md` file **and the attached user story** as context to qa-reviewer.

| Outcome | Action |
| --- | --- |
| No ❌ failures | Proceed to pipeline handoff |
| Any ❌ failures | Fix only the failing criteria in the affected TC file, then re-invoke qa-reviewer on the fixed file |
| Failures remain after **2 fix attempts** | Report the outstanding issues alongside the TC file and stop |

> **Pipeline handoff:** Once all TC files are saved and pass review, inform the user they can attach any TC file to the **Playwright Test Generator** agent to automate the test.

---

## Code Review — Playwright Test Generator

Pass all modified `.spec.ts` and `pages/*.ts` files to qa-reviewer.

| Outcome | Action |
| --- | --- |
| No ❌ failures | Report success and stop |
| Any ❌ failures | Fix only the failing criteria, then re-invoke qa-reviewer on the fixed files |
| Failures remain after **2 fix attempts** | Report the outstanding issues and stop |
