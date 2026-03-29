/** Step generator for Minimum Jumps (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MINIMUM_JUMPS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MINIMUM_JUMPS!);

interface MinimumJumpsInput {
  jumps: number[];
}

export function generateMinimumJumpsSteps(input: MinimumJumpsInput): ExecutionStep[] {
  const { jumps } = input;
  const arrayLength = jumps.length;
  const tracker = new DPTracker(
    arrayLength === 0 ? 1 : arrayLength,
    MINIMUM_JUMPS_LINE_MAP,
    (index) => `J(${index})`,
  );

  tracker.initialize({ arrayLength, jumps });

  if (arrayLength === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  tracker.fillTable(0, 0, {
    targetIndex: 0,
    value: 0,
    description: "Base case: J(0) = 0 (already at start)",
  });

  const dpValues: number[] = new Array(arrayLength).fill(Infinity);
  dpValues[0] = 0;

  for (let targetIndex = 1; targetIndex < arrayLength; targetIndex++) {
    for (let sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
      const sourceValue = dpValues[sourceIndex]!;
      const jumpReach = sourceIndex + (jumps[sourceIndex] ?? 0);

      if (sourceValue !== Infinity && jumpReach >= targetIndex) {
        tracker.readCache(sourceIndex, {
          targetIndex,
          sourceIndex,
          sourceValue,
          jumpReach,
          description: `J(${sourceIndex})=${sourceValue}, reach=${jumpReach} >= ${targetIndex}`,
        });

        const candidate = sourceValue + 1;
        const currentBest = dpValues[targetIndex]!;

        if (candidate < currentBest) {
          dpValues[targetIndex] = candidate;
          tracker.computeCell(
            targetIndex,
            candidate,
            {
              targetIndex,
              sourceIndex,
              formula: `J(${targetIndex}) = min(J(${targetIndex}), J(${sourceIndex}) + 1)`,
              value: candidate,
            },
            `Update J(${targetIndex}) = ${candidate} via source J(${sourceIndex})`,
          );
        }
      }
    }
  }

  const finalValue = dpValues[arrayLength - 1]!;
  const result = finalValue === Infinity ? -1 : finalValue;
  tracker.complete({ result, jumps });

  return tracker.getSteps();
}
