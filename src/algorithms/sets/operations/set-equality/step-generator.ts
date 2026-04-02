/** Step generator for Set Equality — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_EQUALITY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_EQUALITY!);

export interface SetEqualityInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSetEqualitySteps(input: SetEqualityInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  // Pass arrayA as first arg so SetTracker builds the hash set from arrayA.
  // arrayB is the second arg — iterated during the membership check phase.
  const tracker = new SetTracker(arrayA, arrayB, SET_EQUALITY_LINE_MAP);
  tracker.setOperationLabel("A = B?");

  const hashSet = new Set<number>();
  let uniqueCountA = 0;

  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayA, counting unique values
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    if (!hashSet.has(valueA)) {
      uniqueCountA++;
    }
    tracker.addToSet(valueA, idxA, { idxA, valueA, uniqueCountA });
    hashSet.add(valueA);
  }

  tracker.startChecking({ hashSetSize: hashSet.size, uniqueCountA });

  // Phase 2: check each element of arrayB for membership; track unique count in B
  let uniqueCountB = 0;
  const seenInB = new Set<number>();
  let isEqual = true;

  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;

    if (!seenInB.has(valueB)) {
      uniqueCountB++;
      seenInB.add(valueB);
    }

    tracker.checkSubset(valueB, { idxB, valueB, uniqueCountB });

    if (hashSet.has(valueB)) {
      tracker.subsetPass(valueB, { idxB, valueB, uniqueCountB });
    } else {
      tracker.subsetFail(valueB, { idxB, valueB, uniqueCountB });
      isEqual = false;
      break;
    }
  }

  if (isEqual) {
    isEqual = uniqueCountA === uniqueCountB;
  }

  tracker.completePredicate(isEqual, { isEqual, uniqueCountA, uniqueCountB });
  return tracker.getSteps();
}
