import { describe, it, expect } from "vitest";
import { setDifference } from "./sources/set-difference.ts?fn";

describe("setDifference", () => {
  it("returns elements only in arrayA for the default input", () => {
    expect(setDifference([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])).toEqual([1, 2]);
  });

  it("returns all of arrayA when arrays are disjoint", () => {
    expect(setDifference([1, 3, 5], [2, 4, 6])).toEqual([1, 3, 5]);
  });

  it("returns empty array when arrayA is a subset of arrayB", () => {
    expect(setDifference([2, 4], [1, 2, 3, 4, 5])).toEqual([]);
  });

  it("returns all of arrayA when arrayB is empty", () => {
    expect(setDifference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it("returns empty array when arrayA is empty", () => {
    expect(setDifference([], [1, 2, 3])).toEqual([]);
  });

  it("returns empty array for identical arrays", () => {
    expect(setDifference([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it("handles single-element arrays that match", () => {
    expect(setDifference([7], [7])).toEqual([]);
  });

  it("handles single-element arrays that do not match", () => {
    expect(setDifference([7], [8])).toEqual([7]);
  });

  it("handles arrayB being a subset of arrayA", () => {
    expect(setDifference([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 3, 5]);
  });
});
