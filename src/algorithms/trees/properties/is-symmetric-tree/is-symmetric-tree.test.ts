import { describe, it, expect } from "vitest";
import { isSymmetricTree } from "./sources/is-symmetric-tree.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("isSymmetricTree", () => {
  it("returns false for a non-symmetric BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(isSymmetricTree(root)).toBe(false);
  });

  it("returns true for a symmetric tree", () => {
    const root = node(1, node(2, node(3), node(4)), node(2, node(4), node(3)));
    expect(isSymmetricTree(root)).toBe(true);
  });

  it("returns true for null root", () => {
    expect(isSymmetricTree(null)).toBe(true);
  });

  it("returns true for a single node", () => {
    expect(isSymmetricTree(node(1))).toBe(true);
  });

  it("returns false for an asymmetric tree", () => {
    const root = node(1, node(2, null, node(3)), node(2, null, node(3)));
    expect(isSymmetricTree(root)).toBe(false);
  });
});
