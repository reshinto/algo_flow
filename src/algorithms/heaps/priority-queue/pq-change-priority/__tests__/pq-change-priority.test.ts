import { describe, it, expect } from "vitest";
import { pqChangePriority } from "../sources/pq-change-priority.ts?fn";

/** Verify min-heap property: every parent ≤ both children. */
function isMinHeap(array: number[]): boolean {
  const heapSize = array.length;
  for (let parentIdx = 0; parentIdx < Math.floor(heapSize / 2); parentIdx++) {
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;
    if (leftIdx < heapSize && array[parentIdx]! > array[leftIdx]!) return false;
    if (rightIdx < heapSize && array[parentIdx]! > array[rightIdx]!) return false;
  }
  return true;
}

describe("pqChangePriority", () => {
  it("decreasing value (increase priority) produces a valid min-heap", () => {
    const result = pqChangePriority([2, 5, 3, 10, 15, 8, 7], 4, 1) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("new minimum becomes root after decrease to global minimum", () => {
    const result = pqChangePriority([2, 5, 3, 10, 15, 8, 7], 4, 1) as number[];
    expect(result[0]).toBe(1);
  });

  it("increasing value (decrease priority) produces a valid min-heap", () => {
    const result = pqChangePriority([2, 5, 3, 10, 15, 8, 7], 0, 20) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("root changes when smallest element replaces it after increase", () => {
    const result = pqChangePriority([2, 5, 3, 10, 15, 8, 7], 0, 20) as number[];
    expect(result[0]).toBe(3);
  });

  it("result contains all original elements with only the target value changed", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const result = pqChangePriority(original, 4, 1) as number[];
    const originalSorted = [...original]
      .map((value, idx) => (idx === 4 ? 1 : value))
      .sort((valueA, valueB) => valueA - valueB);
    expect([...result].sort((valueA, valueB) => valueA - valueB)).toEqual(originalSorted);
  });

  it("does not mutate the original array", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const originalCopy = [...original];
    pqChangePriority(original, 4, 1);
    expect(original).toEqual(originalCopy);
  });

  it("changing value to same value produces a valid min-heap (no-op)", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const result = pqChangePriority(original, 2, 3) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("handles change on a leaf node", () => {
    const result = pqChangePriority([1, 3, 5, 7, 9, 8, 6], 6, 0) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result[0]).toBe(0);
  });

  it("handles increasing a non-root element that is already a leaf", () => {
    const result = pqChangePriority([1, 3, 5, 7, 9], 4, 100) as number[];
    expect(isMinHeap(result)).toBe(true);
  });
});
