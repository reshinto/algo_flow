import { describe, it, expect } from "vitest";
import { bstRecoverSwapped } from "./sources/bst-recover-swapped.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

function collectInorder(root: BSTNode | null): number[] {
  if (!root) return [];
  return [...collectInorder(root.left), root.value, ...collectInorder(root.right)];
}

describe("bstRecoverSwapped", () => {
  it("recovers two non-adjacent swapped nodes", () => {
    // Swap nodes 3 and 7 in balanced tree to create invalid BST
    const invalidTree = node(4, node(2, node(1), node(7)), node(6, node(5), node(3)));
    bstRecoverSwapped(invalidTree);
    expect(collectInorder(invalidTree)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("recovers two adjacent swapped nodes", () => {
    // Swap 2 and 3 (adjacent in in-order)
    const tree = node(4, node(3, node(1), node(2)), node(6, node(5), node(7)));
    bstRecoverSwapped(tree);
    expect(collectInorder(tree)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("does not modify an already valid BST", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    bstRecoverSwapped(tree);
    expect(collectInorder(tree)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
