/** Step generator for Top-K Frequent Elements (Heap) — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TOP_K_FREQUENT_HEAP!);

export interface TopKFrequentHeapInput {
  array: number[];
  kValue: number;
}

export function generateTopKFrequentHeapSteps(input: TopKFrequentHeapInput): ExecutionStep[] {
  const { array, kValue } = input;
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  // Count frequencies
  const frequencyMap = new Map<number, number>();
  for (const element of array) {
    frequencyMap.set(element, (frequencyMap.get(element) ?? 0) + 1);
  }

  tracker.initialize({
    array: [...array],
    kValue,
    uniqueElements: frequencyMap.size,
    description: `Count frequencies and find ${kValue} most frequent elements`,
  });

  // Min-heap entries: [frequency, element]
  const heap: [number, number][] = [];
  // Parallel tracker array: track frequency values in heap
  const heapValues: number[] = [];

  const entries = Array.from(frequencyMap.entries());

  for (const [element, frequency] of entries) {
    if (heap.length < kValue) {
      // Insert into heap
      heap.push([frequency, element]);
      heapValues.push(frequency);

      const insertedIdx = heap.length - 1;
      tracker.addNode(frequency, {
        element,
        frequency,
        heapSize: heap.length,
        action: "insert into min-heap",
      });

      // Sift up
      let childIdx = insertedIdx;
      if (childIdx > 0) {
        tracker.startSiftUp(childIdx, { childIdx, frequency, element });
      }

      while (childIdx > 0) {
        const parentIdx = Math.floor((childIdx - 1) / 2);

        tracker.compare(parentIdx, childIdx, {
          parentFreq: heap[parentIdx]?.[0],
          childFreq: heap[childIdx]?.[0],
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
    } else if (frequency > (heap[0]?.[0] ?? 0)) {
      // Replace root (min in heap) with new entry if it has higher frequency
      tracker.markExtracted(0, {
        replacedElement: heap[0]?.[1],
        replacedFrequency: heap[0]?.[0],
        newElement: element,
        newFrequency: frequency,
      });

      heap[0] = [frequency, element];
      heapValues[0] = frequency;

      // Sift down
      let parentIdx = 0;
      tracker.startSiftDown(0, { parentIdx: 0, frequency, element });

      while (true) {
        let smallestIdx = parentIdx;
        const leftIdx = 2 * parentIdx + 1;
        const rightIdx = 2 * parentIdx + 2;

        if (leftIdx < heap.length) {
          tracker.compare(parentIdx, leftIdx, {
            parentFreq: heap[parentIdx]?.[0],
            leftFreq: heap[leftIdx]?.[0],
          });
          if ((heap[leftIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)) {
            smallestIdx = leftIdx;
          }
        }

        if (rightIdx < heap.length) {
          tracker.compare(smallestIdx, rightIdx, {
            smallestFreq: heap[smallestIdx]?.[0],
            rightFreq: heap[rightIdx]?.[0],
          });
          if ((heap[rightIdx]?.[0] ?? Infinity) < (heap[smallestIdx]?.[0] ?? Infinity)) {
            smallestIdx = rightIdx;
          }
        }

        if (smallestIdx === parentIdx) {
          tracker.markSettled(parentIdx, { idx: parentIdx, frequency: heap[parentIdx]?.[0] });
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

  const result = heap.map(([, element]) => element);

  tracker.complete({
    result,
    kValue,
    topKElements: result,
    heapSize: heap.length,
  });

  return tracker.getSteps();
}
