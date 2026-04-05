/**
 * Transform tracker — builds execution steps for string transformation algorithms.
 * Manages input characters, output characters, read/write pointers, and phase
 * transitions, emitting steps for each stage of a transformation operation.
 */
import type { StringChar, StringCharState, TransformVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class TransformTracker extends BaseTracker {
  private inputChars: StringChar[];
  private outputChars: StringChar[];
  private readPointer: number;
  private writePointer: number;
  private phase: string;
  private auxiliaryData: string | null;

  constructor(input: string, lineMap: LineMap) {
    super(lineMap);
    this.inputChars = input
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.outputChars = [];
    this.readPointer = -1;
    this.writePointer = -1;
    this.phase = "initialize";
    this.auxiliaryData = null;
  }

  /** Deep snapshot of the current visual state for step recording. */
  private snapshot(): TransformVisualState {
    return {
      kind: "string-transform",
      inputChars: this.inputChars.map((char) => ({ ...char })),
      outputChars: this.outputChars.map((char) => ({ ...char })),
      readPointer: this.readPointer,
      writePointer: this.writePointer,
      phase: this.phase,
      auxiliaryData: this.auxiliaryData,
    };
  }

  /** Set a single input character's state by index, ignoring out-of-bounds. */
  private setInputState(charIdx: number, state: StringCharState): void {
    const char = this.inputChars[charIdx];
    if (char) char.state = state;
  }

  /** Clear all "current" highlights on input characters. */
  private clearInputCurrentStates(): void {
    for (const char of this.inputChars) {
      if (char.state === "current") char.state = "default";
    }
  }

  /** Emit the initial setup step. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize transformation — prepare input and output buffers",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Move the read pointer to charIdx and highlight that character as "current".
   * Clears any previous "current" highlight on input chars.
   */
  readChar(charIdx: number, variables: Record<string, unknown>): void {
    this.clearInputCurrentStates();
    this.readPointer = charIdx;
    this.setInputState(charIdx, "current");
    this.pushStep({
      type: "read-char",
      description: `Read input[${charIdx}] = '${this.inputChars[charIdx]?.value ?? ""}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Append a single character to the output buffer with state "matching".
   * Advances writePointer to the new last index and increments swaps (transformations).
   */
  writeChar(char: string, variables: Record<string, unknown>): void {
    this.outputChars.push({ value: char, state: "matching" });
    this.writePointer = this.outputChars.length - 1;
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "write-char",
      description: `Write '${char}' to output[${this.writePointer}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Swap two input characters by index, marking both as "matching".
   * Increments swaps metric.
   */
  swapChars(leftIdx: number, rightIdx: number, variables: Record<string, unknown>): void {
    const leftChar = this.inputChars[leftIdx];
    const rightChar = this.inputChars[rightIdx];
    if (leftChar && rightChar) {
      const tempValue = leftChar.value;
      leftChar.value = rightChar.value;
      rightChar.value = tempValue;
      leftChar.state = "matching";
      rightChar.state = "matching";
    }
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "swap-pointers",
      description: `Swap input[${leftIdx}] and input[${rightIdx}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Update both read and write pointers without modifying character states. */
  advancePointers(readIdx: number, writeIdx: number, variables: Record<string, unknown>): void {
    this.readPointer = readIdx;
    this.writePointer = writeIdx;
    this.pushStep({
      type: "visit",
      description: `Advance pointers — read: ${readIdx}, write: ${writeIdx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Transition to a new named phase and emit a step. */
  setPhase(phaseName: string, variables: Record<string, unknown>): void {
    this.phase = phaseName;
    this.pushStep({
      type: "visit",
      description: `Phase: ${phaseName}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Append multiple characters to the output buffer at once, marking each as "matching".
   * Updates writePointer to the new last index.
   */
  appendOutput(chars: string, variables: Record<string, unknown>): void {
    for (const char of chars.split("")) {
      this.outputChars.push({ value: char, state: "matching" });
    }
    this.writePointer = this.outputChars.length - 1;
    this.pushStep({
      type: "write-char",
      description: `Append '${chars}' to output`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Store auxiliary display data (e.g. frequency map, intermediate result) and emit a step. */
  setAuxiliaryData(data: string, variables: Record<string, unknown>): void {
    this.auxiliaryData = data;
    this.pushStep({
      type: "visit",
      description: `Auxiliary data: ${data}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark a contiguous range of input characters as "matched" to indicate
   * a successfully converted segment (inclusive on both ends).
   */
  markConverted(startIdx: number, endIdx: number, variables: Record<string, unknown>): void {
    for (let charIdx = startIdx; charIdx <= endIdx; charIdx++) {
      this.setInputState(charIdx, "matched");
    }
    this.pushStep({
      type: "found",
      description: `Converted input[${startIdx}..${endIdx}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Finalize the transformation — clear all "current" states on input,
   * mark every output character as "matched".
   */
  complete(variables: Record<string, unknown>): void {
    for (const char of this.inputChars) {
      if (char.state === "current") char.state = "default";
    }
    for (const char of this.outputChars) {
      char.state = "matched";
    }
    this.pushStep({
      type: "complete",
      description: "Transformation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
