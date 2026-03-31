import { describe, it, expect } from "vitest";
import { heapExtractMin } from "./sources/heap-extract-min.ts?fn";

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

describe("heapExtractMin", () => {
  it("extracts the minimum value from the default heap", () => {
    const result = heapExtractMin([1, 3, 5, 7, 9, 8, 6]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(1);
  });

  it("remaining heap is a valid min-heap after extraction", () => {
    const result = heapExtractMin([1, 3, 5, 7, 9, 8, 6]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(isMinHeap(result.remainingHeap)).toBe(true);
  });

  it("remaining heap has one fewer element", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    const result = heapExtractMin(original) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.remainingHeap.length).toBe(original.length - 1);
  });

  it("all original elements are present — extracted plus remaining", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    const result = heapExtractMin(original) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    const allValues = [result.extractedValue, ...result.remainingHeap].sort((a, b) => a - b);
    expect(allValues).toEqual([...original].sort((a, b) => a - b));
  });

  it("extracts from a two-element heap", () => {
    const result = heapExtractMin([2, 5]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(2);
    expect(result.remainingHeap).toEqual([5]);
  });

  it("extracts from a single-element heap", () => {
    const result = heapExtractMin([42]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(42);
    expect(result.remainingHeap).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = [1, 3, 5, 7, 9, 8, 6];
    heapExtractMin(original);
    expect(original).toEqual([1, 3, 5, 7, 9, 8, 6]);
  });

  it("new root after extraction is the second-smallest element", () => {
    const result = heapExtractMin([1, 3, 5, 7, 9, 8, 6]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.remainingHeap[0]).toBe(3);
  });
});
