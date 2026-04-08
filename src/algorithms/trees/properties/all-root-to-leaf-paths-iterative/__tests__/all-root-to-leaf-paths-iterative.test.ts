import { describe, it, expect } from "vitest";
import { allRootToLeafPathsIterative } from "../sources/all-root-to-leaf-paths-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("allRootToLeafPathsIterative", () => {
  it("returns 4 paths for a 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const paths = allRootToLeafPathsIterative(root) as string[];
    expect(paths.length).toBe(4);
  });

  it("returns correct path strings", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const paths = allRootToLeafPathsIterative(root) as string[];
    expect(paths).toContain("4->2->1");
  });

  it("returns empty array for null root", () => {
    expect(allRootToLeafPathsIterative(null)).toEqual([]);
  });

  it("returns single path for a single node", () => {
    expect(allRootToLeafPathsIterative(node(5))).toEqual(["5"]);
  });
});
