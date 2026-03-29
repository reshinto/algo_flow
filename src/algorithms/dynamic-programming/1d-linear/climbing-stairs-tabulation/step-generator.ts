/** Step generator for Climbing Stairs (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CLIMBING_STAIRS_TAB_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.CLIMBING_STAIRS_TABULATION!,
);

interface ClimbingStairsInput {
  numberOfStairs: number;
}

export function generateClimbingStairsTabulationSteps(input: ClimbingStairsInput): ExecutionStep[] {
  const { numberOfStairs } = input;
  const tableSize = numberOfStairs + 1;
  const tracker = new DPTracker(tableSize, CLIMBING_STAIRS_TAB_LINE_MAP, (index) => `S(${index})`);

  tracker.initialize({ numberOfStairs, tableSize });

  tracker.fillTable(0, 1, {
    currentStep: 0,
    value: 1,
    description: "Base case: S(0) = 1 (one way to stay at ground)",
  });
  if (numberOfStairs >= 1) {
    tracker.fillTable(1, 1, {
      currentStep: 1,
      value: 1,
      description: "Base case: S(1) = 1 (one way to climb 1 step)",
    });
  }

  const dpTable = [1, 1];
  for (let currentStep = 2; currentStep <= numberOfStairs; currentStep++) {
    const prevOne = currentStep - 1;
    const prevTwo = currentStep - 2;

    tracker.readCache(prevOne, { currentStep, readingIndex: prevOne });
    tracker.readCache(prevTwo, { currentStep, readingIndex: prevTwo });

    const ways = (dpTable[prevOne] ?? 0) + (dpTable[prevTwo] ?? 0);
    dpTable[currentStep] = ways;
    tracker.computeCell(currentStep, ways, {
      currentStep,
      formula: `S(${currentStep}) = S(${prevOne}) + S(${prevTwo})`,
      value: ways,
    });
  }

  tracker.complete({ result: dpTable[numberOfStairs] ?? 1, numberOfStairs });
  return tracker.getSteps();
}
