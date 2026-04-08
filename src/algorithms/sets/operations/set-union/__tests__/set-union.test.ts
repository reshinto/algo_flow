import { describe, it, expect } from "vitest";
import { setUnion } from "../sources/set-union.ts?fn";

describe("setUnion", () => {
  it("combines unique elements from the default input", () => {
    expect(setUnion([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns all elements when arrays are disjoint", () => {
    expect(setUnion([1, 3, 5], [2, 4, 6])).toEqual([1, 3, 5, 2, 4, 6]);
  });

  it("returns arrayA elements when arrayB is a subset of arrayA", () => {
    const result = setUnion([1, 2, 3, 4, 5], [2, 4]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles identical arrays", () => {
    expect(setUnion([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles empty arrayA", () => {
    expect(setUnion([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles empty arrayB", () => {
    expect(setUnion([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it("handles both arrays empty", () => {
    expect(setUnion([], [])).toEqual([]);
  });

  it("handles single-element arrays that match", () => {
    expect(setUnion([7], [7])).toEqual([7]);
  });

  it("handles single-element arrays that do not match", () => {
    expect(setUnion([7], [8])).toEqual([7, 8]);
  });

  it("does not include duplicates when arrayB has repeated values already in arrayA", () => {
    const result = setUnion([1, 2, 3], [2, 2, 2]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });
});
