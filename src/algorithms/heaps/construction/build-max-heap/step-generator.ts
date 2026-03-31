/** Step generator for Build Max Heap — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_MAX_HEAP!);

export interface BuildMaxHeapInput {
  array: number[];
}

export function generateBuildMaxHeapSteps(input: BuildMaxHeapInput): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const size = values.length;
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], size });

  for (let startIdx = Math.floor(size / 2) - 1; startIdx >= 0; startIdx--) {
    tracker.startSiftDown(startIdx, { startIdx, value: values[startIdx] });

    let parentIdx = startIdx;

    while (true) {
      let largestIdx = parentIdx;
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;

      if (leftIdx < size) {
        tracker.compare(parentIdx, leftIdx, {
          parent: values[parentIdx],
          left: values[leftIdx],
        });
        if ((values[leftIdx] ?? -Infinity) > (values[largestIdx] ?? -Infinity)) {
          largestIdx = leftIdx;
        }
      }

      if (rightIdx < size) {
        tracker.compare(largestIdx, rightIdx, {
          largest: values[largestIdx],
          right: values[rightIdx],
        });
        if ((values[rightIdx] ?? -Infinity) > (values[largestIdx] ?? -Infinity)) {
          largestIdx = rightIdx;
        }
      }

      if (largestIdx === parentIdx) {
        tracker.markSettled(parentIdx, { idx: parentIdx, value: values[parentIdx] });
        break;
      }

      tracker.heapSwap(parentIdx, largestIdx, {
        idxA: parentIdx,
        idxB: largestIdx,
      });
      // Keep local values in sync with tracker after swap
      const temp = values[parentIdx]!;
      values[parentIdx] = values[largestIdx]!;
      values[largestIdx] = temp;

      parentIdx = largestIdx;
    }
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
