/** Step generator for Can Jump (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CAN_JUMP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CAN_JUMP!);

export interface CanJumpInput {
  nums: number[];
}

export function generateCanJumpSteps(input: CanJumpInput): ExecutionStep[] {
  const { nums } = input;
  const tableSize = nums.length;
  const tracker = new DPTracker(tableSize, CAN_JUMP_LINE_MAP, (index) => `R(${index})`);

  tracker.initialize({ tableSize, nums });

  // Internal dp array to track real values for read-cache lookups
  const dpTable: number[] = new Array(tableSize).fill(0);
  dpTable[0] = 1;

  tracker.fillTable(0, 1, {
    targetIndex: 0,
    value: 1,
    description: "Base case: R(0) = 1 (index 0 is always reachable)",
  });

  for (let targetIndex = 1; targetIndex < tableSize; targetIndex++) {
    let reachable = 0;

    for (let sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
      const sourceReachable = dpTable[sourceIndex] ?? 0;
      const sourceJump = nums[sourceIndex] ?? 0;

      if (sourceReachable === 1) {
        tracker.readCache(sourceIndex, {
          targetIndex,
          sourceIndex,
          sourceReachable,
          maxReach: sourceIndex + sourceJump,
          description: `Check if R(${sourceIndex})=1 and ${sourceIndex}+${sourceJump}>=${targetIndex}`,
        });

        if (sourceIndex + sourceJump >= targetIndex) {
          reachable = 1;
          break;
        }
      }
    }

    dpTable[targetIndex] = reachable;

    tracker.computeCell(
      targetIndex,
      reachable,
      {
        targetIndex,
        value: reachable,
        formula:
          reachable === 1
            ? `R(${targetIndex}) = 1 — reachable from a prior index`
            : `R(${targetIndex}) = 0 — no prior index can reach here`,
      },
      reachable === 1
        ? `R(${targetIndex}) = 1 — index ${targetIndex} is reachable`
        : `R(${targetIndex}) = 0 — index ${targetIndex} is not reachable`,
    );
  }

  const lastValue = dpTable[tableSize - 1] ?? 0;
  const finalResult = lastValue === 1;
  tracker.complete({ result: finalResult, lastIndex: tableSize - 1 });

  return tracker.getSteps();
}
