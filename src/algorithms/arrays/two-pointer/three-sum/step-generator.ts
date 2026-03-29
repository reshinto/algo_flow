/** Step generator for Three Sum — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.THREE_SUM!);

interface ThreeSumInput {
  inputArray: number[];
}

export function generateThreeSumSteps(input: ThreeSumInput): ExecutionStep[] {
  const { inputArray } = input;
  const sortedArray = [...inputArray].sort((valueA, valueB) => valueA - valueB);
  const arrayLength = sortedArray.length;
  const triplets: number[][] = [];

  const tracker = new ArrayTracker([...sortedArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    sortedArray: [...sortedArray],
    arrayLength,
    triplets: [],
  });

  if (arrayLength < 3) {
    tracker.complete({ triplets: [] });
    return tracker.getSteps();
  }

  for (let anchorIndex = 0; anchorIndex < arrayLength - 2; anchorIndex++) {
    const anchorValue = sortedArray[anchorIndex]!;

    // Skip duplicate anchors
    if (anchorIndex > 0 && anchorValue === sortedArray[anchorIndex - 1]) {
      tracker.markElement(
        anchorIndex,
        "eliminated",
        { anchorIndex, anchorValue, reason: "duplicate anchor", triplets: [...triplets] },
        `Skip duplicate anchor value ${anchorValue} at index ${anchorIndex}`,
      );
      continue;
    }

    tracker.visit(
      anchorIndex,
      { anchorIndex, anchorValue, triplets: [...triplets] },
      `Fix anchor element ${anchorValue} at index ${anchorIndex}, search for pairs summing to ${-anchorValue}`,
    );

    let leftPointer = anchorIndex + 1;
    let rightPointer = arrayLength - 1;

    while (leftPointer < rightPointer) {
      const leftValue = sortedArray[leftPointer]!;
      const rightValue = sortedArray[rightPointer]!;
      const currentSum = anchorValue + leftValue + rightValue;

      tracker.compareTwo(
        leftPointer,
        rightPointer,
        {
          anchorIndex,
          anchorValue,
          leftPointer,
          rightPointer,
          leftValue,
          rightValue,
          currentSum,
          triplets: [...triplets],
        },
        `Check ${anchorValue} + ${leftValue} + ${rightValue} = ${currentSum}`,
      );

      if (currentSum === 0) {
        triplets.push([anchorValue, leftValue, rightValue]);

        tracker.markElement(
          anchorIndex,
          "found",
          {
            anchorIndex,
            anchorValue,
            leftPointer,
            rightPointer,
            triplet: [anchorValue, leftValue, rightValue],
            triplets: [...triplets],
          },
          `Triplet found: [${anchorValue}, ${leftValue}, ${rightValue}]`,
        );

        // Skip duplicates at leftPointer
        while (
          leftPointer < rightPointer &&
          sortedArray[leftPointer] === sortedArray[leftPointer + 1]
        ) {
          leftPointer++;
        }
        // Skip duplicates at rightPointer
        while (
          leftPointer < rightPointer &&
          sortedArray[rightPointer] === sortedArray[rightPointer - 1]
        ) {
          rightPointer--;
        }
        leftPointer++;
        rightPointer--;
      } else if (currentSum < 0) {
        tracker.markElement(
          leftPointer,
          "eliminated",
          {
            anchorIndex,
            anchorValue,
            leftPointer,
            rightPointer,
            currentSum,
            action: "advance-left",
          },
          `Sum ${currentSum} < 0, advance left pointer from index ${leftPointer}`,
        );
        leftPointer++;
      } else {
        tracker.markElement(
          rightPointer,
          "eliminated",
          {
            anchorIndex,
            anchorValue,
            leftPointer,
            rightPointer,
            currentSum,
            action: "retreat-right",
          },
          `Sum ${currentSum} > 0, retreat right pointer from index ${rightPointer}`,
        );
        rightPointer--;
      }
    }
  }

  tracker.complete({ triplets: [...triplets] });

  return tracker.getSteps();
}
