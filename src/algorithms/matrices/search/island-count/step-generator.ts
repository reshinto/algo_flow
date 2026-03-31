/** Step generator for Island Count — produces ExecutionStep[] using MatrixSearchTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixSearchTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ISLAND_COUNT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ISLAND_COUNT!);

export interface IslandCountInput {
  grid: number[][];
}

export function generateIslandCountSteps(input: IslandCountInput): ExecutionStep[] {
  const { grid } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  // Work with a mutable copy so the source grid is not modified
  const workGrid: number[][] = grid.map((row) => [...row]);

  const tracker = new MatrixSearchTracker(grid, null, ISLAND_COUNT_LINE_MAP);

  tracker.initialize({
    rowCount,
    colCount,
    islandTotal: 0,
  });

  if (rowCount === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  let islandTotal = 0;

  function dfsFloodFill(rowIdx: number, colIdx: number): void {
    if (rowIdx < 0 || rowIdx >= rowCount) return;
    if (colIdx < 0 || colIdx >= colCount) return;
    if (workGrid[rowIdx]?.[colIdx] !== 1) return;

    // Mark visited in work copy
    workGrid[rowIdx]![colIdx] = 0;

    tracker.markRegionCell(
      rowIdx,
      colIdx,
      {
        rowIdx,
        colIdx,
        islandTotal,
        action: "flood-fill",
      },
      `Flood-fill island ${islandTotal}: mark [${rowIdx}][${colIdx}] as visited`,
    );

    dfsFloodFill(rowIdx - 1, colIdx);
    dfsFloodFill(rowIdx + 1, colIdx);
    dfsFloodFill(rowIdx, colIdx - 1);
    dfsFloodFill(rowIdx, colIdx + 1);
  }

  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const cellValue = workGrid[rowIdx]?.[colIdx] ?? 0;

      tracker.visitCell(
        rowIdx,
        colIdx,
        {
          rowIdx,
          colIdx,
          cellValue,
          islandTotal,
        },
        `Scan [${rowIdx}][${colIdx}] = ${cellValue}`,
      );

      if (cellValue === 1) {
        islandTotal++;
        tracker.markRegionCell(
          rowIdx,
          colIdx,
          {
            rowIdx,
            colIdx,
            islandTotal,
            action: "new-island",
          },
          `New island found at [${rowIdx}][${colIdx}] — island #${islandTotal}`,
        );

        // Mark this cell first, then DFS neighbours
        workGrid[rowIdx]![colIdx] = 0;
        dfsFloodFill(rowIdx - 1, colIdx);
        dfsFloodFill(rowIdx + 1, colIdx);
        dfsFloodFill(rowIdx, colIdx - 1);
        dfsFloodFill(rowIdx, colIdx + 1);
      }
    }
  }

  tracker.complete({ result: islandTotal, islandTotal });
  return tracker.getSteps();
}
