/** Step generator for Power Set — produces ExecutionStep[] using SetGenerationTracker. */

import type { ExecutionStep } from "@/types";
import { SetGenerationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const POWER_SET_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.POWER_SET!);

export interface PowerSetInput {
  elements: number[];
}

export function generatePowerSetSteps(input: PowerSetInput): ExecutionStep[] {
  const { elements } = input;
  const tracker = new SetGenerationTracker(elements, POWER_SET_LINE_MAP);
  const currentSubset: number[] = [];
  const result: number[][] = [];

  tracker.initialize({ elements });
  tracker.startGeneration({ totalSubsets: Math.pow(2, elements.length) });

  function backtrack(startIdx: number): void {
    tracker.emitSubset([...currentSubset], {
      currentSubset: [...currentSubset],
      depth: startIdx,
    });
    result.push([...currentSubset]);

    for (let elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
      const value = elements[elemIdx]!;
      tracker.addToSubset(value, { elemIdx, value });
      currentSubset.push(value);
      backtrack(elemIdx + 1);
      currentSubset.pop();
      tracker.removeFromSubset(value, { elemIdx, value });
    }
  }

  backtrack(0);
  tracker.complete({ totalGenerated: result.length });
  return tracker.getSteps();
}
