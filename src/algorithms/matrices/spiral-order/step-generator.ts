/** Step generator for Spiral Order — produces ExecutionStep[] using MatrixTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SPIRAL_ORDER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SPIRAL_ORDER!);

export interface SpiralOrderInput {
  matrix: number[][];
}

export function generateSpiralOrderSteps(input: SpiralOrderInput): ExecutionStep[] {
  const { matrix } = input;
  const tracker = new MatrixTracker(matrix, SPIRAL_ORDER_LINE_MAP);

  tracker.initialize({ rows: matrix.length, cols: matrix[0]?.length ?? 0 });

  if (matrix.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  let topBound = 0;
  let bottomBound = matrix.length - 1;
  let leftBound = 0;
  let rightBound = (matrix[0]?.length ?? 0) - 1;

  while (topBound <= bottomBound && leftBound <= rightBound) {
    // Right along top row
    tracker.setDirection("right", { topBound, bottomBound, leftBound, rightBound });
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      tracker.collectCell(topBound, colIdx, { row: topBound, col: colIdx });
    }
    topBound++;
    tracker.shrinkBoundary("top", { topBound, bottomBound, leftBound, rightBound });

    // Down along right column
    tracker.setDirection("down", { topBound, bottomBound, leftBound, rightBound });
    for (let rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
      tracker.collectCell(rowIdx, rightBound, { row: rowIdx, col: rightBound });
    }
    rightBound--;
    tracker.shrinkBoundary("right", { topBound, bottomBound, leftBound, rightBound });

    // Left along bottom row
    if (topBound <= bottomBound) {
      tracker.setDirection("left", { topBound, bottomBound, leftBound, rightBound });
      for (let colIdx = rightBound; colIdx >= leftBound; colIdx--) {
        tracker.collectCell(bottomBound, colIdx, { row: bottomBound, col: colIdx });
      }
      bottomBound--;
      tracker.shrinkBoundary("bottom", { topBound, bottomBound, leftBound, rightBound });
    }

    // Up along left column
    if (leftBound <= rightBound) {
      tracker.setDirection("up", { topBound, bottomBound, leftBound, rightBound });
      for (let rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
        tracker.collectCell(rowIdx, leftBound, { row: rowIdx, col: leftBound });
      }
      leftBound++;
      tracker.shrinkBoundary("left", { topBound, bottomBound, leftBound, rightBound });
    }
  }

  tracker.complete({ result: "see collectedOrder" });
  return tracker.getSteps();
}
