import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { idaStar } from "./sources/ida-star.ts?fn";
import { generateIDAStarSteps } from "./step-generator";
import { idaStarEducational } from "./educational";

import typescriptSource from "./sources/ida-star.ts?raw";
import pythonSource from "./sources/ida-star.py?raw";
import javaSource from "./sources/IdaStar.java?raw";
import rustSource from "./sources/ida-star.rs?raw";
import cppSource from "./sources/IdaStar.cpp?raw";
import goSource from "./sources/ida-star.go?raw";

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

interface IDAInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const idaStarDefinition: AlgorithmDefinition<IDAInput> = {
  meta: {
    id: ALGORITHM_ID.IDA_STAR!,
    name: "IDA*",
    category: CATEGORY.PATHFINDING!,
    technique: "heuristic-search",
    description:
      "Iterative Deepening A* — runs DFS with an f-cost threshold that grows each iteration, finding optimal paths with only O(d) memory instead of A*'s O(V)",
    timeComplexity: {
      best: "O(b^d)",
      average: "O(b^d)",
      worst: "O(b^d)",
    },
    spaceComplexity: "O(d)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: IDAInput) => idaStar(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateIDAStarSteps,
  educational: idaStarEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(idaStarDefinition);
