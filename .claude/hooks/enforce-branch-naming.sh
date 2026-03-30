#!/usr/bin/env bash
# PreToolUse hook: enforce branch naming convention on branch creation.
# Blocks if type prefix is invalid. Warns if subcategory doesn't match a plugin mode.
# Also triggers auto-plugin-mode.sh to update plugins for the new branch.

set -euo pipefail

INPUT=$(cat)

# Extract the command being run (same pattern as existing hooks)
COMMAND=$(echo "$INPUT" | grep -o '"command":"[^"]*"' | head -1 | sed 's/"command":"//;s/"$//' || true)
if [ -z "$COMMAND" ]; then
  exit 0
fi

# Extract branch name from various git commands
BRANCH_NAME=""
if echo "$COMMAND" | grep -qE 'git checkout -[bB] '; then
  BRANCH_NAME=$(echo "$COMMAND" | sed -E 's/.*git checkout -[bB] +([^ ]+).*/\1/')
elif echo "$COMMAND" | grep -qE 'git switch -c '; then
  BRANCH_NAME=$(echo "$COMMAND" | sed -E 's/.*git switch -c +([^ ]+).*/\1/')
elif echo "$COMMAND" | grep -qE 'git branch [^-]'; then
  BRANCH_NAME=$(echo "$COMMAND" | sed -E 's/.*git branch +([^ ]+).*/\1/')
fi

if [ -z "$BRANCH_NAME" ]; then
  exit 0
fi

# Validate type prefix
VALID_TYPES="feat fix chore docs test refactor"
TYPE=$(echo "$BRANCH_NAME" | cut -d'/' -f1)

if ! echo "$BRANCH_NAME" | grep -q '/'; then
  echo "BLOCKED: Branch name '$BRANCH_NAME' must follow convention: <type>/<description>" >&2
  echo "Valid types: $VALID_TYPES" >&2
  echo "Examples: feat/ui-dashboard, fix/backend-auth, chore/claude-optimize" >&2
  exit 2
fi

VALID=false
for VTYPE in $VALID_TYPES; do
  if [ "$TYPE" = "$VTYPE" ]; then
    VALID=true
    break
  fi
done

if [ "$VALID" = "false" ]; then
  echo "BLOCKED: Invalid branch type '$TYPE' in '$BRANCH_NAME'" >&2
  echo "Valid types: $VALID_TYPES" >&2
  exit 2
fi

# Warn (not block) if subcategory doesn't match a known plugin mode
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
PROFILES="$PROJECT_DIR/.claude/hooks/plugin-profiles.json"

if [ -f "$PROFILES" ] && command -v node &>/dev/null; then
  MATCH_INFO=$(node -e "
    const fs = require('fs');
    try {
      const profiles = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
      const branch = process.argv[2];
      const matched = [];
      for (const [prefix, plugins] of Object.entries(profiles.branch_modes)) {
        if (branch.startsWith(prefix)) {
          matched.push(...plugins.map(p => p.replace('@claude-plugins-official', '')));
        }
      }
      if (matched.length > 0) {
        console.log('MATCH:' + matched.join(', '));
      } else {
        console.log('NOMATCH');
      }
    } catch (err) {
      console.log('ERROR');
    }
  " "$PROFILES" "$BRANCH_NAME" 2>/dev/null || echo "ERROR")

  if echo "$MATCH_INFO" | grep -q '^MATCH:'; then
    PLUGINS=$(echo "$MATCH_INFO" | sed 's/^MATCH://')
    echo "Branch '$BRANCH_NAME' → next session enables: core + $PLUGINS" >&2
  elif echo "$MATCH_INFO" | grep -q '^NOMATCH'; then
    echo "INFO: Branch '$BRANCH_NAME' has no plugin-mode match — core plugins only" >&2
    echo "Known prefixes: feat/ui-, feat/e2e-, feat/design-, feat/preview-, feat/backend-, feat/api-, chore/claude-, chore/skill-, refactor/" >&2
  fi
fi

# Trigger plugin update for the new branch
AUTO_PLUGIN="$PROJECT_DIR/.claude/hooks/auto-plugin-mode.sh"
if [ -f "$AUTO_PLUGIN" ]; then
  bash "$AUTO_PLUGIN" "$BRANCH_NAME" 2>&1 || true
fi

exit 0
