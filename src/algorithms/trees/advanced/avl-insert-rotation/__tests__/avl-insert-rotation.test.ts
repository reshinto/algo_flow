import { describe, it, expect } from "vitest";
import { avlInsertRotation } from "../sources/avl-insert-rotation.ts?fn";

describe("avlInsertRotation", () => {
  it("inserts a single value", () => {
    expect(avlInsertRotation([5])).toEqual([5]);
  });

  it("produces sorted inorder output for default input", () => {
    const result = avlInsertRotation([10, 20, 30, 25, 28, 27]) as number[];
    expect(result).toEqual([...result].sort((numA, numB) => numA - numB));
  });

  it("handles RR rotation (ascending insert)", () => {
    const result = avlInsertRotation([1, 2, 3]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles LL rotation (descending insert)", () => {
    const result = avlInsertRotation([3, 2, 1]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles LR rotation", () => {
    const result = avlInsertRotation([3, 1, 2]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles RL rotation", () => {
    const result = avlInsertRotation([1, 3, 2]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("correctly sorts 6 values that trigger multiple rotations", () => {
    const values = [10, 20, 30, 25, 28, 27];
    const result = avlInsertRotation(values) as number[];
    const expected = [...values].sort((numA, numB) => numA - numB);
    expect(result).toEqual(expected);
  });

  it("returns empty array for empty input", () => {
    expect(avlInsertRotation([])).toEqual([]);
  });
});
