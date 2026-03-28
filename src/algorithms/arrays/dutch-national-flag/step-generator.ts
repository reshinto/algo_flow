/** Step generator for Dutch National Flag — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DUTCH_NATIONAL_FLAG!);

interface DutchNationalFlagInput {
  inputArray: number[];
}

export function generateDutchNationalFlagSteps(input: DutchNationalFlagInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    lowPointer: 0,
    midPointer: 0,
    highPointer: inputArray.length - 1,
  });

  if (inputArray.length === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const workArray = [...inputArray];
  let lowPointer = 0;
  let midPointer = 0;
  let highPointer = workArray.length - 1;

  while (midPointer <= highPointer) {
    const currentValue = workArray[midPointer]!;

    tracker.visit(
      midPointer,
      {
        lowPointer,
        midPointer,
        highPointer,
        currentValue,
        action:
          currentValue === 0 ? "swap-with-low" : currentValue === 1 ? "skip" : "swap-with-high",
      },
      `Examine element ${currentValue} at mid=${midPointer} — ${
        currentValue === 0
          ? `0: swap with low (${lowPointer}), advance both`
          : currentValue === 1
            ? `1: already in place, advance mid`
            : `2: swap with high (${highPointer}), retreat high`
      }`,
    );

    if (currentValue === 0) {
      tracker.swap(
        lowPointer,
        midPointer,
        {
          lowPointer,
          midPointer,
          highPointer,
          swappedValue: currentValue,
        },
        `Swap 0 at mid=${midPointer} with low=${lowPointer}`,
      );

      const tempValue = workArray[lowPointer]!;
      workArray[lowPointer] = workArray[midPointer]!;
      workArray[midPointer] = tempValue;
      lowPointer++;
      midPointer++;

      tracker.markElement(
        lowPointer - 1,
        "sorted",
        { lowPointer, midPointer, highPointer, region: "zeros" },
        `0 placed in sorted zero-region at index ${lowPointer - 1}`,
      );
    } else if (currentValue === 1) {
      midPointer++;

      tracker.markElement(
        midPointer - 1,
        "sorted",
        { lowPointer, midPointer, highPointer, region: "ones" },
        `1 is in place at index ${midPointer - 1}`,
      );
    } else {
      tracker.swap(
        midPointer,
        highPointer,
        {
          lowPointer,
          midPointer,
          highPointer,
          swappedValue: currentValue,
        },
        `Swap 2 at mid=${midPointer} with high=${highPointer}`,
      );

      const tempValue = workArray[highPointer]!;
      workArray[highPointer] = workArray[midPointer]!;
      workArray[midPointer] = tempValue;
      highPointer--;

      tracker.markElement(
        highPointer + 1,
        "sorted",
        { lowPointer, midPointer, highPointer, region: "twos" },
        `2 placed in sorted two-region at index ${highPointer + 1}`,
      );
    }
  }

  tracker.complete({
    result: [...workArray],
    zerosCount: workArray.filter((value) => value === 0).length,
    onesCount: workArray.filter((value) => value === 1).length,
    twosCount: workArray.filter((value) => value === 2).length,
  });

  return tracker.getSteps();
}
