/** Step generator for Set Intersection — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_INTERSECTION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_INTERSECTION!);

export interface SetIntersectionInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSetIntersectionSteps(input: SetIntersectionInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, SET_INTERSECTION_LINE_MAP);
  const hashSet = new Set<number>();

  tracker.setOperationLabel("Intersection");
  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayA
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.addToSet(valueA, idxA, { idxA, valueA });
    hashSet.add(valueA);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: check arrayB against the hash set
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.checkMembership(valueB, idxB, { idxB, valueB });

    if (hashSet.has(valueB)) {
      tracker.memberFound(valueB, idxB, { idxB, valueB });
      hashSet.delete(valueB);
    } else {
      tracker.memberNotFound(valueB, idxB, { idxB, valueB });
    }
  }

  tracker.complete({ resultSize: hashSet.size });
  return tracker.getSteps();
}
