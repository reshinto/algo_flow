import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { kruskalsMaze } from "./sources/kruskals-maze.ts?fn";
import { generateKruskalsMazeSteps } from "./step-generator";
import { kruskalsMazeEducational } from "./educational";

import typescriptSource from "./sources/kruskals-maze.ts?raw";
import pythonSource from "./sources/kruskals-maze.py?raw";
import javaSource from "./sources/KruskalsMaze.java?raw";
import rustSource from "./sources/kruskals-maze.rs?raw";
import cppSource from "./sources/KruskalsMaze.cpp?raw";
import goSource from "./sources/kruskals-maze.go?raw";

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

const kruskalsMazeDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.KRUSKALS_MAZE!,
    name: "Kruskal's Maze",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "A Union-Find based maze generator that randomly removes walls between disconnected regions — scattered patches gradually merge into a single connected labyrinth",
    timeComplexity: {
      best: "O(E · α(V))",
      average: "O(E · α(V))",
      worst: "O(E · α(V))",
    },
    spaceComplexity: "O(V + E)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => kruskalsMaze(input.grid),
  generateSteps: generateKruskalsMazeSteps,
  educational: kruskalsMazeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(kruskalsMazeDefinition);
