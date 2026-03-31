/** Step generator for Heap Decrease Key — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_DECREASE_KEY!);

export interface HeapDecreaseKeyInput {
  array: number[];
  targetIndex: number;
  newValue: number;
}

export function generateHeapDecreaseKeySteps(input: HeapDecreaseKeyInput): ExecutionStep[] {
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

  // Sift-up to restore heap property
  tracker.startSiftUp(targetIndex, { currentIndex: targetIndex, value: values[targetIndex] });

  let currentIndex = targetIndex;

  while (currentIndex > 0) {
    const parentIndex = Math.floor((currentIndex - 1) / 2);

    tracker.compare(currentIndex, parentIndex, {
      current: values[currentIndex],
      parent: values[parentIndex],
    });

    if ((values[currentIndex] ?? Infinity) >= (values[parentIndex] ?? Infinity)) {
      tracker.markSettled(currentIndex, { currentIndex, value: values[currentIndex] });
      break;
    }

    tracker.heapSwap(currentIndex, parentIndex, {
      idxA: currentIndex,
      idxB: parentIndex,
    });

    const temp = values[currentIndex]!;
    values[currentIndex] = values[parentIndex]!;
    values[parentIndex] = temp;

    currentIndex = parentIndex;
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
