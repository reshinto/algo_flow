import { describe, it, expect } from "vitest";
import { buildMaxHeap } from "./sources/build-max-heap.ts?fn";

/** Verify max-heap property: every parent ≥ both children. */
function isMaxHeap(array: number[]): boolean {
  const size = array.length;
  for (let parentIdx = 0; parentIdx < Math.floor(size / 2); parentIdx++) {
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;
    if (leftIdx < size && array[parentIdx]! < array[leftIdx]!) return false;
    if (rightIdx < size && array[parentIdx]! < array[rightIdx]!) return false;
  }
  return true;
}

describe("buildMaxHeap", () => {
  it("produces a valid max-heap for the default 9-element input", () => {
    const result = buildMaxHeap([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(isMaxHeap(result)).toBe(true);
  });

  it("root is the maximum element", () => {
    const result = buildMaxHeap([9, 5, 7, 1, 3, 8, 2, 6, 4]) as number[];
    expect(result[0]).toBe(9);
  });

  it("preserves all elements (same multiset)", () => {
    const input = [9, 5, 7, 1, 3, 8, 2, 6, 4];
    const result = buildMaxHeap(input) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
  });

  it("handles an already valid max-heap", () => {
    const input = [9, 7, 8, 5, 6, 3, 4];
    const result = buildMaxHeap(input) as number[];
    expect(isMaxHeap(result)).toBe(true);
    expect(result[0]).toBe(9);
  });

  it("handles a sorted ascending (min-heap) array", () => {
    const result = buildMaxHeap([1, 2, 3, 4, 5, 6, 7]) as number[];
    expect(isMaxHeap(result)).toBe(true);
    expect(result[0]).toBe(7);
  });

  it("handles a single element", () => {
    const result = buildMaxHeap([42]) as number[];
    expect(result).toEqual([42]);
  });

  it("handles two elements", () => {
    const result = buildMaxHeap([2, 5]) as number[];
    expect(result[0]).toBe(5);
    expect(isMaxHeap(result)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const input = [9, 5, 7, 1, 3];
    buildMaxHeap(input);
    expect(input).toEqual([9, 5, 7, 1, 3]);
  });
});
