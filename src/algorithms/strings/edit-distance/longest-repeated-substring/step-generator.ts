/** Step generator for Longest Repeated Substring — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_REPEATED_SUBSTRING_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LONGEST_REPEATED_SUBSTRING!,
);

export interface LongestRepeatedSubstringInput {
  text: string;
}

export function generateLongestRepeatedSubstringSteps(
  input: LongestRepeatedSubstringInput,
): ExecutionStep[] {
  const { text } = input;
  // DistanceTracker expects source and target — use text for both
  const tracker = new DistanceTracker(text, text, LONGEST_REPEATED_SUBSTRING_LINE_MAP);

  const textLength = text.length;

  // Pre-compute the full DP matrix once so each cell value is available on demand.
  const { dp, longestLength, longestRowEnd, longestColEnd } = buildDpMatrix(text);

  // Emit the initialization step
  tracker.initialize({ text, textLength, longestLength: 0 });

  // Fill interior cells row by row, skipping the diagonal
  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= textLength; colIdx++) {
      // Skip self-matches on the diagonal to avoid trivial overlapping repeats
      if (rowIdx === colIdx) continue;

      const rowChar = text[rowIdx - 1]!;
      const colChar = text[colIdx - 1]!;
      const isMatch = rowChar === colChar;

      // Emit a comparison step for these two characters
      tracker.compareChars(rowIdx - 1, colIdx - 1, isMatch, {
        rowIdx,
        colIdx,
        rowChar,
        colChar,
        isMatch,
      });

      const cellValue = dp[rowIdx]![colIdx]!;

      // Emit compute step (marks cell as "computing")
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

  // Trace the path of the longest repeated substring along the DP diagonal
  const substringPath = traceLongestSubstringPath(longestLength, longestRowEnd, longestColEnd);
  tracker.tracePath(substringPath, { pathLength: substringPath.length });

  // Record final result
  const result = text.slice(longestRowEnd - longestLength, longestRowEnd);
  tracker.updateResult(longestLength, { result, longestLength });

  tracker.complete({ result });
  return tracker.getSteps();
}

/**
 * Build the full DP matrix for the Longest Repeated Substring algorithm.
 * dp[rowIdx][colIdx] = length of longest common suffix ending at text[rowIdx-1] and text[colIdx-1],
 * with the diagonal excluded to prevent self-overlap.
 * Returns the matrix along with the best length and the exact (row, col) end cell.
 */
function buildDpMatrix(text: string): {
  dp: number[][];
  longestLength: number;
  longestRowEnd: number;
  longestColEnd: number;
} {
  const textLength = text.length;
  const dp: number[][] = Array.from({ length: textLength + 1 }, () =>
    new Array<number>(textLength + 1).fill(0),
  );

  let longestLength = 0;
  let longestRowEnd = 0;
  let longestColEnd = 0;

  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= textLength; colIdx++) {
      if (rowIdx === colIdx) continue;

      if (text[rowIdx - 1] === text[colIdx - 1]) {
        dp[rowIdx]![colIdx] = (dp[rowIdx - 1]![colIdx - 1] ?? 0) + 1;
      } else {
        dp[rowIdx]![colIdx] = 0;
      }

      if ((dp[rowIdx]![colIdx] ?? 0) > longestLength) {
        longestLength = dp[rowIdx]![colIdx]!;
        longestRowEnd = rowIdx;
        longestColEnd = colIdx;
      }
    }
  }

  return { dp, longestLength, longestRowEnd, longestColEnd };
}

/**
 * Build a path of [rowIdx, colIdx] pairs for the longest repeated substring cells.
 * Starting from the endpoint cell (longestRowEnd, longestColEnd), steps back diagonally
 * for longestLength cells to reconstruct the full match path.
 */
function traceLongestSubstringPath(
  longestLength: number,
  longestRowEnd: number,
  longestColEnd: number,
): [number, number][] {
  if (longestLength === 0) return [];

  const path: [number, number][] = [];
  // Walk backwards from the endpoint along the anti-diagonal direction
  for (let offset = 0; offset < longestLength; offset++) {
    const rowIdx = longestRowEnd - offset;
    const colIdx = longestColEnd - offset;
    if (rowIdx > 0 && colIdx > 0 && rowIdx !== colIdx) {
      path.push([rowIdx, colIdx]);
    }
  }

  return path.reverse();
}
