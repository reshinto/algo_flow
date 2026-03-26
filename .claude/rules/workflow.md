## Workflow Rules

### Branch Strategy (MANDATORY — cannot be skipped unless user explicitly says so)

- **Every new task MUST start on a new branch rebased from main.** This is non-negotiable.
- Before any code changes, ALWAYS run: `git checkout main && git pull && git checkout -b <type>/<short-description>`
- If the branch already exists and main has new commits, rebase: `git rebase main`
- Branch names: `<type>/<short-description>` (e.g., `feat/bubble-sort`, `fix/grid-editor`, `chore/update-deps`)
- A "new task" means any new user request that is not a direct continuation of the current in-progress PR
- Never reuse an existing feature branch for a different task
- Pre-session hook blocks working on main/master
- PreToolUse hook blocks commits and pushes on main/master

### Development Flow

1. Consult UI/UX subagent for visual changes
2. Tech Lead defines architecture for structural changes
3. Implement in phases per `.claude/PLAN.md`
4. Senior Engineer reviews changes
5. QA validates behavior and tests

### Git Operations

- Post-session quality gate must pass before: git add, git commit, git push, PR creation
- Quality gate: lint + format + typecheck + unit tests + storybook build
- Commit messages: imperative mood, no AI/assistant references
- No force pushes to main
- Commits and pushes on main/master are blocked by PreToolUse hooks

### PR Requirements

- All CI checks must pass
- A PR must always be created after pushing a feature branch (enforced by PostToolUse hook)
- Review confirmations from senior-engineer and qa-tester agents
