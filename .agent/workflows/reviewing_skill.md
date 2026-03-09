---
description: How to review code changes and self-check implementations for the Stocks Analysis web app.
---

# Reviewing Skill: Self-Check and Code Review

Before finalizing any task or presenting it as "Done", review the code meticulously against these criteria:

## 1. Functionality Validation
- Does the code exactly implement the agreed-upon Definition of Done (DoD)?
- Does the logic cover edge cases?
  - What happens when the API returns an empty dataset or no data for a symbol?
  - What happens if the user has no stocks in their portfolio?
  - What happens if the market is closed and live prices are unavailable?
  - What happens on network failure mid-fetch?

## 2. Financial Data Correctness
- Are all displayed financial values (price, percentage change, P&L) calculated correctly?
- Are numbers rounded and formatted consistently for currency and percentage display?
- Is there any potential for displaying stale or incorrect data without informing the user?

## 3. Code Quality & Standards
- Are all async calls properly awaited and error-handled?
- Are there any hardcoded API keys, magic numbers, or financial constants that should be in a config?
- Is the code DRY (Don't Repeat Yourself)? Are duplicated calculation patterns abstracted into reusable utilities?

## 4. UI/UX Review
- Does the UI correctly reflect all data states: loading, error, empty, and success?
- Are chart axes labeled correctly with units (currency, %, dates)?
- Is the layout responsive and not broken at common screen sizes?

## 5. Security Check
- Is any sensitive data (API keys, user credentials) exposed in the frontend bundle or network requests?
- Is user-provided input (e.g., stock symbol search) validated and sanitized before use?

## Action
- Mentally trace the data flow from API call → data transformation → state update → UI render for each changed feature before concluding the task.
