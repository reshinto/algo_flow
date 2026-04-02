import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { iterativeDeepeningDfs } from "./sources/iterative-deepening-dfs.ts?fn";
import { generateIterativeDeepeningDfsSteps } from "./step-generator";
import { iterativeDeepeningDfsEducational } from "./educational";

import typescriptSource from "./sources/iterative-deepening-dfs.ts?raw";
import pythonSource from "./sources/iterative-deepening-dfs.py?raw";
import javaSource from "./sources/IterativeDeepeningDfs.java?raw";

/** Builds the initial pathfinding grid with start/end positions and preset walls.
 *  Uses custom close targets to prevent IDDFS exponential expansion O(b^d) crash.
 */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols } = GRID_DEFAULTS;
  
  // Custom nearby targets for exactly this algorithm to prevent browser crash
  const startPos: [number, number] = [6, 10];
  const endPos: [number, number] = [6, 14];
  
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "empty";
      if (rowIndex === startPos[0] && colIndex === startPos[1]) {
        cellType = "start";
      } else if (rowIndex === endPos[0] && colIndex === endPos[1]) {
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

  /* Add walls to constrain IDDFS expansion and guide the search */
  const wallPositions: [number, number][] = [
    // Top boundary
    [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15],
    // Bottom boundary
    [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14], [8, 15],
    // Left boundary
    [5, 9], [6, 9], [7, 9],
    // Obstacle in the middle
    [5, 12], [6, 12],
  ];

  for (const [wallRow, wallCol] of wallPositions) {
    grid[wallRow]![wallCol]!.type = "wall";
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
      startPosition: [6, 10],
      endPosition: [6, 14],
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
