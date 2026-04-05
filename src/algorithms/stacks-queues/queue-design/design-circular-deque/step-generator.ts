/** Step generator for Design Circular Deque — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DCD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DESIGN_CIRCULAR_DEQUE!);

export interface DesignCircularDequeInput {
  operations: string[];
  capacity: number;
}

export function generateDesignCircularDequeSteps(input: DesignCircularDequeInput): ExecutionStep[] {
  const { operations, capacity } = input;

  // Local mirror of the ring buffer — used for variable snapshots and result derivation
  const localBuffer: (number | null)[] = new Array(capacity).fill(null);
  let frontIndex = -1;
  let rearIndex = -1;
  let dequeSize = 0;
  const results: string[] = [];

  const tracker = new QueueTracker([], DCD_LINE_MAP);
  tracker.initCircularBuffer(capacity);

  tracker.initialize({
    capacity,
    frontIndex,
    rearIndex,
    dequeSize,
    results: [],
  });

  for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
    const operation = operations[operationIndex]!;

    if (operation.startsWith("pushBack")) {
      const valueStr = operation.split(" ")[1]!;
      const pushBackValue = parseInt(valueStr, 10);

      if (dequeSize === capacity) {
        results.push("full");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          `PushBack ${valueStr} rejected — deque is full (size ${dequeSize} = capacity ${capacity})`,
        );
      } else {
        if (frontIndex === -1) {
          frontIndex = 0;
        }
        rearIndex = (rearIndex + 1) % capacity;
        localBuffer[rearIndex] = pushBackValue;
        dequeSize++;
        results.push("true");
        tracker.circularEnqueue(
          pushBackValue,
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          `PushBack ${valueStr} at slot ${rearIndex} — front: ${frontIndex}, rear: ${rearIndex}, size: ${dequeSize}`,
        );
      }
    } else if (operation.startsWith("pushFront")) {
      const valueStr = operation.split(" ")[1]!;
      const pushFrontValue = parseInt(valueStr, 10);

      if (dequeSize === capacity) {
        results.push("full");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          `PushFront ${valueStr} rejected — deque is full (size ${dequeSize} = capacity ${capacity})`,
        );
      } else {
        if (frontIndex === -1) {
          frontIndex = 0;
          rearIndex = 0;
        } else {
          frontIndex = (frontIndex - 1 + capacity) % capacity;
        }
        localBuffer[frontIndex] = pushFrontValue;
        dequeSize++;
        results.push("true");
        tracker.enqueueFront(
          String(pushFrontValue),
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          `PushFront ${valueStr} at slot ${frontIndex} — front: ${frontIndex}, rear: ${rearIndex}, size: ${dequeSize}`,
        );
      }
    } else if (operation === "popFront") {
      if (dequeSize === 0) {
        results.push("empty");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          "PopFront — deque is empty",
        );
      } else {
        const poppedValue = localBuffer[frontIndex] ?? 0;
        localBuffer[frontIndex] = null;
        const prevFront = frontIndex;
        if (frontIndex === rearIndex) {
          frontIndex = -1;
          rearIndex = -1;
        } else {
          frontIndex = (frontIndex + 1) % capacity;
        }
        dequeSize--;
        results.push(String(poppedValue));
        tracker.circularDequeue(
          {
            operationIndex,
            operation,
            frontIndex,
            rearIndex,
            dequeSize,
            prevFront,
            poppedValue,
            results: [...results],
          },
          `PopFront ${String(poppedValue)} from slot ${prevFront} — front: ${frontIndex}, rear: ${rearIndex}, size: ${dequeSize}`,
        );
      }
    } else if (operation === "popBack") {
      if (dequeSize === 0) {
        results.push("empty");
        tracker.peekFront(
          { operationIndex, operation, frontIndex, rearIndex, dequeSize, results: [...results] },
          "PopBack — deque is empty",
        );
      } else {
        const poppedValue = localBuffer[rearIndex] ?? 0;
        localBuffer[rearIndex] = null;
        const prevRear = rearIndex;
        if (frontIndex === rearIndex) {
          frontIndex = -1;
          rearIndex = -1;
        } else {
          rearIndex = (rearIndex - 1 + capacity) % capacity;
        }
        dequeSize--;
        results.push(String(poppedValue));
        tracker.dequeueRear(
          {
            operationIndex,
            operation,
            frontIndex,
            rearIndex,
            dequeSize,
            prevRear,
            poppedValue,
            results: [...results],
          },
          `PopBack ${String(poppedValue)} from slot ${prevRear} — front: ${frontIndex}, rear: ${rearIndex}, size: ${dequeSize}`,
        );
      }
    } else if (operation === "peekFront") {
      const frontValue = frontIndex === -1 ? "empty" : String(localBuffer[frontIndex] ?? "empty");
      results.push(frontValue);
      tracker.peekFront(
        {
          operationIndex,
          operation,
          frontIndex,
          rearIndex,
          dequeSize,
          peekValue: frontValue,
          results: [...results],
        },
        `Peek front — value: ${frontValue}, position: ${frontIndex}, size: ${dequeSize}`,
      );
    } else if (operation === "peekRear") {
      const rearValue = rearIndex === -1 ? "empty" : String(localBuffer[rearIndex] ?? "empty");
      results.push(rearValue);
      tracker.peekFront(
        {
          operationIndex,
          operation,
          frontIndex,
          rearIndex,
          dequeSize,
          peekValue: rearValue,
          results: [...results],
        },
        `Peek rear — value: ${rearValue}, position: ${rearIndex}, size: ${dequeSize}`,
      );
    }
  }

  tracker.complete(
    { frontIndex, rearIndex, dequeSize, results },
    `All ${operations.length} operations complete — ${results.length} results produced`,
  );

  return tracker.getSteps();
}
