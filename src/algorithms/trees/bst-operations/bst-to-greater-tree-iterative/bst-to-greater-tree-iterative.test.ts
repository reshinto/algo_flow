import { describe, it, expect } from "vitest";
import { bstToGreaterTreeIterative } from "./sources/bst-to-greater-tree-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstToGreaterTreeIterative", () => {
  it("transforms a 3-node BST correctly", () => {
    const tree = node(2, node(1), node(3));
    const result = bstToGreaterTreeIterative(tree) as BSTNode | null;
    expect(result?.value).toBe(5);
    expect(result?.right?.value).toBe(3);
    expect(result?.left?.value).toBe(6);
  });
  it("handles single node", () => {
    const singleNode = node(7);
    const result = bstToGreaterTreeIterative(singleNode) as BSTNode | null;
    expect(result?.value).toBe(7);
  });
  it("handles null tree", () => {
    expect(bstToGreaterTreeIterative(null)).toBeNull();
  });
});
