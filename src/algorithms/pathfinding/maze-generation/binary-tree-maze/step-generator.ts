/** Step generator for Binary Tree Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BINARY_TREE_MAZE!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateBinaryTreeMazeSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  let passagesCarved = 0;

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
    passagesCarved,
  });

  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      // Carve the passage cell itself
      passagesCarved++;
      tracker.carveCell(rowIndex, colIndex, {
        currentCell: [rowIndex, colIndex],
        passagesCarved,
      });

      const canGoNorth = rowIndex - 2 >= 1;
      const canGoEast = colIndex + 2 <= colCount - 2;

      if (canGoNorth && canGoEast) {
        if (Math.random() < 0.5) {
          passagesCarved++;
          tracker.carveCell(rowIndex - 1, colIndex, {
            currentCell: [rowIndex, colIndex],
            direction: "north",
            carvedWall: [rowIndex - 1, colIndex],
            passagesCarved,
          });
        } else {
          passagesCarved++;
          tracker.carveCell(rowIndex, colIndex + 1, {
            currentCell: [rowIndex, colIndex],
            direction: "east",
            carvedWall: [rowIndex, colIndex + 1],
            passagesCarved,
          });
        }
      } else if (canGoNorth) {
        passagesCarved++;
        tracker.carveCell(rowIndex - 1, colIndex, {
          currentCell: [rowIndex, colIndex],
          direction: "north",
          carvedWall: [rowIndex - 1, colIndex],
          passagesCarved,
        });
      } else if (canGoEast) {
        passagesCarved++;
        tracker.carveCell(rowIndex, colIndex + 1, {
          currentCell: [rowIndex, colIndex],
          direction: "east",
          carvedWall: [rowIndex, colIndex + 1],
          passagesCarved,
        });
      }
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
