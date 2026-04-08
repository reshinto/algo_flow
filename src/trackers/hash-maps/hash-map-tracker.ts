/**
 * Hash map tracker — builds execution steps for hash map algorithms.
 * Maintains the current map entries and input element states,
 * updating visual states as keys are inserted, looked up, counted, or removed.
 *
 * Supports multiple algorithm patterns: lookup, counting, frequency,
 * grouping, tracking, prefix-sum, mapping, and sliding-window.
 */
import type {
  HashMapEntry,
  HashMapEntryState,
  HashMapInputElement,
  HashMapInputElementState,
  HashMapVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export interface HashMapTrackerOptions {
  secondaryInput?: (number | string)[];
}

export class HashMapTracker extends BaseTracker {
  private entries: HashMapEntry[] = [];
  private inputElements: HashMapInputElement[];
  private secondaryInputElements?: HashMapInputElement[];
  private inputIndex: number = -1;
  private activeLookupKey: string | null = null;
  private resultPair: [number, number] | null = null;
  private phase?: string;
  private resultValue?: string | string[] | number | number[] | boolean | string[][] | null;
  private groupResultValue?: Record<string, string[]>;
  private windowStartValue?: number;
  private windowEndValue?: number;
  private prefixSumValue?: number;

  constructor(input: (number | string)[], lineMap: LineMap, options?: HashMapTrackerOptions) {
    super(lineMap);
    this.inputElements = input.map((value, idx) => ({
      value,
      index: idx,
      state: "default" as HashMapInputElementState,
    }));
    if (options?.secondaryInput) {
      this.secondaryInputElements = options.secondaryInput.map((value, idx) => ({
        value,
        index: idx,
        state: "default" as HashMapInputElementState,
      }));
    }
  }

  private snapshot(): HashMapVisualState {
    const state: HashMapVisualState = {
      kind: "hash-map",
      entries: this.entries.map((entry) => ({ ...entry })),
      inputElements: this.inputElements.map((element) => ({ ...element })),
      inputIndex: this.inputIndex,
      lookupKey: this.activeLookupKey,
      resultPair: this.resultPair ? [this.resultPair[0], this.resultPair[1]] : null,
    };
    if (this.phase !== undefined) state.phase = this.phase;
    if (this.secondaryInputElements) {
      state.secondaryInputElements = this.secondaryInputElements.map((element) => ({
        ...element,
      }));
    }
    if (this.resultValue !== undefined) state.result = this.resultValue;
    if (this.groupResultValue !== undefined) state.groupResult = { ...this.groupResultValue };
    if (this.windowStartValue !== undefined) state.windowStart = this.windowStartValue;
    if (this.windowEndValue !== undefined) state.windowEnd = this.windowEndValue;
    if (this.prefixSumValue !== undefined) state.prefixSum = this.prefixSumValue;
    return state;
  }

  private setInputState(idx: number, state: HashMapInputElementState): void {
    const element = this.inputElements[idx];
    if (element) element.state = state;
  }

  private setSecondaryInputState(idx: number, state: HashMapInputElementState): void {
    const element = this.secondaryInputElements?.[idx];
    if (element) element.state = state;
  }

  private setEntryState(key: string, state: HashMapEntryState): void {
    const entry = this.entries.find((entryItem) => entryItem.key === key);
    if (entry) entry.state = state;
  }

  private resetEntryStates(): void {
    for (const entry of this.entries) {
      if (entry.state !== "found") entry.state = "default";
    }
  }

  /* ----- Phase and result setters ----- */

  setPhase(phaseLabel: string): void {
    this.phase = phaseLabel;
  }

  setResult(value: string | string[] | number | number[] | boolean | string[][] | null): void {
    this.resultValue = value;
  }

  setGroupResult(groups: Record<string, string[]>): void {
    this.groupResultValue = groups;
  }

  setWindowBounds(start: number, end: number): void {
    this.windowStartValue = start;
    this.windowEndValue = end;
    for (let elementIndex = 0; elementIndex < this.inputElements.length; elementIndex++) {
      const element = this.inputElements[elementIndex];
      if (element && element.state !== "current" && element.state !== "found") {
        element.state = elementIndex >= start && elementIndex <= end ? "in-window" : "processed";
      }
    }
  }

  setPrefixSum(value: number): void {
    this.prefixSumValue = value;
  }

  /* ----- Core step methods (backward-compatible) ----- */

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty hash map and start scanning the input array",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight the current input element being processed. */
  processElement(idx: number, variables: Record<string, unknown>): void {
    this.inputIndex = idx;
    for (const element of this.inputElements) {
      if (element.state === "current") element.state = "processed";
    }
    this.setInputState(idx, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Process element ${this.inputElements[idx]?.value} at index ${idx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Process an element from the secondary input array. */
  processSecondaryElement(idx: number, variables: Record<string, unknown>): void {
    if (!this.secondaryInputElements) return;
    for (const element of this.secondaryInputElements) {
      if (element.state === "current") element.state = "processed";
    }
    this.setSecondaryInputState(idx, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    const elementValue = this.secondaryInputElements[idx]?.value;
    this.pushStep({
      type: "visit",
      description: `Process secondary element ${elementValue} at index ${idx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Look up a complement key in the map. */
  lookupKey(key: string, variables: Record<string, unknown>): void {
    this.activeLookupKey = key;
    this.resetEntryStates();
    this.setEntryState(key, "looking-up");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "lookup-key",
      description: `Look up key "${key}" in the hash map`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Complement key was found — record the result pair. */
  keyFound(
    key: string,
    foundIdx: number,
    currentIdx: number,
    variables: Record<string, unknown>,
  ): void {
    this.setEntryState(key, "found");
    this.setInputState(foundIdx, "found");
    this.setInputState(currentIdx, "found");
    this.resultPair = [foundIdx, currentIdx];
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.pushStep({
      type: "key-found",
      description: `Key found at index ${foundIdx} — result: [${foundIdx}, ${currentIdx}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Complement key was not found — insert current number into the map. */
  keyNotFound(key: string, variables: Record<string, unknown>): void {
    this.activeLookupKey = null;
    for (const entry of this.entries) {
      if (entry.state === "looking-up") entry.state = "default";
    }
    this.pushStep({
      type: "key-not-found",
      description: `"${key}" not in map — will insert current element`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Insert a new key-value pair into the map. */
  insertKey(key: string, value: string, variables: Record<string, unknown>): void {
    this.entries.push({ key, value, state: "inserting" });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "insert-key",
      description: `Insert { ${key}: ${value} } into the hash map`,
      variables,
      visualState: this.snapshot(),
    });
    const inserted = this.entries[this.entries.length - 1];
    if (inserted) inserted.state = "default";
  }

  /* ----- New methods for counting, frequency, grouping, tracking ----- */

  /** Check if a key already exists in the map (duplicate detection). */
  checkDuplicate(key: string, variables: Record<string, unknown>): void {
    this.activeLookupKey = key;
    this.resetEntryStates();
    this.setEntryState(key, "looking-up");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "check-duplicate",
      description: `Check if "${key}" already exists in the hash map`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Increment the numeric value of an existing entry (counting pattern). */
  incrementCount(key: string, variables: Record<string, unknown>): void {
    const entry = this.entries.find((entryItem) => entryItem.key === key);
    if (entry) {
      entry.value = String(Number(entry.value) + 1);
      entry.state = "counting";
    } else {
      this.entries.push({ key, value: "1", state: "counting" });
    }
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "increment-count",
      description: `Increment count for "${key}" → ${entry?.value ?? "1"}`,
      variables,
      visualState: this.snapshot(),
    });
    const updated = this.entries.find((entryItem) => entryItem.key === key);
    if (updated) updated.state = "default";
  }

  /** Decrement the numeric value of an existing entry (consumption pattern). */
  decrementCount(key: string, variables: Record<string, unknown>): void {
    const entry = this.entries.find((entryItem) => entryItem.key === key);
    if (entry) {
      entry.value = String(Number(entry.value) - 1);
      entry.state = "counting";
    }
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "decrement-count",
      description: `Decrement count for "${key}" → ${entry?.value ?? "0"}`,
      variables,
      visualState: this.snapshot(),
    });
    if (entry) entry.state = "default";
  }

  /** Update the value of an existing entry. */
  updateValue(key: string, newValue: string, variables: Record<string, unknown>): void {
    const entry = this.entries.find((entryItem) => entryItem.key === key);
    if (entry) {
      entry.value = newValue;
      entry.state = "updating";
    }
    this.pushStep({
      type: "update-value",
      description: `Update "${key}" → ${newValue}`,
      variables,
      visualState: this.snapshot(),
    });
    if (entry) entry.state = "default";
  }

  /** Remove an entry from the map. */
  deleteKey(key: string, variables: Record<string, unknown>): void {
    const entryIndex = this.entries.findIndex((entryItem) => entryItem.key === key);
    if (entryIndex !== -1) {
      const entry = this.entries[entryIndex];
      if (entry) entry.state = "deleting";
    }
    this.pushStep({
      type: "delete-key",
      description: `Delete key "${key}" from the hash map`,
      variables,
      visualState: this.snapshot(),
    });
    if (entryIndex !== -1) {
      this.entries.splice(entryIndex, 1);
    }
  }

  /** Mark a primary input element as matched. */
  markMatched(inputIdx: number, variables: Record<string, unknown>): void {
    this.setInputState(inputIdx, "matched");
    this.pushStep({
      type: "key-found",
      description: `Element at index ${inputIdx} matched`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "key-found",
    });
  }

  /** Mark a primary input element as mismatched. */
  markMismatched(inputIdx: number, variables: Record<string, unknown>): void {
    this.setInputState(inputIdx, "mismatched");
    this.pushStep({
      type: "key-not-found",
      description: `Element at index ${inputIdx} did not match`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "key-not-found",
    });
  }

  /** Mark a secondary input element as matched. */
  markSecondaryMatched(inputIdx: number, variables: Record<string, unknown>): void {
    this.setSecondaryInputState(inputIdx, "matched");
    this.pushStep({
      type: "key-found",
      description: `Secondary element at index ${inputIdx} matched`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "key-found",
    });
  }

  /** Mark a secondary input element as mismatched. */
  markSecondaryMismatched(inputIdx: number, variables: Record<string, unknown>): void {
    this.setSecondaryInputState(inputIdx, "mismatched");
    this.pushStep({
      type: "key-not-found",
      description: `Secondary element at index ${inputIdx} did not match`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "key-not-found",
    });
  }

  /** Highlight an entry (e.g., for Top K selection). */
  highlightEntry(key: string, variables: Record<string, unknown>): void {
    this.setEntryState(key, "highlighted");
    this.pushStep({
      type: "key-found",
      description: `Highlight entry "${key}"`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "key-found",
    });
  }

  /** Append a new element to the input array (for dynamic growth like Happy Number). */
  appendInputElement(value: number | string): void {
    this.inputElements.push({
      value,
      index: this.inputElements.length,
      state: "default" as HashMapInputElementState,
    });
  }

  /** Check if a prefix sum key exists in the map. */
  checkPrefix(key: string, variables: Record<string, unknown>): void {
    this.activeLookupKey = key;
    this.resetEntryStates();
    this.setEntryState(key, "looking-up");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "check-prefix",
      description: `Check if prefix sum "${key}" exists in the map`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record that a prefix sum match was found. */
  prefixFound(key: string, variables: Record<string, unknown>): void {
    this.setEntryState(key, "found");
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.pushStep({
      type: "prefix-found",
      description: `Prefix sum "${key}" found — count subarrays`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.activeLookupKey = null;
    this.inputIndex = -1;
    const description =
      this.resultPair !== null
        ? `Solution found: indices [${this.resultPair[0]}, ${this.resultPair[1]}]`
        : this.resultValue !== undefined
          ? `Result: ${JSON.stringify(this.resultValue)}`
          : "Algorithm complete";
    this.pushStep({
      type: "complete",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }
}
