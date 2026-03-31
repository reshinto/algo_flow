import { describe, it, expect } from "vitest";
import { heapifySingleNode } from "./sources/heapify-single-node.ts?fn";

/**
 * Verify that the sift-down path from targetIndex satisfies local heap property:
 * each node on the path is ≤ its direct children. Heapify-single-node only fixes
 * the path from targetIndex to the leaf — other parts of the tree are unchanged.
 */
function isPathHeapValid(array: number[], startIdx: number): boolean {
  const size = array.length;
  let parentIdx = startIdx;
  while (true) {
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;
    if (leftIdx >= size) break;
    if (array[parentIdx]! > array[leftIdx]!) return false;
    if (rightIdx < size && array[parentIdx]! > array[rightIdx]!) return false;
    // Move down to the child that was followed (the smallest child)
    const smallestChild =
      rightIdx < size && array[rightIdx]! < array[leftIdx]! ? rightIdx : leftIdx;
    parentIdx = smallestChild;
  }
  return true;
}

describe("heapifySingleNode", () => {
  it("sifts down the root node to its correct position", () => {
    const result = heapifySingleNode([9, 1, 7, 2, 3, 8, 5, 6, 4], 0) as number[];
    // Single sift-down restores the sift path; the path from root must be locally valid
    expect(isPathHeapValid(result, 0)).toBe(true);
  });

  it("root becomes the minimum element after sifting index 0", () => {
    const result = heapifySingleNode([9, 1, 7, 2, 3, 8, 5, 6, 4], 0) as number[];
    expect(result[0]).toBe(1);
  });

  it("preserves all elements (same multiset)", () => {
    const input = [9, 1, 7, 2, 3, 8, 5, 6, 4];
    const result = heapifySingleNode(input, 0) as number[];
    expect([...result].sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
  });

  it("heapifies a non-root subtree node correctly", () => {
    // [1, 9, 2, 3, 4, 5, 6] — node at index 1 (value 9) violates heap property
    const result = heapifySingleNode([1, 9, 2, 3, 4, 5, 6], 1) as number[];
    expect(isPathHeapValid(result, 1)).toBe(true);
  });

  it("no-op when target node already satisfies heap property", () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const result = heapifySingleNode(input, 0) as number[];
    expect(result).toEqual(input);
  });

  it("handles a single element", () => {
    const result = heapifySingleNode([42], 0) as number[];
    expect(result).toEqual([42]);
  });

  it("handles leaf node target — no sift-down occurs", () => {
    const input = [1, 2, 3, 4, 5];
    const result = heapifySingleNode(input, 4) as number[];
    expect(result).toEqual(input);
  });

  it("does not mutate the original array", () => {
    const input = [9, 1, 7, 2, 3];
    heapifySingleNode(input, 0);
    expect(input).toEqual([9, 1, 7, 2, 3]);
  });
});
