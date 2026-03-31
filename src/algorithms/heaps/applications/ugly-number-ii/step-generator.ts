/** Step generator for Ugly Number II — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UGLY_NUMBER_II!);

export interface UglyNumberIiInput {
  nthPosition: number;
}

const PRIME_FACTORS = [2, 3, 5] as const;

function siftUpTracker(heap: number[], tracker: HeapTracker, startIdx: number): void {
  let currentIdx = startIdx;
  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(currentIdx, parentIdx, {
      current: heap[currentIdx],
      parent: heap[parentIdx],
    });
    if ((heap[currentIdx] ?? Infinity) < (heap[parentIdx] ?? Infinity)) {
      tracker.heapSwap(currentIdx, parentIdx, { idxA: currentIdx, idxB: parentIdx });
      const temp = heap[currentIdx]!;
      heap[currentIdx] = heap[parentIdx]!;
      heap[parentIdx] = temp;
      currentIdx = parentIdx;
    } else {
      tracker.markSettled(currentIdx, { idx: currentIdx, value: heap[currentIdx] });
      break;
    }
  }
  if (currentIdx === 0) {
    tracker.markSettled(0, { idx: 0, value: heap[0] });
  }
}

function siftDownTracker(
  heap: number[],
  heapSize: number,
  tracker: HeapTracker,
  startIdx: number,
): void {
  if (heapSize === 0) return;
  tracker.startSiftDown(startIdx, { parentIdx: startIdx, value: heap[startIdx] });
  let parentIdx = startIdx;
  while (true) {
    let smallestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heapSize) {
      tracker.compare(parentIdx, leftIdx, {
        parent: heap[parentIdx],
        left: heap[leftIdx],
      });
      if ((heap[leftIdx] ?? Infinity) < (heap[smallestIdx] ?? Infinity)) {
        smallestIdx = leftIdx;
      }
    }

    if (rightIdx < heapSize) {
      tracker.compare(smallestIdx, rightIdx, {
        smallest: heap[smallestIdx],
        right: heap[rightIdx],
      });
      if ((heap[rightIdx] ?? Infinity) < (heap[smallestIdx] ?? Infinity)) {
        smallestIdx = rightIdx;
      }
    }

    if (smallestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { idx: parentIdx, value: heap[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });
    const temp = heap[parentIdx]!;
    heap[parentIdx] = heap[smallestIdx]!;
    heap[smallestIdx] = temp;
    parentIdx = smallestIdx;
  }
}

export function generateUglyNumberIiSteps(input: UglyNumberIiInput): ExecutionStep[] {
  const { nthPosition } = input;
  const heap: number[] = [1];
  const seen = new Set<number>([1]);
  let currentUgly = 1;

  const tracker = new HeapTracker([1], HEAP_LINE_MAP);
  tracker.initialize({ nthPosition, heap: [1] });

  for (let iteration = 0; iteration < nthPosition; iteration++) {
    // Extract minimum
    currentUgly = heap[0]!;
    tracker.markExtracted(0, { extractedValue: currentUgly, iteration });

    // Move last to root and shrink
    if (heap.length > 1) {
      heap[0] = heap[heap.length - 1]!;
      heap.pop();
      tracker.removeNode({ extractedValue: currentUgly });
      siftDownTracker(heap, heap.length, tracker, 0);
    } else {
      heap.pop();
      tracker.removeNode({ extractedValue: currentUgly });
    }

    // Insert candidates
    for (const factor of PRIME_FACTORS) {
      const candidate = currentUgly * factor;
      if (!seen.has(candidate)) {
        seen.add(candidate);
        heap.push(candidate);
        tracker.addNode(candidate, { candidate, factor, currentUgly });
        siftUpTracker(heap, tracker, heap.length - 1);
      }
    }
  }

  tracker.complete({ result: currentUgly, nthPosition });

  return tracker.getSteps();
}
