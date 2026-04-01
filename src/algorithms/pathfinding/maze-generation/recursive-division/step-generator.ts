/** Step generator for Recursive Division Maze — adds walls to open grid via PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RECURSIVE_DIVISION!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateRecursiveDivisionSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  let wallsBuilt = 0;

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
    wallsBuilt,
  });

  function divideRegion(
    topRow: number,
    leftCol: number,
    bottomRow: number,
    rightCol: number,
  ): void {
    const regionHeight = bottomRow - topRow;
    const regionWidth = rightCol - leftCol;

    if (regionHeight < 2 || regionWidth < 2) return;

    const buildHorizontal = regionHeight >= regionWidth;

    if (buildHorizontal) {
      const halfHeight = Math.floor(regionHeight / 2);
      if (halfHeight < 1) return;
      const wallRow = topRow + 2 * Math.floor(Math.random() * halfHeight) + 1;
      const halfWidth = Math.ceil(regionWidth / 2);
      const gapCol = leftCol + 2 * Math.floor(Math.random() * halfWidth);

      for (let colIndex = leftCol; colIndex <= rightCol; colIndex++) {
        const cell = grid[wallRow]?.[colIndex];
        if (!cell) continue;
        if (cell.type === "start" || cell.type === "end") continue;
        if (colIndex === gapCol) continue;

        wallsBuilt++;
        tracker.buildWall(wallRow, colIndex, {
          orientation: "horizontal",
          wallRow,
          wallCol: colIndex,
          gapCol,
          region: [topRow, leftCol, bottomRow, rightCol],
          wallsBuilt,
        });
      }

      divideRegion(topRow, leftCol, wallRow - 1, rightCol);
      divideRegion(wallRow + 1, leftCol, bottomRow, rightCol);
    } else {
      const halfWidth = Math.floor(regionWidth / 2);
      if (halfWidth < 1) return;
      const wallCol = leftCol + 2 * Math.floor(Math.random() * halfWidth) + 1;
      const halfHeight = Math.ceil(regionHeight / 2);
      const gapRow = topRow + 2 * Math.floor(Math.random() * halfHeight);

      for (let rowIndex = topRow; rowIndex <= bottomRow; rowIndex++) {
        const cell = grid[rowIndex]?.[wallCol];
        if (!cell) continue;
        if (cell.type === "start" || cell.type === "end") continue;
        if (rowIndex === gapRow) continue;

        wallsBuilt++;
        tracker.buildWall(rowIndex, wallCol, {
          orientation: "vertical",
          wallRow: rowIndex,
          wallCol,
          gapRow,
          region: [topRow, leftCol, bottomRow, rightCol],
          wallsBuilt,
        });
      }

      divideRegion(topRow, leftCol, bottomRow, wallCol - 1);
      divideRegion(topRow, wallCol + 1, bottomRow, rightCol);
    }
  }

  divideRegion(0, 0, rowCount - 1, colCount - 1);

  tracker.complete(
    { wallsBuilt, description: `Maze generation complete: ${wallsBuilt} walls built` },
    false,
  );

  return tracker.getSteps();
}

/** Build an all-EMPTY grid with start and end marked (Recursive Division starts open). */
export function createDivisionDefaultGrid(): GridCell[][] {
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

  return grid;
}
