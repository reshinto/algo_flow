/** Step generator for Rotate Matrix 90° — produces ExecutionStep[] using MatrixTransformTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ROTATE_MATRIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROTATE_MATRIX!);

export interface RotateMatrixInput {
  matrix: number[][];
}

export function generateRotateMatrixSteps(input: RotateMatrixInput): ExecutionStep[] {
  const matrix = input.matrix.map((row) => [...row]);
  const matrixSize = matrix.length;
  const tracker = new MatrixTransformTracker(matrix, ROTATE_MATRIX_LINE_MAP);

  tracker.initialize({ matrixSize });

  // Phase 1: Transpose
  tracker.setPhase(
    "transpose",
    { matrixSize, phase: "transpose" },
    "Step 1: Transpose — swap matrix[rowIdx][colIdx] with matrix[colIdx][rowIdx]",
  );

  for (let rowIdx = 0; rowIdx < matrixSize; rowIdx++) {
    for (let colIdx = rowIdx + 1; colIdx < matrixSize; colIdx++) {
      tracker.swapCells(rowIdx, colIdx, colIdx, rowIdx, {
        rowIdx,
        colIdx,
        phase: "transpose",
      });
    }
  }

  // Phase 2: Reverse rows
  tracker.setPhase(
    "reverse-rows",
    { matrixSize, phase: "reverse-rows" },
    "Step 2: Reverse each row to complete the 90° clockwise rotation",
  );

  for (let rowIdx = 0; rowIdx < matrixSize; rowIdx++) {
    let leftCol = 0;
    let rightCol = matrixSize - 1;
    while (leftCol < rightCol) {
      tracker.swapCells(rowIdx, leftCol, rowIdx, rightCol, {
        rowIdx,
        leftCol,
        rightCol,
        phase: "reverse-rows",
      });
      leftCol++;
      rightCol--;
    }
  }

  tracker.complete({ matrixSize });
  return tracker.getSteps();
}
