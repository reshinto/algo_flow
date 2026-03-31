/** Step generator for Zigzag Traversal — produces ExecutionStep[] using MatrixTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ZIGZAG_TRAVERSAL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ZIGZAG_TRAVERSAL!);

export interface ZigzagTraversalInput {
  matrix: number[][];
}

export function generateZigzagTraversalSteps(input: ZigzagTraversalInput): ExecutionStep[] {
  const { matrix } = input;
  const tracker = new MatrixTracker(matrix, ZIGZAG_TRAVERSAL_LINE_MAP);

  tracker.initialize({ rows: matrix.length, cols: matrix[0]?.length ?? 0 });

  if (matrix.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;
  const diagonalCount = rowCount + colCount - 1;

  for (let diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
    if (diagIdx % 2 === 0) {
      // Even diagonal: go upward (bottom-left to top-right)
      let currentRow = diagIdx < rowCount ? diagIdx : rowCount - 1;
      let currentCol = diagIdx < rowCount ? 0 : diagIdx - rowCount + 1;

      tracker.setDirection("diagonal-up", { diagIdx, currentRow, currentCol });

      while (currentRow >= 0 && currentCol < colCount) {
        tracker.collectCell(currentRow, currentCol, { row: currentRow, col: currentCol });
        currentRow--;
        currentCol++;
      }
    } else {
      // Odd diagonal: go downward (top-right to bottom-left)
      let currentRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1;
      let currentCol = diagIdx < colCount ? diagIdx : colCount - 1;

      tracker.setDirection("diagonal-down", { diagIdx, currentRow, currentCol });

      while (currentRow < rowCount && currentCol >= 0) {
        tracker.collectCell(currentRow, currentCol, { row: currentRow, col: currentCol });
        currentRow++;
        currentCol--;
      }
    }
  }

  tracker.complete({ result: "see collectedOrder" });
  return tracker.getSteps();
}
