/** Step generator for Multiset Intersection — produces ExecutionStep[] using SetTracker. */

import type { ExecutionStep } from "@/types";
import { SetTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MULTISET_INTERSECTION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MULTISET_INTERSECTION!);

export interface MultisetIntersectionInput {
  arrayA: number[];
  arrayB: number[];
}

export function generateMultisetIntersectionSteps(
  input: MultisetIntersectionInput,
): ExecutionStep[] {
  const { arrayA, arrayB } = input;
  const tracker = new SetTracker(arrayA, arrayB, MULTISET_INTERSECTION_LINE_MAP);
  const countsA = new Map<number, number>();
  const countsB = new Map<number, number>();

  tracker.setOperationLabel("Multiset Intersection");
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

  // Phase 3: for each element in A, take min(countA, countB) copies
  let resultSize = 0;
  for (const [value, countA] of countsA) {
    const countB = countsB.get(value) ?? 0;
    const minCount = Math.min(countA, countB);
    tracker.compareCount(value, countA, countB, { value, countA, countB, minCount });
    for (let copyIdx = 0; copyIdx < minCount; copyIdx++) {
      tracker.addToResult(value, 0, { value, copyIdx: copyIdx + 1, minCount });
      resultSize++;
    }
  }

  tracker.complete({ resultSize });
  return tracker.getSteps();
}
