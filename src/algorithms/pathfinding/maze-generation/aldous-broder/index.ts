import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { aldousBroder } from "./sources/aldous-broder.ts?fn";
import { generateAldousBroderSteps } from "./step-generator";
import { aldousBroderEducational } from "./educational";

import typescriptSource from "./sources/aldous-broder.ts?raw";
import pythonSource from "./sources/aldous-broder.py?raw";
import javaSource from "./sources/AldousBroder.java?raw";
import rustSource from "./sources/aldous-broder.rs?raw";
import cppSource from "./sources/AldousBroder.cpp?raw";
import goSource from "./sources/aldous-broder.go?raw";

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

const aldousBroderDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.ALDOUS_BRODER!,
    name: "Aldous-Broder",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "A random walk maze generator that produces uniform spanning trees — every possible perfect maze is equally likely, at the cost of O(V²) expected time",
    timeComplexity: {
      best: "O(V)",
      average: "O(V²)",
      worst: "O(V²)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => aldousBroder(input.grid, input.startPosition),
  generateSteps: generateAldousBroderSteps,
  educational: aldousBroderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(aldousBroderDefinition);
