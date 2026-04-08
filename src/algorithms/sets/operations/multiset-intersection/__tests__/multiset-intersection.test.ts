import { describe, it, expect } from "vitest";
import { multisetIntersection } from "../sources/multiset-intersection.ts?fn";

describe("multisetIntersection", () => {
  it("returns sorted bag intersection for the default input", () => {
    const result = multisetIntersection([1, 1, 2, 3, 3, 3], [1, 1, 1, 2, 2, 3]) as number[];
    expect(result).toEqual([1, 1, 2, 3]);
  });

  it("returns empty array when both inputs are empty", () => {
    const result = multisetIntersection([], []) as number[];
    expect(result).toEqual([]);
  });

  it("returns empty array when arrayA is empty", () => {
    const result = multisetIntersection([], [1, 2, 3]) as number[];
    expect(result).toEqual([]);
  });

  it("returns empty array when arrayB is empty", () => {
    const result = multisetIntersection([1, 2, 3], []) as number[];
    expect(result).toEqual([]);
  });

  it("returns empty array when arrays are disjoint", () => {
    const result = multisetIntersection([1, 3, 5], [2, 4, 6]) as number[];
    expect(result).toEqual([]);
  });

  it("uses min count when one array has fewer copies", () => {
    // arrayA has 3 copies of 5, arrayB has 1 — intersection should have 1
    const result = multisetIntersection([5, 5, 5], [5]) as number[];
    expect(result).toEqual([5]);
  });

  it("handles identical arrays by returning the same multiset", () => {
    const result = multisetIntersection([1, 2, 2, 3], [1, 2, 2, 3]) as number[];
    expect(result).toEqual([1, 2, 2, 3]);
  });

  it("handles single-element arrays that match", () => {
    const result = multisetIntersection([7], [7]) as number[];
    expect(result).toEqual([7]);
  });

  it("handles single-element arrays that do not match", () => {
    const result = multisetIntersection([7], [8]) as number[];
    expect(result).toEqual([]);
  });

  it("returns sorted output", () => {
    const result = multisetIntersection([3, 1, 2, 2], [4, 2, 1, 3]) as number[];
    expect(result).toEqual([...result].sort((numA, numB) => numA - numB));
  });
});
