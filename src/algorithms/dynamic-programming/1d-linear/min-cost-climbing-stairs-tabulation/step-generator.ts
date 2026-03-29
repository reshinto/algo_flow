/** Step generator for Min Cost Climbing Stairs (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MIN_COST_STAIRS_TAB_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.MIN_COST_CLIMBING_STAIRS_TABULATION!,
);

interface MinCostStairsInput {
  costs: number[];
}

export function generateMinCostClimbingStairsTabulationSteps(
  input: MinCostStairsInput,
): ExecutionStep[] {
  const { costs } = input;
  const stairCount = costs.length;
  const tableSize = stairCount + 1;
  const tracker = new DPTracker(tableSize, MIN_COST_STAIRS_TAB_LINE_MAP, (index) => `C(${index})`);

  tracker.initialize({ costs, stairCount, tableSize });

  tracker.fillTable(0, 0, {
    currentStep: 0,
    value: 0,
    description: "Base case: C(0) = 0 (start at step 0 for free)",
  });
  tracker.fillTable(1, 0, {
    currentStep: 1,
    value: 0,
    description: "Base case: C(1) = 0 (start at step 1 for free)",
  });

  const dpTable = [0, 0];
  for (let currentStep = 2; currentStep <= stairCount; currentStep++) {
    const prevOne = currentStep - 1;
    const prevTwo = currentStep - 2;

    tracker.readCache(prevOne, { currentStep, readingIndex: prevOne });
    tracker.readCache(prevTwo, { currentStep, readingIndex: prevTwo });

    const costFromOne = (dpTable[prevOne] ?? 0) + (costs[prevOne] ?? 0);
    const costFromTwo = (dpTable[prevTwo] ?? 0) + (costs[prevTwo] ?? 0);
    const minCost = Math.min(costFromOne, costFromTwo);
    dpTable[currentStep] = minCost;

    tracker.computeCell(currentStep, minCost, {
      currentStep,
      formula: `C(${currentStep}) = min(C(${prevOne}) + cost[${prevOne}], C(${prevTwo}) + cost[${prevTwo}])`,
      value: minCost,
    });
  }

  const finalResult = dpTable[stairCount] ?? 0;
  tracker.complete({ result: finalResult, stairCount });

  return tracker.getSteps();
}
