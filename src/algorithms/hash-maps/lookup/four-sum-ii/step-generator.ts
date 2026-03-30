/** Step generator for Four Sum II — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FOUR_SUM_II_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FOUR_SUM_II!);

export interface FourSumIIInput {
  numsA: number[];
  numsB: number[];
  numsC: number[];
  numsD: number[];
}

export function generateFourSumIISteps(input: FourSumIIInput): ExecutionStep[] {
  const { numsA, numsB, numsC, numsD } = input;
  const allNums = [...numsA, ...numsB, ...numsC, ...numsD];
  const tracker = new HashMapTracker(allNums, FOUR_SUM_II_LINE_MAP, {
    secondaryInput: [...numsC, ...numsD],
  });
  const pairSumCounts = new Map<number, number>();

  tracker.initialize({ numsA, numsB, numsC, numsD });
  tracker.setPhase("phase1");

  // Phase 1: build map of all A+B pair sums
  for (let outerIndex = 0; outerIndex < numsA.length; outerIndex++) {
    for (let innerIndex = 0; innerIndex < numsB.length; innerIndex++) {
      const pairSum = numsA[outerIndex]! + numsB[innerIndex]!;
      tracker.processElement(outerIndex, {
        outerIndex,
        innerIndex,
        aVal: numsA[outerIndex],
        bVal: numsB[innerIndex],
        pairSum,
      });

      if (pairSumCounts.has(pairSum)) {
        const currentCount = pairSumCounts.get(pairSum)!;
        pairSumCounts.set(pairSum, currentCount + 1);
        tracker.incrementCount(String(pairSum), {
          pairSum,
          newCount: currentCount + 1,
        });
      } else {
        pairSumCounts.set(pairSum, 1);
        tracker.insertKey(String(pairSum), "1", { pairSum });
      }
    }
  }

  tracker.setPhase("phase2");
  let tupleCount = 0;

  // Phase 2: for each C+D pair, check if complement exists
  for (let outerIndex = 0; outerIndex < numsC.length; outerIndex++) {
    for (let innerIndex = 0; innerIndex < numsD.length; innerIndex++) {
      const complement = -(numsC[outerIndex]! + numsD[innerIndex]!);
      tracker.processSecondaryElement(outerIndex, {
        outerIndex,
        innerIndex,
        cVal: numsC[outerIndex],
        dVal: numsD[innerIndex],
        complement,
      });
      tracker.lookupKey(String(complement), { complement });

      if (pairSumCounts.has(complement)) {
        const foundCount = pairSumCounts.get(complement)!;
        tupleCount += foundCount;
        tracker.keyFound(String(complement), 0, outerIndex, {
          complement,
          foundCount,
          tupleCount,
        });
        tracker.setResult(tupleCount);
      } else {
        tracker.keyNotFound(String(complement), { complement });
      }
    }
  }

  tracker.complete({ result: tupleCount });
  return tracker.getSteps();
}
