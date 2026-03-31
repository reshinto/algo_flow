/** Step generator for Search a 2D Matrix II — produces ExecutionStep[] using MatrixSearchTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixSearchTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SEARCH_2D_MATRIX_II_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SEARCH_2D_MATRIX_II!);

export interface Search2DMatrixIIInput {
  matrix: number[][];
  target: number;
}

export function generateSearch2DMatrixIISteps(input: Search2DMatrixIIInput): ExecutionStep[] {
  const { matrix, target } = input;
  const tracker = new MatrixSearchTracker(matrix, target, SEARCH_2D_MATRIX_II_LINE_MAP);

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;

  tracker.initialize({
    rowCount,
    colCount,
    target,
    currentRow: 0,
    currentCol: colCount - 1,
  });

  if (rowCount === 0 || colCount === 0) {
    tracker.complete({ found: false }, false);
    return tracker.getSteps();
  }

  let currentRow = 0;
  let currentCol = colCount - 1;

  while (currentRow < rowCount && currentCol >= 0) {
    const currentValue = matrix[currentRow]![currentCol]!;

    tracker.compareCell(
      currentRow,
      currentCol,
      { currentRow, currentCol, currentValue, target },
      `Compare [${currentRow}][${currentCol}] = ${currentValue} with target ${target}`,
    );

    if (currentValue === target) {
      tracker.markFound(currentRow, currentCol, { currentRow, currentCol, currentValue, target });
      tracker.complete({ found: true }, true);
      return tracker.getSteps();
    } else if (currentValue > target) {
      currentCol--;
    } else {
      currentRow++;
    }
  }

  tracker.complete({ found: false, currentRow, currentCol }, false);
  return tracker.getSteps();
}
