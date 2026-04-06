import { describe, it, expect } from "vitest";
import { bstToGreaterTree } from "./sources/bst-to-greater-tree.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstToGreaterTree", () => {
  it("transforms a 3-node BST correctly", () => {
    const tree = node(2, node(1), node(3));
    const result = bstToGreaterTree(tree) as BSTNode | null;
    // Node 3 → 3, node 2 → 5, node 1 → 6
    expect(result?.value).toBe(5);
    expect(result?.right?.value).toBe(3);
    expect(result?.left?.value).toBe(6);
  });
  it("handles single node", () => {
    const singleNode = node(5);
    const result = bstToGreaterTree(singleNode) as BSTNode | null;
    expect(result?.value).toBe(5);
  });
  it("handles null tree", () => {
    expect(bstToGreaterTree(null)).toBeNull();
  });
});
