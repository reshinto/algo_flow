/** Step generator for Set Permutations — produces ExecutionStep[] using SetGenerationTracker. */

import type { ExecutionStep } from "@/types";
import { SetGenerationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_PERMUTATIONS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_PERMUTATIONS!);

export interface SetPermutationsInput {
  elements: number[];
}

export function generateSetPermutationsSteps(input: SetPermutationsInput): ExecutionStep[] {
  const { elements } = input;
  const tracker = new SetGenerationTracker(elements, SET_PERMUTATIONS_LINE_MAP);

  tracker.initialize({ elements });
  tracker.startGeneration({ totalPermutations: factorial(elements.length) });

  const working = [...elements];
  permute(working, 0, tracker);

  tracker.complete({ totalGenerated: factorial(elements.length) });
  return tracker.getSteps();
}

function factorial(value: number): number {
  if (value <= 1) return 1;
  return value * factorial(value - 1);
}

function permute(working: number[], startIdx: number, tracker: SetGenerationTracker): void {
  if (startIdx === working.length) {
    tracker.generatePermutation([...working], { depth: startIdx, permutation: [...working] });
    return;
  }

  for (let swapIdx = startIdx; swapIdx < working.length; swapIdx++) {
    // Swap elements at startIdx and swapIdx
    const swapTemp = working[swapIdx]!;
    working[swapIdx] = working[startIdx]!;
    working[startIdx] = swapTemp;
    tracker.addToSubset(working[startIdx]!, { startIdx, swapIdx, current: [...working] });

    permute(working, startIdx + 1, tracker);

    // Restore original order
    const restoreTemp = working[swapIdx]!;
    working[swapIdx] = working[startIdx]!;
    working[startIdx] = restoreTemp;
    tracker.removeFromSubset(working[swapIdx]!, { startIdx, swapIdx, current: [...working] });
  }
}
