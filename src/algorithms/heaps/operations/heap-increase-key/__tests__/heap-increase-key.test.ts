import { describe, it, expect } from "vitest";
import { heapIncreaseKey } from "../sources/heap-increase-key.ts?fn";

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

describe("heapIncreaseKey", () => {
  it("produces a valid min-heap after increasing a key", () => {
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 1, 10) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("the updated node has the new value", () => {
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 1, 10) as number[];
    expect(result.includes(10)).toBe(true);
    expect(result.includes(3)).toBe(false);
  });

  it("preserves all elements (same multiset minus old, plus new)", () => {
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 1, 10) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([1, 5, 6, 7, 8, 9, 10]);
  });

  it("increasing to a value still smaller than both children — no sift needed", () => {
    // index 1 has children at 3 and 4 (values 7, 9); new value 5 < 7, no swap
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 1, 5) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[1]).toBe(5);
  });

  it("increasing root value causes sift down through tree", () => {
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 0, 20) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).not.toBe(20);
  });

  it("increasing leaf value — no sift needed since no children", () => {
    const result = heapIncreaseKey([1, 3, 5, 7, 9, 8, 6], 6, 100) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result.includes(100)).toBe(true);
  });

  it("handles a single-element heap", () => {
    const result = heapIncreaseKey([5], 0, 10) as number[];
    expect(result).toEqual([10]);
  });

  it("does not mutate the original array", () => {
    const input = [1, 3, 5, 7, 9, 8, 6];
    heapIncreaseKey(input, 1, 10);
    expect(input).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });
});
