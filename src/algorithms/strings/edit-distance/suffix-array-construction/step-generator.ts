/** Step generator for Suffix Array Construction — produces ExecutionStep[] using DistanceTracker. */

import type { ExecutionStep } from "@/types";
import { DistanceTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SUFFIX_ARRAY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUFFIX_ARRAY_CONSTRUCTION!);

export interface SuffixArrayConstructionInput {
  text: string;
}

export function generateSuffixArrayConstructionSteps(
  input: SuffixArrayConstructionInput,
): ExecutionStep[] {
  const { text } = input;
  const textLength = text.length;

  // Use DistanceTracker with text as both source and target.
  // The matrix rows represent suffixes (by starting index),
  // and columns represent suffix positions for comparison visualization.
  const tracker = new DistanceTracker(text, text, SUFFIX_ARRAY_LINE_MAP);

  // Emit initialization step
  tracker.initialize({ text, textLength });

  if (textLength === 0) {
    tracker.updateResult(0, { suffixArray: [] });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Build the initial suffix indices array
  const suffixIndices: number[] = Array.from({ length: textLength }, (_, idx) => idx);

  // Show each suffix in the matrix as a "base case" fill
  for (let suffixIdx = 0; suffixIdx < textLength; suffixIdx++) {
    const startIndex = suffixIndices[suffixIdx]!;
    tracker.fillBaseCase(suffixIdx, startIndex, startIndex, {
      suffixIdx,
      startIndex,
      suffix: text.slice(startIndex),
    });
  }

  // Perform comparisons during sort — generate all suffix pair comparisons
  // We simulate the comparison pass before sorting to show the comparisons
  const sortedIndices = [...suffixIndices];
  const comparePairs: [number, number][] = [];

  // Collect pairs to compare: for visualization, show adjacent pairs
  for (let outerIdx = 0; outerIdx < textLength - 1; outerIdx++) {
    for (let innerIdx = outerIdx + 1; innerIdx < textLength; innerIdx++) {
      comparePairs.push([outerIdx, innerIdx]);
    }
  }

  // Show a representative set of comparisons (first suffix-length comparisons to avoid too many steps)
  const maxComparisons = Math.min(comparePairs.length, textLength);
  for (let pairIdx = 0; pairIdx < maxComparisons; pairIdx++) {
    const pair = comparePairs[pairIdx]!;
    const firstSuffixStart = pair[0];
    const secondSuffixStart = pair[1];
    const firstSuffix = text.slice(firstSuffixStart);
    const secondSuffix = text.slice(secondSuffixStart);
    const isFirstSmaller = firstSuffix <= secondSuffix;

    tracker.compareChars(firstSuffixStart, secondSuffixStart, isFirstSmaller, {
      firstSuffix,
      secondSuffix,
      firstSuffixStart,
      secondSuffixStart,
      firstComesFirst: isFirstSmaller,
    });
  }

  // Sort the suffix indices
  sortedIndices.sort((firstIdx, secondIdx) => {
    const firstSuffix = text.slice(firstIdx);
    const secondSuffix = text.slice(secondIdx);
    if (firstSuffix < secondSuffix) return -1;
    if (firstSuffix > secondSuffix) return 1;
    return 0;
  });

  // Trace the sorted order path through the matrix
  const sortedPath: [number, number][] = sortedIndices.map(
    (startIdx, rankIdx) => [rankIdx, startIdx] as [number, number],
  );
  tracker.tracePath(sortedPath, { sortedOrder: sortedIndices });

  // Emit result
  tracker.updateResult(sortedIndices.length, {
    suffixArray: sortedIndices,
    suffixCount: sortedIndices.length,
  });

  tracker.complete({ result: sortedIndices });
  return tracker.getSteps();
}
