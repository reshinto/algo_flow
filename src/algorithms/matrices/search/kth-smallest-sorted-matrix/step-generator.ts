/** Step generator for Kth Smallest Element in Sorted Matrix — produces ExecutionStep[] using MatrixSearchTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixSearchTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const KTH_SMALLEST_SORTED_MATRIX_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.KTH_SMALLEST_SORTED_MATRIX!,
);

export interface KthSmallestSortedMatrixInput {
  matrix: number[][];
  targetK: number;
}

export function generateKthSmallestSortedMatrixSteps(
  input: KthSmallestSortedMatrixInput,
): ExecutionStep[] {
  const { matrix, targetK } = input;
  const matrixSize = matrix.length;

  const tracker = new MatrixSearchTracker(matrix, null, KTH_SMALLEST_SORTED_MATRIX_LINE_MAP);

  tracker.initialize({
    matrixSize,
    targetK,
    leftVal: matrix[0]?.[0] ?? 0,
    rightVal: matrix[matrixSize - 1]?.[matrixSize - 1] ?? 0,
  });

  if (matrixSize === 0) {
    tracker.complete({ result: null });
    return tracker.getSteps();
  }

  let leftVal = matrix[0]![0]!;
  let rightVal = matrix[matrixSize - 1]![matrixSize - 1]!;

  while (leftVal < rightVal) {
    const midVal = leftVal + Math.floor((rightVal - leftVal) / 2);

    // Staircase count from bottom-left corner
    let elementCount = 0;
    let currentRow = matrixSize - 1;
    let currentCol = 0;

    while (currentRow >= 0 && currentCol < matrixSize) {
      const cellValue = matrix[currentRow]?.[currentCol] ?? 0;
      if (cellValue <= midVal) {
        elementCount += currentRow + 1;
        tracker.compareCell(
          currentRow,
          currentCol,
          {
            leftVal,
            rightVal,
            midVal,
            elementCount,
            currentRow,
            currentCol,
            cellValue,
            decision: `${cellValue} ≤ ${midVal}, count += ${currentRow + 1}`,
          },
          `Cell [${currentRow}][${currentCol}] = ${cellValue} ≤ mid ${midVal}: count now ${elementCount}`,
        );
        currentCol++;
      } else {
        tracker.compareCell(
          currentRow,
          currentCol,
          {
            leftVal,
            rightVal,
            midVal,
            elementCount,
            currentRow,
            currentCol,
            cellValue,
            decision: `${cellValue} > ${midVal}, move up`,
          },
          `Cell [${currentRow}][${currentCol}] = ${cellValue} > mid ${midVal}: move up`,
        );
        currentRow--;
      }
    }

    if (elementCount < targetK) {
      leftVal = midVal + 1;
      tracker.compareCell(
        0,
        0,
        {
          leftVal,
          rightVal,
          midVal,
          elementCount,
          decision: `${elementCount} < ${targetK}: leftVal = ${leftVal}`,
        },
        `${elementCount} elements ≤ ${midVal} < k=${targetK}: search right half`,
      );
    } else {
      rightVal = midVal;
      tracker.compareCell(
        matrixSize - 1,
        matrixSize - 1,
        {
          leftVal,
          rightVal,
          midVal,
          elementCount,
          decision: `${elementCount} >= ${targetK}: rightVal = ${midVal}`,
        },
        `${elementCount} elements ≤ ${midVal} ≥ k=${targetK}: search left half`,
      );
    }
  }

  // leftVal is now the kth smallest — find a representative cell
  let foundRow = 0;
  let foundCol = 0;
  outer: for (let rowIdx = 0; rowIdx < matrixSize; rowIdx++) {
    for (let colIdx = 0; colIdx < matrixSize; colIdx++) {
      if (matrix[rowIdx]?.[colIdx] === leftVal) {
        foundRow = rowIdx;
        foundCol = colIdx;
        break outer;
      }
    }
  }

  tracker.markFound(foundRow, foundCol, {
    result: leftVal,
    targetK,
    description: `kth smallest (k=${targetK}) is ${leftVal}`,
  });

  tracker.complete({ result: leftVal, targetK });
  return tracker.getSteps();
}
