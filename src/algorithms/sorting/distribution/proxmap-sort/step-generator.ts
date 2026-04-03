/** Step generator for Proxmap Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PROXMAP_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PROXMAP_SORT!);

export function generateProxmapSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], PROXMAP_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const maxValue = Math.max(...workingArray);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue,
  });

  if (minValue === maxValue) {
    for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
      tracker.markSorted(sortedIndex, { sortedIndex, value: workingArray[sortedIndex] });
    }
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const valueRange = maxValue - minValue;
  const scaleFactor = (arrayLength - 1) / valueRange;

  // Build proxmap
  const hitCount = new Array<number>(arrayLength).fill(0);
  for (let mapIndex = 0; mapIndex < arrayLength; mapIndex++) {
    const mappedPosition = Math.min(
      Math.floor(scaleFactor * (workingArray[mapIndex]! - minValue)),
      arrayLength - 1,
    );
    hitCount[mappedPosition]!++;
    tracker.compare(
      mapIndex,
      mappedPosition,
      {
        mapIndex,
        value: workingArray[mapIndex],
        mappedPosition,
        hitCount: [...hitCount],
      },
      `Mapping value ${String(workingArray[mapIndex]!)} to position ${String(mappedPosition)} in proxmap`,
    );
  }

  // Compute prefix sums (start positions)
  const startPosition = new Array<number>(arrayLength).fill(0);
  let runningTotal = 0;
  for (let posIndex = 0; posIndex < arrayLength; posIndex++) {
    startPosition[posIndex] = runningTotal;
    runningTotal += hitCount[posIndex]!;
  }

  // Insert elements into output array
  const outputArray = new Array<number>(arrayLength).fill(0);
  const nextSlot = [...startPosition];

  for (let insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
    const currentValue = workingArray[insertIndex]!;
    const mappedPosition = Math.min(
      Math.floor(scaleFactor * (currentValue - minValue)),
      arrayLength - 1,
    );
    let slotIndex = nextSlot[mappedPosition]!;

    while (
      slotIndex > startPosition[mappedPosition]! &&
      outputArray[slotIndex - 1]! > currentValue
    ) {
      tracker.compare(
        slotIndex,
        slotIndex - 1,
        {
          insertIndex,
          slotIndex,
          currentValue,
          displaced: outputArray[slotIndex - 1],
          mappedPosition,
        },
        `Inserting ${String(currentValue)}: shifting ${String(outputArray[slotIndex - 1]!)} right within cluster`,
      );
      outputArray[slotIndex] = outputArray[slotIndex - 1]!;
      tracker.swap(
        slotIndex,
        slotIndex - 1,
        { slotIndex, currentValue, sortedArray: [...outputArray] },
        `Shifting ${String(outputArray[slotIndex]!)} right at slot ${String(slotIndex)}`,
      );
      slotIndex--;
    }
    outputArray[slotIndex] = currentValue;
    nextSlot[mappedPosition]!++;

    tracker.compare(
      insertIndex,
      slotIndex,
      {
        insertIndex,
        slotIndex,
        currentValue,
        mappedPosition,
        outputSnapshot: [...outputArray],
      },
      `Placed ${String(currentValue)} at output slot ${String(slotIndex)}`,
    );
  }

  // Copy output back and mark sorted
  for (let copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
    workingArray[copyIndex] = outputArray[copyIndex]!;
    tracker.markSorted(copyIndex, {
      copyIndex,
      value: workingArray[copyIndex],
      sortedArray: [...workingArray],
    });
  }

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
