/** Step generator for Sort Nearly Sorted — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SORT_NEARLY_SORTED!);

export interface SortNearlySortedInput {
  array: number[];
  kValue: number;
}

function siftUpHeap(heap: number[], currentIdx: number, tracker: HeapTracker): void {
  tracker.startSiftUp(currentIdx, { currentIdx, value: heap[currentIdx] });

  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(parentIdx, currentIdx, {
      parent: heap[parentIdx],
      current: heap[currentIdx],
    });

    if ((heap[parentIdx] ?? Infinity) <= (heap[currentIdx] ?? Infinity)) {
      tracker.markSettled(currentIdx, { currentIdx, value: heap[currentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[currentIdx]!;
    heap[currentIdx] = swapTemp;
    currentIdx = parentIdx;
  }

  if (currentIdx === 0) {
    tracker.markSettled(0, { currentIdx: 0, value: heap[0] });
  }
}

function siftDownHeap(heap: number[], tracker: HeapTracker): void {
  let parentIdx = 0;
  tracker.startSiftDown(parentIdx, { parentIdx, value: heap[parentIdx] });

  while (true) {
    let smallestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heap.length) {
      tracker.compare(parentIdx, leftIdx, {
        parent: heap[parentIdx],
        left: heap[leftIdx],
      });
      if ((heap[leftIdx] ?? Infinity) < (heap[smallestIdx] ?? Infinity)) {
        smallestIdx = leftIdx;
      }
    }

    if (rightIdx < heap.length) {
      tracker.compare(smallestIdx, rightIdx, {
        smallest: heap[smallestIdx],
        right: heap[rightIdx],
      });
      if ((heap[rightIdx] ?? Infinity) < (heap[smallestIdx] ?? Infinity)) {
        smallestIdx = rightIdx;
      }
    }

    if (smallestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { parentIdx, value: heap[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[smallestIdx]!;
    heap[smallestIdx] = swapTemp;
    parentIdx = smallestIdx;
  }
}

export function generateSortNearlySortedSteps(input: SortNearlySortedInput): ExecutionStep[] {
  const { array, kValue } = input;
  const heap: number[] = [];
  const result: number[] = [];
  const tracker = new HeapTracker(heap, HEAP_LINE_MAP);

  tracker.initialize({ array: [...array], kValue, heapSize: 0 });

  // Insert first k+1 elements into the min-heap
  const initialCount = Math.min(kValue + 1, array.length);
  for (let insertIdx = 0; insertIdx < initialCount; insertIdx++) {
    const value = array[insertIdx]!;
    heap.push(value);
    tracker.addNode(value, { insertIdx, value, heapSize: heap.length });
    siftUpHeap(heap, heap.length - 1, tracker);
  }

  // For each remaining element, extract-min to result and insert next element
  for (let nextIdx = kValue + 1; nextIdx < array.length; nextIdx++) {
    // Extract minimum
    tracker.markExtracted(0, { extractingValue: heap[0], label: "min-extract" });
    const minValue = heap[0]!;
    const lastIdx = heap.length - 1;
    tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
    const swapTmp = heap[0]!;
    heap[0] = heap[lastIdx]!;
    heap[lastIdx] = swapTmp;
    tracker.removeNode({ extractedValue: minValue, removedFromIdx: lastIdx });
    heap.pop();
    result.push(minValue);

    if (heap.length > 0) {
      siftDownHeap(heap, tracker);
    }

    // Insert next element
    const nextValue = array[nextIdx]!;
    heap.push(nextValue);
    tracker.addNode(nextValue, { nextIdx, value: nextValue, heapSize: heap.length });
    siftUpHeap(heap, heap.length - 1, tracker);
  }

  // Drain remaining elements
  while (heap.length > 0) {
    tracker.markExtracted(0, { extractingValue: heap[0], label: "drain" });
    const minValue = heap[0]!;
    const lastIdx = heap.length - 1;
    tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
    const swapTmp = heap[0]!;
    heap[0] = heap[lastIdx]!;
    heap[lastIdx] = swapTmp;
    tracker.removeNode({ extractedValue: minValue, removedFromIdx: lastIdx });
    heap.pop();
    result.push(minValue);

    if (heap.length > 0) {
      siftDownHeap(heap, tracker);
    }
  }

  tracker.complete({ result: [...result], sortedLength: result.length });

  return tracker.getSteps();
}
