/** Step generator for Anti-Diagonal Traversal — produces ExecutionStep[] using MatrixTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ANTI_DIAGONAL_TRAVERSAL_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.ANTI_DIAGONAL_TRAVERSAL!,
);

export interface AntiDiagonalTraversalInput {
  matrix: number[][];
}

export function generateAntiDiagonalTraversalSteps(
  input: AntiDiagonalTraversalInput,
): ExecutionStep[] {
  const { matrix } = input;
  const tracker = new MatrixTracker(matrix, ANTI_DIAGONAL_TRAVERSAL_LINE_MAP);

  tracker.initialize({ rows: matrix.length, cols: matrix[0]?.length ?? 0 });

  if (matrix.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;
  const diagonalCount = rowCount + colCount - 1;

  for (let diagSum = 0; diagSum < diagonalCount; diagSum++) {
    const startRow = diagSum < colCount ? 0 : diagSum - colCount + 1;
    const endRow = diagSum < rowCount ? diagSum : rowCount - 1;

    tracker.setDirection("diagonal-down", { diagSum, startRow, endRow });

    for (let currentRow = startRow; currentRow <= endRow; currentRow++) {
      const currentCol = diagSum - currentRow;
      tracker.collectCell(currentRow, currentCol, { row: currentRow, col: currentCol, diagSum });
    }
  }

  tracker.complete({ result: "see collectedOrder" });
  return tracker.getSteps();
}
