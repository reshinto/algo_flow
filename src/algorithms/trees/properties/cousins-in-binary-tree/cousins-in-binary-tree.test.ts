import { describe, it, expect } from "vitest";
import { cousinsInBinaryTree } from "./sources/cousins-in-binary-tree.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("cousinsInBinaryTree", () => {
  it("returns true for nodes 1 and 5 (cousins in 7-node BST)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(cousinsInBinaryTree(root, 1, 5)).toBe(true);
  });

  it("returns false for siblings (same parent)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(cousinsInBinaryTree(root, 1, 3)).toBe(false);
  });

  it("returns false for nodes at different depths", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(cousinsInBinaryTree(root, 2, 1)).toBe(false);
  });

  it("returns false for null root", () => {
    expect(cousinsInBinaryTree(null, 1, 2)).toBe(false);
  });

  it("returns true for another valid cousin pair (3 and 7)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(cousinsInBinaryTree(root, 3, 7)).toBe(true);
  });
});
