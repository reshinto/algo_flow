/** Step generator for Flood Fill DFS — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const FLOOD_FILL_DFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLOOD_FILL_DFS!);

interface FloodFillDfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateFloodFillDfsSteps(input: FloodFillDfsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(
    grid,
    startPosition,
    endPosition,
    FLOOD_FILL_DFS_LINE_MAP,
  );

  const filledSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  
  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
  });

  /* Seed stack with start cell */
  const stack: [number, number][] = [[startPosition[0], startPosition[1]]];
  filledSet[startPosition[0]]![startPosition[1]] = true;

  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    stackSize: 1,
  });

  let filledCount = 0;

  while (stack.length > 0) {
    const current = stack.pop()!;
    const [currentRow, currentCol] = current;

    filledCount++;
    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      stackSize: stack.length,
      filledCount,
    });


    /* Explore 4-directional neighbors */
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;

      if (
        neighborRow < 0 ||
        neighborRow >= rowCount ||
        neighborCol < 0 ||
        neighborCol >= colCount
      ) {
        continue;
      }

      const neighborCell = grid[neighborRow]![neighborCol]!;
      if (neighborCell.type === "wall") continue;
      if (filledSet[neighborRow]![neighborCol]) continue;

      filledSet[neighborRow]![neighborCol] = true;
      parent[neighborRow]![neighborCol] = [currentRow, currentCol];
      stack.push([neighborRow, neighborCol]);

      tracker.openNode(neighborRow, neighborCol, {
        neighborNode: [neighborRow, neighborCol],
        parentNode: [currentRow, currentCol],
        stackSize: stack.length,
      });
    }
  }

  if (filledSet[endPosition[0]]?.[endPosition[1]]) {
    const path = reconstructPath(parent, endPosition);
    tracker.tracePath(path, { pathLength: path.length, path });
    tracker.complete(
      { pathFound: true, pathLength: path.length, filledCount, completeDescription: `Flood Fill completed, painted ${filledCount} cells` },
      true,
    );
  } else {
    tracker.complete(
      { pathFound: false, filledCount, completeDescription: `Flood Fill completed, painted ${filledCount} cells` },
      false,
    );
  }
  return tracker.getSteps();
}

function reconstructPath(
  parent: ([number, number] | null)[][],
  end: [number, number],
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = end;
  while (current !== null) {
    path.unshift(current);
    current = parent[current[0]]![current[1]]!;
  }
  return path;
}
