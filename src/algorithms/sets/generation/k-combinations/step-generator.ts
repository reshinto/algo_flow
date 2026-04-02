/** Step generator for K-Combinations — produces ExecutionStep[] using SetGenerationTracker. */

import type { ExecutionStep } from "@/types";
import { SetGenerationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const K_COMBINATIONS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.K_COMBINATIONS!);

export interface KCombinationsInput {
  elements: number[];
  chooseK: number;
}

export function generateKCombinationsSteps(input: KCombinationsInput): ExecutionStep[] {
  const { elements, chooseK } = input;
  const tracker = new SetGenerationTracker(elements, K_COMBINATIONS_LINE_MAP);
  const currentSubset: number[] = [];
  const result: number[][] = [];

  /** Compute C(n, k) for totalSubsets display */
  function binomialCoefficient(totalCount: number, selectCount: number): number {
    if (selectCount > totalCount) return 0;
    if (selectCount === 0 || selectCount === totalCount) return 1;
    let coefficient = 1;
    for (let idx = 0; idx < selectCount; idx++) {
      coefficient = (coefficient * (totalCount - idx)) / (idx + 1);
    }
    return Math.round(coefficient);
  }

  tracker.initialize({ elements, chooseK });
  tracker.startGeneration({
    totalSubsets: binomialCoefficient(elements.length, chooseK),
    chooseK,
  });

  function backtrack(startIdx: number): void {
    if (currentSubset.length === chooseK) {
      tracker.emitSubset([...currentSubset], {
        currentSubset: [...currentSubset],
        depth: startIdx,
      });
      result.push([...currentSubset]);
      return;
    }

    for (let elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
      const value = elements[elemIdx]!;
      tracker.addToSubset(value, { elemIdx, value, currentLength: currentSubset.length });
      currentSubset.push(value);
      backtrack(elemIdx + 1);
      currentSubset.pop();
      tracker.removeFromSubset(value, { elemIdx, value, currentLength: currentSubset.length });
    }
  }

  backtrack(0);
  tracker.complete({ totalGenerated: result.length, chooseK });
  return tracker.getSteps();
}
