/** Step generator for Pascal's Triangle Row (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PASCALS_TRIANGLE_ROW_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PASCALS_TRIANGLE_ROW!);

interface PascalsTriangleInput {
  rowIndex: number;
}

export function generatePascalsTriangleRowSteps(input: PascalsTriangleInput): ExecutionStep[] {
  const { rowIndex } = input;
  const tableSize = rowIndex + 1;
  const tracker = new DPTracker(
    tableSize,
    PASCALS_TRIANGLE_ROW_LINE_MAP,
    (columnIndex) => `C(${rowIndex},${columnIndex})`,
  );

  tracker.initialize({ rowIndex, tableSize });

  // All cells start at 1 (the dp array is initialized to all 1s)
  for (let columnIndex = 0; columnIndex < tableSize; columnIndex++) {
    tracker.fillTable(columnIndex, 1, {
      columnIndex,
      value: 1,
      description: "Initialize all entries to 1",
    });
  }

  // Build dp table in-place: for each row from 2 to rowIndex, iterate RIGHT-TO-LEFT
  const dpValues = new Array<number>(tableSize).fill(1);

  for (let rowNumber = 2; rowNumber <= rowIndex; rowNumber++) {
    for (let columnIndex = rowNumber - 1; columnIndex >= 1; columnIndex--) {
      const currentValue = dpValues[columnIndex] ?? 0;
      const leftValue = dpValues[columnIndex - 1] ?? 0;

      tracker.readCache(columnIndex, {
        rowNumber,
        columnIndex,
        readingIndex: columnIndex,
      });
      tracker.readCache(columnIndex - 1, {
        rowNumber,
        columnIndex,
        readingIndex: columnIndex - 1,
      });

      const newValue = currentValue + leftValue;
      dpValues[columnIndex] = newValue;

      tracker.computeCell(
        columnIndex,
        newValue,
        {
          rowNumber,
          columnIndex,
          formula: `C(${rowIndex},${columnIndex}) = C(${rowIndex - 1},${columnIndex}) + C(${rowIndex - 1},${columnIndex - 1})`,
          value: newValue,
        },
        `Compute C(${rowIndex},${columnIndex}) = ${currentValue} + ${leftValue} = ${newValue}`,
      );
    }
  }

  tracker.complete({ result: [...dpValues], rowIndex });

  return tracker.getSteps();
}
