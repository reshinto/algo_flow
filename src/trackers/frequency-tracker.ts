/**
 * Frequency tracker — builds execution steps for sliding-window and
 * character-frequency algorithms (e.g. find all anagrams, longest substring
 * without repeating characters).
 *
 * Manages primary/secondary character arrays, a live frequency map, and a
 * sliding window, emitting typed steps at each logical operation so playback
 * can replay the full algorithm execution.
 */
import type {
  StringChar,
  StringCharState,
  FrequencyEntry,
  FrequencyEntryState,
  FrequencyVisualState,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class FrequencyTracker extends BaseTracker {
  private primaryChars: StringChar[];
  private secondaryChars: StringChar[];
  private frequencyMap: FrequencyEntry[];
  private windowStart: number = 0;
  private windowEnd: number = -1;
  private matchCount: number = 0;
  private resultIndices: number[];

  /**
   * @param primary   - The main string being analyzed (e.g., the haystack).
   * @param secondary - The target/comparison string (e.g., the pattern for
   *                    anagram search). Pass an empty string for single-string
   *                    algorithms like longest non-repeating substring.
   * @param lineMap   - Per-language line-number mappings for code highlighting.
   */
  constructor(primary: string, secondary: string, lineMap: LineMap) {
    super(lineMap);
    this.primaryChars = primary
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.secondaryChars = secondary
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    // Frequency map is built incrementally during algorithm execution.
    this.frequencyMap = [];
    this.resultIndices = [];
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Return a deep copy of current visual state for snapshotting into a step. */
  private snapshot(): FrequencyVisualState {
    return {
      kind: "string-frequency",
      primaryChars: this.primaryChars.map((char) => ({ ...char })),
      secondaryChars: this.secondaryChars.map((char) => ({ ...char })),
      frequencyMap: this.frequencyMap.map((entry) => ({ ...entry })),
      windowStart: this.windowStart,
      windowEnd: this.windowEnd,
      matchCount: this.matchCount,
      resultIndices: [...this.resultIndices],
    };
  }

  /** Set the visual state of a primary character by index. */
  private setPrimaryCharState(charIdx: number, state: StringCharState): void {
    const char = this.primaryChars[charIdx];
    if (char) char.state = state;
  }

  /**
   * Derive the FrequencyEntry state from its current count vs. target count.
   * - count === 0                    → "default"
   * - 0 < count < targetCount        → "partial"
   * - count === targetCount           → "satisfied"
   * - count > targetCount             → "excess"
   */
  private deriveEntryState(count: number, targetCount: number): FrequencyEntryState {
    if (count === 0) return "default";
    if (count < targetCount) return "partial";
    if (count === targetCount) return "satisfied";
    return "excess";
  }

  /**
   * Find an existing FrequencyEntry for the given character, or create and
   * append one with count 0 and targetCount 0.
   */
  private findOrCreateEntry(char: string): FrequencyEntry {
    const existing = this.frequencyMap.find((entry) => entry.char === char);
    if (existing) return existing;
    const newEntry: FrequencyEntry = { char, count: 0, targetCount: 0, state: "default" };
    this.frequencyMap.push(newEntry);
    return newEntry;
  }

  // ---------------------------------------------------------------------------
  // Public step-emitting methods
  // ---------------------------------------------------------------------------

  /** Emit an initialization step marking the algorithm as started. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize frequency map and sliding window",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Increment the frequency count for `char` and update its entry state.
   * Emits an "update-frequency" step.
   */
  addToFrequency(char: string, variables: Record<string, unknown>): void {
    const entry = this.findOrCreateEntry(char);
    entry.count += 1;
    entry.state = this.deriveEntryState(entry.count, entry.targetCount);
    this.pushStep({
      type: "update-frequency",
      description: `Increment frequency of '${char}' → ${String(entry.count)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Decrement the frequency count for `char` and update its entry state.
   * Does nothing if the character has no entry. Emits an "update-frequency" step.
   */
  removeFromFrequency(char: string, variables: Record<string, unknown>): void {
    const entry = this.frequencyMap.find((e) => e.char === char);
    if (entry) {
      entry.count -= 1;
      entry.state = this.deriveEntryState(entry.count, entry.targetCount);
    }
    this.pushStep({
      type: "update-frequency",
      description: `Decrement frequency of '${char}' → ${String(entry?.count ?? 0)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Advance the window's right boundary to `windowEnd` and mark the character
   * at that position as "current". Emits an "expand-window" step.
   */
  expandWindow(windowEnd: number, variables: Record<string, unknown>): void {
    // Clear "current" state from the previous right boundary if it changed.
    if (this.windowEnd >= 0 && this.windowEnd !== windowEnd) {
      const prevChar = this.primaryChars[this.windowEnd];
      if (prevChar && prevChar.state === "current") prevChar.state = "default";
    }
    this.windowEnd = windowEnd;
    this.setPrimaryCharState(windowEnd, "current");
    this.pushStep({
      type: "expand-window",
      description: `Expand window right to index ${String(windowEnd)} ('${this.primaryChars[windowEnd]?.value ?? ""}')`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Advance the window's left boundary to `windowStart` and reset the char
   * at the old left boundary to "default". Emits a "shrink-window" step.
   */
  shrinkWindow(windowStart: number, variables: Record<string, unknown>): void {
    // Reset the character being expelled from the window.
    const expelledChar = this.primaryChars[this.windowStart];
    if (expelledChar) expelledChar.state = "default";
    this.windowStart = windowStart;
    this.pushStep({
      type: "shrink-window",
      description: `Shrink window left to index ${String(windowStart)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Record a frequency-map comparison (e.g., checking whether the current
   * window is an anagram of the target). Increments the comparisons metric.
   * Emits a "compare" step.
   */
  checkAnagram(isMatch: boolean, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description: isMatch
        ? "Frequency maps match — window is an anagram"
        : "Frequency maps do not match",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark the FrequencyEntry for `char` as "satisfied" (count === targetCount).
   * Emits a "window-match" step.
   */
  markSatisfied(char: string, variables: Record<string, unknown>): void {
    const entry = this.frequencyMap.find((e) => e.char === char);
    if (entry) entry.state = "satisfied";
    this.pushStep({
      type: "window-match",
      description: `Character '${char}' frequency satisfied`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark the primary character at `charIdx` as "matched" (e.g., confirming a
   * non-repeating character in the longest-substring problem).
   * Emits a "found" step.
   */
  markNonRepeating(charIdx: number, variables: Record<string, unknown>): void {
    this.setPrimaryCharState(charIdx, "matched");
    this.pushStep({
      type: "found",
      description: `Character at index ${String(charIdx)} ('${this.primaryChars[charIdx]?.value ?? ""}') confirmed non-repeating`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Record a result match: append `resultIdx` to `resultIndices`, increment
   * `matchCount`, and emit an "add-to-result" step.
   */
  addToResult(resultIdx: number, variables: Record<string, unknown>): void {
    this.resultIndices.push(resultIdx);
    this.matchCount += 1;
    this.pushStep({
      type: "add-to-result",
      description: `Match found — added start index ${String(resultIdx)} to results`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Emit a final "complete" step marking the end of algorithm execution. */
  complete(variables: Record<string, unknown>): void {
    // Clear any remaining "current" highlights from the window boundaries.
    for (const char of this.primaryChars) {
      if (char.state === "current") char.state = "default";
    }
    this.pushStep({
      type: "complete",
      description:
        this.matchCount > 0
          ? `Algorithm complete — ${String(this.matchCount)} match(es) found`
          : "Algorithm complete — no matches found",
      variables,
      visualState: this.snapshot(),
    });
  }
}
