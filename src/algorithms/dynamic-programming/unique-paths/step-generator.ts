/** Step generator for Unique Paths (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const UNIQUE_PATHS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UNIQUE_PATHS!);

export interface UniquePathsInput {
  rows: number;
  columns: number;
}

export function generateUniquePathsSteps(input: UniquePathsInput): ExecutionStep[] {
  const { rows, columns } = input;
  const tableSize = columns;
  const tracker = new DPTracker(tableSize, UNIQUE_PATHS_LINE_MAP, (index) => `P(${index})`);

  tracker.initialize({ rows, columns, tableSize });

  // Initialize all cells to 1 — represents the first row where every cell has exactly one path
  const dpTable = new Array<number>(columns).fill(1);

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    tracker.fillTable(columnIndex, 1, {
      columnIndex,
      value: 1,
      description: `P(${columnIndex}) = 1 (first row base case — only rightward moves possible)`,
    });
  }

  // Process rows 1 through rows-1, updating dp[columnIndex] in place
  for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 1; columnIndex < columns; columnIndex++) {
      const currentValue = dpTable[columnIndex]!;
      const leftValue = dpTable[columnIndex - 1]!;

      tracker.readCache(columnIndex, {
        rowIndex,
        columnIndex,
        readingIndex: columnIndex,
        currentValue,
        description: `Read P(${columnIndex}) = ${currentValue} (paths from above)`,
      });

      tracker.readCache(columnIndex - 1, {
        rowIndex,
        columnIndex,
        readingIndex: columnIndex - 1,
        leftValue,
        description: `Read P(${columnIndex - 1}) = ${leftValue} (paths from the left)`,
      });

      const updatedValue = currentValue + leftValue;
      dpTable[columnIndex] = updatedValue;

      tracker.computeCell(
        columnIndex,
        updatedValue,
        {
          rowIndex,
          columnIndex,
          currentValue,
          leftValue,
          updatedValue,
          formula: `P(${columnIndex}) = P(${columnIndex}) + P(${columnIndex - 1}) = ${currentValue} + ${leftValue}`,
        },
        `Row ${rowIndex}: P(${columnIndex}) = ${currentValue} + ${leftValue} = ${updatedValue}`,
      );
    }
  }

  const finalResult = dpTable[columns - 1]!;
  tracker.complete({ result: finalResult, rows, columns });

  return tracker.getSteps();
}
