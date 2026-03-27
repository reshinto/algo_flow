/**
 * String tracker — builds execution steps for string search algorithms (KMP).
 * Manages text characters, pattern characters, and the failure/prefix table,
 * emitting steps for both the table-building and search phases.
 */
import type {
  StringChar,
  StringCharState,
  FailureTableEntry,
  FailureTableEntryState,
  StringVisualState,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class StringTracker extends BaseTracker {
  private textChars: StringChar[];
  private patternChars: StringChar[];
  private failureTable: FailureTableEntry[];
  private patternOffset: number = 0;
  private textIndex: number = 0;
  private patternIndex: number = 0;
  private matchFound: boolean | null = null;

  constructor(text: string, pattern: string, lineMap: LineMap) {
    super(lineMap);
    this.textChars = text
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.patternChars = pattern
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.failureTable = pattern.split("").map((_, idx) => ({
      index: idx,
      value: 0,
      state: "default" as FailureTableEntryState,
    }));
  }

  private snapshot(): StringVisualState {
    return {
      kind: "string",
      textChars: this.textChars.map((char) => ({ ...char })),
      patternChars: this.patternChars.map((char) => ({ ...char })),
      failureTable: this.failureTable.map((entry) => ({ ...entry })),
      patternOffset: this.patternOffset,
      textIndex: this.textIndex,
      patternIndex: this.patternIndex,
      matchFound: this.matchFound,
    };
  }

  private setTextState(idx: number, state: StringCharState): void {
    const char = this.textChars[idx];
    if (char) char.state = state;
  }

  private setPatternState(idx: number, state: StringCharState): void {
    const char = this.patternChars[idx];
    if (char) char.state = state;
  }

  private setFailureState(idx: number, state: FailureTableEntryState): void {
    const entry = this.failureTable[idx];
    if (entry) entry.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Build the KMP failure table, then scan the text",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a failure table entry as currently being computed. */
  computingFailureEntry(idx: number, variables: Record<string, unknown>): void {
    this.setFailureState(idx, "computing");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "build-failure",
      description: `Computing failure[${idx}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record the final value for a failure table entry. */
  setFailureEntry(idx: number, value: number, variables: Record<string, unknown>): void {
    const entry = this.failureTable[idx];
    if (entry) {
      entry.value = value;
      entry.state = "computed";
    }
    this.pushStep({
      type: "build-failure",
      description: `failure[${idx}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Begin scanning the text — reset pattern alignment. */
  startSearch(variables: Record<string, unknown>): void {
    for (const char of this.patternChars) char.state = "default";
    this.pushStep({
      type: "visit",
      description: "Failure table built — begin scanning the text",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight the pair of characters currently being compared. */
  compareChars(
    textIdx: number,
    patternIdx: number,
    offset: number,
    variables: Record<string, unknown>,
  ): void {
    this.textIndex = textIdx;
    this.patternIndex = patternIdx;
    this.patternOffset = offset;
    // Reset previous highlights
    for (const char of this.textChars) if (char.state === "current") char.state = "default";
    for (const char of this.patternChars) if (char.state === "current") char.state = "default";
    this.setTextState(textIdx, "current");
    this.setPatternState(patternIdx, "current");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "visit",
      description: `Compare text[${textIdx}]='${this.textChars[textIdx]?.value}' with pattern[${patternIdx}]='${this.patternChars[patternIdx]?.value}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record a character match. */
  charMatch(textIdx: number, patternIdx: number, variables: Record<string, unknown>): void {
    this.setTextState(textIdx, "matching");
    this.setPatternState(patternIdx, "matching");
    this.pushStep({
      type: "char-match",
      description: `Match: text[${textIdx}] == pattern[${patternIdx}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record a character mismatch — pattern will shift. */
  charMismatch(textIdx: number, patternIdx: number, variables: Record<string, unknown>): void {
    this.setTextState(textIdx, "mismatched");
    this.setPatternState(patternIdx, "mismatched");
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "char-mismatch",
      description: `Mismatch at text[${textIdx}] / pattern[${patternIdx}] — use failure table to shift`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Shift the pattern using the failure table value. */
  shiftPattern(newOffset: number, newPatternIdx: number, variables: Record<string, unknown>): void {
    this.patternOffset = newOffset;
    this.patternIndex = newPatternIdx;
    for (const char of this.textChars)
      if (char.state === "mismatched" || char.state === "matching") char.state = "default";
    for (const char of this.patternChars)
      if (char.state === "mismatched" || char.state === "matching") char.state = "default";
    this.pushStep({
      type: "pattern-shift",
      description: `Shift pattern to offset ${newOffset} (pattern index reset to ${newPatternIdx})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark all matched characters on a full pattern match. */
  recordMatch(textMatchStart: number, variables: Record<string, unknown>): void {
    for (
      let charIdx = textMatchStart;
      charIdx < textMatchStart + this.patternChars.length;
      charIdx++
    ) {
      this.setTextState(charIdx, "matched");
    }
    for (let charIdx = 0; charIdx < this.patternChars.length; charIdx++) {
      this.setPatternState(charIdx, "matched");
    }
    this.matchFound = true;
    this.pushStep({
      type: "char-match",
      description: `Pattern found at text index ${textMatchStart}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    if (this.matchFound === null) this.matchFound = false;
    for (const char of this.textChars) if (char.state === "current") char.state = "default";
    for (const char of this.patternChars) if (char.state === "current") char.state = "default";
    this.pushStep({
      type: "complete",
      description: this.matchFound ? `Pattern found in text` : "Pattern not found in text",
      variables,
      visualState: this.snapshot(),
    });
  }
}
