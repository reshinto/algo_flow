/** Step generator for Set Union — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_UNION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_UNION!);

export interface SetUnionInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSetUnionSteps(input: SetUnionInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, SET_UNION_LINE_MAP);
  const hashSet = new Set<number>();

  tracker.setOperationLabel("Union");
  tracker.initialize({ arrayA, arrayB });

  // Phase 1: add all elements of arrayA to hash set and result
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.addToSet(valueA, idxA, { idxA, valueA });
    hashSet.add(valueA);
    tracker.addToResult(valueA, idxA, { idxA, valueA, resultSize: hashSet.size });
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: add elements of arrayB not in the hash set
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.checkMembership(valueB, idxB, { idxB, valueB });

    if (hashSet.has(valueB)) {
      // valueB already included in union — skip
      tracker.skipElement(valueB, idxB, { idxB, valueB, reason: "already in union" });
    } else {
      // valueB is unique to arrayB — add to result
      tracker.addToResult(valueB, idxB, { idxB, valueB });
      hashSet.add(valueB);
    }
  }

  tracker.complete({ resultSize: hashSet.size });
  return tracker.getSteps();
}
