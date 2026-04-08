import { describe, it, expect } from "vitest";
import { subsetCheck } from "../sources/subset-check.ts?fn";

describe("subsetCheck", () => {
  it("returns true when A is a proper subset of B (default input)", () => {
    expect(subsetCheck([2, 4], [1, 2, 3, 4, 5])).toEqual({ isSubset: true });
  });

  it("returns false when an element of A is missing from B", () => {
    expect(subsetCheck([2, 9], [1, 2, 3, 4, 5])).toEqual({ isSubset: false });
  });

  it("returns true when A and B are identical", () => {
    expect(subsetCheck([1, 2, 3], [1, 2, 3])).toEqual({ isSubset: true });
  });

  it("returns true for empty arrayA (empty set is subset of any set)", () => {
    expect(subsetCheck([], [1, 2, 3])).toEqual({ isSubset: true });
  });

  it("returns false when B is empty and A is non-empty", () => {
    expect(subsetCheck([1], [])).toEqual({ isSubset: false });
  });

  it("returns true for two empty arrays", () => {
    expect(subsetCheck([], [])).toEqual({ isSubset: true });
  });

  it("returns false when A has elements not in B", () => {
    expect(subsetCheck([1, 2, 3, 4, 5], [2, 4])).toEqual({ isSubset: false });
  });

  it("returns true when A equals B with different ordering", () => {
    expect(subsetCheck([3, 1, 2], [1, 2, 3])).toEqual({ isSubset: true });
  });

  it("handles single-element A present in B", () => {
    expect(subsetCheck([7], [5, 6, 7, 8])).toEqual({ isSubset: true });
  });

  it("handles single-element A absent from B", () => {
    expect(subsetCheck([9], [5, 6, 7, 8])).toEqual({ isSubset: false });
  });
});
