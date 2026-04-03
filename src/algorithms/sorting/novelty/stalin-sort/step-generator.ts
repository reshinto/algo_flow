/** Step generator for Stalin Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STALIN_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STALIN_SORT!);

export function generateStalinSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], STALIN_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ originalArray: [...workingArray], arrayLength });

  if (arrayLength === 0) {
    tracker.complete({ result: [], surviving: 0, eliminated: 0 });
    return tracker.getSteps();
  }

  const survivingIndices: number[] = [0];
  let currentMaximum = workingArray[0]!;
  let eliminatedCount = 0;

  // First element always survives — mark it
  tracker.markSorted(0, {
    scanIndex: 0,
    value: currentMaximum,
    status: "keep",
    currentMaximum,
  });

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    const candidateValue = workingArray[scanIndex]!;

    tracker.compare(scanIndex, 0, {
      scanIndex,
      candidateValue,
      currentMaximum,
      description: `Compare ${candidateValue} with current max ${currentMaximum}`,
    });

    if (candidateValue >= currentMaximum) {
      currentMaximum = candidateValue;
      survivingIndices.push(scanIndex);
      tracker.markSorted(scanIndex, {
        scanIndex,
        value: candidateValue,
        status: "keep",
        currentMaximum,
        survivingCount: survivingIndices.length,
      });
    } else {
      eliminatedCount++;
      // Eliminated elements stay in "default" state — no markSorted call
    }
  }

  tracker.complete({
    survivingElements: survivingIndices.map((idx) => workingArray[idx]),
    survivingCount: survivingIndices.length,
    eliminatedCount,
  });

  return tracker.getSteps();
}
