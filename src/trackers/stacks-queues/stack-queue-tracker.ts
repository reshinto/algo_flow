/**
 * Stack/Queue tracker — builds execution steps for stack and queue algorithms.
 * Maintains the input character states and the current stack contents,
 * updating visual states as characters are pushed, popped, or mismatched.
 */
import type {
  StackElement,
  StackElementState,
  InputChar,
  InputCharState,
  StackQueueVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class StackQueueTracker extends BaseTracker {
  private stackElements: StackElement[] = [];
  private inputChars: InputChar[];
  private inputIndex: number = -1;
  private statusMessage: string | null = null;

  constructor(inputString: string, lineMap: LineMap) {
    super(lineMap);
    this.inputChars = inputString.split("").map((char) => ({
      value: char,
      state: "default" as InputCharState,
    }));
  }

  private snapshot(): StackQueueVisualState {
    return {
      kind: "stack-queue",
      stackElements: this.stackElements.map((element) => ({ ...element })),
      inputChars: this.inputChars.map((char) => ({ ...char })),
      inputIndex: this.inputIndex,
      statusMessage: this.statusMessage,
    };
  }

  private setInputCharState(idx: number, state: InputCharState): void {
    const char = this.inputChars[idx];
    if (char) char.state = state;
  }

  private setStackTopState(state: StackElementState): void {
    const top = this.stackElements[this.stackElements.length - 1];
    if (top) top.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty stack and start scanning the input string",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight the current input character being processed. */
  processChar(idx: number, variables: Record<string, unknown>): void {
    this.inputIndex = idx;
    this.setInputCharState(idx, "current");
    this.pushStep({
      type: "visit",
      description: `Read character '${this.inputChars[idx]?.value}' at index ${idx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Push an opening bracket onto the stack. */
  push(char: string, inputIdx: number, variables: Record<string, unknown>): void {
    this.stackElements.push({ value: char, state: "pushing" });
    this.setInputCharState(inputIdx, "processed");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "push",
      description: `Push '${char}' onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
    this.setStackTopState("default");
  }

  /** Pop a matched bracket pair — both the closing char and the stack top are matched. */
  popMatched(closingChar: string, inputIdx: number, variables: Record<string, unknown>): void {
    this.setStackTopState("matched");
    this.setInputCharState(inputIdx, "matched");
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "match",
      description: `'${closingChar}' matches stack top — pop and continue`,
      variables,
      visualState: this.snapshot(),
    });
    this.stackElements.pop();
    this.setInputCharState(inputIdx, "processed");
  }

  /** Mark a mismatch — closing bracket does not match the stack top. */
  mismatch(closingChar: string, inputIdx: number, variables: Record<string, unknown>): void {
    this.setInputCharState(inputIdx, "mismatched");
    this.setStackTopState("mismatched");
    this.statusMessage = "Mismatch — invalid parentheses";
    this.pushStep({
      type: "mismatch",
      description: `'${closingChar}' does not match stack top — string is invalid`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(isValid: boolean, variables: Record<string, unknown>): void {
    this.statusMessage = isValid ? "Valid parentheses ✓" : "Invalid — unclosed brackets ✗";
    this.inputIndex = -1;
    this.pushStep({
      type: "complete",
      description: isValid
        ? "Stack is empty — all brackets matched correctly"
        : "Stack not empty — some brackets were never closed",
      variables,
      visualState: this.snapshot(),
    });
  }
}
