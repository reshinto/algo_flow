import { describe, it, expect } from "vitest";
import { stalinSort } from "./sources/stalin-sort.ts?fn";

describe("stalinSort", () => {
  it("eliminates out-of-order elements from [3, 1, 2]", () => {
    // 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated → [3]
    expect(stalinSort([3, 1, 2])).toEqual([3]);
  });

  it("keeps all elements when array is already sorted", () => {
    expect(stalinSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("reduces a reverse-sorted array to its first element", () => {
    expect(stalinSort([5, 4, 3, 2, 1])).toEqual([5]);
  });

  it("handles an array with partial order", () => {
    // 3 survives (max=3), 1 eliminated (1<3), 4 survives (max=4), 2 eliminated (2<4), 5 survives (max=5)
    expect(stalinSort([3, 1, 4, 2, 5])).toEqual([3, 4, 5]);
  });

  it("handles an array with equal elements", () => {
    // All equal — all survive (>= comparison)
    expect(stalinSort([2, 2, 2, 2])).toEqual([2, 2, 2, 2]);
  });

  it("handles a single element array", () => {
    expect(stalinSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(stalinSort([])).toEqual([]);
  });

  it("handles an array with duplicate max values", () => {
    // 5 survives (max=5), 3 eliminated (3<5), 5 survives (5>=5)
    expect(stalinSort([5, 3, 5])).toEqual([5, 5]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const result = stalinSort(original);
    expect(result).toEqual([3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
