/** Step generator for Sum of Subarray Minimums — produces ExecutionStep[] using NumericStackTracker. */

import type { ExecutionStep } from "@/types";
import { NumericStackTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SOSM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUM_OF_SUBARRAY_MINIMUMS!);

export interface SumOfSubarrayMinimumsInput {
  arr: number[];
}

const MOD = 1_000_000_007;

export function generateSumOfSubarrayMinimumsSteps(
  input: SumOfSubarrayMinimumsInput,
): ExecutionStep[] {
  const { arr } = input;
  const arrayLength = arr.length;
  const tracker = new NumericStackTracker(arr, SOSM_LINE_MAP);
  tracker.setMonotonicOrder("increasing");

  const leftDistances: number[] = new Array(arrayLength).fill(0);
  const rightDistances: number[] = new Array(arrayLength).fill(0);
  const indexStack: number[] = [];

  tracker.initialize({
    arr,
    arrayLength,
    leftDistances: [...leftDistances],
    rightDistances: [...rightDistances],
  });

  // Pass 1: Compute left distances (previous less element)
  for (let elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
    const currentValue = arr[elementIdx]!;

    tracker.processElement(elementIdx, {
      elementIdx,
      currentValue,
      pass: "left",
      stackSize: indexStack.length,
    });

    while (indexStack.length > 0 && arr[indexStack[indexStack.length - 1]!]! >= currentValue) {
      const stackTopIdx = indexStack[indexStack.length - 1]!;
      const stackTopValue = arr[stackTopIdx]!;
      indexStack.pop();

      tracker.maintainMonotonic(
        { elementIdx, currentValue, stackTopIdx, stackTopValue, pass: "left" },
        `Pop index ${stackTopIdx} (value ${stackTopValue}) — it is ≥ ${currentValue}, not a previous-less boundary`,
      );
    }

    leftDistances[elementIdx] =
      indexStack.length === 0 ? elementIdx + 1 : elementIdx - indexStack[indexStack.length - 1]!;

    tracker.compare(
      {
        elementIdx,
        currentValue,
        leftDistance: leftDistances[elementIdx],
        stackTop: indexStack.length > 0 ? indexStack[indexStack.length - 1] : null,
        pass: "left",
      },
      `Left distance for index ${elementIdx} (value ${currentValue}) = ${leftDistances[elementIdx]!}`,
    );

    indexStack.push(elementIdx);

    tracker.pushIndex(
      elementIdx,
      { elementIdx, currentValue, leftDistance: leftDistances[elementIdx], pass: "left" },
      `Push index ${elementIdx} (value ${currentValue}) onto stack`,
    );
  }

  indexStack.length = 0;

  // Pass 2: Compute right distances (next less-or-equal element)
  for (let elementIdx = arrayLength - 1; elementIdx >= 0; elementIdx--) {
    const currentValue = arr[elementIdx]!;

    tracker.processElement(elementIdx, {
      elementIdx,
      currentValue,
      pass: "right",
      stackSize: indexStack.length,
    });

    while (indexStack.length > 0 && arr[indexStack[indexStack.length - 1]!]! > currentValue) {
      const stackTopIdx = indexStack[indexStack.length - 1]!;
      const stackTopValue = arr[stackTopIdx]!;
      indexStack.pop();

      tracker.maintainMonotonic(
        { elementIdx, currentValue, stackTopIdx, stackTopValue, pass: "right" },
        `Pop index ${stackTopIdx} (value ${stackTopValue}) — it is > ${currentValue}, not a next-less-or-equal boundary`,
      );
    }

    rightDistances[elementIdx] =
      indexStack.length === 0
        ? arrayLength - elementIdx
        : indexStack[indexStack.length - 1]! - elementIdx;

    tracker.compare(
      {
        elementIdx,
        currentValue,
        rightDistance: rightDistances[elementIdx],
        stackTop: indexStack.length > 0 ? indexStack[indexStack.length - 1] : null,
        pass: "right",
      },
      `Right distance for index ${elementIdx} (value ${currentValue}) = ${rightDistances[elementIdx]!}`,
    );

    indexStack.push(elementIdx);

    tracker.pushIndex(
      elementIdx,
      { elementIdx, currentValue, rightDistance: rightDistances[elementIdx], pass: "right" },
      `Push index ${elementIdx} (value ${currentValue}) onto stack`,
    );
  }

  // Pass 3: Sum contributions
  let totalSum = 0;
  for (let elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
    const contribution =
      arr[elementIdx]! * leftDistances[elementIdx]! * rightDistances[elementIdx]!;
    totalSum = (totalSum + contribution) % MOD;

    tracker.compare(
      {
        elementIdx,
        value: arr[elementIdx],
        leftDistance: leftDistances[elementIdx],
        rightDistance: rightDistances[elementIdx],
        contribution,
        totalSum,
        pass: "sum",
      },
      `Element ${arr[elementIdx]!} × left(${leftDistances[elementIdx]!}) × right(${rightDistances[elementIdx]!}) = ${contribution}, running sum = ${totalSum}`,
    );
  }

  tracker.complete({ result: totalSum, arrayLength }, `Sum of all subarray minimums = ${totalSum}`);

  return tracker.getSteps();
}
