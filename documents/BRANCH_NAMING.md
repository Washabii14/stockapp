# Branch Naming Convention

## Format

```
<type>/<scope>-<short-description>
```

## Types

| Type | Use For | Example |
|------|---------|---------|
| `phase` | Phased/sprint work tied to planning docs | `phase/1-sprint-1-visual-core` |
| `feature` | New feature (post-planning) | `feature/portfolio-analytics` |
| `fix` | Bug fixes | `fix/watchlist-remove-state` |
| `chore` | Tooling, config, docs | `chore/update-deps` |

## Scope

- **Phase branches:** `1`, `2`, `3` (matches `phase-1`, `phase-2` in planning docs)
- **Feature branches:** Short slug, e.g. `dashboard`, `asset-detail`, `auth`

## Examples

| Branch | Purpose |
|--------|---------|
| `phase/1-sprint-1-visual-core` | Phase 1 — Dashboard, Watchlist, Asset Detail |
| `phase/2-api-integration` | Phase 2 — Real API integration |
| `feature/compare-assets` | Compare page feature |
| `fix/header-search-mobile` | Fix search on mobile |

## Phase 1 Branch

For Phase 1 (Sprint 1 — Visual Core):

```
phase/1-sprint-1-visual-core
```
