/** Step generator for Number of Recent Calls — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const NORC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.NUMBER_OF_RECENT_CALLS!);

export interface NumberOfRecentCallsInput {
  timestamps: number[];
}

export function generateNumberOfRecentCallsSteps(input: NumberOfRecentCallsInput): ExecutionStep[] {
  const { timestamps } = input;
  const tracker = new QueueTracker(timestamps, NORC_LINE_MAP);

  const windowQueue: number[] = [];
  const results: number[] = [];

  tracker.initialize({
    queue: [],
    results: [],
  });

  for (let timestampIdx = 0; timestampIdx < timestamps.length; timestampIdx++) {
    const currentTimestamp = timestamps[timestampIdx]!;

    tracker.processElement(timestampIdx, {
      timestampIdx,
      currentTimestamp,
      windowSize: windowQueue.length,
    });

    windowQueue.push(currentTimestamp);
    tracker.enqueue(
      String(currentTimestamp),
      {
        timestampIdx,
        currentTimestamp,
        queueSize: windowQueue.length,
      },
      `Enqueue timestamp ${String(currentTimestamp)} — add to rear of window queue`,
    );

    // Expire timestamps outside the 3000ms window
    while (windowQueue.length > 0 && windowQueue[0]! < currentTimestamp - 3000) {
      const expiredTimestamp = windowQueue[0]!;
      windowQueue.shift();
      tracker.dequeue(
        {
          expiredTimestamp,
          currentTimestamp,
          threshold: currentTimestamp - 3000,
          queueSize: windowQueue.length,
        },
        `Dequeue ${String(expiredTimestamp)} — expired (< ${String(currentTimestamp - 3000)})`,
      );
    }

    results.push(windowQueue.length);
    tracker.complete(
      {
        currentTimestamp,
        recentCallCount: windowQueue.length,
        results: [...results],
      },
      `${String(windowQueue.length)} call${windowQueue.length === 1 ? "" : "s"} in window [${String(currentTimestamp - 3000)}, ${String(currentTimestamp)}]`,
    );
  }

  return tracker.getSteps();
}
