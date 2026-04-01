import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { wallFollower } from "./sources/wall-follower.ts?fn";
import { generateWallFollowerSteps } from "./step-generator";
import { wallFollowerEducational } from "./educational";

import typescriptSource from "./sources/wall-follower.ts?raw";
import pythonSource from "./sources/wall-follower.py?raw";
import javaSource from "./sources/WallFollower.java?raw";

/** Builds the initial pathfinding grid with start/end positions and a simple corridor maze. */
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

  /* Add walls to create a simple-connected maze that wall-follower can solve */
  const wallPositions: [number, number][] = [
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [3, 8],
    [4, 8],
    [5, 8],
    [6, 8],
    [7, 8],
    [8, 8],
    [3, 13],
    [4, 13],
    [5, 13],
    [6, 13],
    [7, 13],
    [3, 18],
    [4, 18],
    [5, 18],
    [6, 18],
    [7, 18],
    [8, 18],
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

interface WallFollowerInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const wallFollowerDefinition: AlgorithmDefinition<WallFollowerInput> = {
  meta: {
    id: ALGORITHM_ID.WALL_FOLLOWER!,
    name: "Wall Follower",
    category: CATEGORY.PATHFINDING!,
    technique: "graph-traversal",
    description:
      "Right-hand rule maze solving — always keep the right wall, turn right when possible, and follow surfaces to the exit in O(1) extra space",
    timeComplexity: {
      best: "O(V)",
      average: "O(V)",
      worst: "O(V)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: WallFollowerInput) =>
    wallFollower(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateWallFollowerSteps,
  educational: wallFollowerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(wallFollowerDefinition);
