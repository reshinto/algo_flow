/** Step generator for Find All Duplicates — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_ALL_DUPLICATES!);

interface FindAllDuplicatesInput {
  inputArray: number[];
}

export function generateFindAllDuplicatesSteps(input: FindAllDuplicatesInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    duplicates: [],
  });

  if (inputArray.length === 0) {
    tracker.complete({ duplicates: [] });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  const duplicates: number[] = [];

  for (let scanIndex = 0; scanIndex < workArray.length; scanIndex++) {
    const absoluteValue = Math.abs(workArray[scanIndex]!);
    const mappedIndex = absoluteValue - 1;

    tracker.compareTwo(
      scanIndex,
      mappedIndex,
      {
        scanIndex,
        currentValue: workArray[scanIndex],
        absoluteValue,
        mappedIndex,
        signAtMapped: workArray[mappedIndex]! < 0 ? "negative" : "positive",
        duplicatesSoFar: [...duplicates],
      },
      `Check arr[${scanIndex}]=${workArray[scanIndex]}: map to index ${mappedIndex}, sign is ${workArray[mappedIndex]! < 0 ? "negative (duplicate!)" : "positive (first visit)"}`,
    );

    if (workArray[mappedIndex]! < 0) {
      duplicates.push(absoluteValue);

      tracker.markElement(
        scanIndex,
        "found",
        {
          scanIndex,
          duplicateValue: absoluteValue,
          duplicates: [...duplicates],
        },
        `Duplicate found: ${absoluteValue} (arr[${mappedIndex}] was already negative)`,
        "compare",
      );
    } else {
      workArray[mappedIndex] = -workArray[mappedIndex]!;

      tracker.markElement(
        mappedIndex,
        "comparing",
        {
          scanIndex,
          mappedIndex,
          negatedValue: workArray[mappedIndex],
          duplicatesSoFar: [...duplicates],
        },
        `First visit of ${absoluteValue}: negate arr[${mappedIndex}] to ${workArray[mappedIndex]}`,
        "swap",
      );
    }
  }

  tracker.complete({ duplicates });

  return tracker.getSteps();
}
