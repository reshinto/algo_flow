/** Step generator for Set Complement — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_COMPLEMENT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_COMPLEMENT!);

export interface SetComplementInput {
  arrayA: number[];
  universalSet: number[];
}

export function generateSetComplementSteps(input: SetComplementInput): ExecutionStep[] {
  const { arrayA, universalSet } = input;
  const tracker = new SetTracker(arrayA, universalSet, SET_COMPLEMENT_LINE_MAP);
  const hashSet = new Set<number>();

  tracker.setOperationLabel("Complement");
  tracker.initialize({ arrayA, universalSet });

  // Phase 1: build hash set from arrayA
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    tracker.addToSet(valueA, idxA, { idxA, valueA });
    hashSet.add(valueA);
  }

  tracker.startChecking({ hashSetSize: hashSet.size });

  // Phase 2: iterate universalSet, collect elements NOT in hashSet
  for (let idxU = 0; idxU < universalSet.length; idxU++) {
    const valueU = universalSet[idxU]!;
    tracker.checkMembership(valueU, idxU, { idxU, valueU });

    if (hashSet.has(valueU)) {
      // valueU is in A — skip it (not part of complement)
      tracker.skipElement(valueU, idxU, { idxU, valueU });
    } else {
      // valueU is not in A — add to complement result
      tracker.addToResult(valueU, idxU, { idxU, valueU });
    }
  }

  const complementSize = universalSet.length - hashSet.size;
  tracker.complete({ resultSize: complementSize });
  return tracker.getSteps();
}
