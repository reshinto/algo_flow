import { describe, it, expect } from "vitest";
import { diameterOfBinaryTree } from "./sources/diameter-of-binary-tree.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("diameterOfBinaryTree", () => {
  it("returns 4 for a balanced 7-node BST (leaf to leaf through root)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(diameterOfBinaryTree(root)).toBe(4);
  });

  it("returns 0 for a null root", () => {
    expect(diameterOfBinaryTree(null)).toBe(0);
  });

  it("returns 0 for a single node", () => {
    expect(diameterOfBinaryTree(node(1))).toBe(0);
  });

  it("returns 1 for a two-node tree", () => {
    expect(diameterOfBinaryTree(node(1, node(2)))).toBe(1);
  });

  it("returns correct diameter for a skewed tree", () => {
    const root = node(1, node(2, node(3, node(4))));
    expect(diameterOfBinaryTree(root)).toBe(3);
  });
});
