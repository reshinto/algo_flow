/** Step generator for Heap Increase Key — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_INCREASE_KEY!);

export interface HeapIncreaseKeyInput {
  array: number[];
  targetIndex: number;
  newValue: number;
}

export function generateHeapIncreaseKeySteps(input: HeapIncreaseKeyInput): ExecutionStep[] {
  const { array, targetIndex, newValue } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], targetIndex, newValue });

  // Update the value at targetIndex
  tracker.updateValue(targetIndex, newValue, {
    targetIndex,
    oldValue: values[targetIndex],
    newValue,
  });
  values[targetIndex] = newValue;

  // Sift-down to restore heap property
  tracker.startSiftDown(targetIndex, { parentIndex: targetIndex, value: values[targetIndex] });

  let parentIdx = targetIndex;
  const size = values.length;

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

    const temp = values[parentIdx]!;
    values[parentIdx] = values[smallestIdx]!;
    values[smallestIdx] = temp;

    parentIdx = smallestIdx;
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
