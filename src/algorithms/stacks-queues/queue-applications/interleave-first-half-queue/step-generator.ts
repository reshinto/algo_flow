/** Step generator for Interleave First Half Queue — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const IFHQ_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTERLEAVE_FIRST_HALF_QUEUE!);

export interface InterleaveFirstHalfQueueInput {
  values: number[];
}

export function generateInterleaveFirstHalfQueueSteps(
  input: InterleaveFirstHalfQueueInput,
): ExecutionStep[] {
  const { values } = input;
  const tracker = new QueueTracker(values, IFHQ_LINE_MAP);

  const halfSize = Math.floor(values.length / 2);

  // Mirror the algorithm state
  const queue: number[] = [...values];
  const stack: number[] = [];

  tracker.initialize({
    values,
    halfSize,
    queue: [...queue],
    stack: [],
  });

  // Populate tracker queue to match algorithm start
  for (const value of values) {
    tracker.enqueue(
      String(value),
      { values, halfSize, queue: [...queue], stack: [] },
      `Enqueue ${String(value)} — populate initial queue`,
    );
  }

  // Phase 1: Dequeue first half into stack
  tracker.setPhase("Phase 1: Move first half to stack");
  for (let fillIdx = 0; fillIdx < halfSize; fillIdx++) {
    const value = queue.shift()!;
    stack.push(value);
    tracker.dequeue(
      { fillIdx, queue: [...queue], stack: [...stack] },
      `Dequeue ${String(value)} — move element ${fillIdx + 1} of ${halfSize} to stack`,
    );
    tracker.pushToStack(
      String(value),
      { fillIdx, queue: [...queue], stack: [...stack] },
      `Push ${String(value)} onto stack`,
    );
  }

  // Phase 2: Enqueue stack back to queue (reverses first half)
  tracker.setPhase("Phase 2: Enqueue stack back to queue");
  while (stack.length > 0) {
    const value = stack.pop()!;
    queue.push(value);
    tracker.popFromStack(
      { queue: [...queue], stack: [...stack] },
      `Pop ${String(value)} from stack`,
    );
    tracker.enqueue(
      String(value),
      { queue: [...queue], stack: [...stack] },
      `Enqueue ${String(value)} — reversed first half element appended to queue`,
    );
  }

  // Phase 3: Rotate second half to rear
  tracker.setPhase("Phase 3: Rotate second half to rear");
  for (let rotateIdx = 0; rotateIdx < halfSize; rotateIdx++) {
    const value = queue.shift()!;
    queue.push(value);
    tracker.transfer(
      "queue",
      "queue",
      { rotateIdx, queue: [...queue] },
      `Move ${String(value)} from front to rear — shift second half element ${rotateIdx + 1} of ${halfSize}`,
    );
  }

  // Phase 4: Dequeue first half (now at front) into stack
  tracker.setPhase("Phase 4: Move reordered first half to stack");
  for (let refillIdx = 0; refillIdx < halfSize; refillIdx++) {
    const value = queue.shift()!;
    stack.push(value);
    tracker.dequeue(
      { refillIdx, queue: [...queue], stack: [...stack] },
      `Dequeue ${String(value)} — fill stack with first half element ${refillIdx + 1} of ${halfSize}`,
    );
    tracker.pushToStack(
      String(value),
      { refillIdx, queue: [...queue], stack: [...stack] },
      `Push ${String(value)} onto stack`,
    );
  }

  // Phase 5: Interleave
  tracker.setPhase("Phase 5: Interleave stack and queue");
  const result: number[] = [];
  while (stack.length > 0) {
    const fromStack = stack.pop()!;
    result.push(fromStack);
    tracker.popFromStack(
      { queue: [...queue], stack: [...stack], result: [...result] },
      `Pop ${String(fromStack)} from stack — first-half element`,
    );

    const fromQueue = queue.shift()!;
    result.push(fromQueue);
    tracker.dequeue(
      { queue: [...queue], stack: [...stack], result: [...result] },
      `Dequeue ${String(fromQueue)} from queue — second-half element`,
    );
  }

  if (queue.length > 0) {
    const remaining = queue.shift()!;
    result.push(remaining);
    tracker.dequeue(
      { queue: [...queue], result: [...result] },
      `Dequeue ${String(remaining)} — odd-length remainder`,
    );
  }

  tracker.complete({ values, result: [...result] }, `Interleaved result: [${result.join(", ")}]`);

  return tracker.getSteps();
}
