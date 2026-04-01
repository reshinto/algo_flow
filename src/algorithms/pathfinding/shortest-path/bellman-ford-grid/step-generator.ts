/** Step generator for Bellman-Ford Grid — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const BELLMAN_FORD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BELLMAN_FORD_GRID!);

interface BellmanFordInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateBellmanFordGridSteps(input: BellmanFordInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;
  const vertexCount = rowCount * colCount;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, BELLMAN_FORD_LINE_MAP);

  const distanceMap: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  );
  distanceMap[startPosition[0]]![startPosition[1]] = 0;

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
    vertexCount,
  });

  /* Collect all passable directed edges */
  const edges: [number, number, number, number][] = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      if (grid[rowIndex]![colIndex]!.type === "wall") continue;
      for (const [deltaRow, deltaCol] of directions) {
        const neighborRow = rowIndex + deltaRow;
        const neighborCol = colIndex + deltaCol;
        if (
          neighborRow < 0 ||
          neighborRow >= rowCount ||
          neighborCol < 0 ||
          neighborCol >= colCount
        )
          continue;
        if (grid[neighborRow]![neighborCol]!.type === "wall") continue;
        edges.push([rowIndex, colIndex, neighborRow, neighborCol]);
      }
    }
  }

  /* Relax edges V-1 times */
  for (let iteration = 0; iteration < vertexCount - 1; iteration++) {
    let updatedThisIteration = false;

    for (const [fromRow, fromCol, toRow, toCol] of edges) {
      if (distanceMap[fromRow]![fromCol] === Infinity) continue;

      const newDistance = distanceMap[fromRow]![fromCol]! + 1;
      if (newDistance < distanceMap[toRow]![toCol]!) {
        distanceMap[toRow]![toCol] = newDistance;
        parent[toRow]![toCol] = [fromRow, fromCol];
        updatedThisIteration = true;

        tracker.updateCost(
          toRow,
          toCol,
          {
            fromNode: [fromRow, fromCol],
            toNode: [toRow, toCol],
            newDistance,
            iteration,
          },
          { gCost: newDistance },
        );
      }
    }

    if (!updatedThisIteration) break;
  }

  /* Mark all reached cells as closed */
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      if (distanceMap[rowIndex]![colIndex]! < Infinity) {
        tracker.closeNode(rowIndex, colIndex, {
          distance: distanceMap[rowIndex]![colIndex],
        });
      }
    }
  }

  /* Reconstruct path if reachable */
  if (distanceMap[endPosition[0]]![endPosition[1]]! === Infinity) {
    tracker.complete({ pathFound: false }, false);
    return tracker.getSteps();
  }

  const path = reconstructPath(parent, endPosition);
  tracker.tracePath(path, {
    pathLength: path.length,
    path,
  });
  tracker.complete({ pathFound: true, pathLength: path.length }, true);
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
