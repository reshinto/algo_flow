import { describe, it, expect } from "vitest";
import { heapDeleteArbitrary } from "./sources/heap-delete-arbitrary.ts?fn";

/** Verify min-heap property: every parent ≤ both children. */
function isMinHeap(array: number[]): boolean {
  const size = array.length;
  for (let parentIdx = 0; parentIdx < Math.floor(size / 2); parentIdx++) {
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;
    if (leftIdx < size && array[parentIdx]! > array[leftIdx]!) return false;
    if (rightIdx < size && array[parentIdx]! > array[rightIdx]!) return false;
  }
  return true;
}

describe("heapDeleteArbitrary", () => {
  it("removes a node at the given index and maintains min-heap property", () => {
    const result = heapDeleteArbitrary([1, 3, 5, 7, 9, 8, 6], 2) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result.length).toBe(6);
  });

  it("does not contain the deleted value (when unique)", () => {
    const result = heapDeleteArbitrary([1, 3, 5, 7, 9, 8, 6], 2) as number[];
    // targetIndex 2 was value 5; result should not contain 5
    const sortedResult = [...result].sort((a, b) => a - b);
    const sortedExpected = [1, 3, 6, 7, 8, 9].sort((a, b) => a - b);
    expect(sortedResult).toEqual(sortedExpected);
  });

  it("handles deleting the root (index 0)", () => {
    const result = heapDeleteArbitrary([1, 3, 5, 7, 9, 8, 6], 0) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result.length).toBe(6);
    expect(result[0]).not.toBe(1);
  });

  it("handles deleting the last element", () => {
    const input = [1, 3, 5, 7, 9, 8, 6];
    const result = heapDeleteArbitrary(input, 6) as number[];
    expect(result.length).toBe(6);
    expect(isMinHeap(result)).toBe(true);
  });

  it("handles a two-element heap deleting index 0", () => {
    const result = heapDeleteArbitrary([1, 5], 0) as number[];
    expect(result).toEqual([5]);
  });

  it("handles a two-element heap deleting index 1", () => {
    const result = heapDeleteArbitrary([1, 5], 1) as number[];
    expect(result).toEqual([1]);
  });

  it("handles a single-element heap", () => {
    const result = heapDeleteArbitrary([42], 0) as number[];
    expect(result).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const input = [1, 3, 5, 7, 9, 8, 6];
    heapDeleteArbitrary(input, 2);
    expect(input).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });

  it("triggers sift-up when replacement is smaller than parent", () => {
    // Build a heap where deleting a node causes sift-up
    // [1, 3, 2, 7, 9, 8, 6] — delete index 3 (value 7), last is 6
    // 6 replaces at index 3, parent at index 1 is 3; 6 > 3, sift-down
    // Use a case that actually triggers sift-up
    const result = heapDeleteArbitrary([1, 10, 5, 15, 20, 8, 6], 3) as number[];
    // last=6 goes to index 3, parent at 1 is 10, 6 < 10 → sift-up
    expect(isMinHeap(result)).toBe(true);
  });
});
