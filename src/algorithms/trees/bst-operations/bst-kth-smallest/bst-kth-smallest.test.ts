import { describe, it, expect } from "vitest";
import { bstKthSmallest } from "./sources/bst-kth-smallest.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstKthSmallest", () => {
  it("finds 1st smallest", () => {
    expect(bstKthSmallest(tree, 1)).toBe(1);
  });
  it("finds 3rd smallest", () => {
    expect(bstKthSmallest(tree, 3)).toBe(3);
  });
  it("finds 7th smallest (largest)", () => {
    expect(bstKthSmallest(tree, 7)).toBe(7);
  });
  it("finds 4th smallest (root)", () => {
    expect(bstKthSmallest(tree, 4)).toBe(4);
  });
  it("returns -1 when k exceeds node count", () => {
    expect(bstKthSmallest(tree, 10)).toBe(-1);
  });
});
