/** Step generator for Multiset Union — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MULTISET_UNION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MULTISET_UNION!);

export interface MultisetUnionInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateMultisetUnionSteps(input: MultisetUnionInput): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, MULTISET_UNION_LINE_MAP);
  const countsA = new Map<number, number>();
  const countsB = new Map<number, number>();

  tracker.setOperationLabel("Multiset Union");
  tracker.initialize({ arrayA, arrayB });

  // Phase 1: count frequencies in arrayA
  for (let idxA = 0; idxA < arrayA.length; idxA++) {
    const valueA = arrayA[idxA]!;
    countsA.set(valueA, (countsA.get(valueA) ?? 0) + 1);
    const currentCount = countsA.get(valueA)!;
    tracker.countElement(valueA, currentCount, idxA, { idxA, valueA, countA: currentCount });
  }

  tracker.startChecking({ uniqueInA: countsA.size });

  // Phase 2: count frequencies in arrayB
  for (let idxB = 0; idxB < arrayB.length; idxB++) {
    const valueB = arrayB[idxB]!;
    countsB.set(valueB, (countsB.get(valueB) ?? 0) + 1);
    const currentCount = countsB.get(valueB)!;
    tracker.countElement(valueB, currentCount, idxB, { idxB, valueB, countB: currentCount });
  }

  // Phase 3: for each unique element take max(countA, countB) copies
  const allKeys = new Set([...countsA.keys(), ...countsB.keys()]);
  let resultSize = 0;
  for (const value of allKeys) {
    const countA = countsA.get(value) ?? 0;
    const countB = countsB.get(value) ?? 0;
    const maxCount = Math.max(countA, countB);
    tracker.compareCount(value, countA, countB, { value, countA, countB, maxCount });
    for (let copyIdx = 0; copyIdx < maxCount; copyIdx++) {
      tracker.addToResult(value, 0, { value, copyIdx: copyIdx + 1, maxCount });
      resultSize++;
    }
  }

  tracker.complete({ resultSize });
  return tracker.getSteps();
}
