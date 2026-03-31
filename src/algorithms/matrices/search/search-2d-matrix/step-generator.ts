/** Step generator for Search a 2D Matrix — produces ExecutionStep[] using MatrixSearchTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixSearchTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SEARCH_2D_MATRIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SEARCH_2D_MATRIX!);

export interface Search2DMatrixInput {
  matrix: number[][];
  target: number;
}

export function generateSearch2DMatrixSteps(input: Search2DMatrixInput): ExecutionStep[] {
  const { matrix, target } = input;
  const tracker = new MatrixSearchTracker(matrix, target, SEARCH_2D_MATRIX_LINE_MAP);

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;

  tracker.initialize({
    rowCount,
    colCount,
    target,
    leftIdx: 0,
    rightIdx: rowCount * colCount - 1,
  });

  if (rowCount === 0 || colCount === 0) {
    tracker.complete({ found: false }, false);
    return tracker.getSteps();
  }

  let leftIdx = 0;
  let rightIdx = rowCount * colCount - 1;

  while (leftIdx <= rightIdx) {
    const midIndex = Math.floor((leftIdx + rightIdx) / 2);
    const midRow = Math.floor(midIndex / colCount);
    const midCol = midIndex % colCount;
    const midValue = matrix[midRow]![midCol]!;

    tracker.compareCell(
      midRow,
      midCol,
      { leftIdx, rightIdx, midIndex, midRow, midCol, midValue, target },
      `Compare midpoint [${midRow}][${midCol}] = ${midValue} with target ${target}`,
    );

    if (midValue === target) {
      tracker.markFound(midRow, midCol, {
        leftIdx,
        rightIdx,
        midIndex,
        midRow,
        midCol,
        midValue,
        target,
      });
      tracker.complete({ found: true }, true);
      return tracker.getSteps();
    } else if (midValue < target) {
      leftIdx = midIndex + 1;
    } else {
      rightIdx = midIndex - 1;
    }
  }

  tracker.complete({ found: false, leftIdx, rightIdx }, false);
  return tracker.getSteps();
}
