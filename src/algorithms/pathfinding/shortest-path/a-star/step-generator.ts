/** Step generator for A* Search — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const A_STAR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.A_STAR_GRID!);

interface AStarInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

interface AStarNode {
  row: number;
  col: number;
  gCost: number;
  hCost: number;
  fCost: number;
}

function manhattanDistance(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

export function generateAStarSteps(input: AStarInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, A_STAR_LINE_MAP);

  const gCostMap: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  gCostMap[startPosition[0]]![startPosition[1]] = 0;

  const parent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );

  const closedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const startHCost = manhattanDistance(
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1],
  );
  const openSet: AStarNode[] = [];

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
  });

  openSet.push({
    row: startPosition[0],
    col: startPosition[1],
    gCost: 0,
    hCost: startHCost,
    fCost: startHCost,
  });

  tracker.openNode(
    startPosition[0],
    startPosition[1],
    { currentNode: startPosition, gCost: 0, hCost: startHCost, fCost: startHCost },
    { gCost: 0, hCost: startHCost, fCost: startHCost },
  );

  while (openSet.length > 0) {
    openSet.sort((nodeA, nodeB) => nodeA.fCost - nodeB.fCost || nodeA.hCost - nodeB.hCost);
    const current = openSet.shift()!;

    if (closedSet[current.row]![current.col]) continue;
    closedSet[current.row]![current.col] = true;

    tracker.setCurrentNode(current.row, current.col, {
      currentNode: [current.row, current.col],
      gCost: current.gCost,
      hCost: current.hCost,
      fCost: current.fCost,
    });

    tracker.closeNode(current.row, current.col, {
      currentNode: [current.row, current.col],
      gCost: current.gCost,
      fCost: current.fCost,
    });

    /* Check if we reached the end */
    if (current.row === endPosition[0] && current.col === endPosition[1]) {
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
      const neighborRow = current.row + deltaRow;
      const neighborCol = current.col + deltaCol;

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

      const tentativeGCost = gCostMap[current.row]![current.col]! + 1;
      if (tentativeGCost < gCostMap[neighborRow]![neighborCol]!) {
        gCostMap[neighborRow]![neighborCol] = tentativeGCost;
        parent[neighborRow]![neighborCol] = [current.row, current.col];
        const neighborHCost = manhattanDistance(
          neighborRow,
          neighborCol,
          endPosition[0],
          endPosition[1],
        );
        const neighborFCost = tentativeGCost + neighborHCost;

        tracker.updateCost(
          neighborRow,
          neighborCol,
          {
            neighborNode: [neighborRow, neighborCol],
            gCost: tentativeGCost,
            hCost: neighborHCost,
            fCost: neighborFCost,
          },
          { gCost: tentativeGCost, hCost: neighborHCost, fCost: neighborFCost },
        );

        openSet.push({
          row: neighborRow,
          col: neighborCol,
          gCost: tentativeGCost,
          hCost: neighborHCost,
          fCost: neighborFCost,
        });

        tracker.openNode(
          neighborRow,
          neighborCol,
          {
            neighborNode: [neighborRow, neighborCol],
            parentNode: [current.row, current.col],
            gCost: tentativeGCost,
            hCost: neighborHCost,
            fCost: neighborFCost,
          },
          { gCost: tentativeGCost, hCost: neighborHCost, fCost: neighborFCost },
        );
      }
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
