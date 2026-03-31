/** Step generator for Transpose Matrix — produces ExecutionStep[] using MatrixTransformTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TRANSPOSE_MATRIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRANSPOSE_MATRIX!);

export interface TransposeMatrixInput {
  matrix: number[][];
}

export function generateTransposeMatrixSteps(input: TransposeMatrixInput): ExecutionStep[] {
  const { matrix } = input;
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;

  // Deep-copy so the tracker starts from the original state
  const matrixCopy = matrix.map((row) => [...row]);
  const tracker = new MatrixTransformTracker(matrixCopy, TRANSPOSE_MATRIX_LINE_MAP);

  tracker.initialize({ rowCount, colCount });

  if (rowCount === 0 || colCount === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  if (rowCount === colCount) {
    // Square matrix: swap in-place above the main diagonal
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      for (let colIdx = rowIdx + 1; colIdx < colCount; colIdx++) {
        tracker.swapCells(rowIdx, colIdx, colIdx, rowIdx, {
          rowIdx,
          colIdx,
          swapping: `[${rowIdx}][${colIdx}] ↔ [${colIdx}][${rowIdx}]`,
        });
      }
    }
  } else {
    // Non-square matrix: show placement into new result matrix
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      for (let colIdx = 0; colIdx < colCount; colIdx++) {
        const value = matrixCopy[rowIdx]?.[colIdx] ?? 0;
        tracker.updateCell(
          rowIdx,
          colIdx,
          value,
          { rowIdx, colIdx, placingAt: `result[${colIdx}][${rowIdx}]` },
          `Place matrix[${rowIdx}][${colIdx}] → result[${colIdx}][${rowIdx}]`,
        );
      }
    }
  }

  tracker.complete({ rowCount, colCount });
  return tracker.getSteps();
}
