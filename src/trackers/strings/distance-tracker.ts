/**
 * Distance tracker — builds execution steps for string-distance algorithms
 * (e.g. Levenshtein / edit distance). Manages the DP matrix, source/target
 * character arrays, and traced edit-path operations, emitting steps for
 * initialization, base-case filling, cell computation, comparison, and
 * path tracing.
 */
import type {
  StringChar,
  StringCharState,
  DistanceCell,
  DistanceCellState,
  EditOperation,
  DistanceVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class DistanceTracker extends BaseTracker {
  private sourceChars: StringChar[];
  private targetChars: StringChar[];
  /** (source.length + 1) × (target.length + 1) DP matrix. */
  private matrix: DistanceCell[][];
  private currentRow: number = -1;
  private currentCol: number = -1;
  private operations: EditOperation[] = [];
  private result: number | null = null;

  constructor(source: string, target: string, lineMap: LineMap) {
    super(lineMap);

    this.sourceChars = source
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));

    this.targetChars = target
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));

    // Build (source.length + 1) rows × (target.length + 1) columns, all zeroed/default.
    const rowCount = source.length + 1;
    const colCount = target.length + 1;
    this.matrix = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => ({
        value: 0,
        state: "default" as DistanceCellState,
      })),
    );
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Deep-copy internal state into an immutable DistanceVisualState snapshot. */
  private snapshot(): DistanceVisualState {
    return {
      kind: "string-distance",
      sourceChars: this.sourceChars.map((char) => ({ ...char })),
      targetChars: this.targetChars.map((char) => ({ ...char })),
      matrix: this.matrix.map((row) => row.map((cell) => ({ ...cell }))),
      currentRow: this.currentRow,
      currentCol: this.currentCol,
      operations: this.operations.map((op) => ({ ...op })),
      result: this.result,
    };
  }

  /** Set matrix[rowIdx][colIdx].state with bounds checking. */
  private setCellState(rowIdx: number, colIdx: number, state: DistanceCellState): void {
    const cell = this.matrix[rowIdx]?.[colIdx];
    if (cell) cell.state = state;
  }

  /**
   * Reset "current" state on all sourceChars and targetChars back to "default".
   * Called before marking a new active cell/character pair.
   */
  private clearCurrentStates(): void {
    for (const char of this.sourceChars) {
      if (char.state === "current") char.state = "default";
    }
    for (const char of this.targetChars) {
      if (char.state === "current") char.state = "default";
    }
  }

  /**
   * Reset "computing" state on all matrix cells back to "default".
   * Used during cleanup in complete().
   */
  private clearComputingStates(): void {
    for (const row of this.matrix) {
      for (const cell of row) {
        if (cell.state === "computing" || cell.state === "current") {
          cell.state = "default";
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Public step-emitting methods
  // ---------------------------------------------------------------------------

  /** Emit the opening initialization step before any matrix work begins. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize the edit-distance DP matrix",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Fill a base-case cell (row 0 or column 0) with its predetermined value
   * and mark it as computed.
   */
  fillBaseCase(
    rowIdx: number,
    colIdx: number,
    value: number,
    variables: Record<string, unknown>,
  ): void {
    const cell = this.matrix[rowIdx]?.[colIdx];
    if (cell) {
      cell.value = value;
      cell.state = "computed";
    }
    this.currentRow = rowIdx;
    this.currentCol = colIdx;
    this.pushStep({
      type: "fill-table",
      description: `Base case: matrix[${rowIdx}][${colIdx}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark a cell as currently being computed, highlight the corresponding
   * source/target characters, and emit a compute step.
   */
  computeCell(
    rowIdx: number,
    colIdx: number,
    value: number,
    variables: Record<string, unknown>,
  ): void {
    // Update matrix cell value and mark as "computing".
    const cell = this.matrix[rowIdx]?.[colIdx];
    if (cell) {
      cell.value = value;
      cell.state = "computing";
    }

    this.currentRow = rowIdx;
    this.currentCol = colIdx;

    // Highlight the source character at rowIdx-1 (skip row 0 = empty-string row).
    this.clearCurrentStates();
    if (rowIdx > 0) {
      const sourceChar = this.sourceChars[rowIdx - 1];
      if (sourceChar) sourceChar.state = "current";
    }
    if (colIdx > 0) {
      const targetChar = this.targetChars[colIdx - 1];
      if (targetChar) targetChar.state = "current";
    }

    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };

    this.pushStep({
      type: "compute-distance",
      description: `Compute matrix[${rowIdx}][${colIdx}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Compare a source character against a target character and emit a comparison
   * step, marking characters as "matching" or "mismatched".
   */
  compareChars(
    sourceIdx: number,
    targetIdx: number,
    isMatch: boolean,
    variables: Record<string, unknown>,
  ): void {
    const matchState: StringCharState = isMatch ? "matching" : "mismatched";

    const sourceChar = this.sourceChars[sourceIdx];
    const targetChar = this.targetChars[targetIdx];
    if (sourceChar) sourceChar.state = matchState;
    if (targetChar) targetChar.state = matchState;

    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };

    this.pushStep({
      type: "compare",
      description: isMatch
        ? `Match: source[${sourceIdx}]='${sourceChar?.value}' == target[${targetIdx}]='${targetChar?.value}'`
        : `Mismatch: source[${sourceIdx}]='${sourceChar?.value}' != target[${targetIdx}]='${targetChar?.value}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Transition a cell from "computing" to "computed" once its final value is
   * determined, and emit a step.
   */
  markCellComputed(rowIdx: number, colIdx: number, variables: Record<string, unknown>): void {
    this.setCellState(rowIdx, colIdx, "computed");
    this.pushStep({
      type: "compute-distance",
      description: `matrix[${rowIdx}][${colIdx}] finalized`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Append a single edit operation to the path and mark the corresponding
   * matrix cell as "path".
   */
  recordOperation(operation: EditOperation, variables: Record<string, unknown>): void {
    this.operations.push(operation);
    this.setCellState(operation.sourceIdx, operation.targetIdx, "path");
    this.pushStep({
      type: "trace-edit-path",
      description: `Record ${operation.type} at (${operation.sourceIdx}, ${operation.targetIdx})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Bulk-mark every cell in the traced back-path as "path" and mark
   * corresponding source/target characters as "matched".
   */
  tracePath(path: [number, number][], variables: Record<string, unknown>): void {
    for (const [rowIdx, colIdx] of path) {
      this.setCellState(rowIdx, colIdx, "path");

      // Mark source character (row > 0 → rowIdx-1 maps to sourceChars).
      if (rowIdx > 0) {
        const sourceChar = this.sourceChars[rowIdx - 1];
        if (sourceChar) sourceChar.state = "matched";
      }
      // Mark target character (col > 0 → colIdx-1 maps to targetChars).
      if (colIdx > 0) {
        const targetChar = this.targetChars[colIdx - 1];
        if (targetChar) targetChar.state = "matched";
      }
    }

    this.pushStep({
      type: "trace-edit-path",
      description: `Trace full edit path (${path.length} steps)`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record the final edit-distance result and emit a "found" step. */
  updateResult(value: number, variables: Record<string, unknown>): void {
    this.result = value;
    this.pushStep({
      type: "found",
      description: `Edit distance = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Finalise the step sequence — clear transient "current"/"computing" states,
   * ensure result is set, and emit the terminal "complete" step.
   */
  complete(variables: Record<string, unknown>): void {
    // Derive result from bottom-right cell if not explicitly set.
    if (this.result === null) {
      const lastRow = this.matrix[this.matrix.length - 1];
      const bottomRight = lastRow?.[lastRow.length - 1];
      if (bottomRight !== undefined) this.result = bottomRight.value;
    }

    this.clearCurrentStates();
    this.clearComputingStates();

    this.pushStep({
      type: "complete",
      description:
        this.result !== null
          ? `Edit distance computation complete — result: ${this.result}`
          : "Edit distance computation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
