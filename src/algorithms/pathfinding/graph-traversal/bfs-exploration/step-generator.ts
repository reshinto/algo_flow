/** Step generator for BFS Exploration — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BFS_EXPLORATION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BFS_EXPLORATION!);

interface BfsExplorationInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateBfsExplorationSteps(input: BfsExplorationInput): ExecutionStep[] {
  const { grid, startPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(
    grid,
    startPosition,
    startPosition,
    BFS_EXPLORATION_LINE_MAP,
  );

  const visitedSet: boolean[][] = Array.from({ length: rowCount }, () =>
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
    rowCount,
    colCount,
  });

  const queue: [number, number][] = [[startPosition[0], startPosition[1]]];
  visitedSet[startPosition[0]]![startPosition[1]] = true;
  let layerCount = 0;
  let visitedCount = 0;

  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    queueSize: 1,
    layer: 0,
  });

  while (queue.length > 0) {
    const layerSize = queue.length;
    layerCount += 1;

    for (let offsetIndex = 0; offsetIndex < layerSize; offsetIndex++) {
      const current = queue.shift()!;
      const [currentRow, currentCol] = current;
      visitedCount += 1;

      tracker.closeNode(currentRow, currentCol, {
        currentNode: [currentRow, currentCol],
        queueSize: queue.length,
        layer: layerCount,
        visitedCount,
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
        if (visitedSet[neighborRow]![neighborCol]) continue;

        visitedSet[neighborRow]![neighborCol] = true;
        queue.push([neighborRow, neighborCol]);

        tracker.openNode(neighborRow, neighborCol, {
          neighborNode: [neighborRow, neighborCol],
          parentNode: [currentRow, currentCol],
          queueSize: queue.length,
          layer: layerCount,
        });
      }
    }
  }

  tracker.complete({ visitedCount, layers: layerCount, pathFound: false, explorationComplete: true }, true);

  return tracker.getSteps();
}
