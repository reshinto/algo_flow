import { describe, it, expect } from "vitest";
import { zigzagLevelOrder } from "./sources/zigzag-level-order.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("zigzagLevelOrder", () => {
  it("traverses a balanced 7-node BST in zigzag order", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(zigzagLevelOrder(root)).toEqual([[4], [6, 2], [1, 3, 5, 7]]);
  });

  it("returns an empty array for a null root", () => {
    expect(zigzagLevelOrder(null)).toEqual([]);
  });

  it("handles a single-node tree", () => {
    expect(zigzagLevelOrder(node(42))).toEqual([[42]]);
  });

  it("handles a two-level tree with left and right children", () => {
    const root = node(1, node(2), node(3));
    expect(zigzagLevelOrder(root)).toEqual([[1], [3, 2]]);
  });

  it("handles a left-skewed tree", () => {
    const root = node(3, node(2, node(1)));
    expect(zigzagLevelOrder(root)).toEqual([[3], [2], [1]]);
  });
});
