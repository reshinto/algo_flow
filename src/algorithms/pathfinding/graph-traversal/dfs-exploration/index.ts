import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { dfsExploration } from "./sources/dfs-exploration.ts?fn";
import { generateDfsExplorationSteps } from "./step-generator";
import { dfsExplorationEducational } from "./educational";

import typescriptSource from "./sources/dfs-exploration.ts?raw";
import pythonSource from "./sources/dfs-exploration.py?raw";
import javaSource from "./sources/DfsExploration.java?raw";

/** Builds the initial pathfinding grid with start position and preset walls. */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "empty";
      if (rowIndex === startPosition[0] && colIndex === startPosition[1]) {
        cellType = "start";
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

interface DfsExplorationInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const dfsExplorationDefinition: AlgorithmDefinition<DfsExplorationInput> = {
  meta: {
    id: ALGORITHM_ID.DFS_EXPLORATION!,
    name: "DFS Exploration",
    category: CATEGORY.PATHFINDING!,
    technique: "graph-traversal",
    description:
      "Depth-First Search on a grid using an explicit stack — deep-first snaking pattern that maps all reachable cells without a target endpoint",
    timeComplexity: {
      best: "O(1)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.startPosition],
    },
  },
  execute: (input: DfsExplorationInput) => dfsExploration(input.grid, input.startPosition),
  generateSteps: generateDfsExplorationSteps,
  educational: dfsExplorationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dfsExplorationDefinition);
