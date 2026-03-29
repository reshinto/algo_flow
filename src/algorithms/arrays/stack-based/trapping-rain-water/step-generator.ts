/** Step generator for Trapping Rain Water — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRAPPING_RAIN_WATER!);

interface TrappingRainWaterInput {
  heights: number[];
}

export function generateTrappingRainWaterSteps(input: TrappingRainWaterInput): ExecutionStep[] {
  const { heights } = input;
  const arrayLength = heights.length;

  const tracker = new ArrayTracker([...heights], LINE_MAP);

  if (arrayLength === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ totalWater: 0, waterPerIndex: [] });
    return tracker.getSteps();
  }

  let leftPointer = 0;
  let rightPointer = arrayLength - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let totalWater = 0;
  const waterPerIndex = new Array(arrayLength).fill(0) as number[];

  tracker.initialize({
    heights: [...heights],
    arrayLength,
    leftPointer,
    rightPointer,
    maxLeft,
    maxRight,
    totalWater,
  });

  while (leftPointer < rightPointer) {
    const leftHeight = heights[leftPointer]!;
    const rightHeight = heights[rightPointer]!;

    tracker.compareTwo(
      leftPointer,
      rightPointer,
      {
        leftPointer,
        rightPointer,
        leftHeight,
        rightHeight,
        maxLeft,
        maxRight,
        totalWater,
        side: leftHeight <= rightHeight ? "left" : "right",
      },
      `Compare heights[${leftPointer}]=${leftHeight} vs heights[${rightPointer}]=${rightHeight}`,
    );

    if (leftHeight <= rightHeight) {
      if (leftHeight >= maxLeft) {
        maxLeft = leftHeight;
        tracker.visit(
          leftPointer,
          { leftPointer, maxLeft, maxRight, totalWater },
          `Update maxLeft to ${maxLeft} at index ${leftPointer}`,
        );
      } else {
        waterPerIndex[leftPointer] = maxLeft - leftHeight;
        totalWater += waterPerIndex[leftPointer]!;
        tracker.markElement(
          leftPointer,
          "found",
          { leftPointer, trapped: waterPerIndex[leftPointer], maxLeft, totalWater },
          `Trap ${waterPerIndex[leftPointer]} units at index ${leftPointer} (maxLeft=${maxLeft} - height=${leftHeight})`,
          "visit",
        );
      }
      leftPointer++;
    } else {
      if (rightHeight >= maxRight) {
        maxRight = rightHeight;
        tracker.visit(
          rightPointer,
          { rightPointer, maxLeft, maxRight, totalWater },
          `Update maxRight to ${maxRight} at index ${rightPointer}`,
        );
      } else {
        waterPerIndex[rightPointer] = maxRight - rightHeight;
        totalWater += waterPerIndex[rightPointer]!;
        tracker.markElement(
          rightPointer,
          "found",
          { rightPointer, trapped: waterPerIndex[rightPointer], maxRight, totalWater },
          `Trap ${waterPerIndex[rightPointer]} units at index ${rightPointer} (maxRight=${maxRight} - height=${rightHeight})`,
          "visit",
        );
      }
      rightPointer--;
    }
  }

  tracker.complete({ totalWater, waterPerIndex });

  return tracker.getSteps();
}
