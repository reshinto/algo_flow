/** Step generator for Toeplitz Matrix — produces ExecutionStep[] using MatrixConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TOEPLITZ_MATRIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TOEPLITZ_MATRIX!);

export interface ToeplitzMatrixInput {
  matrix: number[][];
}

export function generateToeplitzMatrixSteps(input: ToeplitzMatrixInput): ExecutionStep[] {
  const { matrix } = input;
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;

  const tracker = MatrixConstructionTracker.fromMatrix(matrix, TOEPLITZ_MATRIX_LINE_MAP);

  tracker.initialize({ rowCount, colCount });

  let isToeplitz = true;

  for (let rowIdx = 1; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 1; colIdx < colCount; colIdx++) {
      const current = matrix[rowIdx]?.[colIdx];
      const upperLeft = matrix[rowIdx - 1]?.[colIdx - 1];
      const passed = current !== undefined && upperLeft !== undefined && current === upperLeft;

      if (!passed) isToeplitz = false;

      tracker.verifyCell(
        rowIdx,
        colIdx,
        {
          rowIdx,
          colIdx,
          current,
          upperLeft,
          match: passed,
          isToeplitz,
        },
        passed,
        passed
          ? `matrix[${rowIdx}][${colIdx}] = ${current} matches diagonal neighbor ${upperLeft} ✓`
          : `matrix[${rowIdx}][${colIdx}] = ${current} ≠ diagonal neighbor ${upperLeft} — not Toeplitz`,
      );
    }
  }

  tracker.complete({ result: isToeplitz });
  return tracker.getSteps();
}
