import { describe, it, expect } from "vitest";
import { isBalancedTreeIterative } from "./sources/is-balanced-tree-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("isBalancedTreeIterative", () => {
  it("returns true for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(isBalancedTreeIterative(root)).toBe(true);
  });

  it("returns true for null root", () => {
    expect(isBalancedTreeIterative(null)).toBe(true);
  });

  it("returns true for a single node", () => {
    expect(isBalancedTreeIterative(node(1))).toBe(true);
  });

  it("returns false for an unbalanced tree", () => {
    const root = node(1, node(2, node(3, node(4))));
    expect(isBalancedTreeIterative(root)).toBe(false);
  });
});
