/** Step generator for Greedy Best-First Search — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const GREEDY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GREEDY_BEST_FIRST!);

interface GreedyInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

function manhattanDistance(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

export function generateGreedyBestFirstSteps(input: GreedyInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, GREEDY_LINE_MAP);

  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const closedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  const inOpenSet: boolean[][] = Array.from({ length: rowCount }, () =>
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
    algorithm: "Greedy Best-First",
  });

  const startHCost = manhattanDistance(
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1],
  );

  /* Open list: [hCost, row, col] */
  const openList: [number, number, number][] = [[startHCost, startPosition[0], startPosition[1]]];
  inOpenSet[startPosition[0]]![startPosition[1]] = true;

  tracker.openNode(
    startPosition[0],
    startPosition[1],
    {
      currentNode: startPosition,
      openListSize: 1,
    },
    { gCost: 0, hCost: startHCost, fCost: startHCost },
  );

  while (openList.length > 0) {
    openList.sort((first, second) => first[0]! - second[0]!);
    const top = openList.shift()!;
    const currentRow = top[1]!;
    const currentCol = top[2]!;

    closedSet[currentRow]![currentCol] = true;

    tracker.setCurrentNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      openListSize: openList.length,
    });

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      openListSize: openList.length,
    });

    if (currentRow === endPosition[0] && currentCol === endPosition[1]) {
      const path = reconstructPath(parent, endPosition);
      tracker.tracePath(path, { pathLength: path.length, path });
      tracker.complete({ pathFound: true, pathLength: path.length }, true);
      return tracker.getSteps();
    }

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
      if (closedSet[neighborRow]![neighborCol]) continue;
      if (inOpenSet[neighborRow]![neighborCol]) continue;

      const hCost = manhattanDistance(neighborRow, neighborCol, endPosition[0], endPosition[1]);
      inOpenSet[neighborRow]![neighborCol] = true;
      parent[neighborRow]![neighborCol] = [currentRow, currentCol];
      openList.push([hCost, neighborRow, neighborCol]);

      tracker.openNode(
        neighborRow,
        neighborCol,
        {
          neighborNode: [neighborRow, neighborCol],
          parentNode: [currentRow, currentCol],
          openListSize: openList.length,
        },
        { gCost: 0, hCost, fCost: hCost },
      );
    }
  }

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
