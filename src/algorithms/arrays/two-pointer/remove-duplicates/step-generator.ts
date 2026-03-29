/** Step generator for Remove Duplicates (Sorted) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REMOVE_DUPLICATES!);

interface RemoveDuplicatesInput {
  sortedArray: number[];
}

export function generateRemoveDuplicatesSteps(input: RemoveDuplicatesInput): ExecutionStep[] {
  const { sortedArray } = input;

  const tracker = new ArrayTracker([...sortedArray], LINE_MAP);

  tracker.initialize({
    sortedArray: [...sortedArray],
    arrayLength: sortedArray.length,
    writePointer: 0,
  });

  if (sortedArray.length === 0) {
    tracker.complete({ uniqueCount: 0, result: [] });
    return tracker.getSteps();
  }

  const workArray = [...sortedArray];
  let writePointer = 0;

  tracker.markElement(
    0,
    "sorted",
    { writePointer: 0, placedValue: workArray[0] },
    `First element ${workArray[0]} is always unique`,
  );

  for (let readPointer = 1; readPointer < workArray.length; readPointer++) {
    const readValue = workArray[readPointer]!;
    const writeValue = workArray[writePointer]!;

    tracker.compareTwo(
      writePointer,
      readPointer,
      {
        writePointer,
        readPointer,
        writeValue,
        readValue,
        isDuplicate: readValue === writeValue,
      },
      `Compare read[${readPointer}]=${readValue} with write[${writePointer}]=${writeValue} — ${readValue === writeValue ? "duplicate, skip" : "new unique value"}`,
    );

    if (readValue !== writeValue) {
      writePointer++;
      workArray[writePointer] = readValue;

      tracker.markElement(
        writePointer,
        "sorted",
        {
          writePointer,
          readPointer,
          placedValue: readValue,
          uniqueCountSoFar: writePointer + 1,
        },
        `New unique value ${readValue} placed at position ${writePointer}`,
      );
    }
  }

  const uniqueCount = writePointer + 1;

  tracker.complete({
    uniqueCount,
    result: workArray.slice(0, uniqueCount),
  });

  return tracker.getSteps();
}
