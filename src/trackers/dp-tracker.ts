/**
 * Dynamic programming tracker — builds execution steps for DP algorithms.
 * Maintains a mutable DP table with per-cell states (default, computing,
 * computed, reading-cache) and an optional call stack for memoization
 * visualizations.
 */
import type { DPCell, DPCellState, DPTableVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class DPTracker extends BaseTracker {
  private table: DPCell[];
  private currentIndex: number = 0;
  private callStack: string[] = [];

  constructor(tableSize: number, lineMap: LineMap) {
    super(lineMap);
    this.table = Array.from({ length: tableSize }, (_, cellIndex) => ({
      index: cellIndex,
      value: null,
      state: "default" as DPCellState,
      label: `F(${cellIndex})`,
    }));
  }

  /** Deep-copy the current table and call stack for an immutable step snapshot. */
  private snapshot(): DPTableVisualState {
    return {
      kind: "dp-table",
      table: this.table.map((cell) => ({ ...cell })),
      currentIndex: this.currentIndex,
      callStack: [...this.callStack],
    };
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize dynamic programming table",
      variables,
      visualState: this.snapshot(),
    });
  }

  computeCell(
    index: number,
    value: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.currentIndex = index;
    this.table[index]!.value = value;
    this.table[index]!.state = "computing";
    this.pushStep({
      type: "compute-cell",
      description: description ?? `Compute F(${index}) = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
    this.table[index]!.state = "computed";
  }

  readCache(index: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.currentIndex = index;
    const previousState = this.table[index]!.state;
    this.table[index]!.state = "reading-cache";
    this.pushStep({
      type: "read-cache",
      description: `Read cached value F(${index}) = ${this.table[index]!.value}`,
      variables,
      visualState: this.snapshot(),
    });
    this.table[index]!.state = previousState;
  }

  fillTable(index: number, value: number, variables: Record<string, unknown>): void {
    this.currentIndex = index;
    this.table[index]!.value = value;
    this.table[index]!.state = "computing";
    this.pushStep({
      type: "fill-table",
      description: `Fill table[${index}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
    this.table[index]!.state = "computed";
  }

  pushCallStack(label: string): void {
    this.callStack.push(label);
  }

  popCallStack(): void {
    this.callStack.pop();
  }

  complete(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "complete",
      description: "Computation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
