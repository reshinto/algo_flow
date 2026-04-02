import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { dStarLite } from "./sources/d-star-lite.ts?fn";
import { generateDStarLiteSteps } from "./step-generator";
import { dStarLiteEducational } from "./educational";

import typescriptSource from "./sources/d-star-lite.ts?raw";
import pythonSource from "./sources/d-star-lite.py?raw";
import javaSource from "./sources/DStarLite.java?raw";

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

  // Create 3 porous vertical walls to showcase D* edge-replanning visually
  for (let r = 1; r < 14; r++) {
    // Wall 1
    if (r !== 4 && r !== 10) wallPositions.push([r, 7]);
    // Wall 2
    if (r !== 7) wallPositions.push([r, 15]);
    // Wall 3
    if (r !== 3 && r !== 11) wallPositions.push([r, 22]);
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

interface DStarInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const dStarLiteDefinition: AlgorithmDefinition<DStarInput> = {
  meta: {
    id: ALGORITHM_ID.D_STAR_LITE!,
    name: "D* Lite",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "Incremental replanning algorithm for dynamic environments — computes an initial path then efficiently replans when new obstacles are discovered without restarting from scratch",
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
  execute: (input: DStarInput) => dStarLite(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateDStarLiteSteps,
  educational: dStarLiteEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dStarLiteDefinition);
