import { describe, it, expect } from "vitest";
import { sortNearlySorted } from "./sources/sort-nearly-sorted.ts?fn";

describe("sortNearlySorted", () => {
  it("sorts the default input [6,5,3,2,8,10,9] with k=3", () => {
    const result = sortNearlySorted([6, 5, 3, 2, 8, 10, 9], 3);
    expect(result).toEqual([2, 3, 5, 6, 8, 9, 10]);
  });

  it("handles k=0 (already sorted array)", () => {
    const result = sortNearlySorted([1, 2, 3, 4, 5], 0);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles k=1 (adjacent swaps only)", () => {
    const result = sortNearlySorted([2, 1, 4, 3, 6, 5], 1);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("handles a single element", () => {
    const result = sortNearlySorted([42], 0);
    expect(result).toEqual([42]);
  });

  it("handles two elements with k=1", () => {
    const result = sortNearlySorted([2, 1], 1);
    expect(result).toEqual([1, 2]);
  });

  it("handles k equal to array length minus 1", () => {
    const result = sortNearlySorted([5, 4, 3, 2, 1], 4);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles duplicate values", () => {
    const result = sortNearlySorted([3, 3, 1, 1, 2], 2);
    expect(result).toEqual([1, 1, 2, 3, 3]);
  });

  it("returns same length as input", () => {
    const input = [6, 5, 3, 2, 8, 10, 9];
    const result = sortNearlySorted(input, 3);
    expect(result).toHaveLength(input.length);
  });

  it("produces a fully sorted result", () => {
    const result = sortNearlySorted([6, 5, 3, 2, 8, 10, 9], 3) as number[];
    for (let elementIndex = 1; elementIndex < result.length; elementIndex++) {
      expect(result[elementIndex]!).toBeGreaterThanOrEqual(result[elementIndex - 1]!);
    }
  });

  it("does not mutate the original array", () => {
    const original = [6, 5, 3, 2, 8, 10, 9];
    const originalCopy = [...original];
    sortNearlySorted(original, 3);
    expect(original).toEqual(originalCopy);
  });
});
