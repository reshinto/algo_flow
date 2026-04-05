/** Step generator for Longest Common Substring — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_COMMON_SUBSTRING_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LONGEST_COMMON_SUBSTRING!,
);

export interface LongestCommonSubstringInput {
  source: string;
  target: string;
}

export function generateLongestCommonSubstringSteps(
  input: LongestCommonSubstringInput,
): ExecutionStep[] {
  const { source, target } = input;
  const tracker = new DistanceTracker(source, target, LONGEST_COMMON_SUBSTRING_LINE_MAP);

  const sourceLength = source.length;
  const targetLength = target.length;

  // Pre-compute the full DP matrix once so cell values are available on demand.
  const { dp, maxLength, maxRow, maxCol } = buildDpMatrix(source, target);

  // Emit initialization step — matrix is all zeros at this point
  tracker.initialize({ source, target, sourceLength, targetLength, maxLength: 0 });

  // Fill interior cells row by row — row 0 and col 0 stay zero (no base cases to emit)
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      const sourceChar = source[rowIdx - 1]!;
      const targetChar = target[colIdx - 1]!;
      const isMatch = sourceChar === targetChar;

      // Emit comparison step for this cell's characters
      tracker.compareChars(rowIdx - 1, colIdx - 1, isMatch, {
        rowIdx,
        colIdx,
        sourceChar,
        targetChar,
        isMatch,
      });

      const cellValue = dp[rowIdx]![colIdx]!;

      // Emit compute step (marks cell as "computing")
      tracker.computeCell(rowIdx, colIdx, cellValue, {
        rowIdx,
        colIdx,
        cellValue,
        isMatch,
        currentMax: Math.max(...dp.flat().filter((val) => val > 0), 0),
      });

      // Finalise cell as "computed"
      tracker.markCellComputed(rowIdx, colIdx, { rowIdx, colIdx, cellValue });
    }
  }

  // Trace the path of the longest common substring through the matrix
  const substringPath = traceSubstringPath(maxRow, maxCol, maxLength);
  tracker.tracePath(substringPath, { pathLength: substringPath.length, maxLength });

  // Emit found step with final result
  tracker.updateResult(maxLength, { maxLength });

  tracker.complete({ result: maxLength });
  return tracker.getSteps();
}

/**
 * Build the full LCS DP matrix and locate the cell with the maximum value.
 * Returns the matrix, the maximum substring length, and its terminal cell coordinates.
 */
function buildDpMatrix(
  source: string,
  target: string,
): { dp: number[][]; maxLength: number; maxRow: number; maxCol: number } {
  const sourceLength = source.length;
  const targetLength = target.length;
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    new Array<number>(targetLength + 1).fill(0),
  );

  let maxLength = 0;
  let maxRow = 0;
  let maxCol = 0;

  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      if (source[rowIdx - 1] === target[colIdx - 1]) {
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]! + 1;
        if (dp[rowIdx]![colIdx]! > maxLength) {
          maxLength = dp[rowIdx]![colIdx]!;
          maxRow = rowIdx;
          maxCol = colIdx;
        }
      } else {
        dp[rowIdx]![colIdx] = 0;
      }
    }
  }

  return { dp, maxLength, maxRow, maxCol };
}

/**
 * Trace the diagonal path of the longest common substring backwards from its
 * terminal cell. Returns cell coordinates in forward order.
 */
function traceSubstringPath(
  endRow: number,
  endCol: number,
  substringLength: number,
): [number, number][] {
  if (substringLength === 0) return [];

  const path: [number, number][] = [];
  let rowIdx = endRow;
  let colIdx = endCol;

  // Walk diagonally backwards — each step of the common substring is one diagonal cell
  for (let stepIdx = 0; stepIdx < substringLength; stepIdx++) {
    path.push([rowIdx, colIdx]);
    rowIdx--;
    colIdx--;
  }

  return path.reverse();
}
