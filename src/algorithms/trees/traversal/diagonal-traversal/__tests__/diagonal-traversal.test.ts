import { describe, it, expect } from "vitest";
import { treeDiagonalTraversal } from "../sources/tree-diagonal-traversal.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("treeDiagonalTraversal", () => {
  it("traverses a balanced 7-node BST by diagonals", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    // d=0: [4,6,7], d=1: [2,5,3] (BFS order: node 2 then right child 5 then left child 3), d=2: [1]
    expect(treeDiagonalTraversal(root)).toEqual([[4, 6, 7], [2, 5, 3], [1]]);
  });

  it("returns an empty array for a null root", () => {
    expect(treeDiagonalTraversal(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(treeDiagonalTraversal(node(42))).toEqual([[42]]);
  });

  it("handles a right-skewed tree (all on diagonal 0)", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(treeDiagonalTraversal(root)).toEqual([[1, 2, 3]]);
  });

  it("handles a left-skewed tree (each node on its own diagonal)", () => {
    const root = node(3, node(2, node(1)));
    expect(treeDiagonalTraversal(root)).toEqual([[3], [2], [1]]);
  });
});
