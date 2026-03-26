#!/usr/bin/env bash
# Session end hook: verify README.md has been updated when source files changed.
# Compares staged/unstaged changes in src/, .github/, Dockerfile, docker-compose.yml
# against README.md to detect drift.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# Collect changed files (staged + unstaged + untracked)
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
UNTRACKED_FILES=$(git ls-files --others --exclude-standard 2>/dev/null || true)

ALL_CHANGES=$(echo -e "${CHANGED_FILES}\n${STAGED_FILES}\n${UNTRACKED_FILES}" | sort -u | grep -v '^$' || true)

# Check if any feature/test/infra files were modified
HAS_SRC_CHANGES=$(echo "$ALL_CHANGES" | grep -c '^src/' || true)
HAS_INFRA_CHANGES=$(echo "$ALL_CHANGES" | grep -c -E '^(\.github/|Dockerfile|docker-compose\.yml|\.storybook/)' || true)
HAS_CONFIG_CHANGES=$(echo "$ALL_CHANGES" | grep -c -E '^(vite\.config|tsconfig|eslint\.config|package\.json)' || true)

# Check if README was also updated
HAS_README_UPDATE=$(echo "$ALL_CHANGES" | grep -c '^README.md$' || true)

if [ "$HAS_SRC_CHANGES" -gt 0 ] || [ "$HAS_INFRA_CHANGES" -gt 0 ] || [ "$HAS_CONFIG_CHANGES" -gt 0 ]; then
  if [ "$HAS_README_UPDATE" -eq 0 ]; then
    echo "README CHECK: Source, infrastructure, or config files were modified but README.md was not updated." >&2
    echo "Please update README.md to reflect the latest changes before committing." >&2
    exit 1
  fi
fi

echo "README check passed." >&2
exit 0
