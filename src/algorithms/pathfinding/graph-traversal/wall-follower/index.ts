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

  /* Add continuous walls to create a simply-connected maze that wall-follower can solve.
     Wall-follower algorithms mathematically require start and end to be connected by a 
     continuous wall barrier to guarantee a solution. Floating walls cause endless loops. */
  
  // Create outer boundary walls
  for (let r = 0; r < rows; r++) {
    grid[r]![0]!.type = "wall";
    grid[r]![cols - 1]!.type = "wall";
  }
  for (let c = 0; c < cols; c++) {
    grid[0]![c]!.type = "wall";
    grid[rows - 1]![c]!.type = "wall";
  }

  // Create internal attached walls to make it a winding maze
  for (let r = 0; r <= 10; r++) {
    grid[r]![5]!.type = "wall";
    grid[r]![15]!.type = "wall";
    grid[r]![25]!.type = "wall";
  }
  for (let r = 4; r <= 14; r++) {
    grid[r]![10]!.type = "wall";
    grid[r]![20]!.type = "wall";
  }

  // Ensure start and end aren't accidentally overwritten by walls
  grid[startPosition[0]]![startPosition[1]]!.type = "start";
  grid[endPosition[0]]![endPosition[1]]!.type = "end";

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
