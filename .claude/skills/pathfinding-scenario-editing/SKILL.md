---
name: pathfinding-scenario-editing
description: Implement or modify pathfinding grid editing features including wall placement, start/end node repositioning, and non-persistent state management
user-invocable: true
---

# Pathfinding Scenario Editing

## Task

Implement or modify grid editing capabilities for pathfinding algorithms.

## Grid Editing Features

### Wall Placement

- Click on empty cell to add wall
- Click on wall cell to remove wall
- Cannot place wall on start or end nodes

### Start/End Node Repositioning

- Click-drag start node to new position
- Click-drag end node to new position
- Cannot place on wall cells
- Must remain within grid bounds

### Run/Reset Controls

- Run: Execute pathfinding on current grid configuration
- Reset visualization: Clear visited/path states, keep walls and start/end positions
- Reset to default: Restore original grid with default start, end, and walls

## Non-Persistence Rules

- Grid state stored only in Zustand algorithm-slice.input
- No localStorage writes
- No URL parameter encoding
- State resets on algorithm switch or page reload
- Edited state is passed to generateSteps() for re-computation

## Grid Defaults

- 15 rows x 30 columns
- Start: [1, 1]
- End: [rows - 2, cols - 2]
- Default wall: centered vertical barrier
