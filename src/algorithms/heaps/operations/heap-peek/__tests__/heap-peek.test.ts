import { describe, it, expect } from "vitest";
import { heapPeek } from "../sources/heap-peek.ts?fn";

describe("heapPeek", () => {
  it("returns the minimum element (root) from the default heap", () => {
    const result = heapPeek([1, 3, 5, 7, 9, 8, 6]) as number;
    expect(result).toBe(1);
  });

  it("returns the single element from a one-element heap", () => {
    const result = heapPeek([42]) as number;
    expect(result).toBe(42);
  });

  it("returns the root from a two-element heap", () => {
    const result = heapPeek([2, 7]) as number;
    expect(result).toBe(2);
  });

  it("does not mutate the original array", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    heapPeek(original);
    expect(original).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });

  it("returns the same value regardless of how many times called", () => {
    const heap = [1, 3, 5, 7];
    const firstResult = heapPeek(heap) as number;
    const secondResult = heapPeek(heap) as number;
    expect(firstResult).toBe(secondResult);
    expect(firstResult).toBe(1);
  });

  it("returns the root from a larger heap", () => {
    const result = heapPeek([1, 3, 2, 7, 5, 8, 4, 9, 6]) as number;
    expect(result).toBe(1);
  });

  it("does not remove the element — array length unchanged", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    heapPeek(original);
    expect(original.length).toBe(7);
  });
});
