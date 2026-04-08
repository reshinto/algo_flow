/**
 * Matrix construction tracker — builds execution steps for matrix construction
 * and verification algorithms. Supports cell placement, computation, and validation.
 */
import type { MatrixCell, MatrixCellState, MatrixVisualState, MatrixBoundaries } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class MatrixConstructionTracker extends BaseTracker {
  private cells: MatrixCell[][];
  private currentPosition: [number, number] | null = null;
  private fillOrder: number[] = [];
  private boundaries: MatrixBoundaries;
  private collectedOrder: number[] = [];
  private phase: string = "";

  constructor(rows: number, cols: number, lineMap: LineMap, initialValue: number = 0) {
    super(lineMap);
    this.cells = Array.from({ length: rows }, (_, rowIdx) =>
      Array.from({ length: cols }, (_, colIdx) => ({
        row: rowIdx,
        col: colIdx,
        value: initialValue,
        state: "default" as MatrixCellState,
      })),
    );
    this.boundaries = {
      top: 0,
      bottom: rows - 1,
      left: 0,
      right: cols - 1,
    };
  }

  /** Create a construction tracker from an existing matrix (for verification algorithms). */
  static fromMatrix(matrix: number[][], lineMap: LineMap): MatrixConstructionTracker {
    const rows = matrix.length;
    const cols = matrix[0]?.length ?? 0;
    const tracker = new MatrixConstructionTracker(rows, cols, lineMap);
    for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
      for (let colIdx = 0; colIdx < cols; colIdx++) {
        const cell = tracker.cells[rowIdx]?.[colIdx];
        const value = matrix[rowIdx]?.[colIdx];
        if (cell && value !== undefined) {
          cell.value = value;
        }
      }
    }
    return tracker;
  }

  private snapshot(): MatrixVisualState {
    return {
      kind: "matrix",
      cells: this.cells.map((row) => row.map((cell) => ({ ...cell }))),
      collectedOrder: [...this.collectedOrder],
      currentPosition: this.currentPosition
        ? [this.currentPosition[0], this.currentPosition[1]]
        : null,
      direction: null,
      boundaries: { ...this.boundaries },
      fillOrder: [...this.fillOrder],
      phase: this.phase || undefined,
    };
  }

  private setCellState(row: number, col: number, state: MatrixCellState): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize matrix construction",
      variables,
      visualState: this.snapshot(),
    });
  }

  setPhase(phase: string, variables: Record<string, unknown>, description: string): void {
    this.phase = phase;
    this.pushStep({
      type: "initialize",
      description,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "initialize",
    });
  }

  /** Place a value into a cell during construction. */
  placeValue(row: number, col: number, value: number, variables: Record<string, unknown>): void {
    // Reset previous current cell
    if (this.currentPosition) {
      const [prevRow, prevCol] = this.currentPosition;
      this.setCellState(prevRow, prevCol, "placed");
    }
    const cell = this.cells[row]?.[col];
    if (cell) cell.value = value;
    this.setCellState(row, col, "current");
    this.currentPosition = [row, col];
    this.fillOrder.push(value);
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "place-value",
      description: `Place ${value} at [${row}][${col}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compute and place a value (e.g., Pascal's triangle cell). */
  computeCell(
    row: number,
    col: number,
    value: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    // Reset previous current cell
    if (this.currentPosition) {
      const [prevRow, prevCol] = this.currentPosition;
      this.setCellState(prevRow, prevCol, "placed");
    }
    this.setCellState(row, col, "computing");
    this.currentPosition = [row, col];

    const cell = this.cells[row]?.[col];
    if (cell) cell.value = value;

    this.setCellState(row, col, "placed");
    this.fillOrder.push(value);
    this.collectedOrder.push(value);
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "compute-value",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Verify a cell passes a condition (e.g., Toeplitz diagonal check). */
  verifyCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    passed: boolean,
    description: string,
  ): void {
    this.setCellState(row, col, passed ? "found" : "eliminated");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "verify-cell",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    if (this.currentPosition) {
      const [row, col] = this.currentPosition;
      this.setCellState(row, col, "placed");
    }
    this.currentPosition = null;
    this.pushStep({
      type: "complete",
      description: `Construction complete — ${this.fillOrder.length} cells processed`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
