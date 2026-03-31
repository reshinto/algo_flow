import { describe, it, expect } from "vitest";
import { heapExtractMax } from "./sources/heap-extract-max.ts?fn";

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

describe("heapExtractMax", () => {
  it("extracts the maximum value from the default max-heap", () => {
    const result = heapExtractMax([9, 7, 8, 3, 5, 6, 1]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(9);
  });

  it("remaining heap is a valid max-heap after extraction", () => {
    const result = heapExtractMax([9, 7, 8, 3, 5, 6, 1]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(isMaxHeap(result.remainingHeap)).toBe(true);
  });

  it("remaining heap has one fewer element", () => {
    const original = [9, 7, 8, 3, 5, 6, 1];
    const result = heapExtractMax(original) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.remainingHeap.length).toBe(original.length - 1);
  });

  it("all original elements are present — extracted plus remaining", () => {
    const original = [9, 7, 8, 3, 5, 6, 1];
    const result = heapExtractMax(original) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    const allValues = [result.extractedValue, ...result.remainingHeap].sort((a, b) => a - b);
    expect(allValues).toEqual([...original].sort((a, b) => a - b));
  });

  it("extracts from a two-element max-heap", () => {
    const result = heapExtractMax([8, 3]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(8);
    expect(result.remainingHeap).toEqual([3]);
  });

  it("extracts from a single-element heap", () => {
    const result = heapExtractMax([99]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.extractedValue).toBe(99);
    expect(result.remainingHeap).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = [9, 7, 8, 3, 5, 6, 1];
    heapExtractMax(original);
    expect(original).toEqual([9, 7, 8, 3, 5, 6, 1]);
  });

  it("new root after extraction is the second-largest element", () => {
    const result = heapExtractMax([9, 7, 8, 3, 5, 6, 1]) as {
      extractedValue: number;
      remainingHeap: number[];
    };
    expect(result.remainingHeap[0]).toBe(8);
  });
});
