/** Step generator for Subset Check — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SUBSET_CHECK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUBSET_CHECK!);

export interface SubsetCheckInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSubsetCheckSteps(input: SubsetCheckInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  // Pass arrayB as first arg so SetTracker builds the hash set from arrayB (the superset candidate).
  // arrayA is passed as second arg — it is the array we iterate during the subset check phase.
  const tracker = new SetTracker(arrayB, arrayA, SUBSET_CHECK_LINE_MAP);
  tracker.setOperationLabel("A ⊆ B?");

  const hashSet = new Set<number>();

  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayB
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.addToSet(valueB, idxB, { idxB, valueB });
    hashSet.add(valueB);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: check each element of arrayA for membership in the hash set
  let isSubset = true;
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.checkSubset(valueA, { idxA, valueA });

    if (hashSet.has(valueA)) {
      tracker.subsetPass(valueA, { idxA, valueA });
    } else {
      tracker.subsetFail(valueA, { idxA, valueA });
      isSubset = false;
      break;
    }
  }

  tracker.completePredicate(isSubset, { isSubset });
  return tracker.getSteps();
}
