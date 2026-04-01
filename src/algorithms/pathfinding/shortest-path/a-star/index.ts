import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { aStarGrid } from "./sources/a-star-grid.ts?fn";
import { generateAStarSteps } from "./step-generator";
import { aStarEducational } from "./educational";

import typescriptSource from "./sources/a-star-grid.ts?raw";
import pythonSource from "./sources/a-star-grid.py?raw";
import javaSource from "./sources/AStarGrid.java?raw";

/** Builds the initial pathfinding grid with start/end positions and preset walls. */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition, endPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "empty";
      if (rowIndex === startPosition[0] && colIndex === startPosition[1]) {
        cellType = "start";
      } else if (rowIndex === endPosition[0] && colIndex === endPosition[1]) {
        cellType = "end";
      }
      row.push({
        row: rowIndex,
        col: colIndex,
        type: cellType,
        state: "default",
      });
    }
    grid.push(row);
  }

  /* Add some default walls for visual interest */
  const wallPositions: [number, number][] = [
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
    [3, 15],
    [4, 15],
    [5, 15],
    [6, 15],
    [7, 15],
    [8, 15],
    [9, 15],
    [10, 10],
    [10, 11],
    [10, 12],
    [10, 13],
    [10, 14],
  ];

  for (const [wallRow, wallCol] of wallPositions) {
    const gridRow = grid[wallRow];
    if (gridRow) {
      const cell = gridRow[wallCol];
      if (cell && cell.type === "empty") {
        cell.type = "wall";
      }
    }
  }

  return grid;
}

interface AStarInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const aStarDefinition: AlgorithmDefinition<AStarInput> = {
  meta: {
    id: ALGORITHM_ID.A_STAR_GRID!,
    name: "A* Search",
    category: CATEGORY.PATHFINDING!,
    technique: "shortest-path",
    description:
      "A heuristic-guided shortest-path algorithm combining Dijkstra's optimality with greedy best-first speed using Manhattan distance to focus exploration toward the goal",
    timeComplexity: {
      best: "O(path length)",
      average: "O((V+E) log V)",
      worst: "O(V²)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: AStarInput) => aStarGrid(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateAStarSteps,
  educational: aStarEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(aStarDefinition);
