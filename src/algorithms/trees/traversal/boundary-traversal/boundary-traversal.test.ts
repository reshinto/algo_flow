import { describe, it, expect } from "vitest";
import { boundaryTraversal } from "./sources/boundary-traversal.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("boundaryTraversal", () => {
  it("traverses the boundary of a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    // root=4, left boundary=2, leaves=1,3,5,7, right boundary=6
    expect(boundaryTraversal(root)).toEqual([4, 2, 1, 3, 5, 7, 6]);
  });

  it("returns an empty array for a null root", () => {
    expect(boundaryTraversal(null)).toEqual([]);
  });

  it("handles a single-node tree (leaf root)", () => {
    expect(boundaryTraversal(node(42))).toEqual([42]);
  });

  it("handles a tree with only a right child", () => {
    const root = node(5, null, node(8));
    expect(boundaryTraversal(root)).toEqual([5, 8]);
  });

  it("handles a tree with only a left child", () => {
    const root = node(5, node(3));
    expect(boundaryTraversal(root)).toEqual([5, 3]);
  });
});
