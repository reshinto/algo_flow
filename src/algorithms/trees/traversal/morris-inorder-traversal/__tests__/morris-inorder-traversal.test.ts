import { describe, it, expect } from "vitest";
import { morrisInorderTraversal } from "../sources/morris-inorder-traversal.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("morrisInorderTraversal", () => {
  it("traverses a balanced 7-node BST in sorted order", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(morrisInorderTraversal(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns an empty array for a null root", () => {
    expect(morrisInorderTraversal(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(morrisInorderTraversal(node(42))).toEqual([42]);
  });

  it("handles a left-skewed tree", () => {
    const root = node(5, node(4, node(3, node(2, node(1)))));
    expect(morrisInorderTraversal(root)).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a right-skewed tree", () => {
    const root = node(1, null, node(2, null, node(3, null, node(4, null, node(5)))));
    expect(morrisInorderTraversal(root)).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a two-node tree with only a left child", () => {
    expect(morrisInorderTraversal(node(5, node(3)))).toEqual([3, 5]);
  });

  it("handles a two-node tree with only a right child", () => {
    expect(morrisInorderTraversal(node(5, null, node(8)))).toEqual([5, 8]);
  });
});
