/** Step generator for Jaro-Winkler Similarity — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const JARO_WINKLER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.JARO_WINKLER_SIMILARITY!);

export interface JaroWinklerSimilarityInput {
  source: string;
  target: string;
}

export function generateJaroWinklerSimilaritySteps(
  input: JaroWinklerSimilarityInput,
): ExecutionStep[] {
  const { source, target } = input;
  const tracker = new DistanceTracker(source, target, JARO_WINKLER_LINE_MAP);

  const sourceLength = source.length;
  const targetLength = target.length;

  // Emit initialization step
  tracker.initialize({ source, target, sourceLength, targetLength });

  // Handle trivial cases — still emit base-case steps so the matrix is visible
  if (source === target) {
    for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
      tracker.fillBaseCase(0, colIdx, 0, { rowIdx: 0, colIdx, value: 0 });
    }
    for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
      tracker.fillBaseCase(rowIdx, 0, 0, { rowIdx, colIdx: 0, value: 0 });
    }
    tracker.updateResult(1.0, { similarity: 1.0 });
    tracker.complete({ result: 1.0 });
    return tracker.getSteps();
  }

  if (sourceLength === 0 || targetLength === 0) {
    tracker.updateResult(0.0, { similarity: 0.0 });
    tracker.complete({ result: 0.0 });
    return tracker.getSteps();
  }

  // Compute match window
  const matchWindow = Math.floor(Math.max(sourceLength, targetLength) / 2) - 1;

  // Fill row 0 and col 0 with 0s (base case for the match matrix display)
  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    tracker.fillBaseCase(0, colIdx, 0, { rowIdx: 0, colIdx, value: 0 });
  }
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    tracker.fillBaseCase(rowIdx, 0, 0, { rowIdx, colIdx: 0, value: 0 });
  }

  // Track which characters are matched (for transposition counting)
  const sourceMatched = new Array<boolean>(sourceLength).fill(false);
  const targetMatched = new Array<boolean>(targetLength).fill(false);
  let matchCount = 0;

  // For each source character, search for a match in the target window
  for (let sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) {
    const windowStart = Math.max(0, sourceIdx - matchWindow);
    const windowEnd = Math.min(targetLength - 1, sourceIdx + matchWindow);
    const rowIdx = sourceIdx + 1;

    for (let targetIdx = windowStart; targetIdx <= windowEnd; targetIdx++) {
      const colIdx = targetIdx + 1;
      const sourceChar = source[sourceIdx]!;
      const targetChar = target[targetIdx]!;
      const alreadyMatched = targetMatched[targetIdx] ?? false;

      if (!alreadyMatched) {
        const isMatch = sourceChar === targetChar;

        // Emit comparison step
        tracker.compareChars(sourceIdx, targetIdx, isMatch, {
          sourceIdx,
          targetIdx,
          sourceChar,
          targetChar,
          isMatch,
          matchWindow,
        });

        if (isMatch) {
          sourceMatched[sourceIdx] = true;
          targetMatched[targetIdx] = true;
          matchCount++;

          // Record match result in the matrix (1 = match)
          tracker.computeCell(rowIdx, colIdx, 1, {
            rowIdx,
            colIdx,
            cellValue: 1,
            isMatch: true,
            matchCount,
          });
          tracker.markCellComputed(rowIdx, colIdx, { rowIdx, colIdx, cellValue: 1 });
          break;
        } else {
          // Record no-match (0) in the matrix
          tracker.computeCell(rowIdx, colIdx, 0, {
            rowIdx,
            colIdx,
            cellValue: 0,
            isMatch: false,
          });
          tracker.markCellComputed(rowIdx, colIdx, { rowIdx, colIdx, cellValue: 0 });
        }
      }
    }
  }

  // Count transpositions
  let transpositionCount = 0;
  let targetScanIdx = 0;

  for (let sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) {
    if (!sourceMatched[sourceIdx]) continue;

    while (!(targetMatched[targetScanIdx] ?? false)) {
      targetScanIdx++;
    }

    if (source[sourceIdx] !== target[targetScanIdx]) {
      transpositionCount++;
    }

    targetScanIdx++;
  }

  // Compute Jaro score
  const halfTranspositions = transpositionCount / 2;
  const jaroScore =
    matchCount === 0
      ? 0
      : (matchCount / sourceLength +
          matchCount / targetLength +
          (matchCount - halfTranspositions) / matchCount) /
        3;

  // Compute prefix length (up to 4)
  const maxPrefixLength = 4;
  let prefixLength = 0;
  for (
    let prefixIdx = 0;
    prefixIdx < Math.min(maxPrefixLength, sourceLength, targetLength);
    prefixIdx++
  ) {
    if (source[prefixIdx] === target[prefixIdx]) {
      prefixLength++;
    } else {
      break;
    }
  }

  // Compute Winkler bonus and final score
  const winklerBonus = prefixLength * 0.1 * (1 - jaroScore);
  const rawScore = jaroScore + winklerBonus;
  const finalScore = Math.round(rawScore * 10000) / 10000;

  // Trace the matched pairs as the "path"
  const matchedPath: [number, number][] = [];
  for (let rowIdx = 0; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
      if (rowIdx === 0 && colIdx === 0) {
        matchedPath.push([0, 0]);
      } else if (
        rowIdx > 0 &&
        colIdx > 0 &&
        sourceMatched[rowIdx - 1] &&
        targetMatched[colIdx - 1]
      ) {
        matchedPath.push([rowIdx, colIdx]);
      }
    }
  }
  tracker.tracePath(matchedPath, { matchCount, transpositionCount, prefixLength });

  // Emit final result
  tracker.updateResult(finalScore, {
    jaroScore: Math.round(jaroScore * 10000) / 10000,
    prefixLength,
    winklerBonus: Math.round(winklerBonus * 10000) / 10000,
    similarity: finalScore,
    matchCount,
    transpositions: transpositionCount,
  });

  tracker.complete({ result: finalScore });
  return tracker.getSteps();
}
