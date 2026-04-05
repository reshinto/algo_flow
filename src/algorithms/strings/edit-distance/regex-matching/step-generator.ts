/** Step generator for Regular Expression Matching — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const REGEX_MATCHING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REGEX_MATCHING!);

export interface RegexMatchingInput {
  text: string;
  pattern: string;
}

export function generateRegexMatchingSteps(input: RegexMatchingInput): ExecutionStep[] {
  const { text, pattern } = input;
  // DistanceTracker expects source and target — map text → source, pattern → target
  const tracker = new DistanceTracker(text, pattern, REGEX_MATCHING_LINE_MAP);

  const textLength = text.length;
  const patternLength = pattern.length;

  // Pre-compute the full DP matrix so each cell value is available on demand
  const dp = buildDpMatrix(text, pattern);

  // Emit initialization step
  tracker.initialize({ text, pattern, textLength, patternLength });

  // Base case: dp[0][0] = 1 (empty matches empty)
  tracker.fillBaseCase(0, 0, 1, { rowIdx: 0, colIdx: 0, value: 1 });

  // Base case: row 0 — empty text matches patterns like "a*", "a*b*", etc.
  for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
    const value = dp[0]![colIdx]!;
    tracker.fillBaseCase(0, colIdx, value, { rowIdx: 0, colIdx, value });
  }

  // Fill interior cells row by row
  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
      const textChar = text[rowIdx - 1]!;
      const patternChar = pattern[colIdx - 1]!;
      const isMatch = patternChar === "." || patternChar === textChar || patternChar === "*";

      // Emit a comparison step for this cell's characters
      tracker.compareChars(rowIdx - 1, colIdx - 1, isMatch, {
        rowIdx,
        colIdx,
        textChar,
        patternChar,
        isMatch,
      });

      const cellValue = dp[rowIdx]![colIdx]!;

      // Emit compute step (sets cell to "computing")
      tracker.computeCell(rowIdx, colIdx, cellValue, {
        rowIdx,
        colIdx,
        cellValue,
        patternChar,
      });

      // Finalise cell as "computed"
      tracker.markCellComputed(rowIdx, colIdx, { rowIdx, colIdx, cellValue });
    }
  }

  // Trace the match path from bottom-right to top-left
  const matchPath = traceMatchPath(dp, text, pattern);
  tracker.tracePath(matchPath, { pathLength: matchPath.length });

  // Record final result as 1 (match) or 0 (no match)
  const finalValue = dp[textLength]![patternLength]!;
  tracker.updateResult(finalValue, { isMatch: finalValue === 1 });

  tracker.complete({ result: finalValue });
  return tracker.getSteps();
}

/**
 * Build the full regex matching DP matrix for a given text/pattern pair.
 * Returns a (textLength+1) × (patternLength+1) matrix where
 * dp[rowIdx][colIdx] is 1 if text[0..rowIdx-1] matches pattern[0..colIdx-1], else 0.
 */
function buildDpMatrix(text: string, pattern: string): number[][] {
  const textLength = text.length;
  const patternLength = pattern.length;
  const dp: number[][] = Array.from({ length: textLength + 1 }, () =>
    new Array<number>(patternLength + 1).fill(0),
  );

  dp[0]![0] = 1;

  for (let colIdx = 2; colIdx <= patternLength; colIdx++) {
    if (pattern[colIdx - 1] === "*") {
      dp[0]![colIdx] = dp[0]![colIdx - 2]!;
    }
  }

  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
      const patternChar = pattern[colIdx - 1];
      const textChar = text[rowIdx - 1];

      if (patternChar === "*") {
        const zeroOccurrences = dp[rowIdx]![colIdx - 2] ?? 0;
        const precedingChar = colIdx >= 2 ? pattern[colIdx - 2] : undefined;
        const charMatches = precedingChar === "." || precedingChar === textChar;
        const oneMore = charMatches ? (dp[rowIdx - 1]![colIdx] ?? 0) : 0;
        dp[rowIdx]![colIdx] = zeroOccurrences === 1 || oneMore === 1 ? 1 : 0;
      } else if (patternChar === "." || patternChar === textChar) {
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]!;
      } else {
        dp[rowIdx]![colIdx] = 0;
      }
    }
  }

  return dp;
}

/**
 * Trace the matching path from bottom-right to top-left through a pre-built DP matrix.
 * Returns an array of [rowIdx, colIdx] pairs representing the path in forward order.
 * Only traces if the match succeeded (dp[textLength][patternLength] === 1).
 */
function traceMatchPath(dp: number[][], text: string, pattern: string): [number, number][] {
  const textLength = text.length;
  const patternLength = pattern.length;

  if (dp[textLength]![patternLength] !== 1) {
    return [[textLength, patternLength]];
  }

  const path: [number, number][] = [];
  let rowIdx = textLength;
  let colIdx = patternLength;

  while (rowIdx > 0 || colIdx > 0) {
    path.push([rowIdx, colIdx]);

    if (rowIdx === 0) {
      colIdx--;
    } else if (colIdx === 0) {
      rowIdx--;
    } else {
      const patternChar = pattern[colIdx - 1];
      if (patternChar === "*") {
        // Prefer zero-occurrences (skip two pattern positions) if it contributed
        if (colIdx >= 2 && dp[rowIdx]![colIdx - 2] === 1) {
          colIdx -= 2;
        } else {
          rowIdx--;
        }
      } else {
        // '.' or exact char match — came from diagonal
        rowIdx--;
        colIdx--;
      }
    }
  }

  path.push([0, 0]);
  return path.reverse();
}
