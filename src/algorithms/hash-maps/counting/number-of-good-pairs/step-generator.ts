import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const NUMBER_OF_GOOD_PAIRS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.NUMBER_OF_GOOD_PAIRS!);

export interface NumberOfGoodPairsInput {
  numbers: number[];
}

export function generateNumberOfGoodPairsSteps(input: NumberOfGoodPairsInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers.map(String), NUMBER_OF_GOOD_PAIRS_LINE_MAP);
  const frequencyMap = new Map<number, number>();
  let totalPairs = 0;

  tracker.initialize({ numbers, totalPairs });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    tracker.processElement(elementIndex, { elementIndex, currentNum, totalPairs });
    const currentCount = frequencyMap.get(currentNum) ?? 0;

    if (currentCount > 0) {
      totalPairs += currentCount;
      tracker.keyFound(String(currentNum), elementIndex, elementIndex, {
        currentNum,
        currentCount,
        newPairs: currentCount,
        totalPairs,
      });
    }

    frequencyMap.set(currentNum, currentCount + 1);
    tracker.incrementCount(String(currentNum), {
      elementIndex,
      currentNum,
      count: currentCount + 1,
      totalPairs,
    });
  }

  tracker.setResult(totalPairs);
  tracker.complete({ result: totalPairs });
  return tracker.getSteps();
}
