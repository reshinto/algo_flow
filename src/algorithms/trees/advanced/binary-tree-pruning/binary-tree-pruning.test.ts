import { describe, it, expect } from "vitest";
import { binaryTreePruning } from "./sources/binary-tree-pruning.ts?fn";

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}
function node(
  value: number,
  left: BinaryNode | null = null,
  right: BinaryNode | null = null,
): BinaryNode {
  return { value, left, right };
}

describe("binaryTreePruning", () => {
  it("returns null for a tree of all zeros", () => {
    const root = node(0, node(0), node(0));
    expect(binaryTreePruning(root)).toBeNull();
  });

  it("returns null for a single zero node", () => {
    expect(binaryTreePruning(node(0))).toBeNull();
  });

  it("keeps a single one node", () => {
    const result = binaryTreePruning(node(1));
    expect(result).not.toBeNull();
    expect((result as BinaryNode).value).toBe(1);
  });

  it("prunes zero-only subtrees", () => {
    // Root 1 with left subtree [0, 0, 0] and right [1, 0, 1]
    const root = node(1, node(0, node(0), node(0)), node(1, node(0), node(1)));
    const pruned = binaryTreePruning(root) as BinaryNode;
    // Left subtree should be pruned
    expect(pruned.left).toBeNull();
    // Right subtree should keep 1 nodes
    expect(pruned.right).not.toBeNull();
    expect(pruned.right?.right?.value).toBe(1);
    expect(pruned.right?.left).toBeNull();
  });

  it("returns null for null input", () => {
    expect(binaryTreePruning(null)).toBeNull();
  });
});
