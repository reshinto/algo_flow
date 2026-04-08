import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { floodFillDfs } from "../sources/flood-fill-dfs.ts?fn";

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

describe("floodFillDfs", () => {
  it("fills all cells on a small empty grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const result = floodFillDfs(grid, [0, 0]);

    expect(result.count).toBe(9);
    expect(result.filled.length).toBe(9);
  });

  it("respects walls and does not fill through them", () => {
    const grid = createEmptyGrid(3, 3);
    /* Wall divides left column from the rest */
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 1, "wall");
    setCell(grid, 2, 1, "wall");

    const result = floodFillDfs(grid, [0, 0]);

    /* Only left column (3 cells) should be filled */
    expect(result.count).toBe(3);
  });

  it("fills same total count as BFS on identical grid", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 2, "wall");

    const result = floodFillDfs(grid, [0, 0]);

    /* 16 total cells - 2 walls = 14 reachable cells */
    expect(result.count).toBe(14);
  });

  it("starts with the seed cell in the filled list", () => {
    const grid = createEmptyGrid(3, 3);

    const result = floodFillDfs(grid, [1, 1]);

    expect(result.filled[0]).toEqual([1, 1]);
  });

  it("fills a single isolated cell when all neighbors are walls", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 1, "wall");

    const result = floodFillDfs(grid, [1, 1]);

    expect(result.count).toBe(1);
    expect(result.filled[0]).toEqual([1, 1]);
  });

  it("count matches filled array length", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 2, "wall");
    setCell(grid, 1, 2, "wall");

    const result = floodFillDfs(grid, [0, 0]);

    expect(result.count).toBe(result.filled.length);
  });

  it("treats start and end cell types as passable", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = floodFillDfs(grid, [0, 0]);

    /* All 9 cells should be filled including start and end */
    expect(result.count).toBe(9);
  });
});
