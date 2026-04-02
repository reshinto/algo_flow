/** Step generator for Wall Follower — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const WALL_FOLLOWER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.WALL_FOLLOWER!);

/* Direction indices: 0=up, 1=right, 2=down, 3=left */
const DIRECTION_ROW: [number, number, number, number] = [-1, 0, 1, 0];
const DIRECTION_COL: [number, number, number, number] = [0, 1, 0, -1];
const DIRECTION_NAME = ["up", "right", "down", "left"] as const;

interface WallFollowerInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateWallFollowerSteps(input: WallFollowerInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, WALL_FOLLOWER_LINE_MAP);

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
  });

  let currentRow = startPosition[0];
  let currentCol = startPosition[1];
  let facingDirection = 1; // start facing right
  const maxSteps = rowCount * colCount * 4;
  const path: [number, number][] = [[currentRow, currentCol]];

  tracker.openNode(currentRow, currentCol, {
    currentNode: [currentRow, currentCol],
    facing: DIRECTION_NAME[facingDirection],
    stepCount: 0,
  });

  for (let stepCount = 0; stepCount < maxSteps; stepCount++) {
    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      facing: DIRECTION_NAME[facingDirection],
      stepCount,
    });

    if (currentRow === endPosition[0] && currentCol === endPosition[1]) {
      tracker.tracePath(path, { pathLength: path.length, stepsTraversed: stepCount });
      tracker.complete({ pathFound: true, stepsTraversed: stepCount }, true);
      return tracker.getSteps();
    }

    const rightDirection = (facingDirection + 1) % 4;
    const leftDirection = (facingDirection + 3) % 4;
    const backDirection = (facingDirection + 2) % 4;

    let chosenDirection: number;

    if (canMoveTo(grid, currentRow, currentCol, rightDirection, rowCount, colCount)) {
      chosenDirection = rightDirection;
    } else if (canMoveTo(grid, currentRow, currentCol, facingDirection, rowCount, colCount)) {
      chosenDirection = facingDirection;
    } else if (canMoveTo(grid, currentRow, currentCol, leftDirection, rowCount, colCount)) {
      chosenDirection = leftDirection;
    } else {
      chosenDirection = backDirection;
    }

    facingDirection = chosenDirection;
    currentRow = currentRow + DIRECTION_ROW[facingDirection]!;
    currentCol = currentCol + DIRECTION_COL[facingDirection]!;
    path.push([currentRow, currentCol]);

    tracker.openNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      facing: DIRECTION_NAME[facingDirection],
      stepCount: stepCount + 1,
    });
  }

  tracker.complete({ pathFound: false, stepsTraversed: maxSteps }, false);
  return tracker.getSteps();
}

function canMoveTo(
  grid: GridCell[][],
  row: number,
  col: number,
  direction: number,
  rowCount: number,
  colCount: number,
): boolean {
  const nextRow = row + DIRECTION_ROW[direction as 0 | 1 | 2 | 3]!;
  const nextCol = col + DIRECTION_COL[direction as 0 | 1 | 2 | 3]!;
  if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) return false;
  return grid[nextRow]![nextCol]!.type !== "wall";
}
