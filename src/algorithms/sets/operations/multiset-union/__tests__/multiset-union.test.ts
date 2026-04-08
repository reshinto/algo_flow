import { describe, it, expect } from "vitest";
import { multisetUnion } from "../sources/multiset-union.ts?fn";

describe("multisetUnion", () => {
  it("returns sorted bag union for the default input", () => {
    const result = multisetUnion([1, 1, 2, 3, 3, 3], [1, 1, 1, 2, 2, 3]) as number[];
    expect(result).toEqual([1, 1, 1, 2, 2, 3, 3, 3]);
  });

  it("returns empty array when both inputs are empty", () => {
    const result = multisetUnion([], []) as number[];
    expect(result).toEqual([]);
  });

  it("returns arrayA when arrayB is empty", () => {
    const result = multisetUnion([1, 1, 2], []) as number[];
    expect(result).toEqual([1, 1, 2]);
  });

  it("returns arrayB when arrayA is empty", () => {
    const result = multisetUnion([], [3, 3, 4]) as number[];
    expect(result).toEqual([3, 3, 4]);
  });

  it("uses max count when one array has more copies", () => {
    // arrayA has 3 copies of 5, arrayB has 1 — union should have 3
    const result = multisetUnion([5, 5, 5], [5]) as number[];
    expect(result).toEqual([5, 5, 5]);
  });

  it("includes elements unique to arrayA", () => {
    const result = multisetUnion([1, 2], [3, 4]) as number[];
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("handles identical arrays", () => {
    const result = multisetUnion([1, 2, 2], [1, 2, 2]) as number[];
    expect(result).toEqual([1, 2, 2]);
  });

  it("handles single-element arrays with the same value", () => {
    const result = multisetUnion([7], [7]) as number[];
    expect(result).toEqual([7]);
  });

  it("handles single-element arrays with different values", () => {
    const result = multisetUnion([3], [9]) as number[];
    expect(result).toEqual([3, 9]);
  });

  it("returns sorted output", () => {
    const result = multisetUnion([3, 1, 2], [4, 2, 1]) as number[];
    expect(result).toEqual([...result].sort((numA, numB) => numA - numB));
  });
});
