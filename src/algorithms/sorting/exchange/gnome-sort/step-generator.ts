/** Step generator for Gnome Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const GNOME_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GNOME_SORT!);

export function generateGnomeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], GNOME_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  let position = 0;

  while (position < arrayLength) {
    if (position === 0) {
      position++;
    } else {
      tracker.compare(position, position - 1, {
        position,
        arrayLength,
      });

      if (workingArray[position]! >= workingArray[position - 1]!) {
        position++;
      } else {
        const temporaryValue = workingArray[position]!;
        workingArray[position] = workingArray[position - 1]!;
        workingArray[position - 1] = temporaryValue;

        tracker.swap(position, position - 1, {
          position,
          sortedArray: [...workingArray],
        });

        position--;
      }
    }
  }

  // Mark all elements as sorted at completion
  for (let sortIndex = 0; sortIndex < arrayLength; sortIndex++) {
    tracker.markSorted(sortIndex, { sortIndex });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
