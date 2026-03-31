import { describe, it, expect } from "vitest";
import { heapDecreaseKey } from "./sources/heap-decrease-key.ts?fn";

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

describe("heapDecreaseKey", () => {
  it("produces a valid min-heap after decreasing a key", () => {
    const result = heapDecreaseKey([1, 5, 3, 7, 9, 8, 6], 3, 2) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("the updated node has the new value", () => {
    const result = heapDecreaseKey([1, 5, 3, 7, 9, 8, 6], 3, 2) as number[];
    expect(result.includes(2)).toBe(true);
    expect(result.includes(7)).toBe(false);
  });

  it("preserves all elements (same multiset minus old, plus new)", () => {
    const result = heapDecreaseKey([1, 5, 3, 7, 9, 8, 6], 3, 2) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([1, 2, 3, 5, 6, 8, 9]);
  });

  it("decreasing to a value still larger than parent — no sift needed", () => {
    const result = heapDecreaseKey([1, 5, 3, 7, 9, 8, 6], 3, 6) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[3]).toBe(6);
  });

  it("decreasing key at root index", () => {
    const result = heapDecreaseKey([1, 5, 3, 7, 9, 8, 6], 0, -1) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(-1);
  });

  it("decreasing key that bubbles all the way to the root", () => {
    const result = heapDecreaseKey([1, 3, 5, 7, 9, 8, 6], 6, 0) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(0);
  });

  it("handles a single-element heap", () => {
    const result = heapDecreaseKey([10], 0, 5) as number[];
    expect(result).toEqual([5]);
  });

  it("does not mutate the original array", () => {
    const input = [1, 5, 3, 7, 9, 8, 6];
    heapDecreaseKey(input, 3, 2);
    expect(input).toEqual([1, 5, 3, 7, 9, 8, 6]);
  });
});
