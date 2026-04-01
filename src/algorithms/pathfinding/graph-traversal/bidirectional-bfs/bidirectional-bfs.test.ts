import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { bidirectionalBfsGrid } from "./sources/bidirectional-bfs-grid.ts?fn";

function createEmptyGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      type: "empty" as const,
      state: "default" as const,
    })),
  );
}

function setCell(grid: GridCell[][], row: number, col: number, type: GridCell["type"]): void {
  const gridRow = grid[row];
  if (gridRow) {
    const cell = gridRow[col];
    if (cell) cell.type = type;
  }
}

describe("bidirectionalBfs", () => {
  it("finds a path on an empty grid", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = bidirectionalBfsGrid(grid, [0, 0], [4, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("returns empty path when no route exists", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    /* Completely wall off the start node */
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = bidirectionalBfsGrid(grid, [0, 0], [4, 4]);

    expect(result.path).toEqual([]);
  });

  it("handles adjacent start and end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "end");

    const result = bidirectionalBfsGrid(grid, [0, 0], [0, 1]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([0, 1]);
  });

  it("handles start equal to end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = bidirectionalBfsGrid(grid, [1, 1], [1, 1]);

    expect(result.path.length).toBe(1);
    expect(result.path[0]).toEqual([1, 1]);
  });

  it("navigates around walls", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    /* Create a wall barrier */
    setCell(grid, 0, 2, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 2, "wall");

    const result = bidirectionalBfsGrid(grid, [0, 0], [4, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("tracks visited cells from both directions", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = bidirectionalBfsGrid(grid, [0, 0], [4, 4]);

    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("finds a valid path (each consecutive pair is adjacent)", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = bidirectionalBfsGrid(grid, [0, 0], [4, 4]);

    for (let pathIndex = 1; pathIndex < result.path.length; pathIndex++) {
      const prev = result.path[pathIndex - 1]!;
      const curr = result.path[pathIndex]!;
      const rowDiff = Math.abs(curr[0] - prev[0]);
      const colDiff = Math.abs(curr[1] - prev[1]);
      expect(rowDiff + colDiff).toBe(1);
    }
  });
});
