/** Step generator for Largest Rectangle in Histogram — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LARGEST_RECTANGLE_HISTOGRAM!);

interface LargestRectangleHistogramInput {
  heights: number[];
}

export function generateLargestRectangleHistogramSteps(
  input: LargestRectangleHistogramInput,
): ExecutionStep[] {
  const { heights } = input;
  const arrayLength = heights.length;

  const tracker = new ArrayTracker([...heights], LINE_MAP);

  if (arrayLength === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ maxArea: 0, leftIndex: -1, rightIndex: -1, height: 0 });
    return tracker.getSteps();
  }

  const indexStack: number[] = [];
  let maxArea = 0;
  let bestLeft = 0;
  let bestRight = 0;
  let bestHeight = 0;

  tracker.initialize({
    heights: [...heights],
    arrayLength,
    stackContents: [],
    maxArea,
  });

  for (let currentIndex = 0; currentIndex <= arrayLength; currentIndex++) {
    const currentHeight = currentIndex === arrayLength ? 0 : heights[currentIndex]!;

    tracker.visit(
      Math.min(currentIndex, arrayLength - 1),
      {
        currentIndex,
        currentHeight,
        stackContents: [...indexStack],
        maxArea,
        isSentinel: currentIndex === arrayLength,
      },
      currentIndex === arrayLength
        ? `Process sentinel bar (height=0) to flush remaining stack`
        : `Visit index ${currentIndex} (height=${currentHeight})`,
    );

    while (indexStack.length > 0 && currentHeight < heights[indexStack[indexStack.length - 1]!]!) {
      const poppedIndex = indexStack.pop()!;
      const poppedHeight = heights[poppedIndex]!;
      const leftBoundary = indexStack.length === 0 ? 0 : indexStack[indexStack.length - 1]! + 1;
      const width = currentIndex - leftBoundary;
      const area = poppedHeight * width;

      tracker.compareTwo(
        poppedIndex,
        Math.min(currentIndex, arrayLength - 1),
        {
          poppedIndex,
          poppedHeight,
          leftBoundary,
          rightBoundary: currentIndex - 1,
          width,
          area,
          maxArea,
          stackContents: [...indexStack],
        },
        `Pop index ${poppedIndex} (h=${poppedHeight}): width=${width}, area=${area}`,
      );

      if (area > maxArea) {
        maxArea = area;
        bestLeft = leftBoundary;
        bestRight = currentIndex - 1;
        bestHeight = poppedHeight;

        tracker.markElement(
          poppedIndex,
          "found",
          { maxArea, bestLeft, bestRight, bestHeight },
          `New max area ${maxArea} using height=${poppedHeight}, span=[${bestLeft},${bestRight}]`,
          "visit",
        );
      }
    }

    if (currentIndex < arrayLength) {
      indexStack.push(currentIndex);
    }
  }

  tracker.complete({ maxArea, leftIndex: bestLeft, rightIndex: bestRight, height: bestHeight });

  return tracker.getSteps();
}
