import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { ellersMaze } from "./sources/ellers-maze.ts?fn";

function createAllWallsGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      type: "wall" as const,
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

function bfsReachable(grid: GridCell[][], start: [number, number], end: [number, number]): boolean {
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;
  const visited: boolean[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  const queue: [number, number][] = [start];
  visited[start[0]]![start[1]] = true;

  while (queue.length > 0) {
    const current = queue.shift()!;
    const [currentRow, currentCol] = current;
    if (currentRow === end[0] && currentCol === end[1]) return true;

    for (const [deltaRow, deltaCol] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ] as [number, number][]) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount) continue;
      if (neighborCol < 0 || neighborCol >= colCount) continue;
      if (visited[neighborRow]![neighborCol]) continue;
      const cell = grid[neighborRow]?.[neighborCol];
      if (!cell || cell.type === "wall") continue;
      visited[neighborRow]![neighborCol] = true;
      queue.push([neighborRow, neighborCol]);
    }
  }
  return false;
}

describe("ellersMaze", () => {
  it("carves passages from an all-walls grid", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const result = ellersMaze(grid);

    expect(result.passagesCarved).toBeGreaterThan(0);
  });

  it("creates a connected maze where start can reach end", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    ellersMaze(grid);

    expect(bfsReachable(grid, [1, 1], [7, 7])).toBe(true);
  });

  it("carves all odd-indexed passage cells", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    ellersMaze(grid);

    for (let rowIndex = 1; rowIndex < 8; rowIndex += 2) {
      for (let colIndex = 1; colIndex < 8; colIndex += 2) {
        const cell = grid[rowIndex]?.[colIndex];
        expect(cell?.type).not.toBe("wall");
      }
    }
  });

  it("does not carve border cells", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    ellersMaze(grid);

    for (let colIndex = 0; colIndex < 9; colIndex++) {
      expect(grid[0]?.[colIndex]?.type).toBe("wall");
      expect(grid[8]?.[colIndex]?.type).toBe("wall");
    }
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      expect(grid[rowIndex]?.[0]?.type).toBe("wall");
      expect(grid[rowIndex]?.[8]?.type).toBe("wall");
    }
  });

  it("returns passagesCarved count greater than zero", () => {
    const grid = createAllWallsGrid(7, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 7, "end");

    const result = ellersMaze(grid);

    expect(result.passagesCarved).toBeGreaterThan(0);
  });
});
