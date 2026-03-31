import { describe, it, expect } from "vitest";
import { buildHeapTopDown } from "./sources/build-heap-top-down.ts?fn";

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

describe("buildHeapTopDown", () => {
  it("produces a valid min-heap for the default 9-element input", () => {
    const result = buildHeapTopDown([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("root is the minimum element", () => {
    const result = buildHeapTopDown([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(result[0]).toBe(1);
  });

  it("preserves all elements (same multiset)", () => {
    const input = [9, 5, 7, 1, 3, 8, 2, 6, 4];
    const result = buildHeapTopDown(input) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
  });

  it("handles an already sorted ascending array", () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const result = buildHeapTopDown(input) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(1);
  });

  it("handles a reverse-sorted (descending) array", () => {
    const result = buildHeapTopDown([7, 6, 5, 4, 3, 2, 1]) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(1);
  });

  it("handles a single element", () => {
    const result = buildHeapTopDown([42]) as number[];
    expect(result).toEqual([42]);
  });

  it("handles two elements in descending order", () => {
    const result = buildHeapTopDown([5, 2]) as number[];
    expect(result[0]).toBe(2);
    expect(isMinHeap(result)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const input = [9, 5, 7, 1, 3];
    buildHeapTopDown(input);
    expect(input).toEqual([9, 5, 7, 1, 3]);
  });
});
