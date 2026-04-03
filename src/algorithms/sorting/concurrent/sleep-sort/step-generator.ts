/** Step generator for Sleep Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SLEEP_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SLEEP_SORT!);

export function generateSleepSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SLEEP_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ originalArray: [...workingArray], arrayLength });

  // Build schedule: indices sorted by value (simulating sleep delay proportional to value)
  const scheduleOrder = workingArray
    .map((value, index) => ({ value, index }))
    .sort((firstEntry, secondEntry) => firstEntry.value - secondEntry.value);

  // Show scheduling step — all elements are "scheduled" with delays = their values
  if (scheduleOrder.length > 0) {
    tracker.compare(scheduleOrder[0]!.index, scheduleOrder[scheduleOrder.length - 1]!.index, {
      description: "Schedule all elements — delay is proportional to value",
      minValue: scheduleOrder[0]!.value,
      maxValue: scheduleOrder[scheduleOrder.length - 1]!.value,
    });
  }

  // Simulate wake-ups in ascending value order
  const outputArray: number[] = [];
  for (let wakePosition = 0; wakePosition < arrayLength; wakePosition++) {
    const wakeEntry = scheduleOrder[wakePosition]!;

    // Show comparison with next sleeping element
    if (wakePosition + 1 < arrayLength) {
      const nextEntry = scheduleOrder[wakePosition + 1]!;
      tracker.compare(wakeEntry.index, nextEntry.index, {
        wakingElement: wakeEntry.value,
        nextSleepingElement: nextEntry.value,
        description: `Element ${wakeEntry.value} wakes up (delay=${wakeEntry.value}ms); ${nextEntry.value} still sleeping`,
      });
    }

    // Place the woken element into output position by direct assignment
    const targetPosition = wakePosition;
    workingArray[targetPosition] = wakeEntry.value;
    tracker.setElementValue(targetPosition, wakeEntry.value);
    tracker.swap(targetPosition, targetPosition, {
      wakingElement: wakeEntry.value,
      targetPosition,
      sortedArray: [...workingArray],
    });

    outputArray.push(wakeEntry.value);
    tracker.markSorted(targetPosition, {
      wakePosition,
      value: wakeEntry.value,
      outputSoFar: [...outputArray],
    });
  }

  tracker.complete({ result: outputArray });
  return tracker.getSteps();
}
