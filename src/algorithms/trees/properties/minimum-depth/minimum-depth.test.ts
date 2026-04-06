import { describe, it, expect } from "vitest";
import { minimumDepth } from "./sources/minimum-depth.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("minimumDepth", () => {
  it("returns 3 for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(minimumDepth(root)).toBe(3);
  });

  it("returns 0 for a null root", () => {
    expect(minimumDepth(null)).toBe(0);
  });

  it("returns 1 for a single node", () => {
    expect(minimumDepth(node(42))).toBe(1);
  });

  it("does not count single-child nodes as leaves", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(minimumDepth(root)).toBe(3);
  });

  it("returns 2 for a tree with one leaf at level 2", () => {
    expect(minimumDepth(node(1, node(2)))).toBe(2);
  });
});
