import { describe, it, expect } from "vitest";
import { buildMinHeap } from "../sources/build-min-heap.ts?fn";

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

describe("buildMinHeap", () => {
  it("produces a valid min-heap for the default 9-element input", () => {
    const result = buildMinHeap([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("root is the minimum element", () => {
    const result = buildMinHeap([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(result[0]).toBe(1);
  });

  it("preserves all elements (same multiset)", () => {
    const input = [9, 5, 7, 1, 3, 8, 2, 6, 4];
    const result = buildMinHeap(input) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
  });

  it("handles an already valid min-heap", () => {
    const input = [1, 3, 2, 7, 5, 8, 4];
    const result = buildMinHeap(input) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(1);
  });

  it("handles a reverse-sorted (max-heap) array", () => {
    const result = buildMinHeap([7, 6, 5, 4, 3, 2, 1]) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(1);
  });

  it("handles a single element", () => {
    const result = buildMinHeap([42]) as number[];
    expect(result).toEqual([42]);
  });

  it("handles two elements", () => {
    const result = buildMinHeap([5, 2]) as number[];
    expect(result[0]).toBe(2);
    expect(isMinHeap(result)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const input = [9, 5, 7, 1, 3];
    buildMinHeap(input);
    expect(input).toEqual([9, 5, 7, 1, 3]);
  });
});
