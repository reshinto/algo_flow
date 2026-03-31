/** Step generator for Heap Replace Root — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_REPLACE_ROOT!);

export interface HeapReplaceRootInput {
  array: number[];
  newValue: number;
}

export function generateHeapReplaceRootSteps(input: HeapReplaceRootInput): ExecutionStep[] {
  const { array, newValue } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  const replacedValue = values[0] ?? 0;

  tracker.initialize({ array: [...values], newValue, replacedValue });

  // Mark root as the element being replaced
  tracker.markExtracted(0, { replacedValue, newValue });

  // Update root with new value
  tracker.updateValue(0, newValue, { oldValue: replacedValue, newValue });
  values[0] = newValue;

  // Sift-down to restore heap property
  tracker.startSiftDown(0, { parentIndex: 0, value: values[0] });

  let parentIdx = 0;
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

  tracker.complete({ replacedValue, result: [...values] });

  return tracker.getSteps();
}
