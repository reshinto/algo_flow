#!/usr/bin/env bash
# Session end hook: verify documentation has been updated when relevant files changed.
# Checks both README.md and docs/ files against source, infrastructure, and config changes.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# Collect changed files (staged + unstaged + untracked)
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED_FILES=$(git ls-files --others --exclude-standard 2>/dev/null || true)

ALL_CHANGES=$(echo -e "${CHANGED_FILES}\n${STAGED_FILES}\n${UNTRACKED_FILES}" | sort -u | grep -v '^$' || true)

# Exit early if no changes at all
if [ -z "$ALL_CHANGES" ]; then
  echo "Docs check passed (no changes)." >&2
  exit 0
fi

# Detect which docs were updated
HAS_README_UPDATE=$(echo "$ALL_CHANGES" | grep -c '^README.md$' || true)
HAS_DOCS_UPDATE=$(echo "$ALL_CHANGES" | grep -c '^docs/' || true)
HAS_ANY_DOC_UPDATE=$(( HAS_README_UPDATE + HAS_DOCS_UPDATE ))

# Detect categories of source changes
HAS_ALGORITHM_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/algorithms/' || true)
HAS_TRACKER_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/trackers/' || true)
HAS_COMPONENT_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/components/' || true)
HAS_STORE_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/store/' || true)
HAS_TYPE_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/types/' || true)
HAS_OTHER_SRC_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/' || true)
HAS_INFRA_CHANGES=$(echo "$ALL_CHANGES" | grep -c -E '^(\.github/|Dockerfile|docker-compose\.yml|\.storybook/)' || true)
HAS_CONFIG_CHANGES=$(echo "$ALL_CHANGES" | grep -c -E '^(vite\.config|tsconfig|eslint\.config|\.prettierrc)' || true)
HAS_PACKAGE_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^package\.json$' || true)
HAS_HOOK_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^\.claude/hooks/' || true)
HAS_E2E_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^e2e/' || true)

# Build a list of docs that should be checked for updates
MISSING_DOCS=""

# New algorithm or tracker → README (algorithms table) + contributing (tracker table) + testing (story count)
if [ "$HAS_ALGORITHM_CHANGES" -gt 0 ] || [ "$HAS_TRACKER_CHANGES" -gt 0 ]; then
  if [ "$HAS_ANY_DOC_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - Algorithm or tracker files changed → update README.md (algorithms table) and/or docs/contributing.md (tracker table)"
  fi
fi

# Infrastructure changes → deployment docs
if [ "$HAS_INFRA_CHANGES" -gt 0 ]; then
  HAS_DEPLOY_DOC_UPDATE=$(echo "$ALL_CHANGES" | grep -c '^docs/deployment.md$' || true)
  if [ "$HAS_DEPLOY_DOC_UPDATE" -eq 0 ] && [ "$HAS_README_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - CI/CD or Docker files changed → update docs/deployment.md"
  fi
fi

# Package.json changes → possibly new scripts, deps, or test tools
if [ "$HAS_PACKAGE_CHANGES" -gt 0 ]; then
  if [ "$HAS_ANY_DOC_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - package.json changed → update README.md (scripts table) and/or docs/architecture.md (tech stack) if dependencies or scripts were added/removed"
  fi
fi

# Config changes → architecture docs
if [ "$HAS_CONFIG_CHANGES" -gt 0 ]; then
  if [ "$HAS_ANY_DOC_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - Build/lint config changed → update docs/architecture.md if the change affects developer workflow"
  fi
fi

# Store or type changes → architecture docs
if [ "$HAS_STORE_CHANGES" -gt 0 ] || [ "$HAS_TYPE_CHANGES" -gt 0 ]; then
  if [ "$HAS_ANY_DOC_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - Store or type definitions changed → update docs/architecture.md (state management table) if slices or types were added/modified"
  fi
fi

# Hook changes → README session hooks section
if [ "$HAS_HOOK_CHANGES" -gt 0 ]; then
  if [ "$HAS_README_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - Session hooks changed → update README.md (session hooks section)"
  fi
fi

# E2E changes → testing docs
if [ "$HAS_E2E_CHANGES" -gt 0 ]; then
  HAS_TESTING_DOC_UPDATE=$(echo "$ALL_CHANGES" | grep -c '^docs/testing.md$' || true)
  if [ "$HAS_TESTING_DOC_UPDATE" -eq 0 ]; then
    MISSING_DOCS="${MISSING_DOCS}\n  - E2E test files changed → update docs/testing.md if test strategy or setup changed"
  fi
fi

# Report results
if [ -n "$MISSING_DOCS" ]; then
  echo "DOCS CHECK: Source files were modified but documentation may not be up to date." >&2
  echo "Please review and update the relevant docs:" >&2
  echo -e "$MISSING_DOCS" >&2
  echo "" >&2
  echo "If the changes don't affect documentation (e.g., bug fix with no user-facing impact), this warning can be acknowledged." >&2
  exit 1
fi

echo "Docs check passed." >&2
exit 0
