import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { bfsExploration } from "./sources/bfs-exploration.ts?fn";
import { generateBfsExplorationSteps } from "./step-generator";
import { bfsExplorationEducational } from "./educational";

import typescriptSource from "./sources/bfs-exploration.ts?raw";
import pythonSource from "./sources/bfs-exploration.py?raw";
import javaSource from "./sources/BfsExploration.java?raw";
import rustSource from "./sources/bfs-exploration.rs?raw";
import cppSource from "./sources/BfsExploration.cpp?raw";
import goSource from "./sources/bfs-exploration.go?raw";

/** Builds the initial pathfinding grid with start position and preset walls. */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "empty";
      if (rowIndex === startPosition[0] && colIndex === startPosition[1]) {
        cellType = "start";
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

  /* Add some default walls for visual interest */
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

interface BfsExplorationInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const bfsExplorationDefinition: AlgorithmDefinition<BfsExplorationInput> = {
  meta: {
    id: ALGORITHM_ID.BFS_EXPLORATION!,
    name: "BFS Exploration",
    category: CATEGORY.PATHFINDING!,
    technique: "graph-traversal",
    description:
      "Pure Breadth-First Search that explores the entire reachable grid layer-by-layer from a start cell — no target endpoint, complete flood-fill",
    timeComplexity: {
      best: "O(1)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.startPosition],
    },
  },
  execute: (input: BfsExplorationInput) => bfsExploration(input.grid, input.startPosition),
  generateSteps: generateBfsExplorationSteps,
  educational: bfsExplorationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bfsExplorationDefinition);
