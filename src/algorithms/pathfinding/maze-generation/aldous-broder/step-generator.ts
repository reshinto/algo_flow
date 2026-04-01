/** Step generator for Aldous-Broder Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ALDOUS_BRODER!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateAldousBroderSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  const visited: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  let passagesCarved = 0;
  let visitedCount = 0;

  // Count total passage cells (odd row and odd col)
  let totalPassageCells = 0;
  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      totalPassageCells++;
    }
  }

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
    totalPassageCells,
    passagesCarved,
  });

  const directions: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  let [currentRow, currentCol] = startPosition;

  visited[currentRow]![currentCol] = true;
  passagesCarved++;
  visitedCount++;

  tracker.carveCell(currentRow, currentCol, {
    currentCell: [currentRow, currentCol],
    visitedCount,
    totalPassageCells,
    passagesCarved,
  });

  // Cap iterations to prevent excessive step count
  const maxIterations = rowCount * colCount * 10;
  let iterations = 0;

  while (visitedCount < totalPassageCells && iterations < maxIterations) {
    iterations++;

    const validNeighbors: [number, number][] = [];
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      validNeighbors.push([neighborRow, neighborCol]);
    }

    if (validNeighbors.length === 0) break;

    const chosenIndex = Math.floor(Math.random() * validNeighbors.length);
    const [nextRow, nextCol] = validNeighbors[chosenIndex]!;

    if (!visited[nextRow]![nextCol]) {
      const wallRow = currentRow + Math.floor((nextRow - currentRow) / 2);
      const wallCol = currentCol + Math.floor((nextCol - currentCol) / 2);

      passagesCarved++;
      tracker.carveCell(wallRow, wallCol, {
        currentCell: [currentRow, currentCol],
        carvedWall: [wallRow, wallCol],
        nextCell: [nextRow, nextCol],
        visitedCount,
        passagesCarved,
      });

      passagesCarved++;
      tracker.carveCell(nextRow, nextCol, {
        carvedCell: [nextRow, nextCol],
        visitedCount: visitedCount + 1,
        totalPassageCells,
        passagesCarved,
      });

      visited[nextRow]![nextCol] = true;
      visitedCount++;
    }

    tracker.setCurrentNode(nextRow, nextCol, {
      currentCell: [nextRow, nextCol],
      visitedCount,
      totalPassageCells,
      passagesCarved,
    });

    currentRow = nextRow;
    currentCol = nextCol;
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
