/** Step generator for Sentinel Linear Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SENTINEL_LINEAR_SEARCH!);

export function generateSentinelLinearSearchSteps(input: {
  array: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.array];
  const { targetValue } = input;
  const tracker = new SearchingTracker(
    workingArray,
    targetValue,
    LINE_MAP,
    "sentinel linear search",
  );

  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ array: workingArray, targetValue, arrayLength });
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  const lastElement = workingArray[arrayLength - 1]!;

  tracker.initialize({
    array: [...workingArray],
    targetValue,
    arrayLength,
    lastElement,
    sentinelPlaced: true,
  });

  // Simulate the sentinel-augmented scan
  let currentIndex = 0;
  let foundTarget = false;
  let foundIndex = -1;

  // Scan until we find targetValue (sentinel guarantees termination)
  while (currentIndex < arrayLength) {
    const scannedValue =
      currentIndex === arrayLength - 1 ? lastElement : workingArray[currentIndex]!;

    tracker.visit(
      currentIndex,
      { current: currentIndex },
      { currentIndex, scannedValue, targetValue, arrayLength },
    );

    tracker.compare(
      currentIndex,
      { current: currentIndex },
      { currentIndex, scannedValue, targetValue, arrayLength },
      `Compare element at index ${currentIndex} (value: ${scannedValue}) with target ${targetValue}`,
    );

    if (scannedValue === targetValue) {
      // Found a match — now check validity
      if (currentIndex < arrayLength - 1) {
        // Found before sentinel position — genuine match
        foundIndex = currentIndex;
        tracker.found(currentIndex, { currentIndex, resultIndex: currentIndex });
        foundTarget = true;
      } else {
        // Reached sentinel position — check if last element is the target
        if (lastElement === targetValue) {
          foundIndex = currentIndex;
          tracker.found(currentIndex, { currentIndex, resultIndex: currentIndex });
          foundTarget = true;
        }
        // Otherwise it was only the sentinel — not a genuine match
      }
      break;
    }

    currentIndex++;
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
