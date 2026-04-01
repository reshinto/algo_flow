/** Step generator for Recursive Backtracker Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RECURSIVE_BACKTRACKER!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateRecursiveBacktrackerSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  const visited: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  let passagesCarved = 0;

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
    passagesCarved,
  });

  const directions: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  const [startRow, startCol] = startPosition;
  visited[startRow]![startCol] = true;

  // Carve the start cell
  tracker.carveCell(startRow, startCol, {
    currentCell: startPosition,
    stackSize: 1,
    passagesCarved,
  });

  const stack: [number, number][] = [[startRow, startCol]];

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!;
    const [currentRow, currentCol] = current;

    tracker.setCurrentNode(currentRow, currentCol, {
      currentCell: [currentRow, currentCol],
      stackSize: stack.length,
      passagesCarved,
    });

    const unvisitedNeighbors: [number, number][] = [];
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!visited[neighborRow]![neighborCol]) {
        unvisitedNeighbors.push([neighborRow, neighborCol]);
      }
    }

    if (unvisitedNeighbors.length > 0) {
      const chosenIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
      const chosen = unvisitedNeighbors[chosenIndex]!;
      const [chosenRow, chosenCol] = chosen;

      const wallRow = currentRow + Math.floor((chosenRow - currentRow) / 2);
      const wallCol = currentCol + Math.floor((chosenCol - currentCol) / 2);

      // Carve through the wall between current and chosen
      passagesCarved++;
      tracker.carveCell(wallRow, wallCol, {
        currentCell: [currentRow, currentCol],
        carvedWall: [wallRow, wallCol],
        nextCell: [chosenRow, chosenCol],
        passagesCarved,
      });

      // Carve the chosen passage cell
      passagesCarved++;
      tracker.carveCell(chosenRow, chosenCol, {
        currentCell: [currentRow, currentCol],
        carvedCell: [chosenRow, chosenCol],
        passagesCarved,
      });

      visited[chosenRow]![chosenCol] = true;
      stack.push([chosenRow, chosenCol]);
    } else {
      // Backtrack
      stack.pop();
    }
  }

  const completeDescription = `Maze generation complete: ${passagesCarved} passages carved`;
  tracker.complete({ passagesCarved, completeDescription }, false);

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
