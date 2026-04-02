import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { dijkstraBidirectional } from "./sources/dijkstra-bidirectional.ts?fn";
import { generateDijkstraBidirectionalSteps } from "./step-generator";
import { dijkstraBidirectionalEducational } from "./educational";

import typescriptSource from "./sources/dijkstra-bidirectional.ts?raw";
import pythonSource from "./sources/dijkstra-bidirectional.py?raw";
import javaSource from "./sources/DijkstraBidirectional.java?raw";

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

  // Create a solid vertical dividing wall perfectly cutting the grid in half, with a single small gap
  // This illustrates both searches exploring simultaneously and meeting exactly at the gap
  for (let r = 0; r < rows; r++) {
    if (r !== 7 && r !== 8) wallPositions.push([r, Math.floor(cols / 2)]);
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

interface BidirectionalInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const dijkstraBidirectionalDefinition: AlgorithmDefinition<BidirectionalInput> = {
  meta: {
    id: ALGORITHM_ID.DIJKSTRA_BIDIRECTIONAL!,
    name: "Dijkstra Bidirectional",
    category: CATEGORY.PATHFINDING!,
    technique: "shortest-path",
    description:
      "Two simultaneous Dijkstra searches expanding from start and end simultaneously, meeting in the middle to find the shortest path with roughly half the exploration cost",
    timeComplexity: {
      best: "O((V+E) log V / 2)",
      average: "O((V+E) log V)",
      worst: "O((V+E) log V)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: BidirectionalInput) =>
    dijkstraBidirectional(input.grid, input.startPosition, input.endPosition),
  generateSteps: generateDijkstraBidirectionalSteps,
  educational: dijkstraBidirectionalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dijkstraBidirectionalDefinition);
