/** Step generator for Max Frequency Stack — produces ExecutionStep[] using NumericStackTracker. */

import type { ExecutionStep } from "@/types";
import { NumericStackTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAX_FREQUENCY_STACK!);

export interface MaxFrequencyStackInput {
  values: number[];
}

export function generateMaxFrequencyStackSteps(input: MaxFrequencyStackInput): ExecutionStep[] {
  const { values } = input;
  const tracker = new NumericStackTracker(values, MFS_LINE_MAP);

  // Logical data structures that mirror what the source algorithm maintains
  const freqMap: Record<number, number> = {};
  const freqStacks: Record<number, number[]> = {};
  let maxFrequency = 0;

  tracker.initialize({ values, maxFrequency, freqMapSize: 0 });

  // Push phase: process each element and update frequency structures
  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!;
    const prevFreq = freqMap[currentValue] ?? 0;
    const currentFreq = prevFreq + 1;
    freqMap[currentValue] = currentFreq;

    if (currentFreq > maxFrequency) {
      maxFrequency = currentFreq;
    }

    if (!freqStacks[currentFreq]) {
      freqStacks[currentFreq] = [];
    }
    freqStacks[currentFreq]!.push(currentValue);

    tracker.processElement(elementIdx, { elementIdx, currentValue, prevFreq, currentFreq });

    tracker.compare(
      { elementIdx, currentValue, currentFreq, maxFrequency },
      `${currentValue} frequency is now ${currentFreq} — max frequency is ${maxFrequency}`,
    );

    tracker.pushIndex(
      elementIdx,
      { elementIdx, currentValue, currentFreq, maxFrequency },
      `Push ${currentValue} onto freq-${currentFreq} stack`,
    );
  }

  // Pop phase: pop the most frequent element repeatedly
  const popResults: number[] = [];

  while (maxFrequency > 0) {
    const topStack = freqStacks[maxFrequency]!;
    const popped = topStack.pop()!;
    freqMap[popped] = (freqMap[popped] ?? 1) - 1;

    if (topStack.length === 0) {
      maxFrequency--;
    }

    popResults.push(popped);

    tracker.popAndResolve(
      popped,
      { popped, maxFrequency, popCount: popResults.length },
      `Pop most frequent: ${popped} — new max frequency is ${maxFrequency}`,
    );
  }

  tracker.complete(
    { popResults, totalPops: popResults.length },
    `Max Frequency Stack complete — pop order: [${popResults.join(", ")}]`,
  );

  return tracker.getSteps();
}
