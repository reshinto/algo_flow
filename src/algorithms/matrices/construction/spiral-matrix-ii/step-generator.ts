/** Step generator for Spiral Matrix II — produces ExecutionStep[] using MatrixConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SPIRAL_MATRIX_II_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SPIRAL_MATRIX_II!);

export interface SpiralMatrixIIInput {
  matrixSize: number;
}

export function generateSpiralMatrixIISteps(input: SpiralMatrixIIInput): ExecutionStep[] {
  const { matrixSize } = input;
  const tracker = new MatrixConstructionTracker(matrixSize, matrixSize, SPIRAL_MATRIX_II_LINE_MAP);

  tracker.initialize({
    matrixSize,
    currentValue: 1,
    topBound: 0,
    bottomBound: matrixSize - 1,
    leftBound: 0,
    rightBound: matrixSize - 1,
  });

  let topBound = 0;
  let bottomBound = matrixSize - 1;
  let leftBound = 0;
  let rightBound = matrixSize - 1;
  let currentValue = 1;

  while (topBound <= bottomBound && leftBound <= rightBound) {
    // Fill right along top row
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      tracker.placeValue(topBound, colIdx, currentValue, {
        currentValue,
        row: topBound,
        col: colIdx,
        topBound,
        bottomBound,
        leftBound,
        rightBound,
      });
      currentValue++;
    }
    topBound++;

    // Fill down along right column
    for (let rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
      tracker.placeValue(rowIdx, rightBound, currentValue, {
        currentValue,
        row: rowIdx,
        col: rightBound,
        topBound,
        bottomBound,
        leftBound,
        rightBound,
      });
      currentValue++;
    }
    rightBound--;

    // Fill left along bottom row (if still within bounds)
    if (topBound <= bottomBound) {
      for (let colIdx = rightBound; colIdx >= leftBound; colIdx--) {
        tracker.placeValue(bottomBound, colIdx, currentValue, {
          currentValue,
          row: bottomBound,
          col: colIdx,
          topBound,
          bottomBound,
          leftBound,
          rightBound,
        });
        currentValue++;
      }
      bottomBound--;
    }

    // Fill up along left column (if still within bounds)
    if (leftBound <= rightBound) {
      for (let rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
        tracker.placeValue(rowIdx, leftBound, currentValue, {
          currentValue,
          row: rowIdx,
          col: leftBound,
          topBound,
          bottomBound,
          leftBound,
          rightBound,
        });
        currentValue++;
      }
      leftBound++;
    }
  }

  tracker.complete({
    result: `${matrixSize}×${matrixSize} matrix filled 1–${matrixSize * matrixSize}`,
  });
  return tracker.getSteps();
}
