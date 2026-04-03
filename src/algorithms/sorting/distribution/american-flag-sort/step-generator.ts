/** Step generator for American Flag Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const AMERICAN_FLAG_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.AMERICAN_FLAG_SORT!);

const DIGIT_BASE = 10;

export function generateAmericanFlagSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], AMERICAN_FLAG_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const offset = minValue < 0 ? -minValue : 0;
  const shiftedArray = workingArray.map((value) => value + offset);

  const maxValue = Math.max(...shiftedArray);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue: maxValue - offset,
    digitBase: DIGIT_BASE,
    offset,
  });

  if (arrayLength === 1) {
    tracker.markSorted(0, { sortedIndex: 0, value: workingArray[0] });
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  let digitDivisor = 1;
  while (Math.floor(maxValue / digitDivisor) >= DIGIT_BASE) {
    digitDivisor *= DIGIT_BASE;
  }

  flagPass(tracker, workingArray, shiftedArray, 0, arrayLength, digitDivisor, offset);

  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    tracker.markSorted(sortedIndex, {
      sortedIndex,
      value: workingArray[sortedIndex],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}

function flagPass(
  tracker: SortingTracker,
  workingArray: number[],
  shiftedArray: number[],
  start: number,
  end: number,
  divisor: number,
  offset: number,
): void {
  if (end - start <= 1 || divisor < 1) return;

  const counts = new Array<number>(DIGIT_BASE).fill(0);

  // Count digit frequencies
  for (let countIndex = start; countIndex < end; countIndex++) {
    const digit = Math.floor(shiftedArray[countIndex]! / divisor) % DIGIT_BASE;
    counts[digit]!++;
    tracker.compare(
      countIndex,
      countIndex,
      {
        countIndex,
        value: workingArray[countIndex],
        digit,
        divisor,
        counts: [...counts],
      },
      `Digit extraction: value ${String(workingArray[countIndex]!)} → digit ${String(digit)} (÷${String(divisor)})`,
    );
  }

  // Compute bucket offsets
  const offsets = new Array<number>(DIGIT_BASE).fill(0);
  offsets[0] = start;
  for (let offsetIndex = 1; offsetIndex < DIGIT_BASE; offsetIndex++) {
    offsets[offsetIndex] = offsets[offsetIndex - 1]! + counts[offsetIndex - 1]!;
  }
  const boundaries = [...offsets];

  // Permute in-place
  for (let bucketDigit = 0; bucketDigit < DIGIT_BASE; bucketDigit++) {
    const bucketEnd = boundaries[bucketDigit]! + counts[bucketDigit]!;

    while (offsets[bucketDigit]! < bucketEnd) {
      const currentPos = offsets[bucketDigit]!;
      const digit = Math.floor(shiftedArray[currentPos]! / divisor) % DIGIT_BASE;

      if (digit === bucketDigit) {
        offsets[bucketDigit]!++;
      } else {
        const swapTarget = offsets[digit]!;

        // Swap in shifted array
        const tempShifted = shiftedArray[currentPos]!;
        shiftedArray[currentPos] = shiftedArray[swapTarget]!;
        shiftedArray[swapTarget] = tempShifted;

        // Swap in working array
        const tempWorking = workingArray[currentPos]!;
        workingArray[currentPos] = workingArray[swapTarget]!;
        workingArray[swapTarget] = tempWorking;

        offsets[digit]!++;

        tracker.swap(
          currentPos,
          swapTarget,
          {
            currentPos,
            swapTarget,
            placedValue: workingArray[swapTarget],
            targetDigit: digit,
            sortedArray: [...workingArray],
          },
          `Placing ${String(workingArray[swapTarget]!)} into digit-${String(digit)} bucket at position ${String(swapTarget)}`,
        );
      }
    }
  }

  // Recurse on each bucket
  if (divisor > 1) {
    const nextDivisor = Math.floor(divisor / DIGIT_BASE);
    for (let recursiveDigit = 0; recursiveDigit < DIGIT_BASE; recursiveDigit++) {
      if (counts[recursiveDigit]! > 1) {
        flagPass(
          tracker,
          workingArray,
          shiftedArray,
          boundaries[recursiveDigit]!,
          boundaries[recursiveDigit]! + counts[recursiveDigit]!,
          nextDivisor,
          offset,
        );
      }
    }
  }
}
