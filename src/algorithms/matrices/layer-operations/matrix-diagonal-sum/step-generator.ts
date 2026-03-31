/** Step generator for Matrix Diagonal Sum — produces ExecutionStep[] using MatrixLayerTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixLayerTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MATRIX_DIAGONAL_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MATRIX_DIAGONAL_SUM!);

export interface MatrixDiagonalSumInput {
  matrix: number[][];
}

export function generateMatrixDiagonalSumSteps(input: MatrixDiagonalSumInput): ExecutionStep[] {
  const { matrix } = input;
  const matrixSize = matrix.length;
  const tracker = new MatrixLayerTracker(matrix, MATRIX_DIAGONAL_SUM_LINE_MAP);

  tracker.initialize({ matrixSize, runningSum: 0 });

  let runningSum = 0;

  for (let diagIdx = 0; diagIdx < matrixSize; diagIdx++) {
    // Primary diagonal element
    runningSum += matrix[diagIdx]![diagIdx]!;
    tracker.accumulateValue(diagIdx, diagIdx, runningSum, {
      diagIdx,
      runningSum,
      diagonal: "primary",
    });

    // Secondary diagonal element (may be same as primary for center of odd matrix)
    const secCol = matrixSize - 1 - diagIdx;
    runningSum += matrix[diagIdx]![secCol]!;
    tracker.accumulateValue(diagIdx, secCol, runningSum, {
      diagIdx,
      runningSum,
      diagonal: "secondary",
    });
  }

  // Subtract center if odd-sized (it was counted twice)
  if (matrixSize % 2 === 1) {
    const centerIdx = Math.floor(matrixSize / 2);
    runningSum -= matrix[centerIdx]![centerIdx]!;
    tracker.accumulateValue(centerIdx, centerIdx, runningSum, {
      diagIdx: centerIdx,
      runningSum,
      diagonal: "center-adjustment",
    });
  }

  tracker.complete({ result: runningSum });
  return tracker.getSteps();
}
