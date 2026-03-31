/** Step generator for PQ Change Priority — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PQ_CHANGE_PRIORITY!);

export interface PqChangePriorityInput {
  array: number[];
  targetIndex: number;
  newValue: number;
}

export function generatePqChangePrioritySteps(input: PqChangePriorityInput): ExecutionStep[] {
  const { array, targetIndex, newValue } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], targetIndex, newValue });

  const oldValue = values[targetIndex] ?? 0;

  // Update the value at targetIndex
  tracker.updateValue(targetIndex, newValue, {
    targetIndex,
    oldValue,
    newValue,
    action: "change-priority",
  });
  values[targetIndex] = newValue;

  if (newValue < oldValue) {
    // Priority increased (value decreased) — sift up
    tracker.startSiftUp(targetIndex, { currentIdx: targetIndex, value: values[targetIndex] });

    let currentIdx = targetIndex;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      tracker.compare(currentIdx, parentIdx, {
        current: values[currentIdx],
        parent: values[parentIdx],
      });

      if ((values[currentIdx] ?? Infinity) >= (values[parentIdx] ?? Infinity)) {
        tracker.markSettled(currentIdx, { currentIdx, value: values[currentIdx] });
        break;
      }

      tracker.heapSwap(currentIdx, parentIdx, { idxA: currentIdx, idxB: parentIdx });
      const temp = values[currentIdx]!;
      values[currentIdx] = values[parentIdx]!;
      values[parentIdx] = temp;

      currentIdx = parentIdx;
    }

    if (currentIdx === 0) {
      tracker.markSettled(0, { currentIdx: 0, value: values[0] });
    }
  } else {
    // Priority decreased (value increased) — sift down
    let parentIdx = targetIndex;
    const heapSize = values.length;

    tracker.startSiftDown(parentIdx, { parentIdx, value: values[parentIdx] });

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
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
