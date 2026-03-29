/** Step generator for Four Sum — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FOUR_SUM!);

interface FourSumInput {
  inputArray: number[];
  target: number;
}

export function generateFourSumSteps(input: FourSumInput): ExecutionStep[] {
  const { inputArray, target } = input;
  const sortedArray = [...inputArray].sort((valueA, valueB) => valueA - valueB);
  const arrayLength = sortedArray.length;
  const quadruplets: number[][] = [];

  const tracker = new ArrayTracker([...sortedArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    sortedArray: [...sortedArray],
    arrayLength,
    target,
    quadruplets: [],
  });

  if (arrayLength < 4) {
    tracker.complete({ quadruplets: [] });
    return tracker.getSteps();
  }

  for (let firstIndex = 0; firstIndex < arrayLength - 3; firstIndex++) {
    const firstValue = sortedArray[firstIndex]!;

    // Skip duplicate first values
    if (firstIndex > 0 && firstValue === sortedArray[firstIndex - 1]) {
      tracker.markElement(
        firstIndex,
        "eliminated",
        { firstIndex, firstValue, reason: "duplicate first", quadruplets: [...quadruplets] },
        `Skip duplicate first value ${firstValue} at index ${firstIndex}`,
      );
      continue;
    }

    tracker.visit(
      firstIndex,
      { firstIndex, firstValue, target, quadruplets: [...quadruplets] },
      `Fix first element ${firstValue} at index ${firstIndex}`,
    );

    for (let secondIndex = firstIndex + 1; secondIndex < arrayLength - 2; secondIndex++) {
      const secondValue = sortedArray[secondIndex]!;

      // Skip duplicate second values
      if (secondIndex > firstIndex + 1 && secondValue === sortedArray[secondIndex - 1]) {
        tracker.markElement(
          secondIndex,
          "eliminated",
          {
            firstIndex,
            secondIndex,
            secondValue,
            reason: "duplicate second",
            quadruplets: [...quadruplets],
          },
          `Skip duplicate second value ${secondValue} at index ${secondIndex}`,
        );
        continue;
      }

      tracker.visit(
        secondIndex,
        { firstIndex, firstValue, secondIndex, secondValue, target, quadruplets: [...quadruplets] },
        `Fix second element ${secondValue} at index ${secondIndex}, searching for pairs summing to ${target - firstValue - secondValue}`,
      );

      let leftPointer = secondIndex + 1;
      let rightPointer = arrayLength - 1;

      while (leftPointer < rightPointer) {
        const leftValue = sortedArray[leftPointer]!;
        const rightValue = sortedArray[rightPointer]!;
        const currentSum = firstValue + secondValue + leftValue + rightValue;

        tracker.compareTwo(
          leftPointer,
          rightPointer,
          {
            firstIndex,
            firstValue,
            secondIndex,
            secondValue,
            leftPointer,
            rightPointer,
            leftValue,
            rightValue,
            currentSum,
            target,
            quadruplets: [...quadruplets],
          },
          `Check ${firstValue} + ${secondValue} + ${leftValue} + ${rightValue} = ${currentSum} (target: ${target})`,
        );

        if (currentSum === target) {
          quadruplets.push([firstValue, secondValue, leftValue, rightValue]);

          tracker.markElement(
            leftPointer,
            "found",
            {
              firstIndex,
              secondIndex,
              leftPointer,
              rightPointer,
              quadruplet: [firstValue, secondValue, leftValue, rightValue],
              quadruplets: [...quadruplets],
            },
            `Quadruplet found: [${firstValue}, ${secondValue}, ${leftValue}, ${rightValue}]`,
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
        } else if (currentSum < target) {
          tracker.markElement(
            leftPointer,
            "eliminated",
            {
              firstIndex,
              secondIndex,
              leftPointer,
              rightPointer,
              currentSum,
              target,
              action: "advance-left",
            },
            `Sum ${currentSum} < target ${target}, advance left pointer from index ${leftPointer}`,
          );
          leftPointer++;
        } else {
          tracker.markElement(
            rightPointer,
            "eliminated",
            {
              firstIndex,
              secondIndex,
              leftPointer,
              rightPointer,
              currentSum,
              target,
              action: "retreat-right",
            },
            `Sum ${currentSum} > target ${target}, retreat right pointer from index ${rightPointer}`,
          );
          rightPointer--;
        }
      }
    }
  }

  tracker.complete({ quadruplets: [...quadruplets] });

  return tracker.getSteps();
}
