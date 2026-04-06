import { describe, it, expect } from "vitest";
import { isSymmetricTreeIterative } from "./sources/is-symmetric-tree-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("isSymmetricTreeIterative", () => {
  it("returns true for a symmetric tree", () => {
    const root = node(1, node(2, node(3), node(4)), node(2, node(4), node(3)));
    expect(isSymmetricTreeIterative(root)).toBe(true);
  });

  it("returns true for null root", () => {
    expect(isSymmetricTreeIterative(null)).toBe(true);
  });

  it("returns true for a single node", () => {
    expect(isSymmetricTreeIterative(node(1))).toBe(true);
  });

  it("returns false for an asymmetric tree", () => {
    const root = node(1, node(2, null, node(3)), node(2, null, node(3)));
    expect(isSymmetricTreeIterative(root)).toBe(false);
  });
});
