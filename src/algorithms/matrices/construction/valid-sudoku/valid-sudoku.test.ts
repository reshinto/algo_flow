import { describe, it, expect } from "vitest";
import { validSudoku } from "./sources/valid-sudoku.ts?fn";

const VALID_PARTIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const EMPTY_BOARD = Array.from({ length: 9 }, () => Array(9).fill(0) as number[]);

describe("validSudoku", () => {
  it("accepts the default valid partial board", () => {
    expect(validSudoku(VALID_PARTIAL_BOARD)).toBe(true);
  });

  it("accepts an all-zeros (empty) board", () => {
    expect(validSudoku(EMPTY_BOARD)).toBe(true);
  });

  it("rejects a board with a duplicate in a row", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[0]![0] = 5;
    board[0]![4] = 5; // duplicate 5 in row 0
    expect(validSudoku(board)).toBe(false);
  });

  it("rejects a board with a duplicate in a column", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[0]![0] = 3;
    board[5]![0] = 3; // duplicate 3 in column 0
    expect(validSudoku(board)).toBe(false);
  });

  it("rejects a board with a duplicate in a 3×3 box", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[0]![0] = 7;
    board[2]![2] = 7; // duplicate 7 in top-left box
    expect(validSudoku(board)).toBe(false);
  });

  it("accepts a fully valid completed board", () => {
    const completedBoard = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    expect(validSudoku(completedBoard)).toBe(true);
  });

  it("accepts a board with a single filled cell", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[4]![4] = 5;
    expect(validSudoku(board)).toBe(true);
  });

  it("rejects a board where the same digit appears twice in the same box via different rows and columns", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[0]![1] = 9;
    board[1]![2] = 9; // both 9s are in box 0 (top-left), different rows and columns
    expect(validSudoku(board)).toBe(false);
  });
});
