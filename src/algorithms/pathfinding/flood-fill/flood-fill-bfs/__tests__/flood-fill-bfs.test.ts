import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { floodFillBfs } from "../sources/flood-fill-bfs.ts?fn";

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

describe("floodFillBfs", () => {
  it("fills all cells on a small empty grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const result = floodFillBfs(grid, [0, 0]);

    expect(result.count).toBe(9);
    expect(result.filled.length).toBe(9);
  });

  it("respects walls and does not fill through them", () => {
    const grid = createEmptyGrid(3, 3);
    /* Wall divides left column from the rest */
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 1, "wall");
    setCell(grid, 2, 1, "wall");

    const result = floodFillBfs(grid, [0, 0]);

    /* Only left column (3 cells) should be filled */
    expect(result.count).toBe(3);
  });

  it("fills only the connected region when surrounded by walls", () => {
    const grid = createEmptyGrid(5, 5);
    /* Enclose a 3x3 region in the center */
    for (let col = 0; col < 5; col++) {
      setCell(grid, 0, col, "wall");
      setCell(grid, 4, col, "wall");
    }
    for (let row = 1; row < 4; row++) {
      setCell(grid, row, 0, "wall");
      setCell(grid, row, 4, "wall");
    }

    const result = floodFillBfs(grid, [2, 2]);

    /* Interior 3x3 = 9 cells */
    expect(result.count).toBe(9);
  });

  it("starts with the seed cell in the filled list", () => {
    const grid = createEmptyGrid(3, 3);

    const result = floodFillBfs(grid, [1, 1]);

    expect(result.filled[0]).toEqual([1, 1]);
  });

  it("fills a single isolated cell when all neighbors are walls", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 1, "wall");

    const result = floodFillBfs(grid, [1, 1]);

    expect(result.count).toBe(1);
    expect(result.filled[0]).toEqual([1, 1]);
  });

  it("count matches filled array length", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 2, 0, "wall");
    setCell(grid, 2, 1, "wall");
    setCell(grid, 2, 2, "wall");

    const result = floodFillBfs(grid, [0, 0]);

    expect(result.count).toBe(result.filled.length);
  });

  it("treats start and end cell types as passable", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = floodFillBfs(grid, [0, 0]);

    /* All 9 cells should be filled including start and end */
    expect(result.count).toBe(9);
  });
});
