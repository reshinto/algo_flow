/** Step generator for Set Difference — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_DIFFERENCE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_DIFFERENCE!);

export interface SetDifferenceInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSetDifferenceSteps(input: SetDifferenceInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, SET_DIFFERENCE_LINE_MAP);
  const hashSet = new Set<number>();

  tracker.setOperationLabel("Difference");
  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayB
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.addToSet(valueB, idxB, { idxB, valueB });
    hashSet.add(valueB);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: iterate arrayA, include only elements not in hashSet
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.checkMembership(valueA, idxA, { idxA, valueA });

    if (hashSet.has(valueA)) {
      // valueA is in B — exclude from result
      tracker.skipElement(valueA, idxA, { idxA, valueA });
    } else {
      // valueA is only in A — add to result
      tracker.addToResult(valueA, idxA, { idxA, valueA });
    }
  }

  tracker.complete({ resultSize: arrayA.filter((value) => !hashSet.has(value)).length });
  return tracker.getSteps();
}
