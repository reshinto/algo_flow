## Pathfinding Rules

### Grid Editing

- Change start node position (click or drag)
- Change end node position (click or drag)
- Add/remove walls (click to toggle)
- Run immediately after edits
- Reset to default grid
- All edits are temporary and non-persistent

### Grid Specification

- Default size: 15 rows x 30 columns (max 30x30)
- Cell states: empty, wall, start, end
- Visualization states: default, open, closed, path, current
- Start default: [1, 1], End default: [rows-2, cols-2]

### Visualization

- CSS grid of cells, color-coded by state
- Wave-like expansion animation for frontier exploration
- Path reconstruction animation on completion
- Current node highlighted distinctly

### Non-Persistence

- Grid state lives in Zustand algorithm-slice input
- Edits reset on algorithm switch
- Edits reset on page reload
- No localStorage, no URL state, no server persistence
