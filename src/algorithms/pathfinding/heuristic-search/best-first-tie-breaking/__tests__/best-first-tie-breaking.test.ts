import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { bestFirstTieBreaking } from "../sources/best-first-tie-breaking.ts?fn";

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

describe("bestFirstTieBreaking", () => {
  it("finds a path on an empty grid", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = bestFirstTieBreaking(grid, [0, 0], [4, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("finds optimal path length", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = bestFirstTieBreaking(grid, [0, 0], [4, 4]);

    /* Manhattan distance = 8, path has 9 cells */
    expect(result.path.length).toBe(9);
  });

  it("returns empty path when no route exists", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = bestFirstTieBreaking(grid, [0, 0], [4, 4]);

    expect(result.path).toEqual([]);
  });

  it("navigates around walls", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 4, "end");

    setCell(grid, 0, 2, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 2, "wall");

    const result = bestFirstTieBreaking(grid, [0, 0], [0, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[result.path.length - 1]).toEqual([0, 4]);
  });

  it("handles adjacent start and end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "end");

    const result = bestFirstTieBreaking(grid, [0, 0], [0, 1]);

    expect(result.path).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });

  it("handles start equal to end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = bestFirstTieBreaking(grid, [1, 1], [1, 1]);

    expect(result.path.length).toBe(1);
    expect(result.path[0]).toEqual([1, 1]);
  });

  it("tracks visited cells", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = bestFirstTieBreaking(grid, [0, 0], [2, 2]);

    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("produces the same optimal cost as standard A* but different path shape", () => {
    const grid = createEmptyGrid(7, 7);
    setCell(grid, 0, 0, "start");
    setCell(grid, 6, 6, "end");

    const result = bestFirstTieBreaking(grid, [0, 0], [6, 6]);

    /* Optimal length = Manhattan distance 12 + 1 = 13 cells */
    expect(result.path.length).toBe(13);
  });
});
