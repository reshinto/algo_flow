/** Step generator for Heap Delete Arbitrary — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_DELETE_ARBITRARY!);

export interface HeapDeleteArbitraryInput {
  array: number[];
  targetIndex: number;
}

export function generateHeapDeleteArbitrarySteps(input: HeapDeleteArbitraryInput): ExecutionStep[] {
  const { array, targetIndex } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], targetIndex });

  const lastIndex = values.length - 1;

  // Mark the node being extracted/replaced
  tracker.markExtracted(targetIndex, { targetIndex, value: values[targetIndex] });

  // Replace target with last element and remove last
  values[targetIndex] = values[lastIndex]!;
  values.pop();

  tracker.removeNode({ array: [...values], targetIndex, replacedWith: values[targetIndex] });

  if (targetIndex >= values.length) {
    tracker.complete({ result: [...values] });
    return tracker.getSteps();
  }

  const parentIndex = Math.floor((targetIndex - 1) / 2);
  const shouldSiftUp =
    targetIndex > 0 && (values[targetIndex] ?? Infinity) < (values[parentIndex] ?? Infinity);

  if (shouldSiftUp) {
    // Sift-up path
    tracker.startSiftUp(targetIndex, { currentIndex: targetIndex, value: values[targetIndex] });

    let currentIndex = targetIndex;
    while (currentIndex > 0) {
      const currentParentIndex = Math.floor((currentIndex - 1) / 2);

      tracker.compare(currentIndex, currentParentIndex, {
        current: values[currentIndex],
        parent: values[currentParentIndex],
      });

      if ((values[currentIndex] ?? Infinity) >= (values[currentParentIndex] ?? Infinity)) {
        tracker.markSettled(currentIndex, { currentIndex, value: values[currentIndex] });
        break;
      }

      tracker.heapSwap(currentIndex, currentParentIndex, {
        idxA: currentIndex,
        idxB: currentParentIndex,
      });

      const temp = values[currentIndex]!;
      values[currentIndex] = values[currentParentIndex]!;
      values[currentParentIndex] = temp;

      currentIndex = currentParentIndex;
    }
  } else {
    // Sift-down path
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
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
