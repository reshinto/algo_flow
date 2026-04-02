import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { greedyBestFirst } from "./sources/greedy-best-first.ts?fn";
import { generateGreedyBestFirstSteps } from "./step-generator";
import { greedyBestFirstEducational } from "./educational";

import typescriptSource from "./sources/greedy-best-first.ts?raw";
import pythonSource from "./sources/greedy-best-first.py?raw";
import javaSource from "./sources/GreedyBestFirst.java?raw";

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
      row.push({ row: rowIndex, col: colIndex, type: cellType, state: "default" });
    }
    grid.push(row);
  }

  const wallPositions: [number, number][] = [];

  // Construct a large 'C' shaped trap facing the start node
  // Top lid
  for (let c = 5; c <= 25; c++) {
    wallPositions.push([3, c]);
  }
  // Bottom lid
  for (let c = 5; c <= 25; c++) {
    wallPositions.push([11, c]);
  }
  // Right spine
  for (let r = 3; r <= 11; r++) {
    wallPositions.push([r, 25]);
  }

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

interface GreedyInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const greedyBestFirstDefinition: AlgorithmDefinition<GreedyInput> = {
  meta: {
    id: ALGORITHM_ID.GREEDY_BEST_FIRST!,
    name: "Greedy Best-First Search",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "A heuristic-driven search that always expands the node closest to the goal by Manhattan distance — fast but not guaranteed to find the shortest path",
    timeComplexity: {
      best: "O(b^d)",
      average: "O(b^m)",
      worst: "O(b^m)",
    },
    spaceComplexity: "O(b^m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: GreedyInput) =>
    greedyBestFirst(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateGreedyBestFirstSteps,
  educational: greedyBestFirstEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(greedyBestFirstDefinition);
