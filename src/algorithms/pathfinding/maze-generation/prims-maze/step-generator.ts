/** Step generator for Prim's Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PRIMS_MAZE!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generatePrimsMazeSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  const inMaze: boolean[][] = Array.from({ length: rowCount }, () =>
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
  inMaze[startRow]![startCol] = true;

  passagesCarved++;
  tracker.carveCell(startRow, startCol, {
    currentCell: startPosition,
    frontierSize: 0,
    passagesCarved,
  });

  // Frontier: [passageCellRow, passageCellCol, originRow, originCol]
  const frontier: [number, number, number, number][] = [];

  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = startRow + deltaRow;
    const neighborCol = startCol + deltaCol;
    if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
    if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
    if (!inMaze[neighborRow]![neighborCol]) {
      frontier.push([neighborRow, neighborCol, startRow, startCol]);
      tracker.openNode(neighborRow, neighborCol, {
        frontierSize: frontier.length,
        passagesCarved,
      });
    }
  }

  while (frontier.length > 0) {
    const pickedIndex = Math.floor(Math.random() * frontier.length);
    const picked = frontier.splice(pickedIndex, 1)[0]!;
    const [pickedRow, pickedCol, originRow, originCol] = picked;

    if (inMaze[pickedRow]![pickedCol]) continue;

    inMaze[pickedRow]![pickedCol] = true;

    const wallRow = originRow + Math.floor((pickedRow - originRow) / 2);
    const wallCol = originCol + Math.floor((pickedCol - originCol) / 2);

    passagesCarved++;
    tracker.carveCell(wallRow, wallCol, {
      pickedCell: [pickedRow, pickedCol],
      carvedWall: [wallRow, wallCol],
      frontierSize: frontier.length,
      passagesCarved,
    });

    passagesCarved++;
    tracker.carveCell(pickedRow, pickedCol, {
      carvedCell: [pickedRow, pickedCol],
      frontierSize: frontier.length,
      passagesCarved,
    });

    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = pickedRow + deltaRow;
      const neighborCol = pickedCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!inMaze[neighborRow]![neighborCol]) {
        frontier.push([neighborRow, neighborCol, pickedRow, pickedCol]);
        tracker.openNode(neighborRow, neighborCol, {
          frontierSize: frontier.length,
          passagesCarved,
        });
      }
    }
  }

  tracker.complete(
    { passagesCarved, description: `Maze generation complete: ${passagesCarved} passages carved` },
    true,
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
