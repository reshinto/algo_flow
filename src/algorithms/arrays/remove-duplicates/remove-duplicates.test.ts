import { describe, it, expect } from "vitest";
import { removeDuplicates } from "./sources/remove-duplicates.ts?fn";

describe("removeDuplicates", () => {
  it("removes duplicates from a basic sorted array", () => {
    /* [1,1,2,2,3]: unique elements are [1,2,3] */
    const result = removeDuplicates([1, 1, 2, 2, 3]);
    expect(result.uniqueCount).toBe(3);
    expect(result.result).toEqual([1, 2, 3]);
  });

  it("returns unchanged result when there are no duplicates", () => {
    const result = removeDuplicates([1, 2, 3, 4, 5]);
    expect(result.uniqueCount).toBe(5);
    expect(result.result).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns uniqueCount of 1 when all elements are the same", () => {
    const result = removeDuplicates([7, 7, 7, 7]);
    expect(result.uniqueCount).toBe(1);
    expect(result.result).toEqual([7]);
  });

  it("handles a single element array", () => {
    const result = removeDuplicates([42]);
    expect(result.uniqueCount).toBe(1);
    expect(result.result).toEqual([42]);
  });

  it("handles empty array", () => {
    const result = removeDuplicates([]);
    expect(result.uniqueCount).toBe(0);
    expect(result.result).toEqual([]);
  });

  it("handles two identical elements", () => {
    const result = removeDuplicates([3, 3]);
    expect(result.uniqueCount).toBe(1);
    expect(result.result).toEqual([3]);
  });

  it("handles two different elements", () => {
    const result = removeDuplicates([1, 2]);
    expect(result.uniqueCount).toBe(2);
    expect(result.result).toEqual([1, 2]);
  });

  it("handles long runs of duplicates", () => {
    const result = removeDuplicates([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    expect(result.uniqueCount).toBe(3);
    expect(result.result).toEqual([1, 2, 3]);
  });

  it("handles the default input from the algorithm definition", () => {
    /* [1,1,2,2,3,4,4,5]: unique elements are [1,2,3,4,5] */
    const result = removeDuplicates([1, 1, 2, 2, 3, 4, 4, 5]);
    expect(result.uniqueCount).toBe(5);
    expect(result.result).toEqual([1, 2, 3, 4, 5]);
  });
});
