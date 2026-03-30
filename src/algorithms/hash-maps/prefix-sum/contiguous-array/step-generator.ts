import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CONTIGUOUS_ARRAY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CONTIGUOUS_ARRAY!);

export interface ContiguousArrayInput {
  numbers: number[];
}

export function generateContiguousArraySteps(input: ContiguousArrayInput): ExecutionStep[] {
  const { numbers } = input;
  const tracker = new HashMapTracker(numbers.map(String), CONTIGUOUS_ARRAY_LINE_MAP);
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, -1);
  let runningSum = 0;
  let maxLength = 0;

  tracker.initialize({ numbers });
  tracker.insertKey("0", "-1", { runningSum: 0, index: -1 });

  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    runningSum += currentNum === 0 ? -1 : 1;
    tracker.processElement(elementIndex, { elementIndex, currentNum, runningSum });
    tracker.setPrefixSum(runningSum);

    tracker.checkPrefix(String(runningSum), { runningSum, maxLength });

    const previousIndex = prefixSumMap.get(runningSum);
    if (previousIndex !== undefined) {
      const subarrayLength = elementIndex - previousIndex;
      maxLength = Math.max(maxLength, subarrayLength);
      tracker.prefixFound(String(runningSum), { previousIndex, subarrayLength, maxLength });
    } else {
      prefixSumMap.set(runningSum, elementIndex);
      tracker.insertKey(String(runningSum), String(elementIndex), { runningSum, elementIndex });
    }
  }

  tracker.setResult(maxLength);
  tracker.complete({ result: maxLength });
  return tracker.getSteps();
}
