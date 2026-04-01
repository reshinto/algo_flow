/** Step generator for Hash-Based Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HASH_SEARCH!);

export function generateHashSearchSteps(input: {
  array: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.array];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "hash-based search");

  const hashMap = new Map<number, number>();

  tracker.initialize({
    array: workingArray,
    targetValue,
    arrayLength: workingArray.length,
  });

  // Build phase: visit each element and insert into the hash map
  for (let elementIndex = 0; elementIndex < workingArray.length; elementIndex++) {
    const elementValue = workingArray[elementIndex]!;
    hashMap.set(elementValue, elementIndex);

    tracker.visit(
      elementIndex,
      { current: elementIndex },
      {
        elementIndex,
        elementValue,
        targetValue,
        hashMapSize: hashMap.size,
      },
    );
  }

  // Search phase: O(1) lookup
  const resultIndex = hashMap.get(targetValue);
  const foundTarget = resultIndex !== undefined;

  tracker.compare(
    foundTarget ? resultIndex : 0,
    {},
    {
      targetValue,
      resultIndex: foundTarget ? resultIndex : -1,
      lookupResult: foundTarget ? `found at index ${resultIndex}` : "not found",
    },
    `Look up target ${targetValue} in hash map — ${foundTarget ? `found at index ${resultIndex}` : "not found"}`,
  );

  if (foundTarget) {
    tracker.found(resultIndex, {
      resultIndex,
      targetValue,
    });
  }

  tracker.complete({ resultIndex: foundTarget ? resultIndex : -1, targetValue }, foundTarget);
  return tracker.getSteps();
}
