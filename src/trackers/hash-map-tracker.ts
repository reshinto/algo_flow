/**
 * Hash map tracker — builds execution steps for hash map algorithms.
 * Maintains the current map entries and input element states,
 * updating visual states as keys are inserted or looked up.
 */
import type {
  HashMapEntry,
  HashMapEntryState,
  HashMapInputElement,
  HashMapInputElementState,
  HashMapVisualState,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class HashMapTracker extends BaseTracker {
  private entries: HashMapEntry[] = [];
  private inputElements: HashMapInputElement[];
  private inputIndex: number = -1;
  private activeLookupKey: string | null = null;
  private resultPair: [number, number] | null = null;

  constructor(numbers: number[], lineMap: LineMap) {
    super(lineMap);
    this.inputElements = numbers.map((value, idx) => ({
      value,
      index: idx,
      state: "default" as HashMapInputElementState,
    }));
  }

  private snapshot(): HashMapVisualState {
    return {
      kind: "hash-map",
      entries: this.entries.map((entry) => ({ ...entry })),
      inputElements: this.inputElements.map((element) => ({ ...element })),
      inputIndex: this.inputIndex,
      lookupKey: this.activeLookupKey,
      resultPair: this.resultPair ? [this.resultPair[0], this.resultPair[1]] : null,
    };
  }

  private setInputState(idx: number, state: HashMapInputElementState): void {
    const element = this.inputElements[idx];
    if (element) element.state = state;
  }

  private setEntryState(key: string, state: HashMapEntryState): void {
    const entry = this.entries.find((e) => e.key === key);
    if (entry) entry.state = state;
  }

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
    // Reset previous current element to processed
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

  /** Look up a complement key in the map. */
  lookupKey(key: string, variables: Record<string, unknown>): void {
    this.activeLookupKey = key;
    // Highlight the entry if it exists
    for (const entry of this.entries) {
      if (entry.state !== "found") entry.state = "default";
    }
    this.setEntryState(key, "looking-up");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "lookup-key",
      description: `Look up complement key "${key}" in the hash map`,
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
      description: `Complement found at index ${foundIdx} — result: [${foundIdx}, ${currentIdx}]`,
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

  complete(variables: Record<string, unknown>): void {
    this.activeLookupKey = null;
    this.inputIndex = -1;
    this.pushStep({
      type: "complete",
      description:
        this.resultPair !== null
          ? `Solution found: indices [${this.resultPair[0]}, ${this.resultPair[1]}]`
          : "No two-sum solution exists in this array",
      variables,
      visualState: this.snapshot(),
    });
  }
}
