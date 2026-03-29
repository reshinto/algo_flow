/** Step generator for Count Anagram Windows — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNT_ANAGRAM_WINDOWS!);

interface CountAnagramWindowsInput {
  text: number[];
  pattern: number[];
}

export function generateCountAnagramWindowsSteps(input: CountAnagramWindowsInput): ExecutionStep[] {
  const { text, pattern } = input;
  const patternLength = pattern.length;
  const textLength = text.length;

  const tracker = new ArrayTracker([...text], LINE_MAP);

  if (patternLength === 0 || patternLength > textLength) {
    tracker.initialize({ textLength, patternLength });
    tracker.complete({ count: 0, positions: [] });
    return tracker.getSteps();
  }

  const patternFrequency = new Map<number, number>();
  const windowFrequency = new Map<number, number>();
  const positions: number[] = [];

  for (const patternElement of pattern) {
    patternFrequency.set(patternElement, (patternFrequency.get(patternElement) ?? 0) + 1);
  }

  tracker.initialize({
    text: [...text],
    pattern: [...pattern],
    patternLength,
    textLength,
    patternFrequency: Object.fromEntries(patternFrequency),
  });

  // Build initial window
  for (let initIndex = 0; initIndex < patternLength; initIndex++) {
    const currentElement = text[initIndex]!;
    windowFrequency.set(currentElement, (windowFrequency.get(currentElement) ?? 0) + 1);
  }

  tracker.moveWindow(
    0,
    patternLength - 1,
    {
      windowStart: 0,
      windowEnd: patternLength - 1,
      windowFrequency: Object.fromEntries(windowFrequency),
    },
    `Build initial window [0, ${patternLength - 1}]`,
  );

  const mapsAreEqual = (mapA: Map<number, number>, mapB: Map<number, number>): boolean => {
    if (mapA.size !== mapB.size) return false;
    for (const [key, value] of mapA) {
      if (mapB.get(key) !== value) return false;
    }
    return true;
  };

  const isMatch = mapsAreEqual(patternFrequency, windowFrequency);
  if (isMatch) positions.push(0);

  tracker.compareTwo(
    0,
    patternLength - 1,
    {
      windowStart: 0,
      windowEnd: patternLength - 1,
      isAnagram: isMatch,
      count: positions.length,
      positions: [...positions],
    },
    `Check window [0, ${patternLength - 1}]: ${isMatch ? "anagram found!" : "not an anagram"}`,
  );

  // Slide window
  for (let rightIndex = patternLength; rightIndex < textLength; rightIndex++) {
    const leftIndex = rightIndex - patternLength;
    const outgoingElement = text[leftIndex]!;
    const incomingElement = text[rightIndex]!;

    // Remove outgoing element
    const outgoingCount = windowFrequency.get(outgoingElement)! - 1;
    if (outgoingCount === 0) {
      windowFrequency.delete(outgoingElement);
    } else {
      windowFrequency.set(outgoingElement, outgoingCount);
    }

    tracker.shrinkWindow(
      {
        removedElement: outgoingElement,
        removedIndex: leftIndex,
        windowFrequency: Object.fromEntries(windowFrequency),
      },
      `Remove element ${outgoingElement} at index ${leftIndex}`,
    );

    // Add incoming element
    windowFrequency.set(incomingElement, (windowFrequency.get(incomingElement) ?? 0) + 1);

    tracker.expandWindow(
      {
        addedElement: incomingElement,
        addedIndex: rightIndex,
        windowFrequency: Object.fromEntries(windowFrequency),
      },
      `Add element ${incomingElement} at index ${rightIndex}`,
    );

    const windowStart = leftIndex + 1;
    const windowEnd = rightIndex;
    const windowMatch = mapsAreEqual(patternFrequency, windowFrequency);
    if (windowMatch) positions.push(windowStart);

    tracker.compareTwo(
      windowStart,
      windowEnd,
      {
        windowStart,
        windowEnd,
        isAnagram: windowMatch,
        count: positions.length,
        positions: [...positions],
      },
      `Check window [${windowStart}, ${windowEnd}]: ${windowMatch ? "anagram found!" : "not an anagram"}`,
    );
  }

  tracker.complete({
    count: positions.length,
    positions: [...positions],
  });

  return tracker.getSteps();
}
