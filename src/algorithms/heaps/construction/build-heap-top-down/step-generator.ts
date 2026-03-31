/** Step generator for Build Heap Top-Down — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_HEAP_TOP_DOWN!);

export interface BuildHeapTopDownInput {
  array: number[];
}

export function generateBuildHeapTopDownSteps(input: BuildHeapTopDownInput): ExecutionStep[] {
  const { array } = input;
  const heapValues: number[] = [];
  const tracker = new HeapTracker(heapValues, HEAP_LINE_MAP);

  tracker.initialize({ array: [...array], size: array.length });

  for (let insertIdx = 0; insertIdx < array.length; insertIdx++) {
    const value = array[insertIdx]!;

    tracker.addNode(value, { insertIdx, value });

    heapValues.push(value);
    let childIdx = heapValues.length - 1;

    tracker.startSiftUp(childIdx, { childIdx, value });

    while (childIdx > 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);

      tracker.compare(childIdx, parentIdx, {
        child: heapValues[childIdx],
        parent: heapValues[parentIdx],
      });

      if ((heapValues[childIdx] ?? Infinity) < (heapValues[parentIdx] ?? Infinity)) {
        tracker.heapSwap(childIdx, parentIdx, { idxA: childIdx, idxB: parentIdx });

        const temp = heapValues[childIdx]!;
        heapValues[childIdx] = heapValues[parentIdx]!;
        heapValues[parentIdx] = temp;

        childIdx = parentIdx;
      } else {
        tracker.markSettled(childIdx, { idx: childIdx, value: heapValues[childIdx] });
        break;
      }
    }

    if (childIdx === 0) {
      tracker.markSettled(0, { idx: 0, value: heapValues[0] });
    }
  }

  tracker.complete({ result: [...heapValues] });

  return tracker.getSteps();
}
