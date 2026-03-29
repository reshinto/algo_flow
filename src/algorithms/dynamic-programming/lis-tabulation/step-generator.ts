/** Step generator for LIS (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LIS_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LIS_TABULATION!);

export interface LISInput {
  sequence: number[];
}

export function generateLISTabulationSteps(input: LISInput): ExecutionStep[] {
  const { sequence } = input;
  const sequenceLength = sequence.length;

  const tracker = new DPTracker(
    sequenceLength === 0 ? 1 : sequenceLength,
    LIS_TAB_LINE_MAP,
    (index) => `L(${index})`,
  );

  tracker.initialize({ sequence, sequenceLength });

  if (sequenceLength === 0) {
    tracker.complete({ result: 0, sequence });
    return tracker.getSteps();
  }

  // Parallel dp array to track real values for read-cache lookups
  const dpTable: number[] = new Array(sequenceLength).fill(1);

  // Fill all positions with 1 (each element alone is a subsequence of length 1)
  for (let fillIndex = 0; fillIndex < sequenceLength; fillIndex++) {
    tracker.fillTable(fillIndex, 1, {
      fillIndex,
      value: 1,
      element: sequence[fillIndex],
      description: `L(${fillIndex}) = 1 — element ${sequence[fillIndex]} starts a subsequence of length 1`,
    });
  }

  // For each index, scan all previous indices to extend subsequences
  for (let outerIndex = 1; outerIndex < sequenceLength; outerIndex++) {
    const currentElement = sequence[outerIndex]!;

    for (let innerIndex = 0; innerIndex < outerIndex; innerIndex++) {
      const previousElement = sequence[innerIndex]!;
      const previousDpValue = dpTable[innerIndex]!;

      tracker.readCache(innerIndex, {
        outerIndex,
        innerIndex,
        currentElement,
        previousElement,
        previousDpValue,
        description: `Read L(${innerIndex}) = ${previousDpValue} — compare seq[${innerIndex}]=${previousElement} < seq[${outerIndex}]=${currentElement}`,
      });

      if (previousElement < currentElement) {
        const candidate = previousDpValue + 1;
        const updatedValue = Math.max(dpTable[outerIndex]!, candidate);
        dpTable[outerIndex] = updatedValue;

        tracker.computeCell(
          outerIndex,
          updatedValue,
          {
            outerIndex,
            innerIndex,
            currentElement,
            previousElement,
            candidate,
            updatedValue,
            formula: `L(${outerIndex}) = max(L(${outerIndex}), L(${innerIndex}) + 1) = max(${dpTable[outerIndex]}, ${previousDpValue} + 1) = ${updatedValue}`,
          },
          `L(${outerIndex}) updated to ${updatedValue} — extending subsequence ending at ${previousElement}`,
        );
      }
    }
  }

  const maxLength = Math.max(...dpTable);
  tracker.complete({ result: maxLength, sequence, dpTable: [...dpTable] });

  return tracker.getSteps();
}
