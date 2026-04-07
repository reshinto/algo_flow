import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { dijkstra } from "./sources/dijkstra.ts?fn";
import { generateDijkstraSteps } from "./step-generator";
import { dijkstraEducational } from "./educational";

import typescriptSource from "./sources/dijkstra.ts?raw";
import pythonSource from "./sources/dijkstra.py?raw";
import javaSource from "./sources/Dijkstra.java?raw";
import rustSource from "./sources/dijkstra.rs?raw";
import cppSource from "./sources/Dijkstra.cpp?raw";
import goSource from "./sources/dijkstra.go?raw";

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
  const wallPositions: [number, number][] = [];

  // Create 3 porous vertical walls to showcase BFS/Dijkstra's uniform radial expansion
  for (let r = 1; r < 14; r++) {
    // Wall 1
    if (r !== 4 && r !== 10) wallPositions.push([r, 7]);
    // Wall 2
    if (r !== 7) wallPositions.push([r, 15]);
    // Wall 3
    if (r !== 3 && r !== 11) wallPositions.push([r, 22]);
  }

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

interface DijkstraInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const dijkstraDefinition: AlgorithmDefinition<DijkstraInput> = {
  meta: {
    id: ALGORITHM_ID.DIJKSTRA!,
    name: "Dijkstra's Algorithm",
    category: CATEGORY.PATHFINDING!,
    technique: "shortest-path",
    description:
      "A shortest-path algorithm that finds the optimal route between two nodes in a weighted graph with non-negative edges",
    timeComplexity: {
      best: "O((V+E) log V)",
      average: "O((V+E) log V)",
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
  execute: (input: DijkstraInput) => dijkstra(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateDijkstraSteps,
  educational: dijkstraEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(dijkstraDefinition);
