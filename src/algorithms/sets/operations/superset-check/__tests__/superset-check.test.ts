import { describe, it, expect } from "vitest";
import { supersetCheck } from "../sources/superset-check.ts?fn";

describe("supersetCheck", () => {
  it("returns true when A is a proper superset of B (default input)", () => {
    expect(supersetCheck([1, 2, 3, 4, 5], [2, 4])).toEqual({ isSuperset: true });
  });

  it("returns false when an element of B is missing from A", () => {
    expect(supersetCheck([1, 2, 3, 4, 5], [2, 9])).toEqual({ isSuperset: false });
  });

  it("returns true when A and B are identical", () => {
    expect(supersetCheck([1, 2, 3], [1, 2, 3])).toEqual({ isSuperset: true });
  });

  it("returns true for empty arrayB (A is superset of the empty set)", () => {
    expect(supersetCheck([1, 2, 3], [])).toEqual({ isSuperset: true });
  });

  it("returns false when A is empty and B is non-empty", () => {
    expect(supersetCheck([], [1])).toEqual({ isSuperset: false });
  });

  it("returns true for two empty arrays", () => {
    expect(supersetCheck([], [])).toEqual({ isSuperset: true });
  });

  it("returns false when B has elements not in A", () => {
    expect(supersetCheck([2, 4], [1, 2, 3, 4, 5])).toEqual({ isSuperset: false });
  });

  it("returns true when B equals A with different ordering", () => {
    expect(supersetCheck([1, 2, 3], [3, 1, 2])).toEqual({ isSuperset: true });
  });

  it("handles single-element B present in A", () => {
    expect(supersetCheck([5, 6, 7, 8], [7])).toEqual({ isSuperset: true });
  });

  it("handles single-element B absent from A", () => {
    expect(supersetCheck([5, 6, 7, 8], [9])).toEqual({ isSuperset: false });
  });
});
