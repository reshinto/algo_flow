/** Step generator for Pigeonhole Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PIGEONHOLE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PIGEONHOLE_SORT!);

export function generatePigeonholeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], PIGEONHOLE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const maxValue = Math.max(...workingArray);
  const holeCount = maxValue - minValue + 1;
  const holes = new Array<number>(holeCount).fill(0);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue,
    holeCount,
  });

  // Place phase — compare() shows each element being assigned to its pigeonhole
  for (let placeIndex = 0; placeIndex < arrayLength; placeIndex++) {
    const holePosition = workingArray[placeIndex]! - minValue;
    holes[holePosition]!++;
    tracker.compare(
      placeIndex,
      placeIndex,
      {
        placeIndex,
        value: workingArray[placeIndex],
        holePosition,
        holeCount: holes[holePosition],
      },
      `Placing value ${String(workingArray[placeIndex]!)} into hole ${String(holePosition)} (count now ${String(holes[holePosition]!)})`,
    );
  }

  // Collect phase — swap() shows each value being written back from its hole
  let writeIndex = 0;
  for (let holeIndex = 0; holeIndex < holeCount; holeIndex++) {
    while (holes[holeIndex]! > 0) {
      const collectedValue = holeIndex + minValue;
      const targetIndex = writeIndex;
      workingArray[writeIndex] = collectedValue;
      holes[holeIndex]!--;
      writeIndex++;
      tracker.swap(
        targetIndex,
        targetIndex,
        {
          holeIndex,
          collectedValue,
          targetIndex,
          remaining: holes[holeIndex],
          sortedArray: [...workingArray],
        },
        `Collecting from hole ${String(holeIndex)}: placing value ${String(collectedValue)} at position ${String(targetIndex)}`,
      );
    }
  }

  // Mark all elements sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      value: workingArray[sortedIndex],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
