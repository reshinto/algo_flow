/** Step generator for Lee Algorithm — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LEE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LEE_ALGORITHM!);

interface LeeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateLeeAlgorithmSteps(input: LeeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LEE_LINE_MAP);

  /* Wave number map: -1 means unvisited */
  const waveMap: number[][] = Array.from({ length: rowCount }, () => new Array(colCount).fill(-1));
  waveMap[startPosition[0]]![startPosition[1]] = 0;

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
  });

  const queue: [number, number][] = [[startPosition[0], startPosition[1]]];

  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    waveNumber: 0,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    const [currentRow, currentCol] = current;
    const currentWave = waveMap[currentRow]![currentCol]!;

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      waveNumber: currentWave,
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

    /* Expand wavefront */
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
      if (waveMap[neighborRow]![neighborCol] !== -1) continue;

      const nextWave = currentWave + 1;
      waveMap[neighborRow]![neighborCol] = nextWave;
      parent[neighborRow]![neighborCol] = [currentRow, currentCol];
      queue.push([neighborRow, neighborCol]);

      tracker.updateCost(
        neighborRow,
        neighborCol,
        {
          neighborNode: [neighborRow, neighborCol],
          waveNumber: nextWave,
          parentNode: [currentRow, currentCol],
        },
        { gCost: nextWave },
      );

      tracker.openNode(neighborRow, neighborCol, {
        neighborNode: [neighborRow, neighborCol],
        waveNumber: nextWave,
        parentNode: [currentRow, currentCol],
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
