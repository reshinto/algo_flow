import { describe, it, expect } from "vitest";
import { serializeTree, deserializeTree } from "../sources/serialize-deserialize-tree.ts?fn";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function node(
  value: number,
  left: TreeNode | null = null,
  right: TreeNode | null = null,
): TreeNode {
  return { value, left, right };
}

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

describe("serializeTree", () => {
  it("serializes a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = serializeTree(root) as string;
    expect(result).toContain("4");
    expect(result).toContain("2");
    expect(result).toContain("6");
  });

  it("serializes null as 'null'", () => {
    expect(serializeTree(null)).toBe("null");
  });

  it("serializes a single-node tree", () => {
    const result = serializeTree(node(42)) as string;
    expect(result).toContain("42");
  });
});

describe("deserializeTree", () => {
  it("deserializes null string to null", () => {
    expect(deserializeTree("null")).toBeNull();
  });

  it("round-trips a balanced 7-node BST", () => {
    const original = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const serialized = serializeTree(original) as string;
    const reconstructed = deserializeTree(serialized) as TreeNode;
    expect(inorder(reconstructed)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(reconstructed.value).toBe(4);
  });

  it("round-trips a single-node tree", () => {
    const original = node(99);
    const serialized = serializeTree(original) as string;
    const reconstructed = deserializeTree(serialized) as TreeNode;
    expect(reconstructed.value).toBe(99);
    expect(reconstructed.left).toBeNull();
    expect(reconstructed.right).toBeNull();
  });

  it("round-trips a right-skewed tree", () => {
    const original = node(1, null, node(2, null, node(3)));
    const serialized = serializeTree(original) as string;
    const reconstructed = deserializeTree(serialized) as TreeNode;
    expect(inorder(reconstructed)).toEqual([1, 2, 3]);
  });

  it("round-trips a left-skewed tree", () => {
    const original = node(3, node(2, node(1)));
    const serialized = serializeTree(original) as string;
    const reconstructed = deserializeTree(serialized) as TreeNode;
    expect(inorder(reconstructed)).toEqual([1, 2, 3]);
  });
});
