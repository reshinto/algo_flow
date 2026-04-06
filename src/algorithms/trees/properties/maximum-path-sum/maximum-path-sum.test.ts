import { describe, it, expect } from "vitest";
import { maximumPathSum } from "./sources/maximum-path-sum.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("maximumPathSum", () => {
  it("returns correct max path sum for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    // best path: 3+2+4+6+7 = 22
    expect(maximumPathSum(root)).toBe(22);
  });

  it("handles a single node", () => {
    expect(maximumPathSum(node(-3))).toBe(-3);
  });

  it("handles all negative values", () => {
    const root = node(-1, node(-2), node(-3));
    expect(maximumPathSum(root)).toBe(-1);
  });

  it("returns null for null root", () => {
    expect(maximumPathSum(null)).toBe(-Infinity);
  });
});
