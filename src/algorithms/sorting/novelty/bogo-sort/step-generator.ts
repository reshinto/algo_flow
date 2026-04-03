/** Step generator for Bogo Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BOGO_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BOGO_SORT!);

const MAX_ITERATIONS = 100;

/** Seeded linear congruential generator — same parameters as source file. */
function createSeededPrng(initialSeed: number): () => number {
  let seed = initialSeed;
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed;
  };
}

function isSortedArray(array: number[]): boolean {
  for (let checkIndex = 0; checkIndex + 1 < array.length; checkIndex++) {
    if (array[checkIndex]! > array[checkIndex + 1]!) return false;
  }
  return true;
}

export function generateBogoSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BOGO_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;
  const nextRandom = createSeededPrng(42);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    maxIterations: MAX_ITERATIONS,
  });

  let iterationCount = 0;

  while (!isSortedArray(workingArray) && iterationCount < MAX_ITERATIONS) {
    // Show check-sorted comparisons
    for (let checkIndex = 0; checkIndex + 1 < arrayLength; checkIndex++) {
      tracker.compare(checkIndex, checkIndex + 1, {
        checkIndex,
        iterationCount,
        isSorted: workingArray[checkIndex]! <= workingArray[checkIndex + 1]!,
      });
      if (workingArray[checkIndex]! > workingArray[checkIndex + 1]!) break;
    }

    // Shuffle using Fisher-Yates with seeded PRNG
    for (let shuffleIndex = arrayLength - 1; shuffleIndex > 0; shuffleIndex--) {
      const swapTarget = nextRandom() % (shuffleIndex + 1);

      if (shuffleIndex !== swapTarget) {
        const temporaryValue = workingArray[shuffleIndex]!;
        workingArray[shuffleIndex] = workingArray[swapTarget]!;
        workingArray[swapTarget] = temporaryValue;

        tracker.swap(shuffleIndex, swapTarget, {
          shuffleIndex,
          swapTarget,
          iterationCount,
          sortedArray: [...workingArray],
        });
      }
    }

    iterationCount++;
  }

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, { sortedIndex, totalIterations: iterationCount });
  }

  tracker.complete({ result: [...workingArray], totalIterations: iterationCount });
  return tracker.getSteps();
}
