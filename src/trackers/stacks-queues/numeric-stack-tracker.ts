/**
 * Numeric stack tracker — builds execution steps for stack algorithms
 * that operate on numeric arrays (monotonic stack, min-stack, etc.).
 * Maintains a numeric input array, stack contents, optional auxiliary stack,
 * and result array for resolved values.
 */
import type {
  StackElement,
  StackElementState,
  NumericInputElement,
  NumericInputState,
  ResultElement,
  StackQueueVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class NumericStackTracker extends BaseTracker {
  private stackElements: StackElement[] = [];
  private inputArray: NumericInputElement[];
  private auxiliaryStack: StackElement[] = [];
  private resultArray: ResultElement[];
  private inputIndex: number = -1;
  private statusMessage: string | null = null;
  private monotonicOrder: "increasing" | "decreasing" | null = null;

  constructor(inputArray: number[], lineMap: LineMap) {
    super(lineMap);
    this.inputArray = inputArray.map((value, index) => ({
      value,
      index,
      state: "default" as NumericInputState,
    }));
    this.resultArray = inputArray.map((_, index) => ({
      value: null,
      index,
      state: "default" as const,
    }));
  }

  private snapshot(): StackQueueVisualState {
    return {
      kind: "stack-queue",
      stackElements: this.stackElements.map((element) => ({ ...element })),
      inputChars: [],
      inputIndex: this.inputIndex,
      statusMessage: this.statusMessage,
      inputArray: this.inputArray.map((element) => ({ ...element })),
      auxiliaryStack:
        this.auxiliaryStack.length > 0
          ? this.auxiliaryStack.map((element) => ({ ...element }))
          : undefined,
      resultArray: this.resultArray.map((element) => ({ ...element })),
      monotonicOrder: this.monotonicOrder,
    };
  }

  private setInputState(idx: number, state: NumericInputState): void {
    const element = this.inputArray[idx];
    if (element) element.state = state;
  }

  private setStackTopState(state: StackElementState): void {
    const top = this.stackElements[this.stackElements.length - 1];
    if (top) top.state = state;
  }

  setMonotonicOrder(order: "increasing" | "decreasing"): void {
    this.monotonicOrder = order;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty stack and prepare to process the input array",
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

  pushIndex(idx: number, variables: Record<string, unknown>, description?: string): void {
    const element = this.inputArray[idx];
    this.stackElements.push({ value: String(element?.value ?? ""), state: "pushing" });
    this.setInputState(idx, "processed");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: description ?? `Push ${String(element?.value)} onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  popAndResolve(
    resolvedValue: number | null,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.setStackTopState("popping");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    const popped = this.stackElements[this.stackElements.length - 1];
    this.pushStep({
      type: "resolve",
      description:
        description ??
        `Pop ${popped?.value ?? "element"} and resolve with value ${String(resolvedValue)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();

    if (resolvedValue !== null) {
      const resultIdx = variables["resolvedIndex"] as number | undefined;
      if (resultIdx !== undefined) {
        const resultElement = this.resultArray[resultIdx];
        if (resultElement) {
          resultElement.value = resolvedValue;
          resultElement.state = "resolved";
        }
      }
    }
  }

  maintainMonotonic(variables: Record<string, unknown>, description?: string): void {
    this.setStackTopState("popping");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    const popped = this.stackElements[this.stackElements.length - 1];
    this.pushStep({
      type: "maintain-monotonic",
      description:
        description ?? `Pop ${popped?.value ?? "element"} to maintain monotonic property`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();
  }

  pushAuxiliary(value: string, variables: Record<string, unknown>, description?: string): void {
    this.auxiliaryStack.push({ value, state: "pushing" });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: description ?? `Push ${value} onto auxiliary stack`,
      variables,
      lineMapKey: "push-auxiliary",
      visualState: this.snapshot(),
    });
    const auxTop = this.auxiliaryStack[this.auxiliaryStack.length - 1];
    if (auxTop) auxTop.state = "default";
  }

  popAuxiliary(variables: Record<string, unknown>, description?: string): void {
    const auxTop = this.auxiliaryStack[this.auxiliaryStack.length - 1];
    if (auxTop) auxTop.state = "popping";
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "pop",
      description: description ?? `Pop ${auxTop?.value ?? "element"} from auxiliary stack`,
      variables,
      lineMapKey: "pop-auxiliary",
      visualState: this.snapshot(),
    });
    this.auxiliaryStack.pop();
  }

  peek(variables: Record<string, unknown>, description?: string): void {
    const top = this.stackElements[this.stackElements.length - 1];
    this.pushStep({
      type: "peek",
      description: description ?? `Peek at stack top: ${top?.value ?? "empty"}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  compare(variables: Record<string, unknown>, description: string): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description,
      variables,
      visualState: this.snapshot(),
    });
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
