import { describe, it, expect } from "vitest";
import { bstKthSmallestIterative } from "./sources/bst-kth-smallest-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstKthSmallestIterative", () => {
  it("finds 1st smallest", () => {
    expect(bstKthSmallestIterative(tree, 1)).toBe(1);
  });
  it("finds 2nd smallest", () => {
    expect(bstKthSmallestIterative(tree, 2)).toBe(2);
  });
  it("finds 7th smallest", () => {
    expect(bstKthSmallestIterative(tree, 7)).toBe(7);
  });
  it("returns -1 for out-of-range k", () => {
    expect(bstKthSmallestIterative(tree, 99)).toBe(-1);
  });
});
