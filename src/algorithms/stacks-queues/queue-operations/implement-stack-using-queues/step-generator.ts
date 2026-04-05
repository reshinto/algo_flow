/** Step generator for Implement Stack Using Queues — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ISUQ_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IMPLEMENT_STACK_USING_QUEUES!);

export interface ImplementStackUsingQueuesInput {
  values: number[];
}

export function generateImplementStackUsingQueuesSteps(
  input: ImplementStackUsingQueuesInput,
): ExecutionStep[] {
  const { values } = input;

  // queueElements mirrors the single queue.
  // After each push+rotation the new value sits at the front — LIFO top.
  const tracker = new QueueTracker(values, ISUQ_LINE_MAP);

  tracker.initialize({
    queue: [],
    popResults: [],
  });

  // Push phase — enqueue each value then rotate prior elements behind it
  tracker.setPhase("Push Phase");

  const queueMirror: number[] = [];

  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!;

    tracker.processElement(elementIdx, {
      elementIdx,
      currentValue,
      phase: "push",
    });

    // Enqueue the new value at the rear
    queueMirror.push(currentValue);
    tracker.enqueue(String(currentValue), {
      elementIdx,
      currentValue,
      queueSize: queueMirror.length,
    });

    // Rotate: move queue.length-1 elements from front to rear
    const rotationCount = queueMirror.length - 1;
    for (let rotationIdx = 0; rotationIdx < rotationCount; rotationIdx++) {
      const transferred = queueMirror.shift()!;
      queueMirror.push(transferred);
      tracker.transfer(
        "queue",
        "queue",
        {
          rotationIdx,
          transferred,
          queueSize: queueMirror.length,
        },
        `Rotate ${String(transferred)} to the rear — new element stays at front`,
      );
    }
  }

  // Pop phase — front of queue is the LIFO top
  tracker.setPhase("Pop Phase");

  const popResults: number[] = [];

  while (queueMirror.length > 0) {
    const poppedValue = queueMirror.shift()!;
    popResults.push(poppedValue);
    tracker.dequeue(
      {
        poppedValue,
        popCount: popResults.length,
        queueSize: queueMirror.length,
      },
      `Pop ${String(poppedValue)} — last in, first out`,
    );
  }

  tracker.complete(
    { popResults },
    `Stack emptied — all ${values.length} values popped in LIFO order`,
  );

  return tracker.getSteps();
}
