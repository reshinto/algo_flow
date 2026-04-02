---
name: Defer quality checks until end
description: Do not run typecheck, lint, format, or tests during implementation — only at the final quality gate phase
type: feedback
---

Do not run `npm run typecheck`, `npm run lint`, `npm run format`, or `npm test` during algorithm implementation phases. Only run these at the final quality gate phase after ALL implementations are complete.

**Why:** Running these checks mid-implementation wastes time when there are known incomplete files. The user prefers to batch all quality checks at the end.

**How to apply:** During implementation phases, skip all lint/format/typecheck/test commands. Only run them in the dedicated quality gate phase (Phase 12 in the current plan).
