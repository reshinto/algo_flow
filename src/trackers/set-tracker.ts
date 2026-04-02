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
  private booleanResult: boolean | null = null;
  private operationLabel: string | undefined = undefined;

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
      booleanResult: this.booleanResult,
      operationLabel: this.operationLabel,
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

  /** Set the operation label displayed in the status bar. */
  setOperationLabel(label: string): void {
    this.operationLabel = label;
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
      description: `${this.operationLabel ?? "Operation"} complete — ${this.result.length} element${this.result.length !== 1 ? "s" : ""} found`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element added to the output result set. Sets element state to "found" in the relevant array. */
  addToResult(value: number, arrayIdx: number, variables: Record<string, unknown>): void {
    const element = this.setA[arrayIdx] ?? this.setB[arrayIdx];
    if (element) element.state = "found";
    this.result.push(value);
    this.pushStep({
      type: "add-to-result",
      description: `Add ${value} to the result`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element intentionally skipped. Sets element state to "skipped", then resets to "default" after step. */
  skipElement(value: number, arrayIdx: number, variables: Record<string, unknown>): void {
    const element = this.setA[arrayIdx] ?? this.setB[arrayIdx];
    if (element) element.state = "skipped";
    this.pushStep({
      type: "skip-element",
      description: `Skip ${value}`,
      variables,
      visualState: this.snapshot(),
    });
    if (element) element.state = "default";
  }

  /** Check whether an element exists in the hash set (subset/superset predicate check). Increments comparisons. */
  checkSubset(value: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.setHashSetState(value, "checking");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "check-subset",
      description: `Check if ${value} exists in the hash set`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element confirmed present in the hash set — predicate condition holds. Increments cacheHits. */
  subsetPass(value: number, variables: Record<string, unknown>): void {
    this.setHashSetState(value, "found");
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.pushStep({
      type: "subset-pass",
      description: `${value} found in hash set — condition holds`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Element not found in the hash set — predicate fails. */
  subsetFail(value: number, variables: Record<string, unknown>): void {
    this.setHashSetState(value, "not-found");
    this.pushStep({
      type: "subset-fail",
      description: `${value} not found in hash set — predicate fails`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Tally the frequency of an element. Sets element state to "counted". */
  countElement(
    value: number,
    count: number,
    arrayIdx: number,
    variables: Record<string, unknown>,
  ): void {
    const element = this.setA[arrayIdx] ?? this.setB[arrayIdx];
    if (element) element.state = "counted";
    this.pushStep({
      type: "count-element",
      description: `Count ${value}: frequency = ${count}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compare frequency counts of an element between two sets. */
  compareCount(
    value: number,
    countA: number,
    countB: number,
    variables: Record<string, unknown>,
  ): void {
    this.currentElement = value;
    this.pushStep({
      type: "compare-count",
      description: `Compare counts for ${value}: A has ${countA}, B has ${countB}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Complete a boolean-result algorithm, recording the final predicate outcome. */
  completePredicate(predicateResult: boolean, variables: Record<string, unknown>): void {
    this.currentElement = null;
    this.booleanResult = predicateResult;
    this.pushStep({
      type: "complete",
      description: `Algorithm complete — result: ${predicateResult}`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
