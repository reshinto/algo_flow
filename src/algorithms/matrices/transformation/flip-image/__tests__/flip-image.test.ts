import { describe, it, expect } from "vitest";
import { flipImage } from "../sources/flip-image.ts?fn";

function deepCopy(matrix: number[][]): number[][] {
  return matrix.map((row) => [...row]);
}

describe("flipImage", () => {
  it("flips and inverts the default 3×3 example", () => {
    const matrix = deepCopy([
      [1, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ]);
    expect(flipImage(matrix)).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ]);
  });

  it("handles all-zeros matrix", () => {
    const matrix = deepCopy([
      [0, 0],
      [0, 0],
    ]);
    expect(flipImage(matrix)).toEqual([
      [1, 1],
      [1, 1],
    ]);
  });

  it("handles all-ones matrix", () => {
    const matrix = deepCopy([
      [1, 1],
      [1, 1],
    ]);
    expect(flipImage(matrix)).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it("handles a single row", () => {
    const matrix = deepCopy([[1, 0, 1]]);
    expect(flipImage(matrix)).toEqual([[0, 1, 0]]);
  });

  it("handles a single column", () => {
    const matrix = deepCopy([[1], [0], [1]]);
    expect(flipImage(matrix)).toEqual([[0], [1], [0]]);
  });

  it("handles a 1×1 matrix with value 0", () => {
    const matrix = deepCopy([[0]]);
    expect(flipImage(matrix)).toEqual([[1]]);
  });

  it("handles a 1×1 matrix with value 1", () => {
    const matrix = deepCopy([[1]]);
    expect(flipImage(matrix)).toEqual([[0]]);
  });

  it("handles a 4×4 binary matrix", () => {
    const matrix = deepCopy([
      [1, 1, 0, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [1, 0, 1, 0],
    ]);
    expect(flipImage(matrix)).toEqual([
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 0],
    ]);
  });

  it("handles an identity-like binary matrix", () => {
    // Row 0: [1,0,0] → ends swap+invert: left=1→(0^1)=1, right=0→(1^1)=0, middle: 0→1 → [1,1,0]
    // Row 1: [0,1,0] → ends swap+invert: left=0→(0^1)=1, right=0→(0^1)=1, middle: 1→0 → [1,0,1]
    // Row 2: [0,0,1] → ends swap+invert: left=0→(1^1)=0, right=1→(0^1)=1, middle: 0→1 → [0,1,1]
    const matrix = deepCopy([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    expect(flipImage(matrix)).toEqual([
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
    ]);
  });
});
