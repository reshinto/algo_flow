/**
 * Matrix transform tracker — builds execution steps for matrix transformation algorithms.
 * Supports in-place rotation, transposition, zeroing, and flipping operations.
 */
import type { MatrixCell, MatrixCellState, MatrixVisualState, MatrixBoundaries } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class MatrixTransformTracker extends BaseTracker {
  private cells: MatrixCell[][];
  private currentPosition: [number, number] | null = null;
  private swapSource: [number, number] | null = null;
  private swapTarget: [number, number] | null = null;
  private phase: string = "";
  private originalCells: MatrixCell[][] | null = null;
  private boundaries: MatrixBoundaries;

  constructor(matrix: number[][], lineMap: LineMap) {
    super(lineMap);
    this.cells = matrix.map((row, rowIdx) =>
      row.map((value, colIdx) => ({
        row: rowIdx,
        col: colIdx,
        value,
        state: "default" as MatrixCellState,
      })),
    );
    this.boundaries = {
      top: 0,
      bottom: matrix.length - 1,
      left: 0,
      right: (matrix[0]?.length ?? 0) - 1,
    };
    // Store original for before/after display
    this.originalCells = this.cells.map((row) => row.map((cell) => ({ ...cell })));
  }

  private snapshot(): MatrixVisualState {
    return {
      kind: "matrix",
      cells: this.cells.map((row) => row.map((cell) => ({ ...cell }))),
      collectedOrder: [],
      currentPosition: this.currentPosition
        ? [this.currentPosition[0], this.currentPosition[1]]
        : null,
      direction: null,
      boundaries: { ...this.boundaries },
      swapSource: this.swapSource ? [this.swapSource[0], this.swapSource[1]] : null,
      swapTarget: this.swapTarget ? [this.swapTarget[0], this.swapTarget[1]] : null,
      phase: this.phase || undefined,
      originalCells: this.originalCells
        ? this.originalCells.map((row) => row.map((cell) => ({ ...cell })))
        : null,
    };
  }

  private setCellState(row: number, col: number, state: MatrixCellState): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize matrix for transformation",
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

  /** Swap two cells in-place. */
  swapCells(
    srcRow: number,
    srcCol: number,
    dstRow: number,
    dstCol: number,
    variables: Record<string, unknown>,
  ): void {
    this.setCellState(srcRow, srcCol, "swapping");
    this.setCellState(dstRow, dstCol, "swapping");
    this.swapSource = [srcRow, srcCol];
    this.swapTarget = [dstRow, dstCol];

    const srcCell = this.cells[srcRow]?.[srcCol];
    const dstCell = this.cells[dstRow]?.[dstCol];
    if (srcCell && dstCell) {
      const tempValue = srcCell.value;
      srcCell.value = dstCell.value;
      dstCell.value = tempValue;
    }

    this.setCellState(srcRow, srcCol, "swapped");
    this.setCellState(dstRow, dstCol, "swapped");
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };

    this.pushStep({
      type: "swap-cells",
      description: `Swap [${srcRow}][${srcCol}] ↔ [${dstRow}][${dstCol}]`,
      variables,
      visualState: this.snapshot(),
    });

    this.swapSource = null;
    this.swapTarget = null;
  }

  /** Mark a cell during scanning phase (e.g., marking rows/cols with zeros). */
  markCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    this.setCellState(row, col, "marked");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "mark-cell",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Set a cell value to zero. */
  zeroCell(row: number, col: number, variables: Record<string, unknown>): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.value = 0;
    this.setCellState(row, col, "zeroed");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "zero-cell",
      description: `Set [${row}][${col}] to 0`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Flip a cell value (e.g., 0→1 or 1→0 for binary image). */
  flipCell(row: number, col: number, newValue: number, variables: Record<string, unknown>): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.value = newValue;
    this.setCellState(row, col, "flipped");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "flip-cell",
      description: `Flip [${row}][${col}] to ${newValue}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Update a cell value without specific state change (general-purpose). */
  updateCell(
    row: number,
    col: number,
    newValue: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.value = newValue;
    this.setCellState(row, col, "current");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    // Reset all cell states to default for final view
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.state !== "zeroed") {
          cell.state = "default";
        }
      }
    }
    this.currentPosition = null;
    this.swapSource = null;
    this.swapTarget = null;
    this.pushStep({
      type: "complete",
      description: "Transformation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
