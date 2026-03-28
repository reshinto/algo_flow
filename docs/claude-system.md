[← Back to README](../README.md)

# Claude Agentic Development System

AlgoFlow uses a structured development workflow powered by agents, skills, session hooks, and plugins. This page documents the full system defined in the `.claude/` directory.

> **Prerequisites:** Read [Contributing](contributing.md) for quality gate and branch workflow context before working with this system.

## Contents

- [Overview](#overview)
- [Agents (11)](#agents-11)
- [Skills (18)](#skills-18)
- [Session Hooks (13)](#session-hooks-13)
- [Plugins (17)](#plugins-17)
- [Plugin vs. Project Wrapper](#plugin-vs-project-wrapper)

---

## Overview

The `.claude/` directory contains configuration that automates development workflows and enforces quality standards. The system has four layers:

- **Agents** — Specialized roles that review code, validate tests, check accessibility, and more
- **Skills** — Reusable prompt modules invoked via `/skill-name` for specific workflows
- **Session Hooks** — Shell scripts that run automatically at session start, during edits, and at session end
- **Plugins** — Third-party Claude Code plugins providing system-level capabilities

---

## Agents (11)

| Agent                           | Role                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `tech-lead-architect`           | Architectural reviews and structural decisions                                  |
| `senior-engineer-code-reviewer` | Code quality, standards enforcement, PR review                                  |
| `qa-tester`                     | Test coverage, E2E validation, security checks                                  |
| `ui-ux-designer`                | Visual design, responsive layout, accessibility                                 |
| `product-strategist`            | Learner engagement, feature alignment                                           |
| `technical-writer`              | Documentation accuracy, educational content quality                             |
| `marketing-engine`              | README discoverability, content positioning                                     |
| `claude-system-architect`       | `.claude/` system integrity, hook and skill governance                          |
| `silent-failure-hunter`         | Silent failure detection in step generation, glob imports, union exhaustiveness |
| `code-simplifier`               | Code simplification while preserving architectural contracts                    |
| `code-explorer`                 | Execution path tracing through registry pipeline                                |

Agent definitions live in `.claude/agents/`. Each file defines the agent's role, responsibilities, and constraints.

---

## Skills (18)

Reusable prompt modules invoked via `/skill-name`:

| Skill                          | Purpose                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| `algorithm-learning-content`   | Generate educational content for algorithms                       |
| `accessibility-audit`          | WCAG 2.1 AA compliance checks                                     |
| `architecture-review`          | Zustand store design, Vite optimization, security patterns        |
| `branch-safety-check`          | Verify working branch before changes                              |
| `cifix`                        | Run lint, format, typecheck, tests and fix failures               |
| `claude-system-management`     | Audit and update `.claude/` configuration                         |
| `debugging`                    | Systematic debugging for step generation, visualization, playback |
| `documentation-review`         | Review docs for clarity and contributor onboarding quality        |
| `feature-dev`                  | Guided 7-step feature development workflow                        |
| `implementation-planning`      | Plan phased implementation for new features                       |
| `learner-engagement-review`    | Evaluate features for educational effectiveness                   |
| `pathfinding-scenario-editing` | Grid editing features for pathfinding algorithms                  |
| `readme-optimization`          | GitHub discoverability and content positioning                    |
| `repository-quality-gate`      | Run full quality gate suite                                       |
| `security-coverage-audit`      | OWASP checks and coverage threshold verification                  |
| `strict-typescript-review`     | Strict TypeScript compliance review                               |
| `tdd`                          | Test-driven development for AlgoFlow's 4-part test matrix         |
| `verification`                 | Pre-completion quality gate verification                          |

Skill definitions live in `.claude/skills/<skill-name>/SKILL.md`.

---

## Session Hooks (13)

Hooks run automatically during development sessions. They are configured in `.claude/settings.json`.

### SessionStart

| Hook                            | Behavior                                            |
| ------------------------------- | --------------------------------------------------- |
| `session-start-branch-check.sh` | Warns if working directly on `main` at session open |

### PreToolUse (Bash)

| Hook                           | Behavior                                                                    |
| ------------------------------ | --------------------------------------------------------------------------- |
| `block-ai-attribution.sh`      | Blocks commits with Co-Authored-By or AI attribution                        |
| `block-main-branch-commits.sh` | Blocks `git commit` and `git push` directly to `main`                       |
| `pre-commit-quality-check.sh`  | Runs typecheck, ESLint, and Prettier before every commit; blocks on failure |

### PostToolUse (Edit | Write)

| Hook                               | Behavior                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `post-edit-typescript-check.sh`    | Warns (non-blocking) on `any` types, bare `@ts-ignore`, unsafe assertions, `number[][]` instead of tuples              |
| `post-edit-accessibility-check.sh` | Warns (non-blocking) on raw hex colors, missing `aria-label`, `outline:none`, Framer Motion without `useReducedMotion` |

### PostToolUse (Bash)

| Hook                    | Behavior                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| `auto-pr-after-push.sh` | Automatically opens a pull request after pushing a feature branch |

### Stop

| Hook                                 | Behavior                                                                                |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| `session-end-quality-gate.sh`        | Lint, format, typecheck, and unit tests must pass; blocks git operations on failure     |
| `session-end-readme-check.sh`        | Verifies README and docs are updated when source files change                           |
| `session-end-comments-check.sh`      | Verifies modified TypeScript files contain code comments                                |
| `session-end-e2e-check.sh`           | Runs E2E suite when `.tsx`, `.css`, `.html`, or E2E files change                        |
| `session-end-security-check.sh`      | Scans for unsafe patterns, runs `npm audit`, verifies coverage thresholds (80/75/80/80) |
| `session-end-claude-system-check.sh` | Validates `.claude/` configuration consistency                                          |

Hook scripts live in `.claude/hooks/`.

---

## Plugins (17)

Claude Code plugins provide system-level capabilities. They are enabled in `.claude/settings.json` under `enabledPlugins`.

| Plugin                 | Purpose                                                                            | Project Wrapper                                                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superpowers`          | Planning, brainstorming, TDD, debugging, verification, parallel agents             | `tdd`, `verification`, `debugging` skills                                                                                                                 |
| `feature-dev`          | Guided feature development, code exploration, architecture                         | `feature-dev` skill, `code-explorer` agent                                                                                                                |
| `pr-review-toolkit`    | PR review, silent failure hunting, code simplification, test analysis, type design | `silent-failure-hunter` agent; merged into `senior-engineer-code-reviewer`, `strict-typescript-review`, `security-coverage-audit`, `documentation-review` |
| `code-simplifier`      | Code quality and clarity refinement                                                | `code-simplifier` agent                                                                                                                                   |
| `code-review`          | Pull request code review                                                           | Used directly                                                                                                                                             |
| `commit-commands`      | Git commit, push, PR automation                                                    | Covered by project hooks                                                                                                                                  |
| `claude-md-management` | CLAUDE.md auditing and updates                                                     | Merged into `claude-system-management` skill                                                                                                              |
| `frontend-design`      | Production-grade UI component generation                                           | Used directly                                                                                                                                             |
| `playground`           | Interactive HTML playground generation                                             | Used directly                                                                                                                                             |
| `figma`                | Figma design-to-code integration                                                   | Used directly                                                                                                                                             |
| `context7`             | Real-time library documentation lookup                                             | Used directly                                                                                                                                             |
| `playwright`           | Browser automation and E2E testing                                                 | Used directly                                                                                                                                             |
| `github`               | GitHub issues, PRs, branches                                                       | Used directly                                                                                                                                             |
| `skill-creator`        | Create and measure custom skills                                                   | Used directly                                                                                                                                             |
| `claude-code-setup`    | Automation recommendations                                                         | Used directly                                                                                                                                             |
| `ralph-loop`           | Recurring task execution                                                           | Used directly                                                                                                                                             |
| `security-guidance`    | Security analysis and guidance                                                     | Used directly                                                                                                                                             |

---

## Plugin vs. Project Wrapper

Plugins provide generic capabilities. Project wrappers (agents and skills in `.claude/`) inject AlgoFlow-specific context — registry patterns, step generation conventions, educational content requirements, Zustand slice boundaries — so the plugin's methodology is applied with project awareness. Where no wrapper exists, the plugin is used directly.

---

## See Also

- [Architecture](architecture.md) — application architecture and project structure
- [Contributing](contributing.md) — quality gate, branch workflow, plugin installation
- [Testing](testing.md) — test strategy and coverage thresholds
