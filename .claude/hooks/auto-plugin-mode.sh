#!/usr/bin/env bash
# SessionStart + branch creation hook: auto-switch plugins based on git branch prefix.
# Reads plugin-profiles.json and updates settings.json enabledPlugins.
# Uses Node.js for JSON manipulation (no jq dependency).
# Always exits 0 — never blocks session start.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
PROFILES="$PROJECT_DIR/.claude/hooks/plugin-profiles.json"
SETTINGS="$PROJECT_DIR/.claude/settings.json"

# Guard: profiles and settings must exist
if [ ! -f "$PROFILES" ] || [ ! -f "$SETTINGS" ]; then
  echo "WARN: plugin-profiles.json or settings.json missing — plugin auto-switching disabled" >&2
  exit 0
fi

# Guard: Node.js must be available
if ! command -v node &>/dev/null; then
  echo "WARN: node not found — plugin auto-switching disabled" >&2
  exit 0
fi

# Get current branch (handle detached HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
if [ -z "$BRANCH" ] || [ "$BRANCH" = "HEAD" ]; then
  BRANCH="main"
fi

# Allow override from argument (used by branch creation hook)
if [ -n "${1:-}" ]; then
  BRANCH="$1"
fi

# Use Node.js to update settings.json atomically
node -e "
const fs = require('fs');

const profilesPath = process.argv[1];
const settingsPath = process.argv[2];
const branch = process.argv[3];

try {
  const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

  // Collect all known plugin names
  const allPlugins = new Set([
    ...profiles.core,
    ...Object.values(profiles.branch_modes).flat()
  ]);
  const newEnabled = {};
  for (const plugin of allPlugins) newEnabled[plugin] = false;

  // Enable core plugins
  for (const plugin of profiles.core) newEnabled[plugin] = true;

  // Enable branch-matched plugins
  for (const [prefix, plugins] of Object.entries(profiles.branch_modes)) {
    if (branch.startsWith(prefix)) {
      for (const plugin of plugins) newEnabled[plugin] = true;
    }
  }

  // Check if anything changed
  const oldJson = JSON.stringify(settings.enabledPlugins || {}, Object.keys(newEnabled).sort());
  const newJson = JSON.stringify(newEnabled, Object.keys(newEnabled).sort());
  const changed = oldJson !== newJson;

  settings.enabledPlugins = newEnabled;

  // Atomic write: temp file + rename
  const tmpPath = settingsPath + '.tmp.' + process.pid;
  fs.writeFileSync(tmpPath, JSON.stringify(settings, null, 2) + '\n');
  fs.renameSync(tmpPath, settingsPath);

  const enabledCount = Object.values(newEnabled).filter(Boolean).length;
  console.log('Plugin mode: branch \"' + branch + '\" — enabled ' + enabledCount + ' plugins');
  if (changed) {
    console.log('Plugins changed — restart session (new chat) for changes to take effect');
  }
} catch (err) {
  console.log('WARN: plugin auto-switch failed: ' + err.message);
}
" "$PROFILES" "$SETTINGS" "$BRANCH" 2>&1

exit 0
