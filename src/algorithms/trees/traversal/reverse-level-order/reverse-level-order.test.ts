import { describe, it, expect } from "vitest";
import { reverseLevelOrder } from "./sources/reverse-level-order.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("reverseLevelOrder", () => {
  it("traverses a balanced 7-node BST in reverse level order", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(reverseLevelOrder(root)).toEqual([[1, 3, 5, 7], [2, 6], [4]]);
  });

  it("returns an empty array for a null root", () => {
    expect(reverseLevelOrder(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(reverseLevelOrder(node(42))).toEqual([[42]]);
  });

  it("handles a left-skewed tree", () => {
    const root = node(5, node(4, node(3)));
    expect(reverseLevelOrder(root)).toEqual([[3], [4], [5]]);
  });

  it("handles a right-skewed tree", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(reverseLevelOrder(root)).toEqual([[3], [2], [1]]);
  });

  it("handles a two-node tree", () => {
    expect(reverseLevelOrder(node(5, node(3)))).toEqual([[3], [5]]);
  });
});
