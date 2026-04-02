/** Step generator for Set Symmetric Difference — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_SYMMETRIC_DIFFERENCE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.SET_SYMMETRIC_DIFFERENCE!,
);

export interface SetSymmetricDifferenceInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSetSymmetricDifferenceSteps(
  input: SetSymmetricDifferenceInput,
): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, SET_SYMMETRIC_DIFFERENCE_LINE_MAP);
  const hashSet = new Set<number>();

  tracker.setOperationLabel("Symmetric Difference");
  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayA
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.addToSet(valueA, idxA, { idxA, valueA });
    hashSet.add(valueA);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: iterate arrayB
  // - common elements (found in hash set) are removed — skip-element
  // - elements only in B are added to result
  let totalResultSize = 0;
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.checkMembership(valueB, idxB, { idxB, valueB });

    if (hashSet.has(valueB)) {
      // valueB is in both arrays — remove from hash set (common element, not in result)
      hashSet.delete(valueB);
      tracker.skipElement(valueB, idxB, { idxB, valueB, reason: "common element — excluded" });
    } else {
      // valueB is only in B — add to result
      tracker.addToResult(valueB, idxB, { idxB, valueB });
      totalResultSize++;
    }
  }

  // Phase 3: remaining elements in hash set are only in A — add to result
  let remainingIdx = 0;
  for (const remaining of hashSet) {
    tracker.addToResult(remaining, remainingIdx, {
      remaining,
      phase: "collecting A-only elements",
    });
    remainingIdx++;
    totalResultSize++;
  }

  tracker.complete({ resultSize: totalResultSize });
  return tracker.getSteps();
}
