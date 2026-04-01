/** Step generator for Iterative Deepening DFS — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const IDDFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ITERATIVE_DEEPENING_DFS!);

interface IddfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateIterativeDeepeningDfsSteps(input: IddfsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, IDDFS_LINE_MAP);

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
  });

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let depthReached = 0;

  for (let depthLimit = 0; depthLimit <= rowCount * colCount; depthLimit++) {
    const pathSet = new Set<string>();

    tracker.openNode(startPosition[0], startPosition[1], {
      currentNode: startPosition,
      depthLimit,
      phase: "start-iteration",
    });

    const result = depthSearch(
      grid,
      startPosition,
      endPosition,
      depthLimit,
      pathSet,
      tracker,
      directions,
      rowCount,
      colCount,
    );

    if (result !== null) {
      depthReached = depthLimit;
      tracker.tracePath(result, { pathLength: result.length, depthReached });
      tracker.complete({ pathFound: true, pathLength: result.length, depthReached }, true);
      return tracker.getSteps();
    }

    depthReached = depthLimit;
  }

  tracker.complete({ pathFound: false, depthReached }, false);
  return tracker.getSteps();
}

function depthSearch(
  grid: GridCell[][],
  current: [number, number],
  end: [number, number],
  depthRemaining: number,
  pathSet: Set<string>,
  tracker: PathfindingTracker,
  directions: [number, number][],
  rowCount: number,
  colCount: number,
): [number, number][] | null {
  const [currentRow, currentCol] = current;

  tracker.closeNode(currentRow, currentCol, {
    currentNode: [currentRow, currentCol],
    depthRemaining,
  });

  if (currentRow === end[0] && currentCol === end[1]) {
    return [[currentRow, currentCol]];
  }

  if (depthRemaining === 0) return null;

  pathSet.add(`${currentRow},${currentCol}`);

  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = currentRow + deltaRow;
    const neighborCol = currentCol + deltaCol;

    if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) {
      continue;
    }

    const neighborCell = grid[neighborRow]![neighborCol]!;
    if (neighborCell.type === "wall") continue;
    if (pathSet.has(`${neighborRow},${neighborCol}`)) continue;

    tracker.openNode(neighborRow, neighborCol, {
      neighborNode: [neighborRow, neighborCol],
      parentNode: [currentRow, currentCol],
      depthRemaining: depthRemaining - 1,
    });

    const subResult = depthSearch(
      grid,
      [neighborRow, neighborCol],
      end,
      depthRemaining - 1,
      pathSet,
      tracker,
      directions,
      rowCount,
      colCount,
    );

    if (subResult !== null) {
      return [[currentRow, currentCol], ...subResult];
    }
  }

  pathSet.delete(`${currentRow},${currentCol}`);
  return null;
}
