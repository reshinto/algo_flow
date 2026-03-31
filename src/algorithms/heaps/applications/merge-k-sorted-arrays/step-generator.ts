/** Step generator for Merge K Sorted Arrays — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_K_SORTED_ARRAYS!);

export interface MergeKSortedArraysInput {
  arrays: number[][];
}

export function generateMergeKSortedArraysSteps(input: MergeKSortedArraysInput): ExecutionStep[] {
  const { arrays } = input;
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  const totalElements = arrays.reduce((sum, arr) => sum + arr.length, 0);

  tracker.initialize({
    arrays,
    kArrays: arrays.length,
    totalElements,
    description: `Merge ${arrays.length} sorted arrays (${totalElements} total elements) using a min-heap`,
  });

  // Heap entries: [value, arrayIndex, elementIndex]
  const heap: [number, number, number][] = [];
  // Parallel tracker values for HeapTracker
  const heapValues: number[] = [];

  // Insert first element of each array
  for (let arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) {
    const firstElement = arrays[arrayIndex]?.[0];
    if (firstElement !== undefined) {
      heap.push([firstElement, arrayIndex, 0]);
      heapValues.push(firstElement);
      tracker.addNode(firstElement, {
        value: firstElement,
        arrayIndex,
        elementIndex: 0,
        action: "insert first element of array",
      });
    }
  }

  // Build initial min-heap using sift-up for each inserted element
  for (let insertedIdx = 1; insertedIdx < heap.length; insertedIdx++) {
    let childIdx = insertedIdx;
    tracker.startSiftUp(childIdx, { childIdx, value: heap[childIdx]?.[0] });

    while (childIdx > 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);

      tracker.compare(parentIdx, childIdx, {
        parentValue: heap[parentIdx]?.[0],
        childValue: heap[childIdx]?.[0],
      });

      if ((heap[parentIdx]?.[0] ?? Infinity) <= (heap[childIdx]?.[0] ?? Infinity)) {
        break;
      }

      tracker.heapSwap(parentIdx, childIdx, { idxA: parentIdx, idxB: childIdx });

      const tempEntry = heap[parentIdx]!;
      heap[parentIdx] = heap[childIdx]!;
      heap[childIdx] = tempEntry;

      heapValues[parentIdx] = heap[parentIdx]![0];
      heapValues[childIdx] = heap[childIdx]![0];

      childIdx = parentIdx;
    }
  }

  const result: number[] = [];

  // Extract min repeatedly until heap is empty
  while (heap.length > 0) {
    const rootEntry = heap[0]!;
    const [minValue, arrayIndex, elementIndex] = rootEntry;

    tracker.markExtracted(0, {
      extractedValue: minValue,
      arrayIndex,
      elementIndex,
      resultSoFar: [...result, minValue],
    });

    result.push(minValue);

    const nextElementIndex = elementIndex + 1;
    const nextValue = arrays[arrayIndex]?.[nextElementIndex];

    if (nextValue !== undefined) {
      // Replace root with next element from the same array
      heap[0] = [nextValue, arrayIndex, nextElementIndex];
      heapValues[0] = nextValue;

      tracker.updateValue(0, nextValue, {
        arrayIndex,
        elementIndex: nextElementIndex,
        nextValue,
        action: "replace root with next element from same array",
      });
    } else {
      // No more elements in this array — remove root
      const lastEntry = heap.pop();
      if (heap.length > 0 && lastEntry !== undefined) {
        heap[0] = lastEntry;
        heapValues[0] = lastEntry[0];
        tracker.removeNode({
          removedValue: minValue,
          replacedWithValue: lastEntry[0],
          heapSize: heap.length,
        });
      } else {
        tracker.removeNode({
          removedValue: minValue,
          heapSize: heap.length,
        });
      }
    }

    // Sift down the root to restore heap property
    if (heap.length > 1) {
      let parentIdx = 0;
      tracker.startSiftDown(0, { parentIdx: 0, value: heap[0]?.[0] });

      while (true) {
        let smallestIdx = parentIdx;
        const leftIdx = 2 * parentIdx + 1;
        const rightIdx = 2 * parentIdx + 2;

        if (leftIdx < heap.length) {
          tracker.compare(parentIdx, leftIdx, {
            parentValue: heap[parentIdx]?.[0],
            leftValue: heap[leftIdx]?.[0],
          });
          if ((heap[leftIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)) {
            smallestIdx = leftIdx;
          }
        }

        if (rightIdx < heap.length) {
          tracker.compare(smallestIdx, rightIdx, {
            smallestValue: heap[smallestIdx]?.[0],
            rightValue: heap[rightIdx]?.[0],
          });
          if ((heap[rightIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)) {
            smallestIdx = rightIdx;
          }
        }

        if (smallestIdx === parentIdx) {
          tracker.markSettled(parentIdx, { idx: parentIdx, value: heap[parentIdx]?.[0] });
          break;
        }

        tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });

        const tempEntry = heap[parentIdx]!;
        heap[parentIdx] = heap[smallestIdx]!;
        heap[smallestIdx] = tempEntry;

        heapValues[parentIdx] = heap[parentIdx]![0];
        heapValues[smallestIdx] = heap[smallestIdx]![0];

        parentIdx = smallestIdx;
      }
    }
  }

  tracker.complete({
    result,
    totalElements,
    mergedArray: result,
  });

  return tracker.getSteps();
}
