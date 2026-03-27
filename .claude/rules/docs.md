## Documentation Rules

### Documentation Structure

Documentation is split across README.md (landing page) and docs/ (detailed guides):

- `README.md` — project overview, quick start, algorithms table, scripts, keyboard shortcuts
- `docs/architecture.md` — tech stack, data flow, state management, project structure
- `docs/testing.md` — unit tests, E2E, Storybook, Chromatic setup, coverage thresholds
- `docs/deployment.md` — Docker, CI/CD pipeline details
- `docs/contributing.md` — prerequisites, branch workflow, algorithm walkthrough, tracker API, troubleshooting

### When to Update Documentation

Update the relevant doc file(s) whenever changes affect what a user or contributor needs to know:

| What Changed                             | Update                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| New algorithm added                      | `README.md` (algorithms table), `docs/contributing.md` (if new category/tracker), `docs/testing.md` (story count) |
| New npm dependency or dev tool           | `docs/architecture.md` (tech stack table), `README.md` (scripts table if new command added)                       |
| New or changed npm script                | `README.md` (scripts table)                                                                                       |
| CI/CD workflow changes                   | `docs/deployment.md` (pipeline tables)                                                                            |
| Docker or deploy config changes          | `docs/deployment.md`                                                                                              |
| Testing library or strategy changes      | `docs/testing.md`                                                                                                 |
| New component or visualizer              | `docs/architecture.md` (project structure if new directory)                                                       |
| Store slice changes                      | `docs/architecture.md` (state management table)                                                                   |
| New tracker or tracker API changes       | `docs/contributing.md` (tracker table)                                                                            |
| Keyboard shortcuts added/changed         | `README.md` (shortcuts table)                                                                                     |
| Input editor added/changed               | `docs/architecture.md` (input editors table)                                                                      |
| Hook added or modified                   | `README.md` (session hooks section)                                                                               |
| Coverage thresholds changed              | `docs/testing.md`                                                                                                 |
| New source file convention               | `docs/contributing.md`                                                                                            |
| Breaking changes to contributor workflow | `docs/contributing.md`                                                                                            |

### README.md Must Document

- Project overview and features
- Algorithm categories table
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
- Session hooks
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
