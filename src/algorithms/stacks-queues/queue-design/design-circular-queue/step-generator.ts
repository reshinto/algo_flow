/** Step generator for Design Circular Queue — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DCQ_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DESIGN_CIRCULAR_QUEUE!);

export interface DesignCircularQueueInput {
  operations: string[];
  capacity: number;
}

export function generateDesignCircularQueueSteps(input: DesignCircularQueueInput): ExecutionStep[] {
  const { operations, capacity } = input;

  // Local mirror of the ring buffer — used for variable snapshots and result derivation
  const localBuffer: (number | null)[] = new Array(capacity).fill(null);
  let frontIndex = -1;
  let rearIndex = -1;
  let queueSize = 0;
  const results: string[] = [];

  const tracker = new QueueTracker([], DCQ_LINE_MAP);
  tracker.initCircularBuffer(capacity);

  tracker.initialize({
    capacity,
    frontIndex,
    rearIndex,
    queueSize,
    results: [],
  });

  for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
    const operation = operations[operationIndex]!;

    if (operation.startsWith("enqueue")) {
      const valueStr = operation.split(" ")[1]!;
      const enqueueValue = parseInt(valueStr, 10);

      if (queueSize === capacity) {
        results.push("full");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, queueSize, results: [...results] },
          `Enqueue ${valueStr} rejected — queue is full (size ${queueSize} = capacity ${capacity})`,
        );
      } else {
        if (frontIndex === -1) {
          frontIndex = 0;
        }
        rearIndex = (rearIndex + 1) % capacity;
        localBuffer[rearIndex] = enqueueValue;
        queueSize++;
        results.push("true");
        tracker.circularEnqueue(
          enqueueValue,
          { operationIndex, operation, frontIndex, rearIndex, queueSize, results: [...results] },
          `Enqueue ${valueStr} at slot ${rearIndex} — front: ${frontIndex}, rear: ${rearIndex}, size: ${queueSize}`,
        );
      }
    } else if (operation === "dequeue") {
      if (queueSize === 0) {
        results.push("empty");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, queueSize, results: [...results] },
          "Dequeue — queue is empty",
        );
      } else {
        const dequeuedValue = localBuffer[frontIndex] ?? 0;
        localBuffer[frontIndex] = null;
        const prevFront = frontIndex;
        if (frontIndex === rearIndex) {
          frontIndex = -1;
          rearIndex = -1;
        } else {
          frontIndex = (frontIndex + 1) % capacity;
        }
        queueSize--;
        results.push(String(dequeuedValue));
        tracker.circularDequeue(
          {
            operationIndex,
            operation,
            frontIndex,
            rearIndex,
            queueSize,
            prevFront,
            dequeuedValue,
            results: [...results],
          },
          `Dequeue ${String(dequeuedValue)} from slot ${prevFront} — front: ${frontIndex}, rear: ${rearIndex}, size: ${queueSize}`,
        );
      }
    } else if (operation === "front") {
      const frontValue = frontIndex === -1 ? "empty" : String(localBuffer[frontIndex] ?? "empty");
      results.push(frontValue);
      tracker.peekFront(
        {
          operationIndex,
          operation,
          frontIndex,
          rearIndex,
          queueSize,
          peekValue: frontValue,
          results: [...results],
        },
        `Peek front — value: ${frontValue}, position: ${frontIndex}, size: ${queueSize}`,
      );
    } else if (operation === "rear") {
      const rearValue = rearIndex === -1 ? "empty" : String(localBuffer[rearIndex] ?? "empty");
      results.push(rearValue);
      tracker.peekFront(
        {
          operationIndex,
          operation,
          frontIndex,
          rearIndex,
          queueSize,
          peekValue: rearValue,
          results: [...results],
        },
        `Peek rear — value: ${rearValue}, position: ${rearIndex}, size: ${queueSize}`,
      );
    }
  }

  tracker.complete(
    { frontIndex, rearIndex, queueSize, results },
    `All ${operations.length} operations complete — ${results.length} results produced`,
  );

  return tracker.getSteps();
}
