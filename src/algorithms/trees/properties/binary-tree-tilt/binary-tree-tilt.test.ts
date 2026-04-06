import { describe, it, expect } from "vitest";
import { binaryTreeTilt } from "./sources/binary-tree-tilt.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("binaryTreeTilt", () => {
  it("returns 0 for a null root", () => {
    expect(binaryTreeTilt(null)).toBe(0);
  });

  it("returns 0 for a single node", () => {
    expect(binaryTreeTilt(node(1))).toBe(0);
  });

  it("returns correct tilt for a simple 3-node tree", () => {
    // node(1, node(2), node(3)): tilt at root = |2-3| = 1, leaves 0; total = 1
    expect(binaryTreeTilt(node(1, node(2), node(3)))).toBe(1);
  });

  it("returns a non-negative number for any tree", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(binaryTreeTilt(root)).toBeGreaterThanOrEqual(0);
  });
});
