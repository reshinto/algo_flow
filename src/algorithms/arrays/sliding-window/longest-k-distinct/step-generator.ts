/** Step generator for Longest K-Distinct — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LONGEST_K_DISTINCT!);

interface LongestKDistinctInput {
  inputArray: number[];
  maxDistinct: number;
}

export function generateLongestKDistinctSteps(input: LongestKDistinctInput): ExecutionStep[] {
  const { inputArray, maxDistinct } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (arrayLength === 0 || maxDistinct <= 0) {
    tracker.initialize({ arrayLength, maxDistinct });
    tracker.complete({ maxLength: 0, startIndex: 0 });
    return tracker.getSteps();
  }

  const frequencyMap = new Map<number, number>();
  let windowStart = 0;
  let maxLength = 0;
  let bestStart = 0;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    maxDistinct,
  });

  for (let windowEnd = 0; windowEnd < arrayLength; windowEnd++) {
    const incomingElement = inputArray[windowEnd]!;
    frequencyMap.set(incomingElement, (frequencyMap.get(incomingElement) ?? 0) + 1);

    tracker.expandWindow(
      {
        addedElement: incomingElement,
        addedIndex: windowEnd,
        distinctCount: frequencyMap.size,
        frequencyMap: Object.fromEntries(frequencyMap),
      },
      `Expand window: add ${incomingElement} at index ${windowEnd}, distinct count = ${frequencyMap.size}`,
    );

    // Shrink while distinct > maxDistinct
    while (frequencyMap.size > maxDistinct) {
      const outgoingElement = inputArray[windowStart]!;
      const outgoingCount = frequencyMap.get(outgoingElement)! - 1;
      if (outgoingCount === 0) {
        frequencyMap.delete(outgoingElement);
      } else {
        frequencyMap.set(outgoingElement, outgoingCount);
      }
      windowStart++;

      tracker.shrinkWindow(
        {
          removedElement: outgoingElement,
          windowStart,
          distinctCount: frequencyMap.size,
          frequencyMap: Object.fromEntries(frequencyMap),
        },
        `Shrink window: remove ${outgoingElement}, new start = ${windowStart}, distinct = ${frequencyMap.size}`,
      );
    }

    const currentLength = windowEnd - windowStart + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      bestStart = windowStart;
    }

    tracker.visit(
      windowEnd,
      {
        windowStart,
        windowEnd,
        currentLength,
        maxLength,
        bestStart,
        distinctCount: frequencyMap.size,
      },
      `Window [${windowStart}, ${windowEnd}], length ${currentLength}, max = ${maxLength}`,
    );
  }

  tracker.complete({ maxLength, startIndex: bestStart });

  return tracker.getSteps();
}
