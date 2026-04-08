import { describe, it, expect } from "vitest";
import { isBalancedTree } from "../sources/is-balanced-tree.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("isBalancedTree", () => {
  it("returns true for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(isBalancedTree(root)).toBe(true);
  });

  it("returns true for null root", () => {
    expect(isBalancedTree(null)).toBe(true);
  });

  it("returns true for a single node", () => {
    expect(isBalancedTree(node(1))).toBe(true);
  });

  it("returns false for an unbalanced tree", () => {
    const root = node(1, node(2, node(3, node(4))));
    expect(isBalancedTree(root)).toBe(false);
  });

  it("returns true for a two-node tree", () => {
    expect(isBalancedTree(node(1, node(2)))).toBe(true);
  });
});
