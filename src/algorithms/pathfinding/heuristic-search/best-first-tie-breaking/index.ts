import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { bestFirstTieBreaking } from "./sources/best-first-tie-breaking.ts?fn";
import { generateBestFirstTieBreakingSteps } from "./step-generator";
import { bestFirstTieBreakingEducational } from "./educational";

import typescriptSource from "./sources/best-first-tie-breaking.ts?raw";
import pythonSource from "./sources/best-first-tie-breaking.py?raw";
import javaSource from "./sources/BestFirstTieBreaking.java?raw";

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

interface TieBreakingInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const bestFirstTieBreakingDefinition: AlgorithmDefinition<TieBreakingInput> = {
  meta: {
    id: ALGORITHM_ID.BEST_FIRST_TIE_BREAKING!,
    name: "Best-First Tie Breaking",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "A* enhanced with cross-product tie-breaking — resolves equal f-cost nodes by preferring those on the straight line from start to goal, producing cleaner and straighter paths",
    timeComplexity: {
      best: "O((V+E) log V)",
      average: "O((V+E) log V)",
      worst: "O((V+E) log V)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: TieBreakingInput) =>
    bestFirstTieBreaking(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateBestFirstTieBreakingSteps,
  educational: bestFirstTieBreakingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bestFirstTieBreakingDefinition);
