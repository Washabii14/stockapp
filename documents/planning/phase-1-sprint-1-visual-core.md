# Phase 1: Sprint 1 — The Visual Core (UI with Mock Data)

**Project Phase:** Sprint 1 — Core UI Implementation  
**Status:** Not Started  
**Last Updated:** —

---

## Current Context

The app shell, layout, Next.js routing, Zustand store, SWR setup, and Tailwind dark/glass theme are already scaffolded. We are using **mock data only**.

## Objective

Implement the UI for the Dashboard, Watchlist, and Asset Detail pages using **only** the existing mock data and Zustand store. Do **not** integrate real APIs (CoinGecko/Finnhub) or Firebase Firestore. Focus on component structure, Tailwind styling, and responsive design.

---

## Tasks

### 1. Dashboard Page (`/`)

- Build a responsive grid layout.
- **Portfolio Overview card** (glass-morphism):
  - Total balance from `getPortfolioValue()`.
  - 24h change from `getPortfolioChange()`.
- **Top Movers**:
  - Show a few mock assets sorted by absolute `changePercent24h`.
  - Define "top" as top 5 gainers and top 3 losers (or similar).
- **Optional:** Small Watchlist preview (top 3–4 items) for quick access.
- **Loading:** Use `.skeleton` while SWR `isLoading` is true.
- **Empty state:** If portfolio is empty, show a simple empty state with a CTA.

---

### 2. Watchlist Page (`/watchlist`)

- Build a clean, interactive table or list view from Zustand `watchlist`.
- **Remove** button per item that calls `removeFromWatchlist(symbol)`.
- **Empty state:** When watchlist is empty, show "No assets in watchlist" and a link to Markets or search.
- **Loading:** Use `.skeleton` while data loads (if applicable).

---

### 3. Asset Detail Page (`/assets/[symbol]`)

- **Dynamic route:** `app/assets/[symbol]/page.tsx`.
- **Asset header:**
  - Name, Symbol, Current Price, 24h %.
  - Use `getAssetBySymbol(symbol)` to resolve both stocks and crypto.
- **404 / Not Found:** If symbol is invalid, show a not-found page.
- **Chart:**
  - Use Recharts (LineChart or AreaChart) for price history.
  - Use mock OHLCV data for the selected timeframe.
  - Defer candlestick charts to a later sprint.
- **Timeframe selector:**
  - Tabs/buttons for 1D, 1W, 1M, 1Y, ALL.
  - Use `selectedTimeframe` and `setTimeframe` from Zustand.
- **Add to Watchlist:**
  - When asset is not in watchlist, show "Add to Watchlist" using `addToWatchlist()`.
  - When in watchlist, show "In Watchlist" or similar.
  - Use `isWatchlisted(symbol)` for state.
- **Loading:** Use `.skeleton` while SWR `isLoading` is true.

---

## Constraints

- Use shared Tailwind dark palette and `glass-card` styles.
- Keep components modular and reusable.
- Ensure layouts work on mobile.
- Use only mock data and Zustand; no real APIs or Firestore.

---

## Out of Scope (Sprint 1)

- Real API integration (CoinGecko, Finnhub).
- Firebase Firestore.
- Candlestick charts.
- Auth-gated features beyond what already exists.

---

## Definition of Done

Use this checklist to verify Phase 1 completion before marking the sprint done.

### Dashboard

| # | Criterion | Status |
|---|-----------|--------|
| D1 | Responsive grid layout implemented | ☐ |
| D2 | Portfolio Overview card shows total balance and 24h change | ☐ |
| D3 | Top Movers section displays mock assets (gainers/losers) | ☐ |
| D4 | Loading skeleton shown while data loads | ☐ |
| D5 | Empty state shown when portfolio is empty | ☐ |
| D6 | Uses glass-card styling and dark palette | ☐ |
| D7 | Mobile layout works correctly | ☐ |

### Watchlist

| # | Criterion | Status |
|---|-----------|--------|
| W1 | Table or list view reads from Zustand watchlist | ☐ |
| W2 | Remove button per item updates Zustand store | ☐ |
| W3 | Empty state shown when watchlist is empty | ☐ |
| W4 | Loading skeleton shown (if applicable) | ☐ |
| W5 | Uses glass-card styling and dark palette | ☐ |
| W6 | Mobile layout works correctly | ☐ |

### Asset Detail

| # | Criterion | Status |
|---|-----------|--------|
| A1 | Dynamic route `/assets/[symbol]` works | ☐ |
| A2 | Asset header shows Name, Symbol, Price, 24h % | ☐ |
| A3 | 404/not-found shown for invalid symbol | ☐ |
| A4 | Recharts line or area chart renders OHLCV data | ☐ |
| A5 | Timeframe selector (1D, 1W, 1M, 1Y, ALL) updates chart | ☐ |
| A6 | Add to Watchlist / In Watchlist toggle works | ☐ |
| A7 | Loading skeleton shown while data loads | ☐ |
| A8 | Uses glass-card styling and dark palette | ☐ |
| A9 | Mobile layout works correctly | ☐ |

### General

| # | Criterion | Status |
|---|-----------|--------|
| G1 | No real API integration; mock data only | ☐ |
| G2 | No Firestore integration | ☐ |
| G3 | No new dependencies added (except if needed for charts) | ☐ |
| G4 | No console errors or linter warnings introduced | ☐ |

---

## Progress Summary

| Category | Completed | Total | % |
|----------|----------|-------|---|
| Dashboard | 0 | 7 | 0% |
| Watchlist | 0 | 6 | 0% |
| Asset Detail | 0 | 9 | 0% |
| General | 0 | 4 | 0% |
| **Overall** | **0** | **26** | **0%** |

---

*Update the Status and Last Updated fields as work progresses. Check off Definition of Done items as they are completed.*
