import { describe, it, expect } from "vitest";
import { setSymmetricDifference } from "../sources/set-symmetric-difference.ts?fn";

describe("setSymmetricDifference", () => {
  it("returns elements exclusive to each array for the default input", () => {
    const result = setSymmetricDifference([1, 2, 3, 4], [3, 4, 5, 6]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 2, 5, 6]);
  });

  it("returns all elements when arrays are disjoint", () => {
    const result = setSymmetricDifference([1, 3, 5], [2, 4, 6]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("returns empty array for identical arrays", () => {
    expect(setSymmetricDifference([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it("returns all elements when one array is empty", () => {
    const result = setSymmetricDifference([1, 2, 3], []) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 2, 3]);
  });

  it("returns all elements when arrayA is empty", () => {
    const result = setSymmetricDifference([], [1, 2, 3]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 2, 3]);
  });

  it("handles single-element arrays that match", () => {
    expect(setSymmetricDifference([7], [7])).toEqual([]);
  });

  it("handles single-element arrays that do not match", () => {
    const result = setSymmetricDifference([7], [8]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([7, 8]);
  });

  it("handles arrayA being a subset of arrayB", () => {
    const result = setSymmetricDifference([2, 4], [1, 2, 3, 4, 5]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 3, 5]);
  });

  it("handles arrayB being a subset of arrayA", () => {
    const result = setSymmetricDifference([1, 2, 3, 4, 5], [2, 4]) as number[];
    expect(result.sort((numA, numB) => numA - numB)).toEqual([1, 3, 5]);
  });
});
