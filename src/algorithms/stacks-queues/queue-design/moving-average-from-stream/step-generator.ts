/** Step generator for Moving Average from Stream — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MAFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MOVING_AVERAGE_FROM_STREAM!);

export interface MovingAverageFromStreamInput {
  values: number[];
  windowSize: number;
}

export function generateMovingAverageFromStreamSteps(
  input: MovingAverageFromStreamInput,
): ExecutionStep[] {
  const { values, windowSize } = input;

  const localQueue: number[] = [];
  let runningSum = 0;
  const averages: number[] = [];

  const tracker = new QueueTracker(values, MAFS_LINE_MAP);

  tracker.initialize({
    windowSize,
    queueSize: 0,
    runningSum,
    averages: [],
  });

  for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
    const currentValue = values[valueIndex]!;

    tracker.processElement(valueIndex, {
      valueIndex,
      currentValue,
      queueSize: localQueue.length,
      runningSum,
      averages: [...averages],
    });

    localQueue.push(currentValue);
    runningSum += currentValue;

    tracker.enqueue(
      String(currentValue),
      {
        valueIndex,
        currentValue,
        queueSize: localQueue.length,
        runningSum,
        averages: [...averages],
      },
      `Enqueue ${currentValue} — running sum is now ${runningSum}`,
    );

    if (localQueue.length > windowSize) {
      const evicted = localQueue[0]!;
      runningSum -= evicted;
      localQueue.shift();

      tracker.dequeue(
        {
          valueIndex,
          currentValue,
          evicted,
          queueSize: localQueue.length,
          runningSum,
          averages: [...averages],
        },
        `Dequeue ${evicted} — window full, running sum adjusted to ${runningSum}`,
      );
    }

    const currentAverage = runningSum / localQueue.length;
    averages.push(currentAverage);
  }

  tracker.complete(
    { windowSize, averages, totalValues: values.length },
    `All ${values.length} values processed — ${averages.length} averages computed`,
  );

  return tracker.getSteps();
}
