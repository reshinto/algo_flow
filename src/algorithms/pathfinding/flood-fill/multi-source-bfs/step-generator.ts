/** Step generator for Multi-Source BFS — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const MULTI_SOURCE_BFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MULTI_SOURCE_BFS!);

interface MultiSourceBfsInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateMultiSourceBfsSteps(input: MultiSourceBfsInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(
    grid,
    startPosition,
    endPosition,
    MULTI_SOURCE_BFS_LINE_MAP,
  );

  const distances: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(-1),
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

  tracker.setPhase("heatmap-rendering");

  /* Seed queue: all empty cells adjacent to a wall or boundary (distance = 1) */
  const queue: [number, number][] = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const cell = grid[rowIndex]![colIndex]!;
      if (cell.type === "wall") continue;

      let adjacentToWall = false;
      for (const [deltaRow, deltaCol] of directions) {
        const neighborRow = rowIndex + deltaRow;
        const neighborCol = colIndex + deltaCol;
        if (
          neighborRow < 0 ||
          neighborRow >= rowCount ||
          neighborCol < 0 ||
          neighborCol >= colCount
        ) {
          adjacentToWall = true;
          break;
        }
        if (grid[neighborRow]![neighborCol]!.type === "wall") {
          adjacentToWall = true;
          break;
        }
      }

      if (adjacentToWall) {
        distances[rowIndex]![colIndex] = 1;
        queue.push([rowIndex, colIndex]);

        tracker.openNode(rowIndex, colIndex, {
          cell: [rowIndex, colIndex],
          distance: 1,
          queueSize: queue.length,
        });
        tracker.updateCost(
          rowIndex,
          colIndex,
          { distance: 1, cell: [rowIndex, colIndex] },
          { gCost: 1 },
        );
      }
    }
  }

  let maxDistance = 1;

  while (queue.length > 0) {
    const current = queue.shift()!;
    const [currentRow, currentCol] = current;
    const currentDistance = distances[currentRow]![currentCol]!;

    tracker.closeNode(currentRow, currentCol, {
      currentNode: [currentRow, currentCol],
      distance: currentDistance,
      queueSize: queue.length,
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
      if (distances[neighborRow]![neighborCol] !== -1) continue;

      const neighborDistance = currentDistance + 1;
      distances[neighborRow]![neighborCol] = neighborDistance;
      if (neighborDistance > maxDistance) maxDistance = neighborDistance;

      queue.push([neighborRow, neighborCol]);

      tracker.openNode(neighborRow, neighborCol, {
        neighborNode: [neighborRow, neighborCol],
        distance: neighborDistance,
        queueSize: queue.length,
      });
      tracker.updateCost(
        neighborRow,
        neighborCol,
        { distance: neighborDistance, cell: [neighborRow, neighborCol] },
        { gCost: neighborDistance },
      );
    }
  }

  tracker.complete(
    { pathFound: false, maxDistance, message: `Max distance from wall: ${maxDistance}` },
    false,
  );
  return tracker.getSteps();
}
