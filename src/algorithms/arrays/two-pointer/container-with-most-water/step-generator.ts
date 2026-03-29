/** Step generator for Container With Most Water — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CONTAINER_WITH_MOST_WATER!);

interface ContainerWithMostWaterInput {
  heights: number[];
}

export function generateContainerWithMostWaterSteps(
  input: ContainerWithMostWaterInput,
): ExecutionStep[] {
  const { heights } = input;

  const tracker = new ArrayTracker([...heights], LINE_MAP);

  let maxArea = 0;
  let bestLeft = 0;
  let bestRight = heights.length - 1;

  tracker.initialize({
    heights: [...heights],
    arrayLength: heights.length,
    leftPointer: 0,
    rightPointer: heights.length - 1,
    maxArea: 0,
    bestLeft: 0,
    bestRight: heights.length - 1,
  });

  if (heights.length <= 1) {
    tracker.complete({ maxArea: 0, leftIndex: 0, rightIndex: 0 });
    return tracker.getSteps();
  }

  let leftPointer = 0;
  let rightPointer = heights.length - 1;

  while (leftPointer < rightPointer) {
    const leftHeight = heights[leftPointer]!;
    const rightHeight = heights[rightPointer]!;
    const currentArea = Math.min(leftHeight, rightHeight) * (rightPointer - leftPointer);

    tracker.compareTwo(
      leftPointer,
      rightPointer,
      {
        leftPointer,
        rightPointer,
        leftHeight,
        rightHeight,
        currentArea,
        maxArea,
        bestLeft,
        bestRight,
      },
      `Area between index ${leftPointer} (height ${leftHeight}) and index ${rightPointer} (height ${rightHeight}) = min(${leftHeight},${rightHeight}) × ${rightPointer - leftPointer} = ${currentArea}${currentArea > maxArea ? " — new maximum!" : ""}`,
    );

    if (currentArea > maxArea) {
      maxArea = currentArea;
      bestLeft = leftPointer;
      bestRight = rightPointer;
    }

    if (leftHeight <= rightHeight) {
      tracker.markElement(
        leftPointer,
        "eliminated",
        {
          leftPointer,
          rightPointer,
          leftHeight,
          rightHeight,
          currentArea,
          maxArea,
          bestLeft,
          bestRight,
          action: "advance-left",
        },
        `Left bar (height ${leftHeight}) ≤ right bar (height ${rightHeight}) — advancing left pointer from ${leftPointer} to ${leftPointer + 1}`,
      );
      leftPointer++;
    } else {
      tracker.markElement(
        rightPointer,
        "eliminated",
        {
          leftPointer,
          rightPointer,
          leftHeight,
          rightHeight,
          currentArea,
          maxArea,
          bestLeft,
          bestRight,
          action: "retreat-right",
        },
        `Right bar (height ${rightHeight}) < left bar (height ${leftHeight}) — retreating right pointer from ${rightPointer} to ${rightPointer - 1}`,
      );
      rightPointer--;
    }
  }

  tracker.markElement(
    bestLeft,
    "found",
    { bestLeft, bestRight, maxArea },
    `Best left boundary at index ${bestLeft} (height ${heights[bestLeft]!})`,
  );
  tracker.markElement(
    bestRight,
    "found",
    { bestLeft, bestRight, maxArea },
    `Best right boundary at index ${bestRight} (height ${heights[bestRight]!})`,
  );

  tracker.complete({ maxArea, leftIndex: bestLeft, rightIndex: bestRight });

  return tracker.getSteps();
}
