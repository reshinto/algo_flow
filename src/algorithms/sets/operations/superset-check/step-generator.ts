/** Step generator for Superset Check — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SUPERSET_CHECK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUPERSET_CHECK!);

export interface SupersetCheckInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateSupersetCheckSteps(input: SupersetCheckInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  // Pass arrayA as first arg so SetTracker builds the hash set from arrayA (the superset candidate).
  // arrayB is passed as second arg — it is the array we iterate during the subset check phase.
  const tracker = new SetTracker(arrayA, arrayB, SUPERSET_CHECK_LINE_MAP);
  tracker.setOperationLabel("A ⊇ B?");

  const hashSet = new Set<number>();

  tracker.initialize({ arrayA, arrayB });

  // Phase 1: build hash set from arrayA
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.addToSet(valueA, idxA, { idxA, valueA });
    hashSet.add(valueA);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: check each element of arrayB for membership in the hash set
  let isSuperset = true;
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    tracker.checkSubset(valueB, { idxB, valueB });

    if (hashSet.has(valueB)) {
      tracker.subsetPass(valueB, { idxB, valueB });
    } else {
      tracker.subsetFail(valueB, { idxB, valueB });
      isSuperset = false;
      break;
    }
  }

  tracker.completePredicate(isSuperset, { isSuperset });
  return tracker.getSteps();
}
