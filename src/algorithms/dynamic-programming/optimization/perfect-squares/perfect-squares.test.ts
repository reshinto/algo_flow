import { describe, it, expect } from "vitest";
import { perfectSquares } from "./sources/perfect-squares.ts?fn";

describe("perfectSquares", () => {
  it("returns 3 for targetNumber 12 (4 + 4 + 4)", () => {
    expect(perfectSquares(12)).toBe(3);
  });

  it("returns 2 for targetNumber 13 (4 + 9)", () => {
    expect(perfectSquares(13)).toBe(2);
  });

  it("returns 1 for targetNumber 1 (1 = 1²)", () => {
    expect(perfectSquares(1)).toBe(1);
  });

  it("returns 1 for targetNumber 4 (4 = 2²)", () => {
    expect(perfectSquares(4)).toBe(1);
  });

  it("returns 4 for targetNumber 7 (4 + 1 + 1 + 1)", () => {
    expect(perfectSquares(7)).toBe(4);
  });

  it("returns 0 for targetNumber 0", () => {
    expect(perfectSquares(0)).toBe(0);
  });

  it("returns 1 for targetNumber 9 (9 = 3²)", () => {
    expect(perfectSquares(9)).toBe(1);
  });

  it("returns 2 for targetNumber 5 (4 + 1)", () => {
    expect(perfectSquares(5)).toBe(2);
  });

  it("returns 3 for targetNumber 11 (9 + 1 + 1)", () => {
    expect(perfectSquares(11)).toBe(3);
  });
});
