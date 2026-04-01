/** Step generator for Jump Point Search — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const JPS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.JUMP_POINT_SEARCH!);

interface JpsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

function heuristic(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

function isPassable(grid: GridCell[][], row: number, col: number): boolean {
  const cell = grid[row]?.[col];
  return cell !== undefined && cell.type !== "wall";
}

function hasForced(
  grid: GridCell[][],
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number,
  rowCount: number,
  colCount: number,
): boolean {
  if (deltaRow !== 0 && deltaCol === 0) {
    const prevRow = row - deltaRow;
    const leftBlocked =
      col - 1 >= 0 && prevRow >= 0 && prevRow < rowCount && !isPassable(grid, prevRow, col - 1);
    const rightBlocked =
      col + 1 < colCount &&
      prevRow >= 0 &&
      prevRow < rowCount &&
      !isPassable(grid, prevRow, col + 1);
    const leftOpen = col - 1 >= 0 && isPassable(grid, row, col - 1);
    const rightOpen = col + 1 < colCount && isPassable(grid, row, col + 1);
    return (leftBlocked && leftOpen) || (rightBlocked && rightOpen);
  }
  if (deltaCol !== 0 && deltaRow === 0) {
    const prevCol = col - deltaCol;
    const upBlocked =
      row - 1 >= 0 && prevCol >= 0 && prevCol < colCount && !isPassable(grid, row - 1, prevCol);
    const downBlocked =
      row + 1 < rowCount &&
      prevCol >= 0 &&
      prevCol < colCount &&
      !isPassable(grid, row + 1, prevCol);
    const upOpen = row - 1 >= 0 && isPassable(grid, row - 1, col);
    const downOpen = row + 1 < rowCount && isPassable(grid, row + 1, col);
    return (upBlocked && upOpen) || (downBlocked && downOpen);
  }
  return false;
}

function jump(
  grid: GridCell[][],
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number,
  endPosition: [number, number],
  rowCount: number,
  colCount: number,
): [number, number] | null {
  let currentRow = row + deltaRow;
  let currentCol = col + deltaCol;

  while (true) {
    if (currentRow < 0 || currentRow >= rowCount || currentCol < 0 || currentCol >= colCount) {
      return null;
    }
    if (!isPassable(grid, currentRow, currentCol)) return null;
    if (currentRow === endPosition[0] && currentCol === endPosition[1])
      return [currentRow, currentCol];
    if (hasForced(grid, currentRow, currentCol, deltaRow, deltaCol, rowCount, colCount))
      return [currentRow, currentCol];

    currentRow += deltaRow;
    currentCol += deltaCol;
  }
}

export function generateJumpPointSearchSteps(input: JpsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, JPS_LINE_MAP);

  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const gCosts: number[][] = Array.from({ length: rowCount }, () =>
    new Array<number>(colCount).fill(Infinity),
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
    algorithm: "Jump Point Search",
  });

  const startH = heuristic(startPosition[0], startPosition[1], endPosition[0], endPosition[1]);
  const startG = 0;
  gCosts[startPosition[0]]![startPosition[1]] = startG;

  /* Open list: [fCost, gCost, row, col] */
  const openList: [number, number, number, number][] = [
    [startH, startG, startPosition[0], startPosition[1]],
  ];

  tracker.openNode(
    startPosition[0],
    startPosition[1],
    { currentNode: startPosition, openListSize: 1 },
    { gCost: startG, hCost: startH, fCost: startH },
  );

  while (openList.length > 0) {
    openList.sort((first, second) => first[0]! - second[0]!);
    const top = openList.shift()!;
    const currentG = top[1]!;
    const currentRow = top[2]!;
    const currentCol = top[3]!;

    tracker.setCurrentNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      gCost: currentG,
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
      const jumpResult = jump(
        grid,
        currentRow,
        currentCol,
        deltaRow,
        deltaCol,
        endPosition,
        rowCount,
        colCount,
      );
      if (jumpResult === null) continue;

      const [jumpRow, jumpCol] = jumpResult;
      const neighborG = currentG + heuristic(currentRow, currentCol, jumpRow, jumpCol);

      if (neighborG < gCosts[jumpRow]![jumpCol]!) {
        gCosts[jumpRow]![jumpCol] = neighborG;
        parent[jumpRow]![jumpCol] = [currentRow, currentCol];
        const jumpH = heuristic(jumpRow, jumpCol, endPosition[0], endPosition[1]);
        const jumpF = neighborG + jumpH;

        /* Mark nodes with forced neighbors along the jump path */
        let scanRow = currentRow + deltaRow;
        let scanCol = currentCol + deltaCol;
        while (scanRow !== jumpRow || scanCol !== jumpCol) {
          if (hasForced(grid, scanRow, scanCol, deltaRow, deltaCol, rowCount, colCount)) {
            tracker.markJumpPoint(scanRow, scanCol, {
              jumpPoint: [scanRow, scanCol],
              from: [currentRow, currentCol],
            });
          }
          scanRow += deltaRow;
          scanCol += deltaCol;
        }

        openList.push([jumpF, neighborG, jumpRow, jumpCol]);

        tracker.openNode(
          jumpRow,
          jumpCol,
          {
            jumpPoint: [jumpRow, jumpCol],
            parentNode: [currentRow, currentCol],
            openListSize: openList.length,
          },
          { gCost: neighborG, hCost: jumpH, fCost: jumpF },
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
