/** Step generator for Contains Duplicate II — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CONTAINS_DUPLICATE_II_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CONTAINS_DUPLICATE_II!);

export interface ContainsDuplicateIIInput {
  numbers: number[];
  maxDistance: number;
}

export function generateContainsDuplicateIISteps(input: ContainsDuplicateIIInput): ExecutionStep[] {
  const { numbers, maxDistance } = input;
  const tracker = new HashMapTracker(numbers, CONTAINS_DUPLICATE_II_LINE_MAP);
  const indexMap = new Map<number, number>();

  tracker.initialize({ numbers, maxDistance });

  for (let currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
    const current = numbers[currentIndex]!;

    tracker.processElement(currentIndex, { currentIndex, current });
    tracker.checkDuplicate(String(current), { current, currentIndex });

    if (indexMap.has(current)) {
      const storedIndex = indexMap.get(current)!;
      if (Math.abs(currentIndex - storedIndex) <= maxDistance) {
        tracker.keyFound(String(current), storedIndex, currentIndex, {
          storedIndex,
          currentIndex,
          distance: Math.abs(currentIndex - storedIndex),
          result: true,
        });
        tracker.setResult(true);
        tracker.complete({ result: true });
        return tracker.getSteps();
      }
      // Too far — update stored index
      indexMap.set(current, currentIndex);
      tracker.updateValue(String(current), String(currentIndex), {
        current,
        oldIndex: storedIndex,
        newIndex: currentIndex,
      });
    } else {
      indexMap.set(current, currentIndex);
      tracker.insertKey(String(current), String(currentIndex), {
        key: current,
        value: currentIndex,
      });
    }
  }

  tracker.setResult(false);
  tracker.complete({ result: false });
  return tracker.getSteps();
}
