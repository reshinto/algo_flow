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
    const cell = this.table[index];
    if (!cell) return;
    cell.value = value;
    cell.state = "computing";
    this.pushStep({
      type: "compute-cell",
      description: description ?? `Compute F(${index}) = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
    cell.state = "computed";
  }

  readCache(index: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, cacheHits: this.metrics.cacheHits + 1 };
    this.currentIndex = index;
    const cell = this.table[index];
    if (!cell) return;
    const previousState = cell.state;
    cell.state = "reading-cache";
    this.pushStep({
      type: "read-cache",
      description: `Read cached value F(${index}) = ${cell.value}`,
      variables,
      visualState: this.snapshot(),
    });
    cell.state = previousState;
  }

  fillTable(index: number, value: number, variables: Record<string, unknown>): void {
    this.currentIndex = index;
    const tableCell = this.table[index];
    if (!tableCell) return;
    tableCell.value = value;
    tableCell.state = "computing";
    this.pushStep({
      type: "fill-table",
      description: `Fill table[${index}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
    tableCell.state = "computed";
  }

  pushCallStack(label: string, variables: Record<string, unknown> = {}): void {
    this.callStack.push(label);
    this.pushStep({
      type: "push-call",
      description: `Call ${label}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  popCallStack(variables: Record<string, unknown> = {}): void {
    const label = this.callStack[this.callStack.length - 1] ?? "";
    this.pushStep({
      type: "pop-call",
      description: `Return from ${label}`,
      variables,
      visualState: this.snapshot(),
    });
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
