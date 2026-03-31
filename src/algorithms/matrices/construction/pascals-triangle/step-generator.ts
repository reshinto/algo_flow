/** Step generator for Pascal's Triangle — produces ExecutionStep[] using MatrixConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PASCALS_TRIANGLE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PASCALS_TRIANGLE!);

export interface PascalsTriangleInput {
  numRows: number;
}

export function generatePascalsTriangleSteps(input: PascalsTriangleInput): ExecutionStep[] {
  const { numRows } = input;
  const tracker = new MatrixConstructionTracker(numRows, numRows, PASCALS_TRIANGLE_LINE_MAP);

  tracker.initialize({ numRows });

  const triangle: number[][] = [];

  for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
    const row: number[] = new Array(rowIdx + 1).fill(0) as number[];

    // Left edge: always 1
    row[0] = 1;
    tracker.placeValue(rowIdx, 0, 1, { rowIdx, colIdx: 0, value: 1 });

    // Inner cells: sum of two cells above
    for (let colIdx = 1; colIdx < rowIdx; colIdx++) {
      const aboveRow = triangle[rowIdx - 1]!;
      const leftAbove = aboveRow[colIdx - 1]!;
      const rightAbove = aboveRow[colIdx]!;
      const cellValue = leftAbove + rightAbove;
      row[colIdx] = cellValue;
      tracker.computeCell(
        rowIdx,
        colIdx,
        cellValue,
        { rowIdx, colIdx, value: cellValue, leftAbove, rightAbove },
        `pascal[${rowIdx}][${colIdx}] = pascal[${rowIdx - 1}][${colIdx - 1}] + pascal[${rowIdx - 1}][${colIdx}] = ${leftAbove} + ${rightAbove} = ${cellValue}`,
      );
    }

    // Right edge: always 1 (only for rows beyond the first)
    if (rowIdx > 0) {
      row[rowIdx] = 1;
      tracker.placeValue(rowIdx, rowIdx, 1, { rowIdx, colIdx: rowIdx, value: 1 });
    }

    triangle.push(row);
  }

  tracker.complete({ result: triangle });
  return tracker.getSteps();
}
