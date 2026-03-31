/** Step generator for Kth Smallest Element — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KTH_SMALLEST_ELEMENT!);

export interface KthSmallestElementInput {
  array: number[];
  kValue: number;
}

export function generateKthSmallestElementSteps(input: KthSmallestElementInput): ExecutionStep[] {
  const { array, kValue } = input;
  const maxHeap: number[] = [];
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({ array: [...array], kValue, heapSize: 0 });

  for (const element of array) {
    if (maxHeap.length < kValue) {
      // Insert into heap
      maxHeap.push(element);
      tracker.addNode(element, { element, heapSize: maxHeap.length, action: "insert" });

      // Sift up (max-heap: parent should be >= children)
      let currentIdx = maxHeap.length - 1;
      tracker.startSiftUp(currentIdx, { currentIdx, value: element });

      while (currentIdx > 0) {
        const parentIdx = Math.floor((currentIdx - 1) / 2);
        tracker.compare(parentIdx, currentIdx, {
          parent: maxHeap[parentIdx],
          current: maxHeap[currentIdx],
        });

        if ((maxHeap[parentIdx] ?? -Infinity) >= (maxHeap[currentIdx] ?? -Infinity)) {
          tracker.markSettled(currentIdx, { currentIdx, value: maxHeap[currentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
        const swapTemp = maxHeap[parentIdx]!;
        maxHeap[parentIdx] = maxHeap[currentIdx]!;
        maxHeap[currentIdx] = swapTemp;
        currentIdx = parentIdx;
      }

      if (currentIdx === 0) {
        tracker.markSettled(0, { currentIdx: 0, value: maxHeap[0] });
      }
    } else {
      // Compare element with heap root (max of k-heap)
      tracker.compare(0, 0, { heapRoot: maxHeap[0], element, action: "compare-with-root" });

      if (element < (maxHeap[0] ?? Infinity)) {
        // Replace root and sift down
        tracker.markExtracted(0, { replacedRoot: maxHeap[0], newElement: element });
        maxHeap[0] = element;
        tracker.heapSwap(0, 0, { idxA: 0, idxB: 0, newValue: element });

        // Sift down to restore max-heap property
        let parentIdx = 0;
        tracker.startSiftDown(parentIdx, { parentIdx, value: maxHeap[parentIdx] });

        while (true) {
          let largestIdx = parentIdx;
          const leftIdx = 2 * parentIdx + 1;
          const rightIdx = 2 * parentIdx + 2;

          if (leftIdx < maxHeap.length) {
            tracker.compare(parentIdx, leftIdx, {
              parent: maxHeap[parentIdx],
              left: maxHeap[leftIdx],
            });
            if ((maxHeap[leftIdx] ?? -Infinity) > (maxHeap[largestIdx] ?? -Infinity)) {
              largestIdx = leftIdx;
            }
          }

          if (rightIdx < maxHeap.length) {
            tracker.compare(largestIdx, rightIdx, {
              largest: maxHeap[largestIdx],
              right: maxHeap[rightIdx],
            });
            if ((maxHeap[rightIdx] ?? -Infinity) > (maxHeap[largestIdx] ?? -Infinity)) {
              largestIdx = rightIdx;
            }
          }

          if (largestIdx === parentIdx) {
            tracker.markSettled(parentIdx, { parentIdx, value: maxHeap[parentIdx] });
            break;
          }

          tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
          const swapTemp = maxHeap[parentIdx]!;
          maxHeap[parentIdx] = maxHeap[largestIdx]!;
          maxHeap[largestIdx] = swapTemp;
          parentIdx = largestIdx;
        }
      }
    }
  }

  // Highlight root as the answer
  tracker.markHighlighted(0, { result: maxHeap[0], kValue });

  tracker.complete({ result: maxHeap[0], kValue });

  return tracker.getSteps();
}
