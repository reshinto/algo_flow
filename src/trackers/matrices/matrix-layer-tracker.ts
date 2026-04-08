/**
 * Matrix layer tracker — builds execution steps for layer-by-layer matrix operations.
 * Supports ring selection, processing, value accumulation, and reshape operations.
 */
import type { MatrixCell, MatrixCellState, MatrixVisualState, MatrixBoundaries } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class MatrixLayerTracker extends BaseTracker {
  private cells: MatrixCell[][];
  private currentPosition: [number, number] | null = null;
  private activeLayer: number | null = null;
  private totalLayers: number;
  private scalarResult: number | null = null;
  private boundaries: MatrixBoundaries;
  private collectedOrder: number[] = [];

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
    const rows = matrix.length;
    const cols = matrix[0]?.length ?? 0;
    this.totalLayers = Math.ceil(Math.min(rows, cols) / 2);
    this.boundaries = {
      top: 0,
      bottom: rows - 1,
      left: 0,
      right: cols - 1,
    };
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
      activeLayer: this.activeLayer,
      totalLayers: this.totalLayers,
      scalarResult: this.scalarResult,
    };
  }

  private setCellState(row: number, col: number, state: MatrixCellState): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: `Initialize layer operations — ${this.totalLayers} layers detected`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight a ring/layer of cells. */
  selectLayer(layerIndex: number, variables: Record<string, unknown>): void {
    // Reset previous layer
    if (this.activeLayer !== null) {
      this.markLayerCells(this.activeLayer, "layer-processed");
    }
    this.activeLayer = layerIndex;
    this.markLayerCells(layerIndex, "layer-active");
    this.pushStep({
      type: "select-layer",
      description: `Select layer ${layerIndex}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark all cells on a given layer ring with a state. */
  private markLayerCells(layerIndex: number, state: MatrixCellState): void {
    const rows = this.cells.length;
    const cols = this.cells[0]?.length ?? 0;
    const topBound = layerIndex;
    const bottomBound = rows - 1 - layerIndex;
    const leftBound = layerIndex;
    const rightBound = cols - 1 - layerIndex;

    if (topBound > bottomBound || leftBound > rightBound) return;

    // Top row
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      this.setCellState(topBound, colIdx, state);
    }
    // Bottom row
    for (let colIdx = leftBound; colIdx <= rightBound; colIdx++) {
      this.setCellState(bottomBound, colIdx, state);
    }
    // Left column (excluding corners)
    for (let rowIdx = topBound + 1; rowIdx < bottomBound; rowIdx++) {
      this.setCellState(rowIdx, leftBound, state);
    }
    // Right column (excluding corners)
    for (let rowIdx = topBound + 1; rowIdx < bottomBound; rowIdx++) {
      this.setCellState(rowIdx, rightBound, state);
    }
  }

  /** Process a layer (mark as processed after operations). */
  processLayer(layerIndex: number, variables: Record<string, unknown>, description: string): void {
    this.markLayerCells(layerIndex, "layer-processed");
    this.pushStep({
      type: "process-layer",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Accumulate a value (e.g., diagonal sum). */
  accumulateValue(
    row: number,
    col: number,
    runningTotal: number,
    variables: Record<string, unknown>,
  ): void {
    this.setCellState(row, col, "current");
    this.currentPosition = [row, col];
    this.scalarResult = runningTotal;
    this.collectedOrder.push(this.cells[row]?.[col]?.value ?? 0);
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "accumulate",
      description: `Add matrix[${row}][${col}] = ${this.cells[row]?.[col]?.value} → sum = ${runningTotal}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Swap two cells within a layer (for layer rotation). */
  swapCells(
    srcRow: number,
    srcCol: number,
    dstRow: number,
    dstCol: number,
    variables: Record<string, unknown>,
  ): void {
    this.setCellState(srcRow, srcCol, "swapping");
    this.setCellState(dstRow, dstCol, "swapping");

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
  }

  /** Place a value during reshape operation. */
  reshapeCell(
    srcRow: number,
    srcCol: number,
    dstRow: number,
    dstCol: number,
    value: number,
    variables: Record<string, unknown>,
  ): void {
    this.setCellState(srcRow, srcCol, "collected");
    const dstCell = this.cells[dstRow]?.[dstCol];
    if (dstCell) dstCell.value = value;
    this.setCellState(dstRow, dstCol, "placed");
    this.currentPosition = [dstRow, dstCol];
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "place-value",
      description: `Reshape [${srcRow}][${srcCol}] → [${dstRow}][${dstCol}] = ${value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Visit a cell (generic use, e.g., diagonal traversal). */
  visitCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    if (this.currentPosition) {
      const [prevRow, prevCol] = this.currentPosition;
      this.setCellState(prevRow, prevCol, "layer-processed");
    }
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
    if (this.currentPosition) {
      const [row, col] = this.currentPosition;
      this.setCellState(row, col, "layer-processed");
    }
    this.currentPosition = null;
    this.activeLayer = null;
    this.pushStep({
      type: "complete",
      description:
        this.scalarResult !== null
          ? `Complete — result: ${this.scalarResult}`
          : "Layer operations complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
