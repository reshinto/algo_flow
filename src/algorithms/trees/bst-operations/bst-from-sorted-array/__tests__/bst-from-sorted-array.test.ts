import { describe, it, expect } from "vitest";
import { bstFromSortedArray } from "../sources/bst-from-sorted-array.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

describe("bstFromSortedArray", () => {
  it("creates a balanced BST with root at mid-value", () => {
    const result = bstFromSortedArray([1, 2, 3, 4, 5, 6, 7]) as BSTNode | null;
    expect(result?.value).toBe(4);
  });
  it("creates a single-node tree from array of one", () => {
    const result = bstFromSortedArray([42]) as BSTNode | null;
    expect(result?.value).toBe(42);
    expect(result?.left).toBeNull();
    expect(result?.right).toBeNull();
  });
  it("returns null for empty array", () => {
    expect(bstFromSortedArray([])).toBeNull();
  });
  it("creates a two-node tree with correct BST structure", () => {
    const result = bstFromSortedArray([1, 2]) as BSTNode | null;
    expect(result?.value).toBe(1);
    expect(result?.right?.value).toBe(2);
  });
  it("produces a valid BST for 5 elements", () => {
    const result = bstFromSortedArray([1, 2, 3, 4, 5]) as BSTNode | null;
    expect(result?.value).toBe(3);
    expect(result?.left?.value).toBe(1);
    expect(result?.right?.value).toBe(4);
  });
});
