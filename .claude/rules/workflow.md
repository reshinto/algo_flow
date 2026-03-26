## Workflow Rules

### Branch Strategy

- Always work on a unique task-related branch, never directly on main
- Branch names: `<type>/<short-description>` (e.g., `feat/bubble-sort`, `fix/grid-editor`)
- Pre-session hook verifies branch safety

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

### PR Requirements

- All CI checks must pass
- Review confirmations from senior-engineer and qa-tester agents
