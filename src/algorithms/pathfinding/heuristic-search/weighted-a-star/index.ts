import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { weightedAStar } from "./sources/weighted-a-star.ts?fn";
import { generateWeightedAStarSteps } from "./step-generator";
import { weightedAStarEducational } from "./educational";

import typescriptSource from "./sources/weighted-a-star.ts?raw";
import pythonSource from "./sources/weighted-a-star.py?raw";
import javaSource from "./sources/WeightedAStar.java?raw";

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

  /* Add some default walls for visual interest */
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

interface WeightedAStarInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
  weight?: number;
}

const defaultGrid = createDefaultGrid();

const weightedAStarDefinition: AlgorithmDefinition<WeightedAStarInput> = {
  meta: {
    id: ALGORITHM_ID.WEIGHTED_A_STAR!,
    name: "Weighted A*",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "A* with an inflated heuristic f(n) = g(n) + ε·h(n) — explores fewer nodes than standard A* with a bounded sub-optimality guarantee of ε × optimal path length",
    timeComplexity: {
      best: "O(b^d)",
      average: "O(b^d/ε)",
      worst: "O(b^d)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
      weight: 1.5,
    },
  },
  execute: (input: WeightedAStarInput) =>
    weightedAStar(input.grid, input.startPosition, input.endPosition, input.weight ?? 1.5),
  generateSteps: generateWeightedAStarSteps,
  educational: weightedAStarEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(weightedAStarDefinition);
