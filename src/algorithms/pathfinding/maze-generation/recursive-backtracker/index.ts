import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { recursiveBacktrackerMaze } from "./sources/recursive-backtracker.ts?fn";
import { generateRecursiveBacktrackerSteps } from "./step-generator";
import { recursiveBacktrackerEducational } from "./educational";

import typescriptSource from "./sources/recursive-backtracker.ts?raw";
import pythonSource from "./sources/recursive-backtracker.py?raw";
import javaSource from "./sources/RecursiveBacktracker.java?raw";
import rustSource from "./sources/recursive-backtracker.rs?raw";
import cppSource from "./sources/RecursiveBacktracker.cpp?raw";
import goSource from "./sources/recursive-backtracker.go?raw";

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

const recursiveBacktrackerDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.RECURSIVE_BACKTRACKER!,
    name: "Recursive Backtracker",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "A DFS-based maze carving algorithm that produces long winding corridors — starts at a cell and randomly carves deeper until forced to backtrack",
    timeComplexity: {
      best: "O(V)",
      average: "O(V)",
      worst: "O(V)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => recursiveBacktrackerMaze(input.grid, input.startPosition),
  generateSteps: generateRecursiveBacktrackerSteps,
  educational: recursiveBacktrackerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(recursiveBacktrackerDefinition);
