/**
 * Matrix search tracker — builds execution steps for matrix search algorithms.
 * Supports binary search, staircase search, flood fill, and region elimination.
 */
import type {
  MatrixCell,
  MatrixCellState,
  MatrixVisualState,
  MatrixBoundaries,
  MatrixSearchRegion,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class MatrixSearchTracker extends BaseTracker {
  private cells: MatrixCell[][];
  private currentPosition: [number, number] | null = null;
  private searchTarget: number | null;
  private searchRegion: MatrixSearchRegion | null = null;
  private boundaries: MatrixBoundaries;
  private collectedOrder: number[] = [];

  constructor(matrix: number[][], target: number | null, lineMap: LineMap) {
    super(lineMap);
    this.searchTarget = target;
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
      direction: null,
      boundaries: { ...this.boundaries },
      searchRegion: this.searchRegion ? { ...this.searchRegion } : null,
      searchTarget: this.searchTarget,
    };
  }

  private setCellState(row: number, col: number, state: MatrixCellState): void {
    const cell = this.cells[row]?.[col];
    if (cell) cell.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: `Initialize search${this.searchTarget !== null ? ` for target ${this.searchTarget}` : ""}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compare a cell value against the search target. */
  compareCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    // Reset previous comparing cell
    if (this.currentPosition) {
      const [prevRow, prevCol] = this.currentPosition;
      const prevCell = this.cells[prevRow]?.[prevCol];
      if (prevCell && prevCell.state === "comparing") {
        prevCell.state = "eliminated";
      }
    }
    this.setCellState(row, col, "comparing");
    this.currentPosition = [row, col];
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare-cell",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a cell as found (target located). */
  markFound(row: number, col: number, variables: Record<string, unknown>): void {
    this.setCellState(row, col, "found");
    this.currentPosition = [row, col];
    this.pushStep({
      type: "mark-found",
      description: `Found target at [${row}][${col}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Eliminate a search region (mark cells as no longer candidates). */
  eliminateRegion(
    topRow: number,
    bottomRow: number,
    leftCol: number,
    rightCol: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    this.searchRegion = { topRow, bottomRow, leftCol, rightCol };
    for (let rowIdx = topRow; rowIdx <= bottomRow; rowIdx++) {
      for (let colIdx = leftCol; colIdx <= rightCol; colIdx++) {
        const cell = this.cells[rowIdx]?.[colIdx];
        if (cell && cell.state === "default") {
          cell.state = "eliminated";
        }
      }
    }
    this.pushStep({
      type: "eliminate-region",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Visit a cell during traversal (e.g., DFS flood fill). */
  visitCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
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

  /** Mark a cell as part of a found region (e.g., island). */
  markRegionCell(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    this.setCellState(row, col, "found");
    this.currentPosition = [row, col];
    this.collectedOrder.push(this.cells[row]?.[col]?.value ?? 0);
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "mark-found",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Set the search region being considered. */
  setSearchRegion(
    topRow: number,
    bottomRow: number,
    leftCol: number,
    rightCol: number,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    this.searchRegion = { topRow, bottomRow, leftCol, rightCol };
    for (let rowIdx = topRow; rowIdx <= bottomRow; rowIdx++) {
      for (let colIdx = leftCol; colIdx <= rightCol; colIdx++) {
        const cell = this.cells[rowIdx]?.[colIdx];
        if (cell && cell.state === "default") {
          cell.state = "searching";
        }
      }
    }
    this.pushStep({
      type: "visit",
      description,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "visit",
    });
  }

  complete(variables: Record<string, unknown>, found: boolean = false): void {
    if (this.currentPosition) {
      const [row, col] = this.currentPosition;
      if (found) {
        this.setCellState(row, col, "found");
      }
    }
    this.currentPosition = null;
    this.searchRegion = null;
    this.pushStep({
      type: "complete",
      description: found ? "Search complete — target found" : "Search complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
