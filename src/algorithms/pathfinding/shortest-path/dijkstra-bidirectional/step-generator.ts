/** Step generator for Dijkstra Bidirectional — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const BIDIR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DIJKSTRA_BIDIRECTIONAL!);

interface BidirectionalInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateDijkstraBidirectionalSteps(input: BidirectionalInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, BIDIR_LINE_MAP);

  const forwardDistance: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  forwardDistance[startPosition[0]]![startPosition[1]] = 0;

  const forwardParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const forwardVisited: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  const reverseDistance: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  reverseDistance[endPosition[0]]![endPosition[1]] = 0;

  const reverseParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const reverseVisited: boolean[][] = Array.from({ length: rowCount }, () =>
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

  const forwardQueue: { row: number; col: number; dist: number }[] = [
    { row: startPosition[0], col: startPosition[1], dist: 0 },
  ];
  const reverseQueue: { row: number; col: number; dist: number }[] = [
    { row: endPosition[0], col: endPosition[1], dist: 0 },
  ];

  tracker.setPhase("forward");
  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    distance: 0,
    phase: "forward",
  });

  tracker.setPhase("reverse");
  tracker.openNodeReverse(endPosition[0], endPosition[1], {
    currentNode: endPosition,
    distance: 0,
    phase: "reverse",
  });

  let bestCost = Infinity;
  let meetingPoint: [number, number] | null = null;

  while (forwardQueue.length > 0 || reverseQueue.length > 0) {
    /* Forward step */
    if (forwardQueue.length > 0) {
      tracker.setPhase("forward");
      forwardQueue.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
      const current = forwardQueue.shift()!;

      if (!forwardVisited[current.row]![current.col]) {
        forwardVisited[current.row]![current.col] = true;

        tracker.closeNode(current.row, current.col, {
          currentNode: [current.row, current.col],
          distance: current.dist,
          phase: "forward",
        });

        if (reverseVisited[current.row]![current.col]) {
          const totalCost =
            forwardDistance[current.row]![current.col]! +
            reverseDistance[current.row]![current.col]!;
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = [current.row, current.col];
          }
        }

        for (const [deltaRow, deltaCol] of directions) {
          const neighborRow = current.row + deltaRow;
          const neighborCol = current.col + deltaCol;

          if (
            neighborRow < 0 ||
            neighborRow >= rowCount ||
            neighborCol < 0 ||
            neighborCol >= colCount
          )
            continue;

          const neighborCell = grid[neighborRow]![neighborCol]!;
          if (neighborCell.type === "wall") continue;
          if (forwardVisited[neighborRow]![neighborCol]) continue;

          const newDist = forwardDistance[current.row]![current.col]! + 1;
          if (newDist < forwardDistance[neighborRow]![neighborCol]!) {
            forwardDistance[neighborRow]![neighborCol] = newDist;
            forwardParent[neighborRow]![neighborCol] = [current.row, current.col];
            forwardQueue.push({ row: neighborRow, col: neighborCol, dist: newDist });

            tracker.openNode(neighborRow, neighborCol, {
              neighborNode: [neighborRow, neighborCol],
              parentNode: [current.row, current.col],
              distance: newDist,
              phase: "forward",
            });
          }
        }
      }
    }

    /* Reverse step */
    if (reverseQueue.length > 0) {
      tracker.setPhase("reverse");
      reverseQueue.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
      const current = reverseQueue.shift()!;

      if (!reverseVisited[current.row]![current.col]) {
        reverseVisited[current.row]![current.col] = true;

        tracker.closeNodeReverse(current.row, current.col, {
          currentNode: [current.row, current.col],
          distance: current.dist,
          phase: "reverse",
        });

        if (forwardVisited[current.row]![current.col]) {
          const totalCost =
            forwardDistance[current.row]![current.col]! +
            reverseDistance[current.row]![current.col]!;
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = [current.row, current.col];
          }
        }

        for (const [deltaRow, deltaCol] of directions) {
          const neighborRow = current.row + deltaRow;
          const neighborCol = current.col + deltaCol;

          if (
            neighborRow < 0 ||
            neighborRow >= rowCount ||
            neighborCol < 0 ||
            neighborCol >= colCount
          )
            continue;

          const neighborCell = grid[neighborRow]![neighborCol]!;
          if (neighborCell.type === "wall") continue;
          if (reverseVisited[neighborRow]![neighborCol]) continue;

          const newDist = reverseDistance[current.row]![current.col]! + 1;
          if (newDist < reverseDistance[neighborRow]![neighborCol]!) {
            reverseDistance[neighborRow]![neighborCol] = newDist;
            reverseParent[neighborRow]![neighborCol] = [current.row, current.col];
            reverseQueue.push({ row: neighborRow, col: neighborCol, dist: newDist });

            tracker.openNodeReverse(neighborRow, neighborCol, {
              neighborNode: [neighborRow, neighborCol],
              parentNode: [current.row, current.col],
              distance: newDist,
              phase: "reverse",
            });
          }
        }
      }
    }

    /* Early termination check */
    if (meetingPoint !== null) {
      const forwardMin = forwardQueue.length > 0 ? (forwardQueue[0]?.dist ?? Infinity) : Infinity;
      const reverseMin = reverseQueue.length > 0 ? (reverseQueue[0]?.dist ?? Infinity) : Infinity;
      if (forwardMin + reverseMin >= bestCost) break;
    }
  }

  if (meetingPoint === null) {
    tracker.complete({ pathFound: false }, false);
    return tracker.getSteps();
  }

  /* Reconstruct full path */
  const forwardPath = reconstructPath(forwardParent, meetingPoint);
  const reversePath = reconstructReversePath(reverseParent, meetingPoint);
  const fullPath: [number, number][] = [...forwardPath, ...reversePath.slice(1)];

  tracker.tracePath(fullPath, {
    pathLength: fullPath.length,
    meetingPoint,
    path: fullPath,
  });

  tracker.complete({ pathFound: true, pathLength: fullPath.length, meetingPoint }, true);
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

function reconstructReversePath(
  reverseParent: ([number, number] | null)[][],
  meetingPoint: [number, number],
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = meetingPoint;

  while (current !== null) {
    path.push(current);
    current = reverseParent[current[0]]![current[1]]!;
  }

  return path;
}
