import { describe, it, expect } from "vitest";
import { bstRangeSumIterative } from "./sources/bst-range-sum-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstRangeSumIterative", () => {
  it("sums values in [3, 7]", () => {
    expect(bstRangeSumIterative(tree, 3, 7)).toBe(3 + 4 + 5 + 6 + 7);
  });
  it("sums all values", () => {
    expect(bstRangeSumIterative(tree, 1, 7)).toBe(28);
  });
  it("returns 0 for no match", () => {
    expect(bstRangeSumIterative(tree, 10, 20)).toBe(0);
  });
  it("handles null tree", () => {
    expect(bstRangeSumIterative(null, 1, 7)).toBe(0);
  });
});
