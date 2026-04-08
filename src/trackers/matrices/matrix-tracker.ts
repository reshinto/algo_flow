/**
 * Matrix tracker — builds execution steps for matrix traversal algorithms.
 * Maintains a 2D cell grid with boundary markers and a collected-order list,
 * emitting steps as each cell is visited and boundaries shrink.
 */
import type {
  MatrixCell,
  MatrixCellState,
  MatrixBoundaries,
  MatrixTraversalDirection,
  MatrixVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class MatrixTracker extends BaseTracker {
  private cells: MatrixCell[][];
  private collectedOrder: number[] = [];
  private currentPosition: [number, number] | null = null;
  private direction: MatrixTraversalDirection | null = null;
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
  }

  private snapshot(): MatrixVisualState {
    return {
      kind: "matrix",
      cells: this.cells.map((row) => row.map((cell) => ({ ...cell }))),
      collectedOrder: [...this.collectedOrder],
      currentPosition: this.currentPosition
        ? [this.currentPosition[0], this.currentPosition[1]]
        : null,
      direction: this.direction,
      boundaries: { ...this.boundaries },
    };
  }

  private setCellState(row: number, col: number, state: MatrixCellState): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Set up spiral boundaries: top, bottom, left, right",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Set the active traversal direction. */
  setDirection(direction: MatrixTraversalDirection, variables: Record<string, unknown>): void {
    this.direction = direction;
    this.pushStep({
      type: "move-direction",
      description: `Traversing ${direction}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Collect a cell into the result. */
  collectCell(row: number, col: number, variables: Record<string, unknown>): void {
    // Reset previous current cell to collected
    if (this.currentPosition) {
      const [prevRow, prevCol] = this.currentPosition;
      this.setCellState(prevRow, prevCol, "collected");
    }
    this.currentPosition = [row, col];
    this.setCellState(row, col, "current");
    const cell = this.cells[row]?.[col];
    if (cell) this.collectedOrder.push(cell.value);
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "collect-element",
      description: `Collect matrix[${row}][${col}] = ${cell?.value}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Shrink a boundary inward after finishing a pass along that edge. */
  shrinkBoundary(
    side: "top" | "bottom" | "left" | "right",
    variables: Record<string, unknown>,
  ): void {
    switch (side) {
      case "top":
        this.boundaries.top++;
        break;
      case "bottom":
        this.boundaries.bottom--;
        break;
      case "left":
        this.boundaries.left++;
        break;
      case "right":
        this.boundaries.right--;
        break;
    }
    this.pushStep({
      type: "shrink-boundary",
      description: `Shrink ${side} boundary`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    if (this.currentPosition) {
      const [row, col] = this.currentPosition;
      this.setCellState(row, col, "collected");
      this.currentPosition = null;
    }
    this.direction = null;
    this.pushStep({
      type: "complete",
      description: `Spiral traversal complete — collected ${this.collectedOrder.length} elements`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
