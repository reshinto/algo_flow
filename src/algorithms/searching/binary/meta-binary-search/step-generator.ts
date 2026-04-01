/** Step generator for Meta Binary Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.META_BINARY_SEARCH!);

export function generateMetaBinarySearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "meta binary search");

  const arrayLength = workingArray.length;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    arrayLength,
  });

  if (arrayLength === 0) {
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  const bitCount = Math.floor(Math.log2(arrayLength));
  let position = 0;

  for (let bitIndex = bitCount; bitIndex >= 0; bitIndex--) {
    const newPosition = position | (1 << bitIndex);

    if (newPosition < arrayLength) {
      const candidateValue = workingArray[newPosition]!;

      tracker.compare(
        newPosition,
        { position, newPosition },
        {
          bitIndex,
          position,
          newPosition,
          candidateValue,
          targetValue,
        },
        `Bit ${bitIndex}: newPosition=${newPosition}, arr[${newPosition}]=${candidateValue} vs target ${targetValue}`,
      );

      if (candidateValue <= targetValue) {
        const previousPosition = position;
        position = newPosition;

        tracker.eliminate(
          previousPosition,
          newPosition - 1 > previousPosition ? newPosition - 1 : previousPosition,
          { position },
          {
            bitIndex,
            position,
            newPosition,
            candidateValue,
          },
          `arr[${newPosition}]=${candidateValue} <= ${targetValue}, set position=${newPosition}`,
        );
      }
    }
  }

  if (workingArray[position] === targetValue) {
    tracker.found(position, {
      position,
      resultIndex: position,
      targetValue,
    });
    tracker.complete({ resultIndex: position, targetValue }, true);
  } else {
    tracker.complete({ resultIndex: -1, targetValue }, false);
  }

  return tracker.getSteps();
}
