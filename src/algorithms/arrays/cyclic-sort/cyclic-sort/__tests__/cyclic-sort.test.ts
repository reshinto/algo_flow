import { describe, it, expect } from "vitest";
import { cyclicSort } from "../sources/cyclic-sort.ts?fn";

describe("cyclicSort", () => {
  it("sorts a basic unsorted array [3,5,2,1,4] correctly", () => {
    const result = cyclicSort([3, 5, 2, 1, 4]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns already-sorted array [1,2,3,4] unchanged", () => {
    const result = cyclicSort([1, 2, 3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("sorts a reverse-sorted array [5,4,3,2,1]", () => {
    const result = cyclicSort([5, 4, 3, 2, 1]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a single element [1]", () => {
    const result = cyclicSort([1]);
    expect(result).toEqual([1]);
  });

  it("returns empty array for empty input", () => {
    const result = cyclicSort([]);
    expect(result).toEqual([]);
  });

  it("sorts a two-element array [2,1]", () => {
    const result = cyclicSort([2, 1]);
    expect(result).toEqual([1, 2]);
  });

  it("returns already-sorted two-element array [1,2] unchanged", () => {
    const result = cyclicSort([1, 2]);
    expect(result).toEqual([1, 2]);
  });

  it("sorts the default input [3,5,2,1,4,6]", () => {
    const result = cyclicSort([3, 5, 2, 1, 4, 6]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 5, 2, 1, 4];
    cyclicSort(original);
    expect(original).toEqual([3, 5, 2, 1, 4]);
  });

  it("sorts a longer array containing values 1..n", () => {
    const result = cyclicSort([8, 3, 6, 1, 5, 9, 2, 7, 4, 10]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
