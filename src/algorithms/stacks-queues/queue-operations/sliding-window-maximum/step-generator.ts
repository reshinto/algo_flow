/** Step generator for Sliding Window Maximum — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SWM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SLIDING_WINDOW_MAXIMUM!);

export interface SlidingWindowMaximumInput {
  nums: number[];
  windowSize: number;
}

export function generateSlidingWindowMaximumSteps(
  input: SlidingWindowMaximumInput,
): ExecutionStep[] {
  const { nums, windowSize } = input;
  const tracker = new QueueTracker(nums, SWM_LINE_MAP);

  // deque stores indices; we shadow the tracker's queue with our own index array
  const deque: number[] = [];
  const result: number[] = [];

  tracker.initialize({
    nums: [...nums],
    windowSize,
    deque: [],
    result: [],
  });

  for (let elementIdx = 0; elementIdx < nums.length; elementIdx++) {
    const currentValue = nums[elementIdx]!;

    tracker.processElement(elementIdx, {
      elementIdx,
      currentValue,
      deque: [...deque],
      result: [...result],
    });

    // Remove indices that have fallen outside the current window
    while (deque.length > 0 && deque[0]! <= elementIdx - windowSize) {
      const expiredIdx = deque[0]!;
      const expiredValue = nums[expiredIdx]!;
      tracker.dequeue(
        {
          elementIdx,
          expiredIdx,
          expiredValue,
          windowStart: elementIdx - windowSize + 1,
          deque: [...deque],
          result: [...result],
        },
        `Remove index ${expiredIdx} (value=${expiredValue}) — outside window starting at ${elementIdx - windowSize + 1}`,
      );
      deque.shift();
    }

    // Maintain monotonic decreasing order — remove smaller elements from the rear
    while (deque.length > 0 && nums[deque[deque.length - 1]!]! <= currentValue) {
      const smallerIdx = deque[deque.length - 1]!;
      const smallerValue = nums[smallerIdx]!;
      tracker.maintainDeque(
        {
          elementIdx,
          currentValue,
          smallerIdx,
          smallerValue,
          deque: [...deque],
          result: [...result],
        },
        `Remove index ${smallerIdx} (value=${smallerValue}) from rear — smaller than current ${currentValue}`,
      );
      deque.pop();
    }

    deque.push(elementIdx);
    tracker.enqueue(
      String(elementIdx),
      {
        elementIdx,
        currentValue,
        deque: [...deque],
        result: [...result],
      },
      `Enqueue index ${elementIdx} (value=${currentValue}) at deque rear`,
    );

    // Once the first full window is reached, record the maximum (front of deque)
    if (elementIdx >= windowSize - 1) {
      const maxIdx = deque[0]!;
      const maxValue = nums[maxIdx]!;
      result.push(maxValue);
      tracker.peekFront(
        {
          elementIdx,
          windowStart: elementIdx - windowSize + 1,
          maxIdx,
          maxValue,
          deque: [...deque],
          result: [...result],
        },
        `Window [${elementIdx - windowSize + 1}, ${elementIdx}] max = ${maxValue} at index ${maxIdx}`,
      );
    }
  }

  tracker.complete(
    {
      result: [...result],
      totalWindows: result.length,
    },
    `Sliding window maximum complete — ${result.length} windows, result: [${result.join(", ")}]`,
  );

  return tracker.getSteps();
}
