/** Step generator for Flip Image — produces ExecutionStep[] using MatrixTransformTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FLIP_IMAGE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLIP_IMAGE!);

export interface FlipImageInput {
  matrix: number[][];
}

export function generateFlipImageSteps(input: FlipImageInput): ExecutionStep[] {
  const matrix = input.matrix.map((row) => [...row]);
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;
  const tracker = new MatrixTransformTracker(matrix, FLIP_IMAGE_LINE_MAP);

  tracker.initialize({ rows: rowCount, cols: colCount });

  tracker.setPhase(
    "flipping",
    { rows: rowCount, cols: colCount, phase: "flipping" },
    "Flip each row horizontally and XOR-invert all values using two pointers",
  );

  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    let leftCol = 0;
    let rightCol = colCount - 1;

    while (leftCol < rightCol) {
      // Read original values before any mutation
      const leftVal = matrix[rowIdx]?.[leftCol] ?? 0;
      const rightVal = matrix[rowIdx]?.[rightCol] ?? 0;
      const newLeft = rightVal ^ 1;
      const newRight = leftVal ^ 1;

      // Flip left end to (rightVal ^ 1)
      tracker.flipCell(rowIdx, leftCol, newLeft, {
        rowIdx,
        colIdx: leftCol,
        originalVal: leftVal,
        newVal: newLeft,
        action: "swap-invert-left",
        phase: "flipping",
      });

      // Flip right end to (leftVal ^ 1)
      tracker.flipCell(rowIdx, rightCol, newRight, {
        rowIdx,
        colIdx: rightCol,
        originalVal: rightVal,
        newVal: newRight,
        action: "swap-invert-right",
        phase: "flipping",
      });

      // Keep local matrix in sync so later reads are correct
      if (matrix[rowIdx]) {
        matrix[rowIdx]![leftCol] = newLeft;
        matrix[rowIdx]![rightCol] = newRight;
      }

      leftCol++;
      rightCol--;
    }

    // Odd column count: invert middle element only
    if (leftCol === rightCol) {
      const middleVal = matrix[rowIdx]?.[leftCol] ?? 0;
      const invertedVal = middleVal ^ 1;

      tracker.flipCell(rowIdx, leftCol, invertedVal, {
        rowIdx,
        colIdx: leftCol,
        originalVal: middleVal,
        newVal: invertedVal,
        action: "invert-middle",
        phase: "flipping",
      });

      if (matrix[rowIdx]) {
        matrix[rowIdx]![leftCol] = invertedVal;
      }
    }
  }

  tracker.complete({ rows: rowCount, cols: colCount });
  return tracker.getSteps();
}
