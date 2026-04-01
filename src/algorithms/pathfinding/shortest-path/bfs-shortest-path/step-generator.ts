/** Step generator for BFS Shortest Path — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const BFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BFS_SHORTEST_PATH!);

interface BfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateBfsShortestPathSteps(input: BfsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, BFS_LINE_MAP);

  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const visitedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
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

  /* Enqueue start node */
  const queue: [number, number][] = [[startPosition[0], startPosition[1]]];
  visitedSet[startPosition[0]]![startPosition[1]] = true;

  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    queueSize: 1,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    const [currentRow, currentCol] = current;

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      queueSize: queue.length,
    });

    /* Check if we reached the end */
    if (currentRow === endPosition[0] && currentCol === endPosition[1]) {
      const path = reconstructPath(parent, endPosition);
      tracker.tracePath(path, {
        pathLength: path.length,
        path,
      });
      tracker.complete({ pathFound: true, pathLength: path.length }, true);
      return tracker.getSteps();
    }

    /* Explore neighbors */
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
      if (visitedSet[neighborRow]![neighborCol]) continue;

      visitedSet[neighborRow]![neighborCol] = true;
      parent[neighborRow]![neighborCol] = [currentRow, currentCol];
      queue.push([neighborRow, neighborCol]);

      tracker.openNode(neighborRow, neighborCol, {
        neighborNode: [neighborRow, neighborCol],
        parentNode: [currentRow, currentCol],
        queueSize: queue.length,
      });
    }
  }

  /* No path found */
  tracker.complete({ pathFound: false }, false);
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
