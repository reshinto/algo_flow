/** Step generator for Diagonal Traversal — produces ExecutionStep[] using MatrixTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DIAGONAL_TRAVERSAL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DIAGONAL_TRAVERSAL!);

export interface DiagonalTraversalInput {
  matrix: number[][];
}

export function generateDiagonalTraversalSteps(input: DiagonalTraversalInput): ExecutionStep[] {
  const { matrix } = input;
  const tracker = new MatrixTracker(matrix, DIAGONAL_TRAVERSAL_LINE_MAP);

  tracker.initialize({ rows: matrix.length, cols: matrix[0]?.length ?? 0 });

  if (matrix.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;
  const diagonalCount = rowCount + colCount - 1;

  for (let diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
    const startRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1;
    const startCol = diagIdx < colCount ? diagIdx : colCount - 1;

    tracker.setDirection("diagonal-down", {
      diagIdx,
      startRow,
      startCol,
      diagonalCount,
    });

    let currentRow = startRow;
    let currentCol = startCol;

    while (currentRow < rowCount && currentCol >= 0) {
      tracker.collectCell(currentRow, currentCol, { row: currentRow, col: currentCol, diagIdx });
      currentRow++;
      currentCol--;
    }
  }

  tracker.complete({ result: "see collectedOrder" });
  return tracker.getSteps();
}
