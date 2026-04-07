import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { ellersMaze } from "./sources/ellers-maze.ts?fn";
import { generateEllersMazeSteps } from "./step-generator";
import { ellersMazeEducational } from "./educational";

import typescriptSource from "./sources/ellers-maze.ts?raw";
import pythonSource from "./sources/ellers-maze.py?raw";
import javaSource from "./sources/EllersMaze.java?raw";
import rustSource from "./sources/ellers-maze.rs?raw";
import cppSource from "./sources/EllersMaze.cpp?raw";
import goSource from "./sources/ellers-maze.go?raw";

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

const ellersMazeDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.ELLERS_MAZE!,
    name: "Eller's Maze",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "A row-by-row maze generator that uses set merging and vertical extensions — requires only O(width) memory, making it suitable for infinite maze generation",
    timeComplexity: {
      best: "O(V)",
      average: "O(V)",
      worst: "O(V)",
    },
    spaceComplexity: "O(cols)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => ellersMaze(input.grid),
  generateSteps: generateEllersMazeSteps,
  educational: ellersMazeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(ellersMazeDefinition);
