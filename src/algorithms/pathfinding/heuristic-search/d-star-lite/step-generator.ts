/** Step generator for D* Lite — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const D_STAR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.D_STAR_LITE!);

interface DStarInput {
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

function aStarSearch(
  grid: GridCell[][],
  startPosition: [number, number],
  endPosition: [number, number],
  directions: [number, number][],
  rowCount: number,
  colCount: number,
  tracker: PathfindingTracker,
): [number, number][] | null {
  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );
  const gCosts: number[][] = Array.from({ length: rowCount }, () =>
    new Array<number>(colCount).fill(Infinity),
  );

  gCosts[startPosition[0]]![startPosition[1]] = 0;
  const startH = heuristic(startPosition[0], startPosition[1], endPosition[0], endPosition[1]);
  const openList: [number, number, number, number][] = [
    [startH, 0, startPosition[0], startPosition[1]],
  ];

  tracker.openNode(
    startPosition[0],
    startPosition[1],
    { currentNode: startPosition, openListSize: 1 },
    { gCost: 0, hCost: startH, fCost: startH },
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
      return reconstructPath(parent, endPosition);
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
      if (!isPassable(grid, neighborRow, neighborCol)) continue;

      const neighborG = currentG + 1;
      if (neighborG < gCosts[neighborRow]![neighborCol]!) {
        gCosts[neighborRow]![neighborCol] = neighborG;
        parent[neighborRow]![neighborCol] = [currentRow, currentCol];
        const neighborH = heuristic(neighborRow, neighborCol, endPosition[0], endPosition[1]);
        const neighborF = neighborG + neighborH;
        openList.push([neighborF, neighborG, neighborRow, neighborCol]);

        tracker.openNode(
          neighborRow,
          neighborCol,
          {
            neighborNode: [neighborRow, neighborCol],
            parentNode: [currentRow, currentCol],
            openListSize: openList.length,
          },
          { gCost: neighborG, hCost: neighborH, fCost: neighborF },
        );
      }
    }
  }

  return null;
}

function findObstacleCandidate(
  grid: GridCell[][],
  path: [number, number][],
  rowCount: number,
  colCount: number,
): [number, number] | null {
  if (path.length < 4) return null;
  const midIndex = Math.floor(path.length / 2);
  const midCell = path[midIndex]!;

  const candidates: [number, number][] = [
    [midCell[0] - 1, midCell[1]],
    [midCell[0] + 1, midCell[1]],
    [midCell[0], midCell[1] - 1],
    [midCell[0], midCell[1] + 1],
  ];

  for (const [candidateRow, candidateCol] of candidates) {
    if (candidateRow < 0 || candidateRow >= rowCount) continue;
    if (candidateCol < 0 || candidateCol >= colCount) continue;
    const cell = grid[candidateRow]?.[candidateCol];
    if (cell && cell.type === "empty") return [candidateRow, candidateCol];
  }

  return null;
}

export function generateDStarLiteSteps(input: DStarInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, D_STAR_LINE_MAP);

  /* Work on a mutable copy so we can simulate obstacle discovery */
  const workingGrid: GridCell[][] = grid.map((row) => row.map((cell) => ({ ...cell })));

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
    algorithm: "D* Lite",
  });

  tracker.setPhase("Phase 1 — Initial Search");

  const initialPath = aStarSearch(
    workingGrid,
    startPosition,
    endPosition,
    directions,
    rowCount,
    colCount,
    tracker,
  );

  if (initialPath === null) {
    tracker.complete({ pathFound: false, replanCount: 0 }, false);
    return tracker.getSteps();
  }

  /* Discover obstacle and replan */
  const obstacle = findObstacleCandidate(workingGrid, initialPath, rowCount, colCount);

  if (obstacle !== null) {
    const [obstacleRow, obstacleCol] = obstacle;
    const obstacleCell = workingGrid[obstacleRow]?.[obstacleCol];
    if (obstacleCell) {
      obstacleCell.type = "wall";
    }

    tracker.setPhase(
      `Phase 2 — Obstacle at [${obstacleRow},${obstacleCol}] discovered. Replanning…`,
    );

    /* Update tracker's grid for visualization */
    const updatedGrid = workingGrid.map((row) => row.map((cell) => ({ ...cell })));

    const replanTracker = new PathfindingTracker(
      updatedGrid,
      startPosition,
      endPosition,
      D_STAR_LINE_MAP,
    );

    const replanPath = aStarSearch(
      workingGrid,
      startPosition,
      endPosition,
      directions,
      rowCount,
      colCount,
      replanTracker,
    );

    /* Merge replan steps into main tracker by using close-node/open-node calls */
    const replanSteps = replanTracker.getSteps();
    for (const replanStep of replanSteps) {
      if (replanStep.type === "close-node" || replanStep.type === "open-node") {
        /* Emit same events on main tracker to capture replan exploration */
        if (replanStep.visualState.kind === "grid" && "currentCell" in replanStep.variables) {
          const cellRef = replanStep.variables["currentCell"] as [number, number] | undefined;
          if (cellRef) {
            if (replanStep.type === "close-node") {
              tracker.closeNode(cellRef[0], cellRef[1], {
                replanPhase: true,
                currentNode: cellRef,
              });
            } else {
              tracker.openNode(cellRef[0], cellRef[1], {
                replanPhase: true,
                neighborNode: cellRef,
              });
            }
          }
        }
      }
    }

    if (replanPath !== null) {
      tracker.tracePath(replanPath, {
        pathLength: replanPath.length,
        path: replanPath,
        replanCount: 2,
      });
      tracker.complete({ pathFound: true, pathLength: replanPath.length, replanCount: 2 }, true);
    } else {
      tracker.complete({ pathFound: false, replanCount: 2 }, false);
    }
  } else {
    tracker.tracePath(initialPath, {
      pathLength: initialPath.length,
      path: initialPath,
      replanCount: 1,
    });
    tracker.complete({ pathFound: true, pathLength: initialPath.length, replanCount: 1 }, true);
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
