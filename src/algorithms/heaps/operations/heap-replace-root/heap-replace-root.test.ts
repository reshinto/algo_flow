import { describe, it, expect } from "vitest";
import { heapReplaceRoot } from "./sources/heap-replace-root.ts?fn";

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

describe("heapReplaceRoot", () => {
  it("returns the replaced value (original root)", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 10) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect(result.replacedValue).toBe(1);
  });

  it("produces a valid min-heap after replacing root with a large value", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 10) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect(isMinHeap(result.newHeap)).toBe(true);
  });

  it("new heap contains the new value", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 10) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect(result.newHeap.includes(10)).toBe(true);
    expect(result.newHeap.includes(1)).toBe(false);
  });

  it("preserves all elements (same multiset minus root, plus new value)", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 10) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect([...result.newHeap].sort((a, b) => a - b)).toEqual([3, 5, 6, 7, 8, 9, 10]);
  });

  it("replacing root with a value smaller than both children — no sift needed", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 2) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect(isMinHeap(result.newHeap)).toBe(true);
    expect(result.newHeap[0]).toBe(2);
    expect(result.replacedValue).toBe(1);
  });

  it("replacing root with the largest value sinks all the way to a leaf", () => {
    const result = heapReplaceRoot([1, 3, 5, 7, 9, 8, 6], 100) as {
      replacedValue: number;
      newHeap: number[];
    };
    expect(isMinHeap(result.newHeap)).toBe(true);
    expect(result.newHeap[0]).not.toBe(100);
  });

  it("handles a single-element heap", () => {
    const result = heapReplaceRoot([42], 7) as { replacedValue: number; newHeap: number[] };
    expect(result.replacedValue).toBe(42);
    expect(result.newHeap).toEqual([7]);
  });

  it("handles a two-element heap", () => {
    const result = heapReplaceRoot([1, 5], 10) as { replacedValue: number; newHeap: number[] };
    expect(result.replacedValue).toBe(1);
    expect(isMinHeap(result.newHeap)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const input = [1, 3, 5, 7, 9, 8, 6];
    heapReplaceRoot(input, 10);
    expect(input).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });
});
