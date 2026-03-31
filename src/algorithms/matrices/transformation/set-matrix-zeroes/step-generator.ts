/** Step generator for Set Matrix Zeroes — produces ExecutionStep[] using MatrixTransformTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_MATRIX_ZEROES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_MATRIX_ZEROES!);

export interface SetMatrixZeroesInput {
  matrix: number[][];
}

export function generateSetMatrixZeroesSteps(input: SetMatrixZeroesInput): ExecutionStep[] {
  const { matrix } = input;
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;

  // Deep-copy so the tracker starts from the original state
  const matrixCopy = matrix.map((row) => [...row]);
  const tracker = new MatrixTransformTracker(matrixCopy, SET_MATRIX_ZEROES_LINE_MAP);

  tracker.initialize({ rowCount, colCount });

  if (rowCount === 0 || colCount === 0) {
    tracker.complete({ result: matrixCopy });
    return tracker.getSteps();
  }

  // Determine whether the first row and first column have original zeros
  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let colIdx = 0; colIdx < colCount; colIdx++) {
    if (matrixCopy[0]?.[colIdx] === 0) firstRowHasZero = true;
  }
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    if (matrixCopy[rowIdx]?.[0] === 0) firstColHasZero = true;
  }

  // Phase 1: Scan inner cells, mark first row/col as markers
  tracker.setPhase(
    "scanning",
    { firstRowHasZero, firstColHasZero },
    "Phase 1: Scan for zeros and mark first row/column as markers",
  );

  for (let rowIdx = 1; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 1; colIdx < colCount; colIdx++) {
      if (matrixCopy[rowIdx]?.[colIdx] === 0) {
        // Mark the corresponding first-row and first-column positions
        tracker.markCell(
          rowIdx,
          colIdx,
          { rowIdx, colIdx, markingRow: rowIdx, markingCol: colIdx },
          `Zero found at [${rowIdx}][${colIdx}] — mark row ${rowIdx} and col ${colIdx}`,
        );
        // Apply markers in the copy so later phases use them
        if (matrixCopy[rowIdx]) matrixCopy[rowIdx]![0] = 0;
        if (matrixCopy[0]) matrixCopy[0]![colIdx] = 0;
      }
    }
  }

  // Phase 2: Zero out inner cells using markers
  tracker.setPhase(
    "zeroing",
    { firstRowHasZero, firstColHasZero },
    "Phase 2: Zero out rows and columns using first row/column markers",
  );

  for (let rowIdx = 1; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 1; colIdx < colCount; colIdx++) {
      const rowMarked = matrixCopy[rowIdx]?.[0] === 0;
      const colMarked = matrixCopy[0]?.[colIdx] === 0;
      if (rowMarked || colMarked) {
        tracker.zeroCell(rowIdx, colIdx, { rowIdx, colIdx, rowMarked, colMarked });
      }
    }
  }

  // Zero the first row if it originally had a zero
  if (firstRowHasZero) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      tracker.zeroCell(0, colIdx, { rowIdx: 0, colIdx, reason: "first row originally had zero" });
    }
  }

  // Zero the first column if it originally had a zero
  if (firstColHasZero) {
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      tracker.zeroCell(rowIdx, 0, { rowIdx, colIdx: 0, reason: "first col originally had zero" });
    }
  }

  tracker.complete({ rowCount, colCount });
  return tracker.getSteps();
}
