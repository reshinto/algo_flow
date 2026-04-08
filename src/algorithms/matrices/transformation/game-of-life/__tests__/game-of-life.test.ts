import { describe, it, expect } from "vitest";
import { gameOfLife } from "../sources/game-of-life.ts?fn";

function deepCopy(board: number[][]): number[][] {
  return board.map((row) => [...row]);
}

describe("gameOfLife", () => {
  it("simulates one step of the standard 4×3 example", () => {
    const board = deepCopy([
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ]);
    expect(gameOfLife(board)).toEqual([
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ]);
  });

  it("handles an all-dead board (nothing changes)", () => {
    const board = deepCopy([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(gameOfLife(board)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("handles an all-alive 3×3 board (overpopulation kills corners and edges)", () => {
    const board = deepCopy([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);
    // Center has 8 neighbors → dies; corners have 3 neighbors → survive
    expect(gameOfLife(board)).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });

  it("handles a 1×1 dead cell (stays dead)", () => {
    const board = deepCopy([[0]]);
    expect(gameOfLife(board)).toEqual([[0]]);
  });

  it("handles a 1×1 live cell (dies from underpopulation)", () => {
    const board = deepCopy([[1]]);
    expect(gameOfLife(board)).toEqual([[0]]);
  });

  it("simulates a 2×2 still life block (block stays unchanged)", () => {
    // A 2×2 block surrounded by dead cells is a still life
    const board = deepCopy([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);
    expect(gameOfLife(board)).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("simulates a vertical blinker oscillator (becomes horizontal)", () => {
    // Vertical blinker: 3 cells in a column → becomes horizontal row
    const board = deepCopy([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);
    expect(gameOfLife(board)).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);
  });

  it("simulates reproduction: dead cell with exactly 3 live neighbors becomes alive", () => {
    // Three live cells in an L shape — the corner dead cell has 3 neighbors and reproduces
    const board = deepCopy([
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);
    expect(gameOfLife(board)).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });
});
