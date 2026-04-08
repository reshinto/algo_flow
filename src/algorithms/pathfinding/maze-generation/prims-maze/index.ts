import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { primsMaze } from "./sources/prims-maze.ts?fn";
import { generatePrimsMazeSteps } from "./step-generator";
import { primsMazeEducational } from "./educational";

import typescriptSource from "./sources/prims-maze.ts?raw";
import pythonSource from "./sources/prims-maze.py?raw";
import javaSource from "./sources/PrimsMaze.java?raw";
import rustSource from "./sources/prims-maze.rs?raw";
import cppSource from "./sources/PrimsMaze.cpp?raw";
import goSource from "./sources/prims-maze.go?raw";

/** Builds an all-walls grid for maze generation with start/end positions marked. */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition, endPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "wall";
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

  return grid;
}

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const primsMazeDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.PRIMS_MAZE!,
    name: "Prim's Maze",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "A randomized Prim's algorithm that grows a maze by randomly selecting frontier cells — produces short, branchy dead ends with a distinctive bushy pattern",
    timeComplexity: {
      best: "O(V)",
      average: "O(V log V)",
      worst: "O(V log V)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => primsMaze(input.grid, input.startPosition),
  generateSteps: generatePrimsMazeSteps,
  educational: primsMazeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(primsMazeDefinition);
