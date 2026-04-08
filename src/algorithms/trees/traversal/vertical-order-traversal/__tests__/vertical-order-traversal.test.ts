import { describe, it, expect } from "vitest";
import { verticalOrderTraversal } from "../sources/vertical-order-traversal.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("verticalOrderTraversal", () => {
  it("traverses a balanced 7-node BST by vertical columns", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    // col -2: [1], col -1: [2], col 0: [4,3,5], col 1: [6], col 2: [7]
    expect(verticalOrderTraversal(root)).toEqual([[1], [2], [4, 3, 5], [6], [7]]);
  });

  it("returns an empty array for a null root", () => {
    expect(verticalOrderTraversal(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(verticalOrderTraversal(node(42))).toEqual([[42]]);
  });

  it("handles a right-skewed tree", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(verticalOrderTraversal(root)).toEqual([[1], [2], [3]]);
  });

  it("handles a two-node tree with left child", () => {
    expect(verticalOrderTraversal(node(5, node(3)))).toEqual([[3], [5]]);
  });
});
