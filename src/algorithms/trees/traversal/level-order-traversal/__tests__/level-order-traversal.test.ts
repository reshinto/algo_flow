import { describe, it, expect } from "vitest";
import { levelOrderTraversal } from "../sources/level-order-traversal.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("levelOrderTraversal", () => {
  it("traverses a balanced 7-node BST level by level", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(levelOrderTraversal(root)).toEqual([[4], [2, 6], [1, 3, 5, 7]]);
  });

  it("returns an empty array for a null root", () => {
    expect(levelOrderTraversal(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(levelOrderTraversal(node(42))).toEqual([[42]]);
  });

  it("handles a left-skewed tree", () => {
    const root = node(5, node(4, node(3)));
    expect(levelOrderTraversal(root)).toEqual([[5], [4], [3]]);
  });

  it("handles a right-skewed tree", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(levelOrderTraversal(root)).toEqual([[1], [2], [3]]);
  });

  it("handles a two-node tree with only a left child", () => {
    expect(levelOrderTraversal(node(5, node(3)))).toEqual([[5], [3]]);
  });

  it("handles a two-node tree with only a right child", () => {
    expect(levelOrderTraversal(node(5, null, node(8)))).toEqual([[5], [8]]);
  });
});
