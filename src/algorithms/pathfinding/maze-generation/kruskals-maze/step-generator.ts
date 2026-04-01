/** Step generator for Kruskal's Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KRUSKALS_MAZE!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateKruskalsMazeSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  let passagesCarved = 0;

  // Union-Find with flat arrays
  const setId: number[] = Array.from({ length: rowCount * colCount }, (_, cellIndex) => cellIndex);

  function findSet(row: number, col: number): number {
    let root = row * colCount + col;
    while (setId[root] !== root) {
      root = setId[root]!;
    }
    return root;
  }

  function mergeSets(rowA: number, colA: number, rowB: number, colB: number): void {
    const rootA = findSet(rowA, colA);
    const rootB = findSet(rowB, colB);
    if (rootA !== rootB) {
      setId[rootB] = rootA;
    }
  }

  tracker.initialize({
    rowCount,
    colCount,
    passagesCarved,
    startPosition,
    endPosition,
  });

  // Carve all passage cells and build wall list
  const walls: [number, number, number, number, number, number][] = [];

  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      passagesCarved++;
      tracker.mergeCells(rowIndex, colIndex, {
        cell: [rowIndex, colIndex],
        passagesCarved,
      });

      if (colIndex + 2 < colCount - 1) {
        walls.push([rowIndex, colIndex + 1, rowIndex, colIndex, rowIndex, colIndex + 2]);
      }
      if (rowIndex + 2 < rowCount - 1) {
        walls.push([rowIndex + 1, colIndex, rowIndex, colIndex, rowIndex + 2, colIndex]);
      }
    }
  }

  // Shuffle walls (Fisher-Yates)
  for (let wallIndex = walls.length - 1; wallIndex > 0; wallIndex--) {
    const swapIndex = Math.floor(Math.random() * (wallIndex + 1));
    const temp = walls[wallIndex]!;
    walls[wallIndex] = walls[swapIndex]!;
    walls[swapIndex] = temp;
  }

  // Process walls — merge cells from different sets
  for (const wall of walls) {
    const [wallRow, wallCol, cellARow, cellACol, cellBRow, cellBCol] = wall;

    if (findSet(cellARow, cellACol) !== findSet(cellBRow, cellBCol)) {
      passagesCarved++;
      tracker.mergeCells(
        wallRow,
        wallCol,
        {
          wallRemoved: [wallRow, wallCol],
          mergedCells: [
            [cellARow, cellACol],
            [cellBRow, cellBCol],
          ],
          passagesCarved,
        },
        `Merge sets: remove wall at (${wallRow}, ${wallCol})`,
      );

      mergeSets(cellARow, cellACol, cellBRow, cellBCol);
    }
  }

  tracker.complete(
    { passagesCarved, description: `Maze generation complete: ${passagesCarved} passages carved` },
    false,
  );

  return tracker.getSteps();
}

/** Build an all-walls grid with start and end marked for maze generation. */
export function createMazeDefaultGrid(): GridCell[][] {
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
