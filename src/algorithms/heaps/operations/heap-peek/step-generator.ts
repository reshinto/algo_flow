/** Step generator for Heap Peek — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HEAP_PEEK!);

export interface HeapPeekInput {
  array: number[];
}

export function generateHeapPeekSteps(input: HeapPeekInput): ExecutionStep[] {
  const { array } = input;
  const values = [...array];
  const tracker = new HeapTracker(values, HEAP_LINE_MAP);

  tracker.initialize({ array: [...values], size: values.length });

  // Highlight the root — it is always the minimum in a valid min-heap
  tracker.markHighlighted(0, { minimumValue: values[0], idx: 0 });

  tracker.complete({ result: values[0] });

  return tracker.getSteps();
}
