/** Step generator for Best-First Tie Breaking A* — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TIE_BREAKING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BEST_FIRST_TIE_BREAKING!);

interface TieBreakingInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

function heuristic(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

function crossProduct(
  startRow: number,
  startCol: number,
  nodeRow: number,
  nodeCol: number,
  endRow: number,
  endCol: number,
): number {
  const deltaRow1 = nodeRow - startRow;
  const deltaCol1 = nodeCol - startCol;
  const deltaRow2 = endRow - startRow;
  const deltaCol2 = endCol - startCol;
  return Math.abs(deltaRow1 * deltaCol2 - deltaRow2 * deltaCol1);
}

export function generateBestFirstTieBreakingSteps(input: TieBreakingInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, TIE_BREAKING_LINE_MAP);

  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const gCosts: number[][] = Array.from({ length: rowCount }, () =>
    new Array<number>(colCount).fill(Infinity),
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
    algorithm: "Best-First Tie Breaking A*",
  });

  const startH = heuristic(startPosition[0], startPosition[1], endPosition[0], endPosition[1]);
  const startTie = crossProduct(
    startPosition[0],
    startPosition[1],
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1],
  );
  gCosts[startPosition[0]]![startPosition[1]] = 0;

  /* Open list: [fCost, hCost, tieBreaker, gCost, row, col] */
  const openList: [number, number, number, number, number, number][] = [
    [startH, startH, startTie, 0, startPosition[0], startPosition[1]],
  ];
  inOpenSet[startPosition[0]]![startPosition[1]] = true;

  tracker.openNode(
    startPosition[0],
    startPosition[1],
    { currentNode: startPosition, openListSize: 1, tieBreaker: startTie },
    { gCost: 0, hCost: startH, fCost: startH },
  );

  while (openList.length > 0) {
    openList.sort((first, second) => {
      if (first[0] !== second[0]) return first[0]! - second[0]!;
      if (first[1] !== second[1]) return first[1]! - second[1]!;
      return first[2]! - second[2]!;
    });

    const top = openList.shift()!;
    const currentG = top[3]!;
    const currentRow = top[4]!;
    const currentCol = top[5]!;

    inOpenSet[currentRow]![currentCol] = false;

    tracker.setCurrentNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      gCost: currentG,
      openListSize: openList.length,
    });

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      gCost: currentG,
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

      const neighborG = currentG + 1;
      if (neighborG < gCosts[neighborRow]![neighborCol]!) {
        gCosts[neighborRow]![neighborCol] = neighborG;
        parent[neighborRow]![neighborCol] = [currentRow, currentCol];

        const neighborH = heuristic(neighborRow, neighborCol, endPosition[0], endPosition[1]);
        const neighborF = neighborG + neighborH;
        const tieBreaker = crossProduct(
          startPosition[0],
          startPosition[1],
          neighborRow,
          neighborCol,
          endPosition[0],
          endPosition[1],
        );

        inOpenSet[neighborRow]![neighborCol] = true;
        openList.push([neighborF, neighborH, tieBreaker, neighborG, neighborRow, neighborCol]);

        tracker.openNode(
          neighborRow,
          neighborCol,
          {
            neighborNode: [neighborRow, neighborCol],
            parentNode: [currentRow, currentCol],
            openListSize: openList.length,
            tieBreaker,
          },
          { gCost: neighborG, hCost: neighborH, fCost: neighborF },
        );
      }
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
