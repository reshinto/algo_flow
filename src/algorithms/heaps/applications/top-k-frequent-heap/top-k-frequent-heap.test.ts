import { describe, it, expect } from "vitest";
import { topKFrequentHeap } from "./sources/top-k-frequent-heap.ts?fn";

describe("topKFrequentHeap", () => {
  it("returns k elements for the default input", () => {
    const result = topKFrequentHeap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2) as number[];
    expect(result).toHaveLength(2);
  });

  it("includes the most frequent elements from default input", () => {
    const result = topKFrequentHeap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2) as number[];
    // Elements 1 (freq 3) and 3 (freq 4) should be in the result
    expect(result).toContain(1);
    expect(result).toContain(3);
  });

  it("returns exactly k elements when k equals number of unique elements", () => {
    const result = topKFrequentHeap([5, 5, 6, 6, 7, 7], 3) as number[];
    expect(result).toHaveLength(3);
  });

  it("returns correct top-1 most frequent element", () => {
    const result = topKFrequentHeap([4, 4, 4, 4, 2, 2, 1], 1) as number[];
    expect(result).toEqual([4]);
  });

  it("handles input where all elements are the same", () => {
    const result = topKFrequentHeap([9, 9, 9, 9], 1) as number[];
    expect(result).toEqual([9]);
  });

  it("handles single unique element with k=1", () => {
    const result = topKFrequentHeap([3], 1) as number[];
    expect(result).toEqual([3]);
  });

  it("does not mutate the original array", () => {
    const original = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];
    const copy = [...original];
    topKFrequentHeap(original, 2);
    expect(original).toEqual(copy);
  });

  it("excludes low-frequency elements when k < unique count", () => {
    const result = topKFrequentHeap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 2) as number[];
    // Element 4 (freq 1) and 2 (freq 2) should not both appear — only top 2
    expect(result).not.toContain(4);
  });

  it("returns k elements for k=3 from default input", () => {
    const result = topKFrequentHeap([1, 1, 1, 2, 2, 3, 3, 3, 3, 4], 3) as number[];
    expect(result).toHaveLength(3);
    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toContain(3);
  });
});
