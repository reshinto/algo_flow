/** Step generator for Reshape Matrix — produces ExecutionStep[] using MatrixLayerTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixLayerTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RESHAPE_MATRIX_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RESHAPE_MATRIX!);

export interface ReshapeMatrixInput {
  matrix: number[][];
  targetRows: number;
  targetCols: number;
}

export function generateReshapeMatrixSteps(input: ReshapeMatrixInput): ExecutionStep[] {
  const { matrix, targetRows, targetCols } = input;
  const sourceRows = matrix.length;
  const sourceCols = matrix[0]?.length ?? 0;
  const totalElements = sourceRows * sourceCols;

  const tracker = new MatrixLayerTracker(matrix, RESHAPE_MATRIX_LINE_MAP);

  tracker.initialize({
    sourceRows,
    sourceCols,
    targetRows,
    targetCols,
    totalElements,
    reshapePossible: totalElements === targetRows * targetCols,
  });

  if (totalElements !== targetRows * targetCols) {
    tracker.complete({ result: "impossible — returned original matrix" });
    return tracker.getSteps();
  }

  for (let flatIdx = 0; flatIdx < totalElements; flatIdx++) {
    const srcRow = Math.floor(flatIdx / sourceCols);
    const srcCol = flatIdx % sourceCols;
    const dstRow = Math.floor(flatIdx / targetCols);
    const dstCol = flatIdx % targetCols;
    const value = matrix[srcRow]![srcCol]!;

    tracker.reshapeCell(srcRow, srcCol, dstRow, dstCol, value, {
      flatIdx,
      srcRow,
      srcCol,
      dstRow,
      dstCol,
      value,
    });
  }

  tracker.complete({ result: `${targetRows}×${targetCols} matrix constructed` });
  return tracker.getSteps();
}
