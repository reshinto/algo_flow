/** Step generator for Merge Two Sorted Arrays — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_SORTED_ARRAYS!);

interface MergeSortedArraysInput {
  firstArray: number[];
  secondArray: number[];
}

export function generateMergeSortedArraysSteps(input: MergeSortedArraysInput): ExecutionStep[] {
  const { firstArray, secondArray } = input;

  /* Primary array is a visual concatenation of both inputs separated by a sentinel gap value */
  const combinedArray = [...firstArray, ...secondArray];
  const tracker = new ArrayTracker(combinedArray, LINE_MAP);

  /* Initialize secondary array as empty merged result */
  tracker.setSecondaryArray([], "Merged Result");

  tracker.initialize({
    firstArray: [...firstArray],
    secondArray: [...secondArray],
    firstLength: firstArray.length,
    secondLength: secondArray.length,
  });

  let firstPointer = 0;
  let secondPointer = 0;
  const mergedResult: number[] = [];

  while (firstPointer < firstArray.length && secondPointer < secondArray.length) {
    const firstValue = firstArray[firstPointer]!;
    const secondValue = secondArray[secondPointer]!;

    /* secondPointer indexes into combined array with offset */
    const secondCombinedIndex = firstArray.length + secondPointer;

    tracker.compareTwo(
      firstPointer,
      secondCombinedIndex,
      {
        firstPointer,
        secondPointer,
        mergedIndex: mergedResult.length,
        comparison: `${firstValue} vs ${secondValue}`,
      },
      `Compare firstArray[${firstPointer}]=${firstValue} with secondArray[${secondPointer}]=${secondValue}`,
    );

    if (firstValue <= secondValue) {
      mergedResult.push(firstValue);
      tracker.updateSecondaryElement(mergedResult.length - 1, firstValue, "sorted");
      tracker.visit(
        firstPointer,
        {
          firstPointer,
          secondPointer,
          mergedIndex: mergedResult.length - 1,
          placedValue: firstValue,
          fromArray: "first",
        },
        `Place ${firstValue} from firstArray into merged result at index ${mergedResult.length - 1}`,
      );
      firstPointer++;
    } else {
      mergedResult.push(secondValue);
      tracker.updateSecondaryElement(mergedResult.length - 1, secondValue, "sorted");
      tracker.visit(
        secondCombinedIndex,
        {
          firstPointer,
          secondPointer,
          mergedIndex: mergedResult.length - 1,
          placedValue: secondValue,
          fromArray: "second",
        },
        `Place ${secondValue} from secondArray into merged result at index ${mergedResult.length - 1}`,
      );
      secondPointer++;
    }
  }

  /* Drain remaining elements from firstArray */
  while (firstPointer < firstArray.length) {
    const remainingValue = firstArray[firstPointer]!;
    mergedResult.push(remainingValue);
    tracker.updateSecondaryElement(mergedResult.length - 1, remainingValue, "sorted");
    tracker.visit(
      firstPointer,
      {
        firstPointer,
        secondPointer,
        mergedIndex: mergedResult.length - 1,
        placedValue: remainingValue,
        fromArray: "first",
        draining: true,
      },
      `Drain remaining ${remainingValue} from firstArray`,
    );
    firstPointer++;
  }

  /* Drain remaining elements from secondArray */
  while (secondPointer < secondArray.length) {
    const remainingValue = secondArray[secondPointer]!;
    const secondCombinedIndex = firstArray.length + secondPointer;
    mergedResult.push(remainingValue);
    tracker.updateSecondaryElement(mergedResult.length - 1, remainingValue, "sorted");
    tracker.visit(
      secondCombinedIndex,
      {
        firstPointer,
        secondPointer,
        mergedIndex: mergedResult.length - 1,
        placedValue: remainingValue,
        fromArray: "second",
        draining: true,
      },
      `Drain remaining ${remainingValue} from secondArray`,
    );
    secondPointer++;
  }

  tracker.complete({
    mergedResult: [...mergedResult],
    totalLength: mergedResult.length,
  });

  return tracker.getSteps();
}
