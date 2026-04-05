/** Step generator for Levenshtein Distance — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LEVENSHTEIN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LEVENSHTEIN_DISTANCE!);

export interface LevenshteinDistanceInput {
  source: string;
  target: string;
}

export function generateLevenshteinDistanceSteps(input: LevenshteinDistanceInput): ExecutionStep[] {
  const { source, target } = input;
  const tracker = new DistanceTracker(source, target, LEVENSHTEIN_LINE_MAP);

  const sourceLength = source.length;
  const targetLength = target.length;

  // Pre-compute the full DP matrix once so each cell value is available on demand.
  const dp = buildDpMatrix(source, target);

  // Emit the initialization step
  tracker.initialize({ source, target, sourceLength, targetLength });

  // Fill base case for row 0: transforming empty string to target[0..j-1] = j insertions
  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    tracker.fillBaseCase(0, colIdx, colIdx, { rowIdx: 0, colIdx, value: colIdx });
  }

  // Fill base case for col 0: transforming source[0..i-1] to empty string = i deletions
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    tracker.fillBaseCase(rowIdx, 0, rowIdx, { rowIdx, colIdx: 0, value: rowIdx });
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

  // Trace the edit path back from bottom-right to top-left
  const editPath = traceEditPath(dp, source, target);
  tracker.tracePath(editPath, { pathLength: editPath.length });

  // Record final result
  const editDistance = dp[sourceLength]![targetLength]!;
  tracker.updateResult(editDistance, { editDistance });

  tracker.complete({ result: editDistance });
  return tracker.getSteps();
}

/**
 * Build the full Levenshtein DP matrix for a given source/target pair.
 * Returns a (sourceLength+1) × (targetLength+1) matrix where
 * dp[rowIdx][colIdx] is the edit distance between source[0..rowIdx-1] and target[0..colIdx-1].
 */
function buildDpMatrix(source: string, target: string): number[][] {
  const sourceLength = source.length;
  const targetLength = target.length;
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    new Array<number>(targetLength + 1).fill(0),
  );

  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    dp[0]![colIdx] = colIdx;
  }
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    dp[rowIdx]![0] = rowIdx;
  }

  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      if (source[rowIdx - 1] === target[colIdx - 1]) {
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]!;
      } else {
        dp[rowIdx]![colIdx] = Math.min(
          dp[rowIdx - 1]![colIdx - 1]! + 1,
          dp[rowIdx - 1]![colIdx]! + 1,
          dp[rowIdx]![colIdx - 1]! + 1,
        );
      }
    }
  }

  return dp;
}

/**
 * Trace the optimal edit path from bottom-right to top-left through a pre-built DP matrix.
 * Returns an array of [rowIdx, colIdx] pairs representing the path in forward order.
 */
function traceEditPath(dp: number[][], source: string, target: string): [number, number][] {
  const path: [number, number][] = [];

  let rowIdx = source.length;
  let colIdx = target.length;

  while (rowIdx > 0 || colIdx > 0) {
    path.push([rowIdx, colIdx]);

    if (rowIdx === 0) {
      colIdx--;
    } else if (colIdx === 0) {
      rowIdx--;
    } else if (source[rowIdx - 1] === target[colIdx - 1]) {
      // Match — came from diagonal
      rowIdx--;
      colIdx--;
    } else {
      const replaceCost = dp[rowIdx - 1]![colIdx - 1]!;
      const deleteCost = dp[rowIdx - 1]![colIdx]!;
      const insertCost = dp[rowIdx]![colIdx - 1]!;
      const minCost = Math.min(replaceCost, deleteCost, insertCost);

      if (minCost === replaceCost) {
        rowIdx--;
        colIdx--;
      } else if (minCost === deleteCost) {
        rowIdx--;
      } else {
        colIdx--;
      }
    }
  }

  path.push([0, 0]);
  return path.reverse();
}
