import { describe, it, expect } from "vitest";
import { setIntersection } from "./sources/set-intersection.ts?fn";

describe("setIntersection", () => {
  it("finds common elements from the default input", () => {
    expect(setIntersection([1, 2, 3, 4, 5, 8], [2, 4, 6, 8, 10])).toEqual([2, 4, 8]);
  });

  it("returns empty array when no elements are shared", () => {
    expect(setIntersection([1, 3, 5], [2, 4, 6])).toEqual([]);
  });

  it("handles identical arrays", () => {
    const result = setIntersection([1, 2, 3], [1, 2, 3]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 2, 3]);
  });

  it("handles arrayA being a subset of arrayB", () => {
    const result = setIntersection([2, 4], [1, 2, 3, 4, 5]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([2, 4]);
  });

  it("handles arrayB being a subset of arrayA", () => {
    const result = setIntersection([1, 2, 3, 4, 5], [2, 4]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([2, 4]);
  });

  it("returns no duplicates when arrayB has repeated values", () => {
    const result = setIntersection([1, 2, 3], [2, 2, 2]) as number[];
    expect(result).toEqual([2]);
  });

  it("handles empty arrayA", () => {
    expect(setIntersection([], [1, 2, 3])).toEqual([]);
  });

  it("handles empty arrayB", () => {
    expect(setIntersection([1, 2, 3], [])).toEqual([]);
  });

  it("handles single-element arrays that match", () => {
    expect(setIntersection([7], [7])).toEqual([7]);
  });

  it("handles single-element arrays that do not match", () => {
    expect(setIntersection([7], [8])).toEqual([]);
  });
});
