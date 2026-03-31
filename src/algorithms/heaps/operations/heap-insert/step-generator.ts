/** Step generator for Heap Insert — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_INSERT!);

export interface HeapInsertInput {
  array: number[];
  value: number;
}

export function generateHeapInsertSteps(input: HeapInsertInput): ExecutionStep[] {
  const { array, value } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], value });

  // Append the new value at the end
  tracker.addNode(value, { value, insertedAtIdx: values.length });
  values.push(value);

  let currentIdx = values.length - 1;

  // Sift up to restore heap property
  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);

    tracker.startSiftUp(currentIdx, { currentIdx, value: values[currentIdx] });
    tracker.compare(currentIdx, parentIdx, {
      current: values[currentIdx],
      parent: values[parentIdx],
    });

    if ((values[currentIdx] ?? Infinity) >= (values[parentIdx] ?? Infinity)) {
      tracker.markSettled(currentIdx, { idx: currentIdx, value: values[currentIdx] });
      break;
    }

    tracker.heapSwap(currentIdx, parentIdx, { idxA: currentIdx, idxB: parentIdx });
    const temp = values[currentIdx]!;
    values[currentIdx] = values[parentIdx]!;
    values[parentIdx] = temp;

    currentIdx = parentIdx;
  }

  // If we reached the root without settling, mark it settled
  if (currentIdx === 0) {
    tracker.markSettled(0, { idx: 0, value: values[0] });
  }

  tracker.complete({ result: [...values] });

  return tracker.getSteps();
}
