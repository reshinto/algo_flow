/** Step generator for Heap Extract Max — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_EXTRACT_MAX!);

export interface HeapExtractMaxInput {
  array: number[];
}

export function generateHeapExtractMaxSteps(input: HeapExtractMaxInput): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const size = values.length;
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], size });

  if (size === 0) {
    tracker.complete({ result: [], extractedValue: undefined });
    return tracker.getSteps();
  }

  const extractedValue = values[0]!;
  const lastIdx = size - 1;

  // Mark root as extracted
  tracker.markExtracted(0, { extractedValue, rootValue: values[0] });

  // Swap root with last element
  tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
  const swapTemp = values[0]!;
  values[0] = values[lastIdx]!;
  values[lastIdx] = swapTemp;

  // Remove the last node (the extracted maximum)
  tracker.removeNode({ extractedValue, removedFromIdx: lastIdx });
  values.pop();

  // Sift down from root to restore max-heap property
  const heapSize = values.length;
  let parentIdx = 0;

  tracker.startSiftDown(0, { parentIdx: 0, value: values[0] });

  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heapSize) {
      tracker.compare(parentIdx, leftIdx, {
        parent: values[parentIdx],
        left: values[leftIdx],
      });
      if ((values[leftIdx] ?? -Infinity) > (values[largestIdx] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heapSize) {
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

    tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
    const temp = values[parentIdx]!;
    values[parentIdx] = values[largestIdx]!;
    values[largestIdx] = temp;

    parentIdx = largestIdx;
  }

  tracker.complete({ extractedValue, result: [...values] });

  return tracker.getSteps();
}
