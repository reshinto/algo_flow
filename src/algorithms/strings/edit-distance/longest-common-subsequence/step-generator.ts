/** Step generator for Longest Common Subsequence — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LCS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LONGEST_COMMON_SUBSEQUENCE!);

export interface LongestCommonSubsequenceInput {
  source: string;
  target: string;
}

export function generateLongestCommonSubsequenceSteps(
  input: LongestCommonSubsequenceInput,
): ExecutionStep[] {
  const { source, target } = input;
  const tracker = new DistanceTracker(source, target, LCS_LINE_MAP);

  const sourceLength = source.length;
  const targetLength = target.length;

  // Pre-compute the full DP matrix so every cell value is available on demand.
  const dp = buildLcsDpMatrix(source, target);

  // Emit the initialization step
  tracker.initialize({ source, target, sourceLength, targetLength });

  // Fill base case for row 0: LCS of empty source prefix with any target prefix is 0
  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    tracker.fillBaseCase(0, colIdx, 0, { rowIdx: 0, colIdx, value: 0 });
  }

  // Fill base case for col 0: LCS of any source prefix with empty target prefix is 0
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    tracker.fillBaseCase(rowIdx, 0, 0, { rowIdx, colIdx: 0, value: 0 });
  }

  // Fill interior cells row by row
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      const sourceChar = source[rowIdx - 1]!;
      const targetChar = target[colIdx - 1]!;
      const isMatch = sourceChar === targetChar;

      // Emit a comparison step for this cell's characters
      tracker.compareChars(rowIdx - 1, colIdx - 1, isMatch, {
        rowIdx,
        colIdx,
        sourceChar,
        targetChar,
        isMatch,
      });

      const cellValue = dp[rowIdx]![colIdx]!;

      // Emit compute step (sets cell to "computing")
      tracker.computeCell(rowIdx, colIdx, cellValue, {
        rowIdx,
        colIdx,
        cellValue,
        isMatch,
      });

      // Finalise cell as "computed"
      tracker.markCellComputed(rowIdx, colIdx, { rowIdx, colIdx, cellValue });
    }
  }

  // Trace the LCS path back from bottom-right to top-left
  const lcsPath = traceLcsPath(dp, source, target);
  tracker.tracePath(lcsPath, { pathLength: lcsPath.length });

  // Record final result
  const lcsLength = dp[sourceLength]![targetLength]!;
  tracker.updateResult(lcsLength, { lcsLength });

  tracker.complete({ result: lcsLength });
  return tracker.getSteps();
}

/**
 * Build the full LCS DP matrix for a given source/target pair.
 * Returns a (sourceLength+1) × (targetLength+1) matrix where
 * dp[rowIdx][colIdx] is the LCS length of source[0..rowIdx-1] and target[0..colIdx-1].
 */
function buildLcsDpMatrix(source: string, target: string): number[][] {
  const sourceLength = source.length;
  const targetLength = target.length;
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    new Array<number>(targetLength + 1).fill(0),
  );

  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      if (source[rowIdx - 1] === target[colIdx - 1]) {
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]! + 1;
      } else {
        dp[rowIdx]![colIdx] = Math.max(dp[rowIdx - 1]![colIdx]!, dp[rowIdx]![colIdx - 1]!);
      }
    }
  }

  return dp;
}

/**
 * Trace the LCS path from bottom-right to top-left through a pre-built DP matrix.
 * Returns an array of [rowIdx, colIdx] pairs in forward order covering the matched cells.
 */
function traceLcsPath(dp: number[][], source: string, target: string): [number, number][] {
  const path: [number, number][] = [];

  let rowIdx = source.length;
  let colIdx = target.length;

  while (rowIdx > 0 && colIdx > 0) {
    if (source[rowIdx - 1] === target[colIdx - 1]) {
      // Characters match — this cell is part of the LCS
      path.push([rowIdx, colIdx]);
      rowIdx--;
      colIdx--;
    } else if (dp[rowIdx - 1]![colIdx]! >= dp[rowIdx]![colIdx - 1]!) {
      // Came from above — skip this source character
      rowIdx--;
    } else {
      // Came from the left — skip this target character
      colIdx--;
    }
  }

  return path.reverse();
}
