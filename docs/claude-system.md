[← Back to README](../README.md)

# Development System

AlgoFlow uses a structured development workflow powered by agents, skills, session hooks, and plugins. This page documents the full system defined in the `.claude/` directory.

> [!NOTE] > **Prerequisites:** Read [Contributing](contributing.md) for quality gate and branch workflow context before working with this system.

## Contents

- [Overview](#overview)
- [Agents (10)](#agents-10)
- [Skills (16)](#skills-16)
- [Session Hooks (13)](#session-hooks-13)
- [Plugins (17)](#plugins-17)
- [Branch Naming and Plugin Auto-Detection](#branch-naming-and-plugin-auto-detection)
- [Rules Files and Path Scoping](#rules-files-and-path-scoping)
- [Plugin vs. Project Wrapper](#plugin-vs-project-wrapper)

---

## Overview

The `.claude/` directory contains configuration that automates development workflows and enforces quality standards. The system has four layers:

- **Agents** — Specialized roles that review code, validate tests, check accessibility, and more
- **Skills** — Reusable prompt modules invoked via `/skill-name` for specific workflows
- **Session Hooks** — Shell scripts that run automatically at session start, during edits, and at session end
- **Plugins** — Third-party Claude Code plugins providing system-level capabilities

---

## Agents (10)

| Agent                           | Role                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `tech-lead-architect`           | Architectural reviews and structural decisions                                  |
| `senior-engineer-code-reviewer` | Code quality, standards enforcement, PR review                                  |
| `qa-tester`                     | Test coverage, E2E validation, security checks (maxTurns: 10)                   |
| `ui-ux-designer`                | Visual design, responsive layout, accessibility                                 |
| `product-strategist`            | Learner engagement, feature alignment                                           |
| `technical-writer`              | Documentation accuracy, educational content quality                             |
| `claude-system-architect`       | `.claude/` system integrity, hook and skill governance                          |
| `silent-failure-hunter`         | Silent failure detection in step generation, glob imports, union exhaustiveness |
| `code-simplifier`               | Code simplification while preserving architectural contracts                    |
| `code-explorer`                 | Execution path tracing through registry pipeline (maxTurns: 8)                  |

Agent definitions live in `.claude/agents/`. Each file defines the agent's role, responsibilities, and constraints.

---

## Skills (16)

Reusable prompt modules invoked via `/skill-name`:

| Skill                          | Purpose                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| `algorithm-learning-content`   | Generate educational content for algorithms                       |
| `accessibility-audit`          | WCAG 2.1 AA compliance checks                                     |
| `architecture-review`          | Zustand store design, Vite optimization, security patterns        |
| `branch-safety-check`          | Verify working branch before changes                              |
| `claude-system-management`     | Audit and update `.claude/` configuration                         |
| `debugging`                    | Systematic debugging for step generation, visualization, playback |
| `documentation-review`         | Review docs for clarity and contributor onboarding quality        |
| `feature-dev`                  | Guided 7-step feature development workflow                        |
| `implementation-planning`      | Plan phased implementation for new features                       |
| `learner-engagement-review`    | Evaluate features for educational effectiveness                   |
| `pathfinding-scenario-editing` | Grid editing features for pathfinding algorithms                  |
| `readme-optimization`          | GitHub discoverability and content positioning                    |
| `security-coverage-audit`      | OWASP checks and coverage threshold verification                  |
| `strict-typescript-review`     | Strict TypeScript compliance review                               |
| `tdd`                          | Test-driven development for AlgoFlow's 4-part test matrix         |
| `verification`                 | Pre-completion algorithm-specific completeness checks             |

Skill definitions live in `.claude/skills/<skill-name>/SKILL.md`.

---

## Session Hooks (13)

Hooks run automatically during development sessions. They are configured in `.claude/settings.json`.

### SessionStart

| Hook                            | Behavior                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| `session-start-branch-check.sh` | Warns if working directly on `main` at session open                                        |
| `auto-plugin-mode.sh`           | Reads the git branch prefix and updates `settings.json` enabledPlugins for the new session |

### PreToolUse (Bash — git commit\* | git push\* | gh pr\*)

Safety hooks are narrowed to git commit, push, and PR commands only:

| Hook                           | Behavior                                                                    |
| ------------------------------ | --------------------------------------------------------------------------- |
| `block-ai-attribution.sh`      | Blocks commits with Co-Authored-By or AI attribution                        |
| `block-main-branch-commits.sh` | Blocks `git commit` and `git push` directly to `main`                       |
| `pre-commit-quality-check.sh`  | Runs typecheck, ESLint, and Prettier before every commit; blocks on failure |
| `enforce-branch-naming.sh`     | Enforces `<type>/<subcategory>-<description>` format on branch creation     |

### PostToolUse (Edit | Write)

| Hook                               | Behavior                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `post-edit-typescript-check.sh`    | Warns (non-blocking) on `any` types, bare `@ts-ignore`, unsafe assertions, `number[][]` instead of tuples (`.ts`, `.tsx` files only) |
| `post-edit-python-check.sh`        | Warns (non-blocking) on style and type issues in Python source files (`.py` files only)                                              |
| `post-edit-java-check.sh`          | Warns (non-blocking) on style and type issues in Java source files (`.java` files only)                                              |
| `post-edit-accessibility-check.sh` | Warns (non-blocking) on raw hex colors, missing `aria-label`, `outline:none`, Framer Motion without `useReducedMotion`               |
| `ban-hardcoded-waits.sh`           | Blocks writing `waitForTimeout`, `sleep()`, or `setTimeout`-based delays to test/E2E files                                           |

### PostToolUse (Bash)

| Hook                    | Behavior                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| `auto-pr-after-push.sh` | Automatically opens a pull request after pushing a feature branch |

### Stop

All session-end checks are consolidated into a single unified gate:

| Hook                          | Behavior                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session-end-unified-gate.sh` | Runs lint, format, typecheck; Storybook build (conditional); unit tests with coverage; E2E suite (conditional, when `.tsx`/`.css`/`.html`/E2E files change); security pattern scan; advisory checks (npm audit, docs, claude system). 900s timeout with per-step sub-timeouts. Blocks git operations on failure. |

Hook scripts live in `.claude/hooks/`.

---

## Plugins (17)

Claude Code plugins provide system-level capabilities. They are enabled in `.claude/settings.json` under `enabledPlugins`.

### Core Plugins (always enabled)

These 6 plugins are enabled in every session regardless of branch:

| Plugin              | Purpose                                                                            | Project Wrapper                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superpowers`       | Planning, brainstorming, TDD, debugging, verification, parallel agents             | `tdd`, `verification`, `debugging` skills                                                                                                                 |
| `commit-commands`   | Git commit, push, PR automation                                                    | Covered by project hooks                                                                                                                                  |
| `context7`          | Real-time library documentation lookup                                             | Used directly                                                                                                                                             |
| `github`            | GitHub issues, PRs, branches                                                       | Used directly                                                                                                                                             |
| `code-review`       | Pull request code review                                                           | Used directly                                                                                                                                             |
| `pr-review-toolkit` | PR review, silent failure hunting, code simplification, test analysis, type design | `silent-failure-hunter` agent; merged into `senior-engineer-code-reviewer`, `strict-typescript-review`, `security-coverage-audit`, `documentation-review` |

### Optional Plugins (auto-enabled by branch prefix)

These 11 plugins are disabled by default and enabled automatically via `auto-plugin-mode.sh` based on the active branch prefix (configured in `plugin-profiles.json`):

| Plugin                 | Purpose                                  | Auto-enabled by branch prefix |
| ---------------------- | ---------------------------------------- | ----------------------------- |
| `frontend-design`      | Production-grade UI component generation | `feat/ui-*`                   |
| `figma`                | Figma design-to-code integration         | `feat/ui-*`                   |
| `playground`           | Interactive HTML playground generation   | `feat/ui-*`                   |
| `playwright`           | Browser automation and E2E testing       | `test/*`, `fix/e2e-*`         |
| `code-simplifier`      | Code quality and clarity refinement      | `refactor/*`                  |
| `skill-creator`        | Create and measure custom skills         | `chore/skills-*`              |
| `claude-code-setup`    | Automation recommendations               | `chore/setup-*`               |
| `ralph-loop`           | Recurring task execution                 | `chore/loop-*`                |
| `security-guidance`    | Security analysis and guidance           | `fix/security-*`              |
| `claude-md-management` | CLAUDE.md auditing and updates           | `chore/claude-md-*`           |
| `code-simplifier`      | Code quality and clarity refinement      | `refactor/*`                  |

---

## Branch Naming and Plugin Auto-Detection

Branch names follow the format `<type>/<subcategory>-<description>`. The subcategory determines which optional plugins are auto-enabled at session start via `auto-plugin-mode.sh`.

**Valid types:** `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Examples:

- `feat/ui-modal-editor` — enables `frontend-design`, `figma`, `playground`
- `test/e2e-hash-maps` — enables `playwright`
- `refactor/simplify-trackers` — enables `code-simplifier`
- `chore/skills-verification` — enables `skill-creator`

Branch naming is enforced by the `enforce-branch-naming.sh` PreToolUse hook on branch creation commands and validated by `session-start-branch-check.sh` at session open.

Profile mappings are defined in `.claude/plugin-profiles.json`.

---

## Rules Files and Path Scoping

Rules files in `.claude/rules/` are either always-loaded or path-scoped (loaded only when reading files that match a path pattern via `paths:` frontmatter).

### Always-loaded rules (4)

| File               | When it applies |
| ------------------ | --------------- |
| `coding-standards` | All sessions    |
| `architecture`     | All sessions    |
| `token-efficiency` | All sessions    |
| `workflow`         | All sessions    |

### Path-scoped rules (loaded on demand)

| File           | Loaded when reading                |
| -------------- | ---------------------------------- |
| `algorithms`   | Files matching `src/algorithms/**` |
| `testing`      | Test files and spec files          |
| `storybook`    | Files matching `**/*.stories.tsx`  |
| `pathfinding`  | Pathfinding algorithm files        |
| `ui-ux`        | Component and style files          |
| `docker-ci-cd` | CI/CD and Docker config files      |
| `docs`         | Documentation files                |

Storybook-specific rules (story structure, pipeline story placement, visual regression) are defined in `storybook.md` rather than `testing.md`.

---

## Plugin vs. Project Wrapper

Plugins provide generic capabilities. Project wrappers (agents and skills in `.claude/`) inject AlgoFlow-specific context — registry patterns, step generation conventions, educational content requirements, Zustand slice boundaries — so the plugin's methodology is applied with project awareness. Where no wrapper exists, the plugin is used directly.

---

## See Also

- [Architecture](architecture.md) — application architecture and project structure
- [Contributing](contributing.md) — quality gate, branch workflow, plugin installation
- [Testing](testing.md) — test strategy and coverage thresholds
