---
description: How to write robust, industrial-grade code for the Stocks Analysis web application.
---

# Coding Skill: Stocks Analysis Web App Best Practices

Always adhere to these coding standards when modifying source files in this project.

## 1. Error Handling
- Never silently swallow errors. All API call failures must be caught and surfaced to the user via a clear UI error state or notification.
- Use `try/catch` (or `.catch()`) for all async/Promise-based API calls.
- Log meaningful error messages to the console during development, but do not expose raw stack traces to the end user in production.

## 2. Financial Calculation Accuracy
- Use appropriate precision for financial numbers. Avoid floating-point arithmetic for critical monetary values; prefer rounding to the required number of decimal places at the final display step.
- Document the formula or business rule behind every financial calculation with an inline comment.
- Never hardcode financial constants (e.g., tax rates, fee percentages) inside components; use named constants in a dedicated config or constants file.

## 3. API Key & Secret Security
- **Never** commit API keys, secrets, or tokens into the source code.
- Always use environment variables (e.g., `.env` files) and ensure `.env` is listed in `.gitignore`.
- Use a clear naming convention: `VITE_STOCK_API_KEY`, `VITE_APP_*`, etc.

## 4. State Management & Data Flow
- Keep data-fetching logic in dedicated service/hook files, not directly in components.
- Ensure loading, error, and success states are always handled and represented in the UI.
- Avoid prop-drilling; use context, a state manager, or custom hooks for shared state.

## 5. Code Style & Readability
- Use descriptive variable names that reflect the financial domain (e.g., `openPrice`, `closingPriceChange`, `portfolioValue`).
- Add JSDoc/TSDoc comments to all exported functions describing params and return values.
- Group related functions logically within files and add section comments if a file grows large.
