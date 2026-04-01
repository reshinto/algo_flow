/** Step generator for DFS Exploration — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DFS_EXPLORATION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DFS_EXPLORATION!);

interface DfsExplorationInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateDfsExplorationSteps(input: DfsExplorationInput): ExecutionStep[] {
  const { grid, startPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(
    grid,
    startPosition,
    startPosition,
    DFS_EXPLORATION_LINE_MAP,
  );

  const visitedSet: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );

  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  tracker.initialize({
    startPosition,
    rowCount,
    colCount,
  });

  const stack: [number, number, number][] = [[startPosition[0], startPosition[1], 0]];
  visitedSet[startPosition[0]]![startPosition[1]] = true;
  let maxDepth = 0;
  let visitedCount = 0;

  tracker.openNode(startPosition[0], startPosition[1], {
    currentNode: startPosition,
    stackSize: 1,
    depth: 0,
  });

  while (stack.length > 0) {
    const current = stack.pop()!;
    const [currentRow, currentCol, currentDepth] = current;
    visitedCount += 1;
    if (currentDepth > maxDepth) maxDepth = currentDepth;

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      stackSize: stack.length,
      depth: currentDepth,
      maxDepth,
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
      stack.push([neighborRow, neighborCol, currentDepth + 1]);

      tracker.openNode(neighborRow, neighborCol, {
        neighborNode: [neighborRow, neighborCol],
        parentNode: [currentRow, currentCol],
        stackSize: stack.length,
        depth: currentDepth + 1,
      });
    }
  }

  tracker.complete({ visitedCount, maxDepth, pathFound: false }, false);

  return tracker.getSteps();
}
