import { describe, it, expect } from "vitest";
import { countingSort } from "./sources/counting-sort.ts?fn";

describe("countingSort", () => {
  it("sorts a basic unsorted array", () => {
    const result = countingSort([3, 1, 4, 1, 5, 9, 2, 6]);
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it("handles an already sorted array", () => {
    const result = countingSort([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse sorted array", () => {
    const result = countingSort([5, 4, 3, 2, 1]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles all same elements", () => {
    const result = countingSort([3, 3, 3, 3]);
    expect(result).toEqual([3, 3, 3, 3]);
  });

  it("handles a single element array", () => {
    const result = countingSort([7]);
    expect(result).toEqual([7]);
  });

  it("handles an empty array", () => {
    const result = countingSort([]);
    expect(result).toEqual([]);
  });

  it("handles duplicate values correctly", () => {
    const result = countingSort([4, 2, 2, 8, 3, 3, 1]);
    expect(result).toEqual([1, 2, 2, 3, 3, 4, 8]);
  });

  it("handles the default input from the algorithm definition", () => {
    const result = countingSort([4, 2, 2, 8, 3, 3, 1, 7, 5]);
    expect(result).toEqual([1, 2, 2, 3, 3, 4, 5, 7, 8]);
  });
});
