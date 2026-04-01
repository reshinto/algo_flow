import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { iterativeDeepeningDfs } from "./sources/iterative-deepening-dfs.ts?fn";
import { generateIterativeDeepeningDfsSteps } from "./step-generator";
import { iterativeDeepeningDfsEducational } from "./educational";

import typescriptSource from "./sources/iterative-deepening-dfs.ts?raw";
import pythonSource from "./sources/iterative-deepening-dfs.py?raw";
import javaSource from "./sources/IterativeDeepeningDfs.java?raw";

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

interface IddfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const iterativeDeepeningDfsDefinition: AlgorithmDefinition<IddfsInput> = {
  meta: {
    id: ALGORITHM_ID.ITERATIVE_DEEPENING_DFS!,
    name: "Iterative Deepening DFS",
    category: CATEGORY.PATHFINDING!,
    technique: "graph-traversal",
    description:
      "DFS with increasing depth limits — finds the shortest path like BFS while using only O(d) memory like DFS",
    timeComplexity: {
      best: "O(d)",
      average: "O(b^d)",
      worst: "O(b^d)",
    },
    spaceComplexity: "O(d)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: IddfsInput) =>
    iterativeDeepeningDfs(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateIterativeDeepeningDfsSteps,
  educational: iterativeDeepeningDfsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(iterativeDeepeningDfsDefinition);
