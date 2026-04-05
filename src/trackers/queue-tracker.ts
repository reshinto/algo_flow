/**
 * Queue tracker — builds execution steps for queue, deque, and circular buffer
 * algorithms. Maintains queue contents, optional stack (for two-stack problems),
 * circular buffer state, and numeric input arrays.
 */
import type {
  StackElement,
  StackElementState,
  NumericInputElement,
  NumericInputState,
  CircularBufferState,
  StackQueueVisualState,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class QueueTracker extends BaseTracker {
  private queueElements: StackElement[] = [];
  private stackElements: StackElement[] = [];
  private auxiliaryStack: StackElement[] = [];
  private inputArray: NumericInputElement[];
  private inputIndex: number = -1;
  private statusMessage: string | null = null;
  private circularBuffer: CircularBufferState | undefined = undefined;
  private phase: string | undefined = undefined;

  constructor(inputArray: (string | number)[], lineMap: LineMap) {
    super(lineMap);
    this.inputArray = inputArray.map((value, index) => ({
      value: typeof value === "number" ? value : 0,
      index,
      state: "default" as NumericInputState,
    }));
  }

  private snapshot(): StackQueueVisualState {
    return {
      kind: "stack-queue",
      stackElements: this.stackElements.map((element) => ({ ...element })),
      inputChars: [],
      inputIndex: this.inputIndex,
      statusMessage: this.statusMessage,
      queueElements: this.queueElements.map((element) => ({ ...element })),
      auxiliaryStack:
        this.auxiliaryStack.length > 0
          ? this.auxiliaryStack.map((element) => ({ ...element }))
          : undefined,
      inputArray:
        this.inputArray.length > 0 ? this.inputArray.map((element) => ({ ...element })) : undefined,
      circularBuffer: this.circularBuffer
        ? { ...this.circularBuffer, elements: [...this.circularBuffer.elements] }
        : undefined,
      phase: this.phase,
    };
  }

  private setInputState(idx: number, state: NumericInputState): void {
    const element = this.inputArray[idx];
    if (element) element.state = state;
  }

  private setQueueFrontState(state: StackElementState): void {
    const front = this.queueElements[0];
    if (front) front.state = state;
  }

  private setQueueRearState(state: StackElementState): void {
    const rear = this.queueElements[this.queueElements.length - 1];
    if (rear) rear.state = state;
  }

  private setStackTopState(state: StackElementState): void {
    const top = this.stackElements[this.stackElements.length - 1];
    if (top) top.state = state;
  }

  setPhase(phaseLabel: string): void {
    this.phase = phaseLabel;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty queue and prepare to process input",
      variables,
      visualState: this.snapshot(),
    });
  }

  processElement(idx: number, variables: Record<string, unknown>): void {
    this.inputIndex = idx;
    this.setInputState(idx, "current");
    const element = this.inputArray[idx];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Process element ${String(element?.value)} at index ${idx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  enqueue(value: string, variables: Record<string, unknown>, description?: string): void {
    this.queueElements.push({ value, state: "pushing" });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "enqueue",
      description: description ?? `Enqueue '${value}' at the rear of the queue`,
      variables,
      visualState: this.snapshot(),
    });
    this.setQueueRearState("default");
  }

  dequeue(variables: Record<string, unknown>, description?: string): string {
    this.setQueueFrontState("popping");
    const front = this.queueElements[0];
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "dequeue",
      description: description ?? `Dequeue '${front?.value ?? ""}' from the front of the queue`,
      variables,
      visualState: this.snapshot(),
    });
    this.queueElements.shift();
    return front?.value ?? "";
  }

  enqueueFront(value: string, variables: Record<string, unknown>, description?: string): void {
    this.queueElements.unshift({ value, state: "pushing" });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "enqueue-front",
      description: description ?? `Enqueue '${value}' at the front of the deque`,
      variables,
      visualState: this.snapshot(),
    });
    this.setQueueFrontState("default");
  }

  dequeueRear(variables: Record<string, unknown>, description?: string): string {
    this.setQueueRearState("popping");
    const rear = this.queueElements[this.queueElements.length - 1];
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "dequeue-rear",
      description: description ?? `Dequeue '${rear?.value ?? ""}' from the rear of the deque`,
      variables,
      visualState: this.snapshot(),
    });
    this.queueElements.pop();
    return rear?.value ?? "";
  }

  peekFront(variables: Record<string, unknown>, description?: string): void {
    const front = this.queueElements[0];
    this.pushStep({
      type: "peek",
      description: description ?? `Peek at queue front: ${front?.value ?? "empty"}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  pushToStack(value: string, variables: Record<string, unknown>, description?: string): void {
    this.stackElements.push({ value, state: "pushing" });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: description ?? `Push '${value}' onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  popFromStack(variables: Record<string, unknown>, description?: string): string {
    this.setStackTopState("popping");
    const top = this.stackElements[this.stackElements.length - 1];
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "pop",
      description: description ?? `Pop '${top?.value ?? ""}' from the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();
    return top?.value ?? "";
  }

  transfer(
    from: "stack" | "queue",
    to: "stack" | "queue",
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    let value = "";
    if (from === "stack") {
      const top = this.stackElements[this.stackElements.length - 1];
      value = top?.value ?? "";
      this.setStackTopState("popping");
    } else {
      const front = this.queueElements[0];
      value = front?.value ?? "";
      this.setQueueFrontState("popping");
    }

    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "transfer",
      description: description ?? `Transfer '${value}' from ${from} to ${to}`,
      variables,
      visualState: this.snapshot(),
    });

    if (from === "stack") {
      this.stackElements.pop();
    } else {
      this.queueElements.shift();
    }

    if (to === "stack") {
      this.stackElements.push({ value, state: "default" });
    } else {
      this.queueElements.push({ value, state: "default" });
    }
  }

  initCircularBuffer(capacity: number): void {
    this.circularBuffer = {
      elements: Array.from({ length: capacity }, () => null),
      frontIndex: -1,
      rearIndex: -1,
      capacity,
    };
  }

  circularEnqueue(
    value: string | number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    if (!this.circularBuffer) return;
    const buffer = this.circularBuffer;

    if (buffer.frontIndex === -1) {
      buffer.frontIndex = 0;
      buffer.rearIndex = 0;
    } else {
      buffer.rearIndex = (buffer.rearIndex + 1) % buffer.capacity;
    }
    buffer.elements[buffer.rearIndex] = value;

    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "enqueue",
      description: description ?? `Enqueue '${String(value)}' at position ${buffer.rearIndex}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  circularDequeue(
    variables: Record<string, unknown>,
    description?: string,
  ): string | number | null {
    if (!this.circularBuffer) return null;
    const buffer = this.circularBuffer;

    const value = buffer.elements[buffer.frontIndex] ?? null;
    buffer.elements[buffer.frontIndex] = null;

    if (buffer.frontIndex === buffer.rearIndex) {
      buffer.frontIndex = -1;
      buffer.rearIndex = -1;
    } else {
      buffer.frontIndex = (buffer.frontIndex + 1) % buffer.capacity;
    }

    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "dequeue",
      description:
        description ?? `Dequeue '${String(value ?? "null")}' from position ${buffer.frontIndex}`,
      variables,
      visualState: this.snapshot(),
    });

    return value;
  }

  maintainDeque(variables: Record<string, unknown>, description?: string): void {
    this.setQueueRearState("popping");
    const rear = this.queueElements[this.queueElements.length - 1];
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "maintain-monotonic",
      description: description ?? `Remove '${rear?.value ?? ""}' from deque rear to maintain order`,
      variables,
      visualState: this.snapshot(),
    });
    this.queueElements.pop();
  }

  complete(variables: Record<string, unknown>, description?: string): void {
    this.statusMessage = description ?? "Processing complete";
    this.inputIndex = -1;
    this.pushStep({
      type: "complete",
      description: description ?? "All elements processed",
      variables,
      visualState: this.snapshot(),
    });
  }
}
