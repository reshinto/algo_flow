import { describe, it, expect } from "vitest";
import { bstLowestCommonAncestorIterative } from "./sources/bst-lowest-common-ancestor-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstLowestCommonAncestorIterative", () => {
  it("finds LCA of 1 and 3", () => {
    const result = bstLowestCommonAncestorIterative(tree, 1, 3) as BSTNode | null;
    expect(result?.value).toBe(2);
  });
  it("finds LCA of 5 and 7", () => {
    const result = bstLowestCommonAncestorIterative(tree, 5, 7) as BSTNode | null;
    expect(result?.value).toBe(6);
  });
  it("finds root as LCA for 1 and 7", () => {
    const result = bstLowestCommonAncestorIterative(tree, 1, 7) as BSTNode | null;
    expect(result?.value).toBe(4);
  });
});
