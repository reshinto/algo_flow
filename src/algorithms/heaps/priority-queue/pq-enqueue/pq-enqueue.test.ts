import { describe, it, expect } from "vitest";
import { pqEnqueue } from "./sources/pq-enqueue.ts?fn";

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

describe("pqEnqueue", () => {
  it("enqueues 3 into the default priority queue and produces a valid min-heap", () => {
    const result = pqEnqueue([2, 5, 8, 10, 15], 3) as number[];
    expect(isMinHeap(result)).toBe(true);
  });

  it("root remains the minimum (highest priority) after enqueue", () => {
    const result = pqEnqueue([2, 5, 8, 10, 15], 3) as number[];
    expect(result[0]).toBe(2);
  });

  it("enqueuing a new minimum — new value becomes root", () => {
    const result = pqEnqueue([2, 5, 8, 10, 15], 1) as number[];
    expect(result[0]).toBe(1);
    expect(isMinHeap(result)).toBe(true);
  });

  it("enqueuing a value larger than all elements — no sift-up occurs", () => {
    const result = pqEnqueue([2, 5, 8, 10, 15], 100) as number[];
    expect(result[0]).toBe(2);
    expect(isMinHeap(result)).toBe(true);
  });

  it("result contains all original elements plus the new value", () => {
    const original = [2, 5, 8, 10, 15];
    const result = pqEnqueue(original, 3) as number[];
    expect(result.length).toBe(original.length + 1);
    expect([...result].sort((valueA, valueB) => valueA - valueB)).toEqual(
      [...original, 3].sort((valueA, valueB) => valueA - valueB),
    );
  });

  it("enqueues into an empty priority queue", () => {
    const result = pqEnqueue([], 42) as number[];
    expect(result).toEqual([42]);
  });

  it("enqueues into a single-element queue", () => {
    const result = pqEnqueue([5], 3) as number[];
    expect(result[0]).toBe(3);
    expect(isMinHeap(result)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const original = [2, 5, 8, 10, 15];
    pqEnqueue(original, 3);
    expect(original).toEqual([2, 5, 8, 10, 15]);
  });

  it("handles duplicate values correctly", () => {
    const result = pqEnqueue([2, 5, 8], 5) as number[];
    expect(isMinHeap(result)).toBe(true);
    expect(result.filter((value) => value === 5).length).toBe(2);
  });
});
