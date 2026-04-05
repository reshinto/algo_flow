/** Step generator for Min Stack — produces ExecutionStep[] using NumericStackTracker. */

import type { ExecutionStep } from "@/types";
import { NumericStackTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MIN_STACK!);

export interface MinStackInput {
  values: number[];
}

export function generateMinStackSteps(input: MinStackInput): ExecutionStep[] {
  const { values } = input;
  const tracker = new NumericStackTracker(values, MS_LINE_MAP);

  // Logical min tracker mirrors the auxiliary stack for comparison decisions
  const logicalMinStack: number[] = [];

  tracker.initialize({ values, mainStackSize: 0, minTrackerSize: 0 });

  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!;

    tracker.processElement(elementIdx, { elementIdx, currentValue });

    // Push current value onto main stack
    tracker.pushIndex(
      elementIdx,
      { elementIdx, currentValue, mainStackSize: elementIdx + 1 },
      `Push ${currentValue} onto main stack`,
    );

    // Determine what value goes on the auxiliary min stack
    const currentMin =
      logicalMinStack.length === 0 ? currentValue : logicalMinStack[logicalMinStack.length - 1]!;
    const isNewMin = logicalMinStack.length === 0 || currentValue <= currentMin;

    tracker.compare(
      {
        elementIdx,
        currentValue,
        currentMin: logicalMinStack.length === 0 ? "empty" : currentMin,
        isNewMin,
      },
      isNewMin
        ? `${currentValue} ≤ current min (${logicalMinStack.length === 0 ? "empty stack" : currentMin}) — push ${currentValue} as new min`
        : `${currentValue} > current min ${currentMin} — duplicate ${currentMin} onto min stack`,
    );

    const minValueToPush = isNewMin ? currentValue : currentMin;
    logicalMinStack.push(minValueToPush);

    tracker.pushAuxiliary(
      String(minValueToPush),
      { elementIdx, currentValue, minValueToPush, minTrackerSize: logicalMinStack.length },
      `Push ${minValueToPush} onto min tracker — current minimum is ${minValueToPush}`,
    );
  }

  const finalMin = logicalMinStack[logicalMinStack.length - 1] ?? 0;

  tracker.peek(
    { finalMin, totalElements: values.length },
    `getMin() → ${finalMin} — peek top of min tracker`,
  );

  tracker.complete(
    { finalMin, totalElements: values.length },
    `Min Stack complete — minimum value is ${finalMin}`,
  );

  return tracker.getSteps();
}
