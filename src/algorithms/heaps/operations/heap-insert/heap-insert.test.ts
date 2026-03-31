import { describe, it, expect } from "vitest";
import { heapInsert } from "./sources/heap-insert.ts?fn";

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

describe("heapInsert", () => {
  it("inserts value 2 into default heap and produces a valid min-heap", () => {
    const result = heapInsert([1, 3, 5, 7, 9, 8, 6], 2) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("root remains the minimum after insertion", () => {
    const result = heapInsert([1, 3, 5, 7, 9, 8, 6], 2) as number[];
    expect(result[0]).toBe(1);
  });

  it("inserts a new minimum — new value becomes root", () => {
    const result = heapInsert([3, 5, 7, 9], 1) as number[];
    expect(result[0]).toBe(1);
    expect(isMinHeap(result)).toBe(true);
  });

  it("inserts a value larger than all existing elements", () => {
    const result = heapInsert([1, 3, 5, 7], 100) as number[];
    expect(result[0]).toBe(1);
    expect(isMinHeap(result)).toBe(true);
  });

  it("result contains all original elements plus the new value", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    const result = heapInsert(original, 2) as number[];
    expect(result.length).toBe(original.length + 1);
    expect([...result].sort((a, b) => a - b)).toEqual([...original, 2].sort((a, b) => a - b));
  });

  it("inserts into a single-element heap", () => {
    const result = heapInsert([5], 3) as number[];
    expect(result[0]).toBe(3);
    expect(isMinHeap(result)).toBe(true);
  });

  it("inserts into an empty heap", () => {
    const result = heapInsert([], 42) as number[];
    expect(result).toEqual([42]);
  });

  it("does not mutate the original array", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    heapInsert(original, 2);
    expect(original).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });

  it("handles duplicate values", () => {
    const result = heapInsert([1, 3, 5], 3) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result.filter((value) => value === 3).length).toBe(2);
  });
});
