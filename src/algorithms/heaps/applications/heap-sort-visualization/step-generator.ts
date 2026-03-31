/** Step generator for Heap Sort Visualization — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_SORT_VISUALIZATION!);

export interface HeapSortVisualizationInput {
  array: number[];
}

function siftDownTracker(
  values: number[],
  heapSize: number,
  tracker: HeapTracker,
  rootIdx: number,
): void {
  tracker.startSiftDown(rootIdx, { parentIdx: rootIdx, value: values[rootIdx] });
  let parentIdx = rootIdx;

  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heapSize) {
      tracker.compare(parentIdx, leftIdx, {
        parent: values[parentIdx],
        left: values[leftIdx],
      });
      if ((values[leftIdx] ?? -Infinity) > (values[largestIdx] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heapSize) {
      tracker.compare(largestIdx, rightIdx, {
        largest: values[largestIdx],
        right: values[rightIdx],
      });
      if ((values[rightIdx] ?? -Infinity) > (values[largestIdx] ?? -Infinity)) {
        largestIdx = rightIdx;
      }
    }

    if (largestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { idx: parentIdx, value: values[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
    const temp = values[parentIdx]!;
    values[parentIdx] = values[largestIdx]!;
    values[largestIdx] = temp;
    parentIdx = largestIdx;
  }
}

export function generateHeapSortVisualizationSteps(
  input: HeapSortVisualizationInput,
): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const arrayLength = values.length;

  const tracker = new HeapTracker([...values], HEAP_LINE_MAP);
  tracker.initialize({ array: [...values], size: arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...values] });
    return tracker.getSteps();
  }

  // Phase 1: Build max-heap bottom-up
  const lastNonLeaf = Math.floor(arrayLength / 2) - 1;
  for (let nodeIdx = lastNonLeaf; nodeIdx >= 0; nodeIdx--) {
    siftDownTracker(values, arrayLength, tracker, nodeIdx);
  }

  // Phase 2: Extract elements — swap root with last, shrink heap, sift-down
  for (let heapEnd = arrayLength - 1; heapEnd > 0; heapEnd--) {
    // Mark root as extracted before swap
    tracker.markExtracted(0, { extractedValue: values[0], sortedPosition: heapEnd });

    // Swap root with last unsorted element
    tracker.heapSwap(0, heapEnd, { idxA: 0, idxB: heapEnd });
    const temp = values[0]!;
    values[0] = values[heapEnd]!;
    values[heapEnd] = temp;

    // Mark the now-settled element (it's in its sorted position)
    tracker.markSettled(heapEnd, { idx: heapEnd, value: values[heapEnd] });

    // Restore max-heap over the shrunk range
    if (heapEnd > 1) {
      siftDownTracker(values, heapEnd, tracker, 0);
    }
  }

  // Mark the remaining root as settled (last element is in position)
  tracker.markSettled(0, { idx: 0, value: values[0] });

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
