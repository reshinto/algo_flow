import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FIND_ALL_DUPLICATES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FIND_ALL_DUPLICATES!);

export interface FindAllDuplicatesInput {
  numbers: number[];
}

export function generateFindAllDuplicatesSteps(input: FindAllDuplicatesInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers.map(String), FIND_ALL_DUPLICATES_LINE_MAP);
  const seenSet = new Set<number>();
  const duplicates: number[] = [];

  tracker.initialize({ numbers, duplicates: [] });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum });
    tracker.checkDuplicate(String(currentNum), { currentNum, seen: seenSet.has(currentNum) });

    if (seenSet.has(currentNum)) {
      duplicates.push(currentNum);
      tracker.keyFound(String(currentNum), elementIndex, elementIndex, {
        currentNum,
        duplicates: [...duplicates],
      });
    } else {
      seenSet.add(currentNum);
      tracker.insertKey(String(currentNum), "seen", { currentNum });
    }
  }

  tracker.setResult(duplicates);
  tracker.complete({ result: duplicates });
  return tracker.getSteps();
}
