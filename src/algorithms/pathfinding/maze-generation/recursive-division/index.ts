import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { recursiveDivision } from "./sources/recursive-division.ts?fn";
import { generateRecursiveDivisionSteps } from "./step-generator";
import { recursiveDivisionEducational } from "./educational";

import typescriptSource from "./sources/recursive-division.ts?raw";
import pythonSource from "./sources/recursive-division.py?raw";
import javaSource from "./sources/RecursiveDivision.java?raw";
import rustSource from "./sources/recursive-division.rs?raw";
import cppSource from "./sources/RecursiveDivision.cpp?raw";
import goSource from "./sources/recursive-division.go?raw";

/** Builds an all-EMPTY grid for Recursive Division (this algorithm adds walls, not carves). */
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

  return grid;
}

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const recursiveDivisionDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.RECURSIVE_DIVISION!,
    name: "Recursive Division",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "Starts with an open grid and recursively divides it with walls — the only common maze algorithm that adds walls rather than carving passages, producing structured rectangular rooms",
    timeComplexity: {
      best: "O(V)",
      average: "O(V)",
      worst: "O(V)",
    },
    spaceComplexity: "O(log V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) =>
    recursiveDivision(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateRecursiveDivisionSteps,
  educational: recursiveDivisionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(recursiveDivisionDefinition);
