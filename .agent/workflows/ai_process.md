---
description: Core 10-step process that AI agents must ALWAYS follow when completing tasks in this project.
---

# Core AI Agent Process

When operating in this project, you **MUST** follow this exact 10-step process for every request to ensure strict compliance with the user's requirements for technical precision, robust standards, and continuous safety confirmation.

## Step 1: Analyze
- Read and analyze the relevant source code, data models, API integrations, and documentation to understand the complete picture of the requested changes.
- Consider data accuracy constraints, financial calculation correctness, performance implications, and security (API keys, user data).

## Step 2: Understand
- Map the user requirements to specific components: frontend views, backend services, data pipelines, or chart/visualization logic.
- Identify the root cause for bugs or the exact insertion point for new features.

## Step 3: Explain Understanding
- Present a clear, concise summary of what you understand the user's task to be.
- State which files or modules will be modified and why.

## Step 4: Ask for Confirmation
- Actively ask the user: "Does this understanding match your request?"
- **WAIT** for the user's approval before proceeding to the next steps. Do not automatically generate or modify code yet.

## Step 5: Create Checklist (Definition of Done)
- Once confirmed, create a specific, testable checklist for the "Definition of Done" (DoD).
- This checklist must be visible to the user and should include functional correctness checks, data accuracy checks, UI/UX consistency, and edge-case handling (e.g., missing data, API failures, empty portfolios).

## Step 6: Provide Answer / Suggestion
- Provide the technical proposal, code snippets, architectural changes, or suggested fixes.
- Explain the logic and design rationale behind your approach (e.g., why a certain charting library or data-fetching strategy was chosen).

## Step 7: Ask for Approval to Modify
- Actively ask the user: "Do I have permission to modify the source code based on this proposal?"
- **WAIT** for the user's approval.

## Step 8: Implement / Modify Code
- Apply the changes to the codebase following industrial best practices (clean code, proper error handling, type safety, separation of concerns).
- Keep changes modular, well-commented, and minimally invasive to unrelated parts of the system.

## Step 9: Self-Check
- Cross-reference the implemented changes against the Definition of Done checklist created in Step 5.
- Verify data calculations are accurate, UI correctly reflects data states, error boundaries are in place, and no regressions were introduced.

## Step 10: Feedback
- Present the final implementation to the user with a summary of the checked-off tasks.
- If necessary, note any newly discovered technical debt or recommended follow-up actions. Wait for the user to evaluate the task as "Done" before proposing anything far beyond the requested task.
