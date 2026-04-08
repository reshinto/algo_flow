import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { wallFollower } from "../sources/wall-follower.ts?fn";

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

describe("wallFollower", () => {
  it("finds a path in a simple corridor", () => {
    const grid = createEmptyGrid(1, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 4, "end");

    const result = wallFollower(grid, [0, 0], [0, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[result.path.length - 1]).toEqual([0, 4]);
  });

  it("starts path at start position", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = wallFollower(grid, [0, 0], [2, 2]);

    expect(result.path[0]).toEqual([0, 0]);
  });

  it("handles start equal to end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = wallFollower(grid, [1, 1], [1, 1]);

    expect(result.path.length).toBeGreaterThanOrEqual(1);
    expect(result.path[result.path.length - 1]).toEqual([1, 1]);
  });

  it("solves an L-shaped corridor", () => {
    // Create an L-shape: row 0 horizontal then column 4 vertical
    const grid = createEmptyGrid(5, 5);
    // Fill entire grid with walls
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        setCell(grid, rowIndex, colIndex, "wall");
      }
    }
    // Carve out L-shaped corridor
    for (let colIndex = 0; colIndex <= 4; colIndex++) {
      setCell(grid, 0, colIndex, "empty");
    }
    for (let rowIndex = 0; rowIndex <= 4; rowIndex++) {
      setCell(grid, rowIndex, 4, "empty");
    }
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = wallFollower(grid, [0, 0], [4, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("returns visited cells", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = wallFollower(grid, [0, 0], [2, 2]);

    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("traverses consecutive adjacent cells in path", () => {
    const grid = createEmptyGrid(1, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 4, "end");

    const result = wallFollower(grid, [0, 0], [0, 4]);

    for (let pathIndex = 1; pathIndex < result.path.length; pathIndex++) {
      const prev = result.path[pathIndex - 1]!;
      const curr = result.path[pathIndex]!;
      const rowDiff = Math.abs(curr[0] - prev[0]);
      const colDiff = Math.abs(curr[1] - prev[1]);
      expect(rowDiff + colDiff).toBe(1);
    }
  });

  it("returns empty path when no route exists within step limit", () => {
    // A 2x2 grid with start completely walled in
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = wallFollower(grid, [0, 0], [2, 2]);

    // With start isolated, wall follower can't move — returns empty path
    expect(result.path).toEqual([]);
  });
});
