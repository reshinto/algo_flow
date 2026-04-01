import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { jumpPointSearch } from "./sources/jump-point-search.ts?fn";
import { generateJumpPointSearchSteps } from "./step-generator";
import { jumpPointSearchEducational } from "./educational";

import typescriptSource from "./sources/jump-point-search.ts?raw";
import pythonSource from "./sources/jump-point-search.py?raw";
import javaSource from "./sources/JumpPointSearch.java?raw";

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

interface JpsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const jumpPointSearchDefinition: AlgorithmDefinition<JpsInput> = {
  meta: {
    id: ALGORITHM_ID.JUMP_POINT_SEARCH!,
    name: "Jump Point Search",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "An A* optimization for uniform-cost grids that jumps over symmetric paths — explores dramatically fewer nodes while guaranteeing the optimal route",
    timeComplexity: {
      best: "O(b^d)",
      average: "O(b^d)",
      worst: "O(b^d)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: JpsInput) => jumpPointSearch(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateJumpPointSearchSteps,
  educational: jumpPointSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(jumpPointSearchDefinition);
