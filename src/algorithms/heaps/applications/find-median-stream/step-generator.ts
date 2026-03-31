/** Step generator for Find Median from Stream — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_MEDIAN_STREAM!);

export interface FindMedianStreamInput {
  stream: number[];
}

/** Sift a max-heap upward from the given index, emitting tracker steps. */
function trackedSiftUpMax(
  heap: number[],
  startIdx: number,
  tracker: HeapTracker,
  extraVars: Record<string, unknown>,
): void {
  let currentIdx = startIdx;
  tracker.startSiftUp(currentIdx, { ...extraVars, currentIdx });

  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(parentIdx, currentIdx, {
      ...extraVars,
      parent: heap[parentIdx],
      current: heap[currentIdx],
    });

    if ((heap[parentIdx] ?? -Infinity) >= (heap[currentIdx] ?? -Infinity)) {
      tracker.markSettled(currentIdx, { ...extraVars, currentIdx, value: heap[currentIdx] });
      return;
    }

    tracker.heapSwap(parentIdx, currentIdx, { ...extraVars, idxA: parentIdx, idxB: currentIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[currentIdx]!;
    heap[currentIdx] = swapTemp;
    currentIdx = parentIdx;
  }

  if (currentIdx === 0) {
    tracker.markSettled(0, { ...extraVars, currentIdx: 0, value: heap[0] });
  }
}

/** Sift a max-heap downward from the given index, emitting tracker steps. */
function trackedSiftDownMax(
  heap: number[],
  startIdx: number,
  tracker: HeapTracker,
  extraVars: Record<string, unknown>,
): void {
  let parentIdx = startIdx;
  tracker.startSiftDown(parentIdx, { ...extraVars, parentIdx, value: heap[parentIdx] });

  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heap.length) {
      tracker.compare(parentIdx, leftIdx, {
        ...extraVars,
        parent: heap[parentIdx],
        left: heap[leftIdx],
      });
      if ((heap[leftIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heap.length) {
      tracker.compare(largestIdx, rightIdx, {
        ...extraVars,
        largest: heap[largestIdx],
        right: heap[rightIdx],
      });
      if ((heap[rightIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
        largestIdx = rightIdx;
      }
    }

    if (largestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { ...extraVars, parentIdx, value: heap[parentIdx] });
      return;
    }

    tracker.heapSwap(parentIdx, largestIdx, { ...extraVars, idxA: parentIdx, idxB: largestIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[largestIdx]!;
    heap[largestIdx] = swapTemp;
    parentIdx = largestIdx;
  }
}

export function generateFindMedianStreamSteps(input: FindMedianStreamInput): ExecutionStep[] {
  const { stream } = input;
  const maxHeap: number[] = []; // lower half — max-heap
  const minHeap: number[] = []; // upper half — min-heap (tracked separately as variables)

  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({
    maxHeap: [...maxHeap],
    minHeap: [...minHeap],
    currentMedian: null,
    streamIndex: -1,
    currentValue: null,
  });

  for (let streamIndex = 0; streamIndex < stream.length; streamIndex++) {
    const currentValue = stream[streamIndex]!;

    const baseVars = () => ({
      maxHeap: [...maxHeap],
      minHeap: [...minHeap],
      streamIndex,
      currentValue,
    });

    // Insert into appropriate heap
    if (maxHeap.length === 0 || currentValue <= (maxHeap[0] ?? -Infinity)) {
      // Insert into max-heap (lower half) — tracked via HeapTracker
      maxHeap.push(currentValue);
      tracker.addNode(currentValue, {
        ...baseVars(),
        action: "insert-to-max-heap",
        maxHeap: [...maxHeap],
      });

      trackedSiftUpMax(maxHeap, maxHeap.length - 1, tracker, {
        ...baseVars(),
        action: "sift-up-max-heap",
        maxHeap: [...maxHeap],
      });
    } else {
      // Insert into min-heap (upper half) — not tracked in HeapTracker visually,
      // but reflected in variables for each step
      minHeap.push(currentValue);
      minHeap.sort((valA, valB) => valA - valB); // maintain min-heap property simply

      tracker.addNode(currentValue, {
        ...baseVars(),
        action: "insert-to-min-heap",
        minHeap: [...minHeap],
        note: "value goes to upper half (min-heap)",
      });
    }

    // Rebalance: maxHeap must be equal size or 1 larger than minHeap
    if (maxHeap.length > minHeap.length + 1) {
      // Transfer root of max-heap to min-heap
      const extracted = maxHeap[0]!;
      tracker.markExtracted(0, {
        ...baseVars(),
        action: "rebalance-max-to-min",
        extracted,
        maxHeap: [...maxHeap],
        minHeap: [...minHeap],
      });

      maxHeap[0] = maxHeap[maxHeap.length - 1]!;
      maxHeap.pop();

      if (maxHeap.length > 0) {
        trackedSiftDownMax(maxHeap, 0, tracker, {
          ...baseVars(),
          action: "rebalance-sift-down",
          maxHeap: [...maxHeap],
          minHeap: [...minHeap],
        });
      }

      minHeap.push(extracted);
      minHeap.sort((valA, valB) => valA - valB);

      tracker.removeNode({
        ...baseVars(),
        action: "rebalance-complete",
        maxHeap: [...maxHeap],
        minHeap: [...minHeap],
      });
    } else if (minHeap.length > maxHeap.length) {
      // Transfer root of min-heap to max-heap
      const extracted = minHeap.shift()!; // min-heap root is smallest in upper half

      maxHeap.push(extracted);
      tracker.addNode(extracted, {
        ...baseVars(),
        action: "rebalance-min-to-max",
        extracted,
        maxHeap: [...maxHeap],
        minHeap: [...minHeap],
      });

      trackedSiftUpMax(maxHeap, maxHeap.length - 1, tracker, {
        ...baseVars(),
        action: "rebalance-sift-up",
        maxHeap: [...maxHeap],
        minHeap: [...minHeap],
      });
    }

    // Compute and record the running median
    let currentMedian: number;
    if (maxHeap.length === minHeap.length) {
      currentMedian = ((maxHeap[0] ?? 0) + (minHeap[0] ?? 0)) / 2;
    } else {
      currentMedian = maxHeap[0] ?? 0;
    }

    tracker.markHighlighted(0, {
      ...baseVars(),
      maxHeap: [...maxHeap],
      minHeap: [...minHeap],
      currentMedian,
      action: "median-computed",
    });
  }

  tracker.complete({
    maxHeap: [...maxHeap],
    minHeap: [...minHeap],
    currentMedian:
      maxHeap.length === minHeap.length
        ? ((maxHeap[0] ?? 0) + (minHeap[0] ?? 0)) / 2
        : (maxHeap[0] ?? 0),
    streamLength: stream.length,
  });

  return tracker.getSteps();
}
