/** Step generator for Build Min Heap — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_MIN_HEAP!);

export interface BuildMinHeapInput {
  array: number[];
}

export function generateBuildMinHeapSteps(input: BuildMinHeapInput): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const size = values.length;
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], size });

  for (let startIdx = Math.floor(size / 2) - 1; startIdx >= 0; startIdx--) {
    tracker.startSiftDown(startIdx, { startIdx, value: values[startIdx] });

    let parentIdx = startIdx;

    while (true) {
      let smallestIdx = parentIdx;
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;

      if (leftIdx < size) {
        tracker.compare(parentIdx, leftIdx, {
          parent: values[parentIdx],
          left: values[leftIdx],
        });
        if ((values[leftIdx] ?? Infinity) < (values[smallestIdx] ?? Infinity)) {
          smallestIdx = leftIdx;
        }
      }

      if (rightIdx < size) {
        tracker.compare(smallestIdx, rightIdx, {
          smallest: values[smallestIdx],
          right: values[rightIdx],
        });
        if ((values[rightIdx] ?? Infinity) < (values[smallestIdx] ?? Infinity)) {
          smallestIdx = rightIdx;
        }
      }

      if (smallestIdx === parentIdx) {
        tracker.markSettled(parentIdx, { idx: parentIdx, value: values[parentIdx] });
        break;
      }

      tracker.heapSwap(parentIdx, smallestIdx, {
        idxA: parentIdx,
        idxB: smallestIdx,
      });
      // Keep local values in sync with tracker after swap
      const temp = values[parentIdx]!;
      values[parentIdx] = values[smallestIdx]!;
      values[smallestIdx] = temp;

      parentIdx = smallestIdx;
    }
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
