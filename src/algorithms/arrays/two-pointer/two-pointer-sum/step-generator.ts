/** Step generator for Two Sum (Sorted Array) — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TWO_POINTER_SUM!);

interface TwoPointerSumInput {
  sortedArray: number[];
  target: number;
}

export function generateTwoPointerSumSteps(input: TwoPointerSumInput): ExecutionStep[] {
  const { sortedArray, target } = input;

  const tracker = new ArrayTracker([...sortedArray], LINE_MAP);

  tracker.initialize({
    sortedArray: [...sortedArray],
    arrayLength: sortedArray.length,
    leftPointer: 0,
    rightPointer: sortedArray.length - 1,
    target,
  });

  let leftPointer = 0;
  let rightPointer = sortedArray.length - 1;

  while (leftPointer < rightPointer) {
    const leftValue = sortedArray[leftPointer]!;
    const rightValue = sortedArray[rightPointer]!;
    const currentSum = leftValue + rightValue;

    tracker.visit(leftPointer, {
      leftPointer,
      rightPointer,
      leftValue,
      rightValue,
      currentSum,
      target,
    });

    tracker.compareTwo(
      leftPointer,
      rightPointer,
      {
        leftPointer,
        rightPointer,
        leftValue,
        rightValue,
        currentSum,
        target,
        action:
          currentSum === target ? "found" : currentSum < target ? "advance-left" : "retreat-right",
      },
      `Sum of ${leftValue} + ${rightValue} = ${currentSum} — ${
        currentSum === target
          ? `equals target ${target}, pair found!`
          : currentSum < target
            ? `less than target ${target}, advance left pointer`
            : `greater than target ${target}, retreat right pointer`
      }`,
    );

    if (currentSum === target) {
      tracker.markElement(
        leftPointer,
        "found",
        { leftPointer, rightPointer, currentSum, target },
        `Left index ${leftPointer} is part of the pair`,
      );
      tracker.markElement(
        rightPointer,
        "found",
        { leftPointer, rightPointer, currentSum, target },
        `Right index ${rightPointer} is part of the pair`,
      );
      tracker.complete({ found: true, leftIndex: leftPointer, rightIndex: rightPointer });
      return tracker.getSteps();
    } else if (currentSum < target) {
      tracker.markElement(
        leftPointer,
        "eliminated",
        { leftPointer, rightPointer, currentSum, target, action: "advance-left" },
        `Element ${leftValue} at index ${leftPointer} cannot be part of a valid pair, advancing left pointer`,
      );
      leftPointer++;
    } else {
      tracker.markElement(
        rightPointer,
        "eliminated",
        { leftPointer, rightPointer, currentSum, target, action: "retreat-right" },
        `Element ${rightValue} at index ${rightPointer} cannot be part of a valid pair, retreating right pointer`,
      );
      rightPointer--;
    }
  }

  tracker.complete({ found: false, leftIndex: -1, rightIndex: -1 });

  return tracker.getSteps();
}
