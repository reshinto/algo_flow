import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";

import { dijkstra } from "./dijkstra";
import { generateDijkstraSteps } from "./step-generator";
import { dijkstraEducational } from "./educational";

import typescriptSource from "./sources/dijkstra.ts?raw";
import pythonSource from "./sources/dijkstra.py?raw";
import javaSource from "./sources/Dijkstra.java?raw";

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
    category: "pathfinding",
    description:
      "A shortest-path algorithm that finds the optimal route between two nodes in a weighted graph with non-negative edges",
    timeComplexity: {
      best: "O((V+E) log V)",
      average: "O((V+E) log V)",
      worst: "O(V²)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
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
  },
};

registry.register(dijkstraDefinition);
