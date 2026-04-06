import { describe, it, expect } from "vitest";
import { buildFromLevelOrder } from "./sources/build-from-level-order.ts?fn";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

function levelOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) break;
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

describe("buildFromLevelOrder", () => {
  it("builds a balanced 7-node BST from level-order sequence", () => {
    const root = buildFromLevelOrder([4, 2, 6, 1, 3, 5, 7]) as TreeNode;
    expect(root.value).toBe(4);
    expect(inorder(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("produces sorted inorder traversal", () => {
    const root = buildFromLevelOrder([4, 2, 6, 1, 3, 5, 7]) as TreeNode;
    expect(inorder(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("restores original level-order when input is valid BST level-order", () => {
    const input = [4, 2, 6, 1, 3, 5, 7];
    const root = buildFromLevelOrder(input) as TreeNode;
    expect(levelOrder(root)).toEqual(input);
  });

  it("returns null for empty input", () => {
    expect(buildFromLevelOrder([])).toBeNull();
  });

  it("handles a single-node input", () => {
    const root = buildFromLevelOrder([42]) as TreeNode;
    expect(root.value).toBe(42);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it("handles a two-node input with right child", () => {
    const root = buildFromLevelOrder([1, 2]) as TreeNode;
    expect(root.value).toBe(1);
    expect(root.left).toBeNull();
    expect((root.right as TreeNode).value).toBe(2);
  });

  it("handles a three-node balanced input", () => {
    const root = buildFromLevelOrder([2, 1, 3]) as TreeNode;
    expect(root.value).toBe(2);
    expect((root.left as TreeNode).value).toBe(1);
    expect((root.right as TreeNode).value).toBe(3);
  });
});
