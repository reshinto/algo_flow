/**
 * Set membership tracker — builds execution steps for probabilistic membership algorithms:
 * bloom-filter, cuckoo-filter, count-min-sketch.
 */
import type { SetElement, SetElementState, SetPhase, SetVisualState } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class SetMembershipTracker extends BaseTracker {
  private elements: SetElement[] = [];
  private bitArray: SetElement[];
  private hashPositions: number[] = [];
  private buckets: (SetElement | null)[];
  private sketchGrid: number[][] = [];
  private hashFunctionCount: number;
  private currentElement: number | null = null;
  private phase: SetPhase = "building";
  private falsePositive: boolean = false;

  constructor(elementCount: number, bitSize: number, hashFunctionCount: number, lineMap: LineMap) {
    super(lineMap);
    this.bitArray = Array.from({ length: bitSize }, () => ({
      value: 0,
      state: "default" as SetElementState,
    }));
    this.buckets = Array.from({ length: elementCount }, () => null);
    this.hashFunctionCount = hashFunctionCount;
  }

  private snapshot(): SetVisualState {
    return {
      kind: "set",
      setA: this.elements.map((element) => ({ ...element })),
      setB: [],
      hashSet: [],
      result: [],
      currentElement: this.currentElement,
      phase: this.phase,
      bitArray: this.bitArray.map((element) => ({ ...element })),
      hashPositions: [...this.hashPositions],
      buckets: this.buckets.map((bucket) => (bucket ? { ...bucket } : null)),
      falsePositive: this.falsePositive,
      sketchGrid: this.sketchGrid.map((row) => [...row]),
      hashFunctionCount: this.hashFunctionCount,
    };
  }

  /** Initialize the count-min sketch 2D grid. */
  initializeSketchGrid(depth: number, width: number): void {
    this.sketchGrid = Array.from({ length: depth }, () => Array.from({ length: width }, () => 0));
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize filter structure and hash functions",
      variables,
      visualState: this.snapshot(),
    });
  }

  hashElement(value: number, positions: number[], variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.phase = "hashing";
    this.hashPositions = [...positions];

    this.elements.push({ value, state: "hashed" as SetElementState });
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "hash-element",
      description: `Hash ${value} to positions [${positions.join(", ")}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  setBit(position: number, variables: Record<string, unknown>): void {
    const bitElement = this.bitArray[position];
    if (bitElement) {
      bitElement.value = 1;
      bitElement.state = "bit-set";
    }
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "set-bit",
      description: `Set bit at position ${position}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  checkBit(position: number, variables: Record<string, unknown>): void {
    const bitElement = this.bitArray[position];
    if (bitElement) bitElement.state = "bit-checked";
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "check-bit",
      description: `Check bit at position ${position} — value: ${bitElement?.value ?? 0}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  insertBucket(value: number, bucketIdx: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.buckets[bucketIdx] = { value, state: "adding" as SetElementState };
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "insert-bucket",
      description: `Insert ${value} into bucket ${bucketIdx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  evictElement(oldValue: number, bucketIdx: number, variables: Record<string, unknown>): void {
    this.currentElement = oldValue;
    const evictedBucket = this.buckets[bucketIdx];
    if (evictedBucket) evictedBucket.state = "evicted";
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "evict-element",
      description: `Evict ${oldValue} from bucket ${bucketIdx} for cuckoo displacement`,
      variables,
      visualState: this.snapshot(),
    });
  }

  queryMembership(value: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.phase = "querying";
    this.falsePositive = false;
    this.pushStep({
      type: "check-membership",
      description: `Query membership for element ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  queryResult(
    value: number,
    found: boolean,
    isFalsePositive: boolean,
    variables: Record<string, unknown>,
  ): void {
    this.falsePositive = isFalsePositive;
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };

    if (found) {
      this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
      this.pushStep({
        type: "member-found",
        description: `${value} is ${isFalsePositive ? "a false positive" : "a member"} of the filter`,
        variables,
        visualState: this.snapshot(),
      });
    } else {
      this.pushStep({
        type: "member-not-found",
        description: `${value} is definitively not a member of the filter`,
        variables,
        visualState: this.snapshot(),
      });
    }
  }

  incrementCounter(row: number, col: number, variables: Record<string, unknown>): void {
    const sketchRow = this.sketchGrid[row];
    if (sketchRow) {
      const current = sketchRow[col] ?? 0;
      sketchRow[col] = current + 1;
    }
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "increment-count",
      description: `Increment count-min-sketch counter at [${row}][${col}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentElement = null;
    this.pushStep({
      type: "complete",
      description: "Membership filter operation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
