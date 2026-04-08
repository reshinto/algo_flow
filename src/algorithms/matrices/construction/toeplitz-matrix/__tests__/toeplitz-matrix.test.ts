import { describe, it, expect } from "vitest";
import { toeplitzMatrix } from "../sources/toeplitz-matrix.ts?fn";

describe("toeplitzMatrix", () => {
  it("returns true for the canonical Toeplitz example [[1,2,3,4],[5,1,2,3],[9,5,1,2]]", () => {
    expect(
      toeplitzMatrix([
        [1, 2, 3, 4],
        [5, 1, 2, 3],
        [9, 5, 1, 2],
      ]),
    ).toBe(true);
  });

  it("returns false for [[1,2],[2,2]]", () => {
    expect(
      toeplitzMatrix([
        [1, 2],
        [2, 2],
      ]),
    ).toBe(false);
  });

  it("returns true for a 1×1 matrix", () => {
    expect(toeplitzMatrix([[42]])).toBe(true);
  });

  it("returns true for a single-row matrix", () => {
    expect(toeplitzMatrix([[1, 2, 3, 4]])).toBe(true);
  });

  it("returns true for a single-column matrix", () => {
    expect(toeplitzMatrix([[1], [2], [3]])).toBe(true);
  });

  it("returns true when all elements are the same", () => {
    expect(
      toeplitzMatrix([
        [7, 7, 7],
        [7, 7, 7],
        [7, 7, 7],
      ]),
    ).toBe(true);
  });

  it("returns true for a 2×2 Toeplitz matrix", () => {
    expect(
      toeplitzMatrix([
        [1, 2],
        [3, 1],
      ]),
    ).toBe(true);
  });

  it("returns false for a 2×2 non-Toeplitz matrix", () => {
    expect(
      toeplitzMatrix([
        [5, 3],
        [3, 4],
      ]),
    ).toBe(false);
  });

  it("returns false when first row mismatch exists", () => {
    expect(
      toeplitzMatrix([
        [1, 2, 3],
        [4, 2, 2],
        [7, 4, 2],
      ]),
    ).toBe(false);
  });

  it("returns false when only the last diagonal is broken", () => {
    expect(
      toeplitzMatrix([
        [1, 2, 3],
        [4, 1, 2],
        [7, 4, 9],
      ]),
    ).toBe(false);
  });
});
