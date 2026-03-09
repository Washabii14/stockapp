---
description: How to plan features and changes for the My Stocks Analysis web application.
---

# Planning Skill: Stocks Analysis Web App

When planning new features or modifications for this project, follow these guidelines:

## 1. Modularity & Separation of Concerns
- Separate data-fetching logic, business/calculation logic, and UI rendering into distinct layers or modules.
- Do not mix financial calculations directly inside UI components; use dedicated service/util files.
- New features should be isolated in their own module/component/directory before integrating.

## 2. Data Accuracy & Financial Correctness
- Always plan how financial data will be fetched, cached, and validated.
- Identify the data sources (e.g., stock market APIs) and their rate limits, staleness tolerance, and failure modes.
- Plan for graceful degradation when live data is unavailable (e.g., use last-known-good cached data with a clear indicator to the user).

## 3. API Integration
- Document which external API endpoints will be called, the expected request/response shapes, and authentication mechanism (API key handling).
- Never hardcode API keys in source files. Plan to use environment variables.

## 4. UI/UX Consistency
- New UI elements must align with the existing design language (colors, typography, chart styles, layout).
- Mobile responsiveness must be part of the plan if any frontend changes are involved.

## 5. Documentation First
- Part of the plan MUST include updating `README.md` or inline documentation to reflect any new configuration, data sources, or environment variables introduced.

## Checklist for Planning
- [ ] Is the new module/feature functionally isolated?
- [ ] Is the data source identified and its failure mode handled?
- [ ] Are API keys and secrets kept out of source code?
- [ ] Is UI/UX consistency maintained?
- [ ] Are documentation updates included in the plan?
