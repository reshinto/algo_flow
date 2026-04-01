/** Step generator for Bidirectional BFS — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BIDIRECTIONAL_BFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BIDIRECTIONAL_BFS_GRID!);

interface BidirectionalBfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateBidirectionalBfsSteps(input: BidirectionalBfsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(
    grid,
    startPosition,
    endPosition,
    BIDIRECTIONAL_BFS_LINE_MAP,
  );

  const forwardParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );
  const backwardParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );
  const forwardVisited: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  const backwardVisited: boolean[][] = Array.from({ length: rowCount }, () =>
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

  if (startPosition[0] === endPosition[0] && startPosition[1] === endPosition[1]) {
    tracker.complete({ pathFound: true, pathLength: 1 }, true);
    return tracker.getSteps();
  }

  const forwardQueue: [number, number][] = [[startPosition[0], startPosition[1]]];
  const backwardQueue: [number, number][] = [[endPosition[0], endPosition[1]]];
  forwardVisited[startPosition[0]]![startPosition[1]] = true;
  backwardVisited[endPosition[0]]![endPosition[1]] = true;

  tracker.setPhase("forward");
  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    forwardQueueSize: 1,
    backwardQueueSize: 1,
    phase: "forward",
  });

  tracker.setPhase("backward");
  tracker.openNodeReverse(endPosition[0], endPosition[1], {
    currentNode: endPosition,
    forwardQueueSize: 1,
    backwardQueueSize: 1,
    phase: "backward",
  });

  while (forwardQueue.length > 0 || backwardQueue.length > 0) {
    /* Expand forward frontier */
    if (forwardQueue.length > 0) {
      tracker.setPhase("forward");
      const current = forwardQueue.shift()!;
      const [currentRow, currentCol] = current;

      tracker.closeNode(currentRow, currentCol, {
        currentNode: [currentRow, currentCol],
        forwardQueueSize: forwardQueue.length,
        phase: "forward",
      });

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
        if (forwardVisited[neighborRow]![neighborCol]) continue;

        forwardVisited[neighborRow]![neighborCol] = true;
        forwardParent[neighborRow]![neighborCol] = [currentRow, currentCol];
        forwardQueue.push([neighborRow, neighborCol]);

        tracker.openNode(neighborRow, neighborCol, {
          neighborNode: [neighborRow, neighborCol],
          parentNode: [currentRow, currentCol],
          forwardQueueSize: forwardQueue.length,
          phase: "forward",
        });

        if (backwardVisited[neighborRow]![neighborCol]) {
          const path = buildPath(forwardParent, backwardParent, [neighborRow, neighborCol]);
          tracker.tracePath(path, {
            pathLength: path.length,
            meetingPoint: [neighborRow, neighborCol],
          });
          tracker.complete({ pathFound: true, pathLength: path.length }, true);
          return tracker.getSteps();
        }
      }
    }

    /* Expand backward frontier */
    if (backwardQueue.length > 0) {
      tracker.setPhase("backward");
      const current = backwardQueue.shift()!;
      const [currentRow, currentCol] = current;

      tracker.closeNodeReverse(currentRow, currentCol, {
        currentNode: [currentRow, currentCol],
        backwardQueueSize: backwardQueue.length,
        phase: "backward",
      });

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
        if (backwardVisited[neighborRow]![neighborCol]) continue;

        backwardVisited[neighborRow]![neighborCol] = true;
        backwardParent[neighborRow]![neighborCol] = [currentRow, currentCol];
        backwardQueue.push([neighborRow, neighborCol]);

        tracker.openNodeReverse(neighborRow, neighborCol, {
          neighborNode: [neighborRow, neighborCol],
          parentNode: [currentRow, currentCol],
          backwardQueueSize: backwardQueue.length,
          phase: "backward",
        });

        if (forwardVisited[neighborRow]![neighborCol]) {
          const path = buildPath(forwardParent, backwardParent, [neighborRow, neighborCol]);
          tracker.tracePath(path, {
            pathLength: path.length,
            meetingPoint: [neighborRow, neighborCol],
          });
          tracker.complete({ pathFound: true, pathLength: path.length }, true);
          return tracker.getSteps();
        }
      }
    }
  }

  tracker.complete({ pathFound: false }, false);
  return tracker.getSteps();
}

function buildPath(
  forwardParent: ([number, number] | null)[][],
  backwardParent: ([number, number] | null)[][],
  meetingPoint: [number, number],
): [number, number][] {
  const forwardPath: [number, number][] = [];
  let current: [number, number] | null = meetingPoint;
  while (current !== null) {
    forwardPath.unshift(current);
    current = forwardParent[current[0]]![current[1]]!;
  }

  const backwardPath: [number, number][] = [];
  current = backwardParent[meetingPoint[0]]![meetingPoint[1]]!;
  while (current !== null) {
    backwardPath.push(current);
    current = backwardParent[current[0]]![current[1]]!;
  }

  return [...forwardPath, ...backwardPath];
}
