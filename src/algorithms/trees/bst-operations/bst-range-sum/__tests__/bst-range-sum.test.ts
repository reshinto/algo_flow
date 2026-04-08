import { describe, it, expect } from "vitest";
import { bstRangeSum } from "../sources/bst-range-sum.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstRangeSum", () => {
  it("sums values in [2, 6]", () => {
    expect(bstRangeSum(tree, 2, 6)).toBe(2 + 3 + 4 + 5 + 6);
  });
  it("sums all values", () => {
    expect(bstRangeSum(tree, 1, 7)).toBe(28);
  });
  it("returns 0 when range has no matching nodes", () => {
    expect(bstRangeSum(tree, 10, 20)).toBe(0);
  });
  it("sums single matching node", () => {
    expect(bstRangeSum(tree, 4, 4)).toBe(4);
  });
  it("handles null tree", () => {
    expect(bstRangeSum(null, 1, 7)).toBe(0);
  });
});
