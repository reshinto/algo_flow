/**
 * Pathfinding tracker — builds execution steps for grid-based pathfinding
 * algorithms. Manages a mutable copy of the grid, updating cell states
 * (open, closed, path, etc.) and optional cost annotations as the algorithm
 * explores the frontier. Supports standard search, bidirectional search,
 * flood fill, and maze generation operations.
 */
import type { GridCell, GridCellState, GridCellType, GridVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class PathfindingTracker extends BaseTracker {
  private cells: GridCell[][];
  private startPos: [number, number];
  private endPos: [number, number];
  private currentPath: [number, number][] = [];
  private reversePath: [number, number][] = [];
  private carvedCount = 0;
  private currentPhase: string | undefined;
  private previousCurrentPos: [number, number] | null = null;

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
    const snap: GridVisualState = {
      kind: "grid",
      cells: this.cells.map((row) => row.map((cell) => ({ ...cell }))),
      startPosition: this.startPos,
      endPosition: this.endPos,
      currentPath: [...this.currentPath],
    };
    if (this.reversePath.length > 0) snap.reversePath = [...this.reversePath];
    if (this.carvedCount > 0) snap.carvedCount = this.carvedCount;
    if (this.currentPhase) snap.phase = this.currentPhase;
    return snap;
  }

  /** Mutate the visual state of a single grid cell by row/col position. */
  private setCellState(row: number, col: number, state: GridCellState): void {
    const cellRow = this.cells[row];
    if (cellRow) {
      const cell = cellRow[col];
      if (cell) cell.state = state;
    }
  }

  /** Mutate the structural type of a single grid cell (wall ↔ empty). */
  private setCellType(row: number, col: number, type: GridCellType): void {
    const cellRow = this.cells[row];
    if (cellRow) {
      const cell = cellRow[col];
      if (cell) cell.type = type;
    }
  }

  /** Set the current algorithm phase label. */
  setPhase(phase: string): void {
    this.currentPhase = phase;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize pathfinding algorithm",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight the node currently being expanded, auto-resetting the previous one. */
  setCurrentNode(row: number, col: number, variables: Record<string, unknown>): void {
    if (this.previousCurrentPos) {
      const [prevRow, prevCol] = this.previousCurrentPos;
      this.setCellState(prevRow, prevCol, "closed");
    }
    this.setCellState(row, col, "current");
    this.previousCurrentPos = [row, col];
    this.pushStep({
      type: "visit",
      description: `Expanding cell (${row}, ${col})`,
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

  /** Update g/h/f costs on a cell during cost relaxation. */
  updateCost(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    costs: { gCost: number; hCost?: number; fCost?: number },
  ): void {
    const cellRow = this.cells[row];
    if (cellRow) {
      const cell = cellRow[col];
      if (cell) {
        cell.gCost = costs.gCost;
        if (costs.hCost !== undefined) cell.hCost = costs.hCost;
        if (costs.fCost !== undefined) cell.fCost = costs.fCost;
      }
    }
    this.pushStep({
      type: "update-cost",
      description: `Update cost at (${row}, ${col}): g=${costs.gCost}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Add a cell to the reverse (backward) open set for bidirectional search. */
  openNodeReverse(row: number, col: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.setCellState(row, col, "open-reverse");
    this.pushStep({
      type: "open-node",
      description: `Add cell (${row}, ${col}) to reverse open set`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Move a cell to the reverse (backward) closed set for bidirectional search. */
  closeNodeReverse(row: number, col: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.setCellState(row, col, "closed-reverse");
    this.pushStep({
      type: "close-node",
      description: `Visit cell (${row}, ${col}) in reverse search`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Carve a wall cell into an empty passage during maze generation. */
  carveCell(row: number, col: number, variables: Record<string, unknown>): void {
    this.setCellType(row, col, "empty");
    this.setCellState(row, col, "carved");
    this.carvedCount++;
    this.pushStep({
      type: "carve-cell",
      description: `Carve passage at (${row}, ${col})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a cell as a jump point for Jump Point Search visualization. */
  markJumpPoint(row: number, col: number, variables: Record<string, unknown>): void {
    this.setCellState(row, col, "jump-point");
    this.pushStep({
      type: "visit",
      description: `Jump point found at (${row}, ${col})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  tracePath(path: [number, number][], variables: Record<string, unknown>): void {
    this.currentPath = path;
    for (const [pathRow, pathCol] of path) {
      this.setCellState(pathRow, pathCol, "path");
    }
    this.pushStep({
      type: "trace-path",
      description: `Path found with ${path.length} cells`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Trace the reverse path for bidirectional algorithms. */
  traceReversePath(path: [number, number][], variables: Record<string, unknown>): void {
    this.reversePath = path;
    for (const [pathRow, pathCol] of path) {
      this.setCellState(pathRow, pathCol, "path");
    }
    this.pushStep({
      type: "trace-path",
      description: `Reverse path traced with ${path.length} cells`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Merge two regions during Kruskal's maze generation. */
  mergeCells(
    row: number,
    col: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.setCellType(row, col, "empty");
    this.setCellState(row, col, "carved");
    this.carvedCount++;
    this.pushStep({
      type: "merge-cells",
      description: description ?? `Merge regions at (${row}, ${col})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Build a wall at a cell position (used by Recursive Division). */
  buildWall(row: number, col: number, variables: Record<string, unknown>): void {
    this.setCellType(row, col, "wall");
    this.setCellState(row, col, "generating");
    this.pushStep({
      type: "carve-cell",
      description: `Build wall at (${row}, ${col})`,
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
