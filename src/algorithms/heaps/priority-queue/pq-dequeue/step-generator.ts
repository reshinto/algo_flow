/** Step generator for PQ Dequeue — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PQ_DEQUEUE!);

export interface PqDequeueInput {
  array: number[];
}

export function generatePqDequeueSteps(input: PqDequeueInput): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values] });

  if (values.length === 0) {
    tracker.complete({ result: [], dequeuedValue: undefined });
    return tracker.getSteps();
  }

  const dequeuedValue = values[0]!;
  const lastIdx = values.length - 1;

  // Mark root (highest priority element) as extracted
  tracker.markExtracted(0, { dequeuedValue, rootValue: values[0] });

  // Swap root with last element to maintain shape property
  tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
  const swapTemp = values[0]!;
  values[0] = values[lastIdx]!;
  values[lastIdx] = swapTemp;

  // Remove last node (the dequeued element)
  tracker.removeNode({ dequeuedValue, removedFromIdx: lastIdx });
  values.pop();

  // Sift down from root to restore heap property
  const heapSize = values.length;
  let parentIdx = 0;

  tracker.startSiftDown(0, { parentIdx: 0, value: values[0] });

  while (true) {
    let smallestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heapSize) {
      tracker.compare(parentIdx, leftIdx, {
        parent: values[parentIdx],
        left: values[leftIdx],
      });
      if ((values[leftIdx] ?? Infinity) < (values[smallestIdx] ?? Infinity)) {
        smallestIdx = leftIdx;
      }
    }

    if (rightIdx < heapSize) {
      tracker.compare(smallestIdx, rightIdx, {
        smallest: values[smallestIdx],
        right: values[rightIdx],
      });
      if ((values[rightIdx] ?? Infinity) < (values[smallestIdx] ?? Infinity)) {
        smallestIdx = rightIdx;
      }
    }

    if (smallestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { parentIdx, value: values[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });
    const temp = values[parentIdx]!;
    values[parentIdx] = values[smallestIdx]!;
    values[smallestIdx] = temp;

    parentIdx = smallestIdx;
  }

  tracker.complete({ dequeuedValue, result: [...values] });

  return tracker.getSteps();
}
