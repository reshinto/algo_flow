import { describe, it, expect } from "vitest";
import { topKFrequentElements } from "./sources/top-k-frequent-elements.ts?fn";

describe("topKFrequentElements", () => {
  it("returns the top 2 elements from the default example", () => {
    const result = topKFrequentElements([1, 1, 1, 2, 2, 3], 2) as number[];
    expect(result).toHaveLength(2);
    expect(result).toContain(1);
    expect(result).toContain(2);
  });

  it("returns a single top element when k = 1", () => {
    const result = topKFrequentElements([1, 1, 2, 2, 2, 3], 1) as number[];
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(2);
  });

  it("returns all elements when k equals the number of unique elements", () => {
    const result = topKFrequentElements([1, 2, 3], 3) as number[];
    expect(result).toHaveLength(3);
    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toContain(3);
  });

  it("handles an array where all elements are the same", () => {
    const result = topKFrequentElements([7, 7, 7, 7], 1) as number[];
    expect(result).toEqual([7]);
  });

  it("returns correct top k when k = 2 with clear frequency winner", () => {
    const result = topKFrequentElements([4, 4, 4, 4, 5, 5, 6], 2) as number[];
    expect(result).toHaveLength(2);
    expect(result).toContain(4);
    expect(result).toContain(5);
  });

  it("handles negative numbers correctly", () => {
    const result = topKFrequentElements([-1, -1, -2, -2, -2, 3], 2) as number[];
    expect(result).toHaveLength(2);
    expect(result).toContain(-2);
    expect(result).toContain(-1);
  });

  it("handles a two-element input with k = 1", () => {
    const result = topKFrequentElements([10, 10], 1) as number[];
    expect(result).toEqual([10]);
  });

  it("returns exactly k elements even when many elements share the same frequency", () => {
    const result = topKFrequentElements([1, 2, 3, 4, 5], 2) as number[];
    expect(result).toHaveLength(2);
  });
});
