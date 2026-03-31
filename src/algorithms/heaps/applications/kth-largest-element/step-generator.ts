/** Step generator for Kth Largest Element — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KTH_LARGEST_ELEMENT!);

export interface KthLargestElementInput {
  array: number[];
  kValue: number;
}

export function generateKthLargestElementSteps(input: KthLargestElementInput): ExecutionStep[] {
  const { array, kValue } = input;
  const minHeap: number[] = [];
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({ array: [...array], kValue, heapSize: 0 });

  for (const element of array) {
    if (minHeap.length < kValue) {
      // Insert into heap
      minHeap.push(element);
      tracker.addNode(element, { element, heapSize: minHeap.length, action: "insert" });

      // Sift up
      let currentIdx = minHeap.length - 1;
      tracker.startSiftUp(currentIdx, { currentIdx, value: element });

      while (currentIdx > 0) {
        const parentIdx = Math.floor((currentIdx - 1) / 2);
        tracker.compare(parentIdx, currentIdx, {
          parent: minHeap[parentIdx],
          current: minHeap[currentIdx],
        });

        if ((minHeap[parentIdx] ?? Infinity) <= (minHeap[currentIdx] ?? Infinity)) {
          tracker.markSettled(currentIdx, { currentIdx, value: minHeap[currentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
        const swapTemp = minHeap[parentIdx]!;
        minHeap[parentIdx] = minHeap[currentIdx]!;
        minHeap[currentIdx] = swapTemp;
        currentIdx = parentIdx;
      }

      if (currentIdx === 0) {
        tracker.markSettled(0, { currentIdx: 0, value: minHeap[0] });
      }
    } else {
      // Compare element with heap root (min of k-heap)
      tracker.compare(0, 0, { heapRoot: minHeap[0], element, action: "compare-with-root" });

      if (element > (minHeap[0] ?? -Infinity)) {
        // Replace root and sift down
        tracker.markExtracted(0, { replacedRoot: minHeap[0], newElement: element });
        minHeap[0] = element;
        tracker.heapSwap(0, 0, { idxA: 0, idxB: 0, newValue: element });

        // Update tracker node value by doing a manual sift-down step
        let parentIdx = 0;
        tracker.startSiftDown(parentIdx, { parentIdx, value: minHeap[parentIdx] });

        while (true) {
          let smallestIdx = parentIdx;
          const leftIdx = 2 * parentIdx + 1;
          const rightIdx = 2 * parentIdx + 2;

          if (leftIdx < minHeap.length) {
            tracker.compare(parentIdx, leftIdx, {
              parent: minHeap[parentIdx],
              left: minHeap[leftIdx],
            });
            if ((minHeap[leftIdx] ?? Infinity) < (minHeap[smallestIdx] ?? Infinity)) {
              smallestIdx = leftIdx;
            }
          }

          if (rightIdx < minHeap.length) {
            tracker.compare(smallestIdx, rightIdx, {
              smallest: minHeap[smallestIdx],
              right: minHeap[rightIdx],
            });
            if ((minHeap[rightIdx] ?? Infinity) < (minHeap[smallestIdx] ?? Infinity)) {
              smallestIdx = rightIdx;
            }
          }

          if (smallestIdx === parentIdx) {
            tracker.markSettled(parentIdx, { parentIdx, value: minHeap[parentIdx] });
            break;
          }

          tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });
          const swapTemp = minHeap[parentIdx]!;
          minHeap[parentIdx] = minHeap[smallestIdx]!;
          minHeap[smallestIdx] = swapTemp;
          parentIdx = smallestIdx;
        }
      }
    }
  }

  // Highlight root as the answer
  tracker.markHighlighted(0, { result: minHeap[0], kValue });

  tracker.complete({ result: minHeap[0], kValue });

  return tracker.getSteps();
}
