import { describe, it, expect } from "vitest";
import { buildFromPreorderInorderIterative } from "../sources/build-from-preorder-inorder-iterative.ts?fn";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

function preorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [root.value, ...preorder(root.left), ...preorder(root.right)];
}

describe("buildFromPreorderInorderIterative", () => {
  it("builds a balanced 7-node BST", () => {
    const root = buildFromPreorderInorderIterative(
      [4, 2, 1, 3, 6, 5, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ) as TreeNode;
    expect(root.value).toBe(4);
    expect(inorder(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("preserves inorder traversal", () => {
    const inputInorder = [1, 2, 3, 4, 5, 6, 7];
    const root = buildFromPreorderInorderIterative([4, 2, 1, 3, 6, 5, 7], inputInorder) as TreeNode;
    expect(inorder(root)).toEqual(inputInorder);
  });

  it("preserves preorder traversal", () => {
    const inputPreorder = [4, 2, 1, 3, 6, 5, 7];
    const root = buildFromPreorderInorderIterative(
      inputPreorder,
      [1, 2, 3, 4, 5, 6, 7],
    ) as TreeNode;
    expect(preorder(root)).toEqual(inputPreorder);
  });

  it("returns null for empty arrays", () => {
    expect(buildFromPreorderInorderIterative([], [])).toBeNull();
  });

  it("handles a single-node tree", () => {
    const root = buildFromPreorderInorderIterative([42], [42]) as TreeNode;
    expect(root.value).toBe(42);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it("matches result of recursive approach for various inputs", () => {
    const root1 = buildFromPreorderInorderIterative([1, 2, 3], [2, 1, 3]) as TreeNode;
    expect(root1.value).toBe(1);
    expect((root1.left as TreeNode).value).toBe(2);
    expect((root1.right as TreeNode).value).toBe(3);
  });
});
