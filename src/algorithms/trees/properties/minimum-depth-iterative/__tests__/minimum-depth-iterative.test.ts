import { describe, it, expect } from "vitest";
import { minimumDepthIterative } from "../sources/minimum-depth-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("minimumDepthIterative", () => {
  it("returns 3 for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(minimumDepthIterative(root)).toBe(3);
  });

  it("returns 0 for a null root", () => {
    expect(minimumDepthIterative(null)).toBe(0);
  });

  it("returns 1 for a single node", () => {
    expect(minimumDepthIterative(node(42))).toBe(1);
  });

  it("returns 2 for a partial tree with leaf at level 2", () => {
    expect(minimumDepthIterative(node(1, node(2)))).toBe(2);
  });
});
