## Documentation Rules

### Documentation Structure

Documentation is split across README.md (landing page) and docs/ (detailed guides):

- `README.md` — project overview, quick start, scripts, keyboard shortcuts, documentation guide
- `docs/glossary.md` — key terms and type definitions for the codebase
- `docs/architecture.md` — tech stack, data flow, state management, project structure
- `docs/contributing.md` — prerequisites, branch workflow, algorithm walkthrough, tracker API, troubleshooting
- `docs/testing.md` — unit tests, E2E, Storybook, Chromatic setup, coverage thresholds
- `docs/deployment.md` — Docker, CI/CD pipeline details
- `docs/debugging.md` — troubleshooting and diagnostic workflows for common failures
- `docs/design-system.md` — colors, typography, breakpoints, component patterns, accessibility
- `docs/educational-content-guide.md` — how to write effective educational content
- `docs/claude-system.md` — agents, skills, session hooks, plugins
- `docs/algorithms-catalog.md` — full algorithm listing by category with technique subcategories

### Doc Template Requirements

Every doc file must follow this structure:

1. **Back link**: `[← Back to README](../README.md)`
2. **Title**: `# <Doc Title>`
3. **Plain-language intro**: 1-2 sentences explaining what this doc covers and who it is for
4. **Prerequisites callout**: `> [!NOTE]` block listing what the reader should have read first
5. **Contents section**: `## Contents` with anchor links to all major sections
6. **Body sections**: Tables for reference, prose for concepts, numbered steps for procedures
7. **See Also footer**: Cross-links to related docs

### When to Update Documentation

Update the relevant doc file(s) whenever changes affect what a user or contributor needs to know:

| What Changed                             | Update                                                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| New algorithm added                      | `docs/algorithms-catalog.md`, `README.md` (algorithm count), `docs/contributing.md` (if new category/tracker), `docs/testing.md` (story count) |
| New npm dependency or dev tool           | `docs/architecture.md` (tech stack table), `README.md` (scripts table if new command added)                                                    |
| New or changed npm script                | `README.md` (scripts table)                                                                                                                    |
| CI/CD workflow changes                   | `docs/deployment.md` (pipeline tables)                                                                                                         |
| Docker or deploy config changes          | `docs/deployment.md`                                                                                                                           |
| Testing library or strategy changes      | `docs/testing.md`                                                                                                                              |
| New component or visualizer              | `docs/architecture.md` (project structure if new directory)                                                                                    |
| Store slice changes                      | `docs/architecture.md` (state management table)                                                                                                |
| New tracker or tracker API changes       | `docs/contributing.md` (tracker table)                                                                                                         |
| Keyboard shortcuts added/changed         | `README.md` (shortcuts table)                                                                                                                  |
| Input editor added/changed               | `docs/architecture.md` (input editors table)                                                                                                   |
| New agent, skill, or hook added/modified | `docs/claude-system.md`                                                                                                                        |
| CSS custom property or design token      | `docs/design-system.md`                                                                                                                        |
| New glossary-worthy concept              | `docs/glossary.md`                                                                                                                             |
| New debugging pattern discovered         | `docs/debugging.md`                                                                                                                            |
| Educational content pattern changes      | `docs/educational-content-guide.md`                                                                                                            |
| Coverage thresholds changed              | `docs/testing.md`                                                                                                                              |
| New source file convention               | `docs/contributing.md`                                                                                                                         |
| Breaking changes to contributor workflow | `docs/contributing.md`                                                                                                                         |

### README.md Must Document

- Project overview and features
- Algorithm count summary (link to docs/algorithms-catalog.md for full table)
- Quick start (npm install, npm run dev, Node version)
- Scripts reference table
- Docker commands
- CI/CD summary (link to docs/deployment.md)
- Testing summary (link to docs/testing.md)
- Architecture summary (link to docs/architecture.md)
- Contributing summary (link to docs/contributing.md)
- How to add a new algorithm (brief, link to full guide)
- How to add a new language (brief, link to full guide)
- Input editing (temporary/non-persistent behavior)
- Keyboard shortcuts
- Session hooks summary (link to docs/claude-system.md)
- `.claude/PLAN.md` location

### Code Comments

- Comment intent and purpose, not mechanics
- No bloated commentary
- JSDoc for exported functions and types
- No comments that restate what the code does

### No AI References

- Never mention Claude, AI, assistant, automation, or generated in:
  - Commits, PRs, branch names
  - README, docs, code comments
  - Any repo artifact
