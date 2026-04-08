import { describe, it, expect } from "vitest";
import { buildFromPostorderInorder } from "../sources/build-from-postorder-inorder.ts?fn";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

function postorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.value];
}

describe("buildFromPostorderInorder", () => {
  it("builds a balanced 7-node BST", () => {
    const root = buildFromPostorderInorder(
      [1, 3, 2, 5, 7, 6, 4],
      [1, 2, 3, 4, 5, 6, 7],
    ) as TreeNode;
    expect(root.value).toBe(4);
    expect(inorder(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("preserves inorder traversal", () => {
    const inputInorder = [1, 2, 3, 4, 5, 6, 7];
    const root = buildFromPostorderInorder([1, 3, 2, 5, 7, 6, 4], inputInorder) as TreeNode;
    expect(inorder(root)).toEqual(inputInorder);
  });

  it("preserves postorder traversal", () => {
    const inputPostorder = [1, 3, 2, 5, 7, 6, 4];
    const root = buildFromPostorderInorder(inputPostorder, [1, 2, 3, 4, 5, 6, 7]) as TreeNode;
    expect(postorder(root)).toEqual(inputPostorder);
  });

  it("returns null for empty arrays", () => {
    expect(buildFromPostorderInorder([], [])).toBeNull();
  });

  it("handles a single-node tree", () => {
    const root = buildFromPostorderInorder([42], [42]) as TreeNode;
    expect(root.value).toBe(42);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it("builds a two-node tree correctly", () => {
    const root = buildFromPostorderInorder([1, 2], [1, 2]) as TreeNode;
    expect(root.value).toBe(2);
    expect((root.left as TreeNode).value).toBe(1);
    expect(root.right).toBeNull();
  });
});
