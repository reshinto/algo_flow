/** Step generator for IDA* — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const IDA_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IDA_STAR!);

interface IDAInput {
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

export function generateIDAStarSteps(input: IDAInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, IDA_LINE_MAP);

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
    algorithm: "IDA*",
    threshold: heuristic(startPosition[0], startPosition[1], endPosition[0], endPosition[1]),
  });

  let threshold = heuristic(startPosition[0], startPosition[1], endPosition[0], endPosition[1]);
  const currentPath: [number, number][] = [[startPosition[0], startPosition[1]]];
  const onPath: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  onPath[startPosition[0]]![startPosition[1]] = true;

  let iterationIndex = 0;
  const maxIterations = 50;

  while (iterationIndex < maxIterations) {
    iterationIndex++;
    tracker.setPhase(`Iteration ${iterationIndex} — threshold: ${threshold}`);

    const result = dfsSearch(
      grid,
      currentPath,
      onPath,
      0,
      threshold,
      endPosition,
      directions,
      rowCount,
      colCount,
      tracker,
    );

    if (result === "FOUND") {
      const finalPath = [...currentPath] as [number, number][];
      tracker.tracePath(finalPath, { pathLength: finalPath.length, path: finalPath });
      tracker.complete(
        { pathFound: true, pathLength: finalPath.length, iterations: iterationIndex },
        true,
      );
      return tracker.getSteps();
    }

    if (result === Infinity) {
      tracker.complete({ pathFound: false, iterations: iterationIndex }, false);
      return tracker.getSteps();
    }

    threshold = result as number;
  }

  tracker.complete({ pathFound: false, iterations: iterationIndex }, false);
  return tracker.getSteps();
}

function dfsSearch(
  grid: GridCell[][],
  currentPath: [number, number][],
  onPath: boolean[][],
  gCost: number,
  threshold: number,
  endPosition: [number, number],
  directions: [number, number][],
  rowCount: number,
  colCount: number,
  tracker: PathfindingTracker,
): number | "FOUND" {
  const head = currentPath[currentPath.length - 1]!;
  const headRow = head[0];
  const headCol = head[1];
  const fCost = gCost + heuristic(headRow, headCol, endPosition[0], endPosition[1]);

  if (fCost > threshold) {
    return fCost;
  }

  tracker.setCurrentNode(headRow, headCol, {
    currentNode: [headRow, headCol],
    gCost,
    fCost,
    threshold,
  });

  tracker.closeNode(headRow, headCol, {
    currentNode: [headRow, headCol],
    gCost,
    fCost,
    pathDepth: currentPath.length,
  });

  if (headRow === endPosition[0] && headCol === endPosition[1]) {
    return "FOUND";
  }

  let minimumExceeded = Infinity;

  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = headRow + deltaRow;
    const neighborCol = headCol + deltaCol;

    if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount) {
      continue;
    }
    if (!isPassable(grid, neighborRow, neighborCol)) continue;
    if (onPath[neighborRow]![neighborCol]) continue;

    const neighborH = heuristic(neighborRow, neighborCol, endPosition[0], endPosition[1]);
    const neighborF = gCost + 1 + neighborH;

    tracker.openNode(
      neighborRow,
      neighborCol,
      {
        neighborNode: [neighborRow, neighborCol],
        gCost: gCost + 1,
        fCost: neighborF,
        threshold,
      },
      { gCost: gCost + 1, hCost: neighborH, fCost: neighborF },
    );

    currentPath.push([neighborRow, neighborCol]);
    onPath[neighborRow]![neighborCol] = true;

    const subResult = dfsSearch(
      grid,
      currentPath,
      onPath,
      gCost + 1,
      threshold,
      endPosition,
      directions,
      rowCount,
      colCount,
      tracker,
    );

    if (subResult === "FOUND") return "FOUND";

    const subCost = subResult as number;
    if (subCost < minimumExceeded) minimumExceeded = subCost;

    currentPath.pop();
    onPath[neighborRow]![neighborCol] = false;
  }

  return minimumExceeded;
}
