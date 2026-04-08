import { describe, it, expect } from "vitest";
import { bozoSort } from "../sources/bozo-sort.ts?fn";

describe("bozoSort", () => {
  it("sorts a small array using seeded PRNG", () => {
    const result = bozoSort([3, 1, 2]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles an already sorted array", () => {
    expect(bozoSort([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles a single element array", () => {
    expect(bozoSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(bozoSort([])).toEqual([]);
  });

  it("produces a result with the same length as input", () => {
    const result = bozoSort([3, 1, 2]);
    expect(result.length).toBe(3);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = bozoSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("handles a 2-element array", () => {
    const result = bozoSort([2, 1]);
    expect(result).toEqual([1, 2]);
  });
});
