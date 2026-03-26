/**
 * Pathfinding tracker — builds execution steps for grid-based shortest-path
 * algorithms (Dijkstra, A*). Manages a mutable copy of the grid, updating
 * cell states (open, closed, path) and optional cost annotations as the
 * algorithm explores the frontier.
 */
import type { GridCell, GridCellState, GridVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class PathfindingTracker extends BaseTracker {
  private cells: GridCell[][];
  private startPos: [number, number];
  private endPos: [number, number];
  private currentPath: [number, number][] = [];

  constructor(
    cells: GridCell[][],
    startPos: [number, number],
    endPos: [number, number],
    lineMap: LineMap,
  ) {
    super(lineMap);
    this.cells = cells.map((row) => row.map((cell) => ({ ...cell })));
    this.startPos = startPos;
    this.endPos = endPos;
  }

  /** Deep-copy the current grid state for an immutable step snapshot. */
  private snapshot(): GridVisualState {
    return {
      kind: "grid",
      cells: this.cells.map((row) => row.map((cell) => ({ ...cell }))),
      startPosition: this.startPos,
      endPosition: this.endPos,
      currentPath: [...this.currentPath],
    };
  }

  /** Mutate the visual state of a single grid cell by row/col position. */
  private setCellState(row: number, col: number, state: GridCellState): void {
    const cellRow = this.cells[row];
    if (cellRow) {
      const cell = cellRow[col];
      if (cell) cell.state = state;
    }
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize pathfinding algorithm",
      variables,
      visualState: this.snapshot(),
    });
  }

  openNode(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    costs?: { gCost: number; hCost: number; fCost: number },
  ): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.setCellState(row, col, "open");
    if (costs) {
      const cellRow = this.cells[row];
      if (cellRow) {
        const cell = cellRow[col];
        if (cell) {
          cell.gCost = costs.gCost;
          cell.hCost = costs.hCost;
          cell.fCost = costs.fCost;
        }
      }
    }
    this.pushStep({
      type: "open-node",
      description: `Add cell (${row}, ${col}) to open set`,
      variables,
      visualState: this.snapshot(),
    });
  }

  closeNode(row: number, col: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.setCellState(row, col, "closed");
    this.pushStep({
      type: "close-node",
      description: `Visit cell (${row}, ${col}) and move to closed set`,
      variables,
      visualState: this.snapshot(),
    });
  }

  tracePath(path: [number, number][], variables: Record<string, unknown>): void {
    this.currentPath = path;
    for (const [row, col] of path) {
      this.setCellState(row, col, "path");
    }
    this.pushStep({
      type: "trace-path",
      description: `Path found with ${path.length} cells`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>, pathFound: boolean): void {
    this.pushStep({
      type: "complete",
      description: pathFound ? "Path found!" : "No path exists",
      variables,
      visualState: this.snapshot(),
    });
  }
}
