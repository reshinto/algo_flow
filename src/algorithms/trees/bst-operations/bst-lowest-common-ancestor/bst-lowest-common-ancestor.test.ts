import { describe, it, expect } from "vitest";
import { bstLowestCommonAncestor } from "./sources/bst-lowest-common-ancestor.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstLowestCommonAncestor", () => {
  it("finds LCA of 1 and 3 (which is 2)", () => {
    const result = bstLowestCommonAncestor(tree, 1, 3) as BSTNode | null;
    expect(result?.value).toBe(2);
  });
  it("finds LCA of 1 and 7 (which is 4 = root)", () => {
    const result = bstLowestCommonAncestor(tree, 1, 7) as BSTNode | null;
    expect(result?.value).toBe(4);
  });
  it("finds LCA of 5 and 7 (which is 6)", () => {
    const result = bstLowestCommonAncestor(tree, 5, 7) as BSTNode | null;
    expect(result?.value).toBe(6);
  });
  it("returns node itself when one value equals LCA", () => {
    const result = bstLowestCommonAncestor(tree, 2, 3) as BSTNode | null;
    expect(result?.value).toBe(2);
  });
});
