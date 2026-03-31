import { describe, it, expect } from "vitest";
import { heapSortVisualization } from "./sources/heap-sort-visualization.ts?fn";

describe("heapSortVisualization", () => {
  it("sorts the default input array", () => {
    const result = heapSortVisualization([9, 5, 7, 1, 3, 8, 2, 6, 4]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("sorts an already-sorted array", () => {
    const result = heapSortVisualization([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("sorts a reverse-sorted array", () => {
    const result = heapSortVisualization([5, 4, 3, 2, 1]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("sorts an array with duplicate values", () => {
    const result = heapSortVisualization([3, 1, 4, 1, 5, 9, 2, 6, 5]);
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("returns a single-element array unchanged", () => {
    const result = heapSortVisualization([42]);
    expect(result).toEqual([42]);
  });

  it("returns an empty array unchanged", () => {
    const result = heapSortVisualization([]);
    expect(result).toEqual([]);
  });

  it("result contains all original elements", () => {
    const original = [9, 5, 7, 1, 3, 8, 2, 6, 4];
    const result = heapSortVisualization(original) as number[];
    expect(result.slice().sort((numA, numB) => numA - numB)).toEqual(
      original.slice().sort((numA, numB) => numA - numB),
    );
  });

  it("does not mutate the original array", () => {
    const original = [9, 5, 7, 1, 3, 8, 2, 6, 4];
    heapSortVisualization(original);
    expect(original).toEqual([9, 5, 7, 1, 3, 8, 2, 6, 4]);
  });

  it("sorts a two-element array", () => {
    const result = heapSortVisualization([2, 1]);
    expect(result).toEqual([1, 2]);
  });

  it("sorts an array with negative values", () => {
    const result = heapSortVisualization([-3, 1, -5, 4, 0]);
    expect(result).toEqual([-5, -3, 0, 1, 4]);
  });
});
