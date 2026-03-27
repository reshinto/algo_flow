/**
 * Set tracker — builds execution steps for hash set algorithms.
 * Phase 1: adds elements of array A into a hash set.
 * Phase 2: checks each element of array B for membership, collecting matches.
 */
import type { SetElement, SetElementState, SetPhase, SetVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class SetTracker extends BaseTracker {
  private setA: SetElement[];
  private setB: SetElement[];
  private hashSet: SetElement[] = [];
  private result: number[] = [];
  private currentElement: number | null = null;
  private phase: SetPhase = "building";

  constructor(arrayA: number[], arrayB: number[], lineMap: LineMap) {
    super(lineMap);
    this.setA = arrayA.map((value) => ({ value, state: "default" as SetElementState }));
    this.setB = arrayB.map((value) => ({ value, state: "default" as SetElementState }));
  }

  private snapshot(): SetVisualState {
    return {
      kind: "set",
      setA: this.setA.map((element) => ({ ...element })),
      setB: this.setB.map((element) => ({ ...element })),
      hashSet: this.hashSet.map((element) => ({ ...element })),
      result: [...this.result],
      currentElement: this.currentElement,
      phase: this.phase,
    };
  }

  private setArrayAState(value: number, state: SetElementState): void {
    const element = this.setA.find((elem) => elem.value === value && elem.state !== "added");
    if (element) element.state = state;
  }

  private setArrayBState(idx: number, state: SetElementState): void {
    const element = this.setB[idx];
    if (element) element.state = state;
  }

  private setHashSetState(value: number, state: SetElementState): void {
    const element = this.hashSet.find((elem) => elem.value === value);
    if (element) element.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize empty hash set and prepare to process both arrays",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Add an element from array A into the hash set. */
  addToSet(value: number, arrayAIdx: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.setArrayAState(value, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Visit A[${arrayAIdx}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });

    this.hashSet.push({ value, state: "adding" as SetElementState });
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "add-to-set",
      description: `Add ${value} to the hash set`,
      variables,
      visualState: this.snapshot(),
    });

    this.setArrayAState(value, "added");
    this.setHashSetState(value, "added" as SetElementState);
  }

  /** Begin phase 2 — switch to checking membership. */
  startChecking(variables: Record<string, unknown>): void {
    this.phase = "checking";
    this.currentElement = null;
    this.pushStep({
      type: "visit",
      description: "Hash set built — now check each element of B for membership",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Check whether an element of array B is in the hash set. */
  checkMembership(value: number, arrayBIdx: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.setArrayBState(arrayBIdx, "checking");
    this.setHashSetState(value, "checking");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "check-membership",
      description: `Check if B[${arrayBIdx}] = ${value} is in the hash set`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element found in the hash set — add to result. */
  memberFound(value: number, arrayBIdx: number, variables: Record<string, unknown>): void {
    this.setArrayBState(arrayBIdx, "found");
    this.setHashSetState(value, "found");
    this.result.push(value);
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.pushStep({
      type: "member-found",
      description: `${value} is in the hash set — add to result`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element not found in the hash set — skip. */
  memberNotFound(value: number, arrayBIdx: number, variables: Record<string, unknown>): void {
    this.setHashSetState(value, "not-found");
    this.setArrayBState(arrayBIdx, "not-found");
    this.pushStep({
      type: "member-not-found",
      description: `${value} is not in the hash set — skip`,
      variables,
      visualState: this.snapshot(),
    });
    // Reset states so they don't stay highlighted
    this.setArrayBState(arrayBIdx, "default");
    this.setHashSetState(value, "default");
  }

  complete(variables: Record<string, unknown>): void {
    this.currentElement = null;
    this.pushStep({
      type: "complete",
      description: `Intersection complete — ${this.result.length} element${this.result.length !== 1 ? "s" : ""} found`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
