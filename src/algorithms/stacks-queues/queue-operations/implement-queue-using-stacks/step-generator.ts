/** Step generator for Implement Queue Using Stacks — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const IQUS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IMPLEMENT_QUEUE_USING_STACKS!);

export interface ImplementQueueUsingStacksInput {
  values: number[];
}

export function generateImplementQueueUsingStacksSteps(
  input: ImplementQueueUsingStacksInput,
): ExecutionStep[] {
  const { values } = input;

  // stackElements = inputStack, queueElements = outputStack
  // transfer("stack","queue") pops stackElements top → pushes queueElements rear
  // After full transfer of inputStack [1,2,3] (top=3): queueElements = [3,2,1]
  // dequeueRear removes queueElements rear = element 1, then 2, then 3 → FIFO order
  const tracker = new QueueTracker(values, IQUS_LINE_MAP);

  tracker.initialize({
    inputStack: [],
    outputStack: [],
    dequeueResults: [],
  });

  // Push phase — enqueue all values onto the input stack
  tracker.setPhase("Push Phase");
  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!;

    tracker.processElement(elementIdx, {
      elementIdx,
      currentValue,
      phase: "push",
    });

    tracker.pushToStack(String(currentValue), {
      elementIdx,
      currentValue,
      inputStackSize: elementIdx + 1,
    });
  }

  // Dequeue phase — transfer inputStack → outputStack, then dequeue rear (preserves FIFO)
  tracker.setPhase("Dequeue Phase");

  // Mirror the logical stack states to generate accurate variable snapshots
  const inputStackMirror = [...values]; // bottom-to-top: last element is top
  const outputStackMirror: number[] = []; // bottom-to-top: last element is top
  const dequeueResults: number[] = [];
  let transferCount = 0;

  while (inputStackMirror.length > 0 || outputStackMirror.length > 0) {
    if (outputStackMirror.length === 0) {
      // Transfer all elements: inputStack top → outputStack top reverses insertion order
      while (inputStackMirror.length > 0) {
        const transferredValue = inputStackMirror.pop()!;
        outputStackMirror.push(transferredValue);
        transferCount++;
        tracker.transfer("stack", "queue", {
          transferredValue,
          transferCount,
          inputStackSize: inputStackMirror.length,
          outputStackSize: outputStackMirror.length,
        });
      }
    }

    // outputStackMirror bottom = first-enqueued element = FIFO front
    // dequeueRear removes queueElements rear = outputStack bottom = correct FIFO element
    const dequeuedValue = outputStackMirror.pop()!;
    tracker.dequeueRear(
      {
        dequeuedValue,
        dequeueCount: dequeueResults.length + 1,
        outputStackSize: outputStackMirror.length,
      },
      `Dequeue ${String(dequeuedValue)} — first in, first out`,
    );
    dequeueResults.push(dequeuedValue);
  }

  tracker.complete(
    { dequeueResults },
    `Queue emptied — all ${values.length} values dequeued in FIFO order`,
  );

  return tracker.getSteps();
}
